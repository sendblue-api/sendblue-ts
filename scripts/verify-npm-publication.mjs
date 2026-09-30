import { createHash } from 'node:crypto';
import { execFileSync, spawnSync } from 'node:child_process';
import { mkdtempSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const REGISTRY = 'https://registry.npmjs.org';

export class RegistryError extends Error {}
export class IntegrityError extends Error {}

// A 404 is absence. Authentication, network and server errors must never
// accidentally authorize publishing a version we could not inspect.
export async function readVersion(name, version, { fetchImpl = fetch } = {}) {
  let response;
  try {
    response = await fetchImpl(`${REGISTRY}/${encodeURIComponent(name)}/${encodeURIComponent(version)}`, {
      headers: { accept: 'application/json', 'cache-control': 'no-cache' },
      signal: AbortSignal.timeout(15_000),
    });
  } catch (error) {
    throw new RegistryError(`Registry lookup failed for ${name}@${version}: ${error.message}`);
  }
  if (response.status === 404) return null;
  if (!response.ok) {
    throw new RegistryError(`Registry lookup failed for ${name}@${version}: HTTP ${response.status}`);
  }
  try {
    const manifest = await response.json();
    if (manifest.name !== name || typeof manifest.version !== 'string') {
      throw new Error('unexpected package identity');
    }
    if (version !== 'latest' && manifest.version !== version) {
      throw new Error('unexpected package version');
    }
    return manifest;
  } catch (error) {
    throw new RegistryError(`Invalid registry response for ${name}@${version}: ${error.message}`);
  }
}

export function verifyIntegrity(manifest, expectedIntegrity) {
  if (!manifest) return false;
  if (manifest.dist?.integrity !== expectedIntegrity) {
    throw new IntegrityError(
      `Refusing ${manifest.name}@${manifest.version}: registry archive differs from the local archive`,
    );
  }
  return true;
}

export function publicationTag(version, latestVersion) {
  const prerelease = /^\d+\.\d+\.\d+-([a-zA-Z][a-zA-Z0-9-]*)/.exec(version);
  // Preserve the existing behavior: the first prerelease may establish latest,
  // but a prerelease must not replace an existing stable latest release.
  const stableLatest = latestVersion && /^\d+\.\d+\.\d+(?:\+.*)?$/.test(latestVersion);
  if (!prerelease && /^\d+\.\d+\.\d+-/.test(version) && stableLatest) return 'prerelease';
  return prerelease && stableLatest ? prerelease[1] : 'latest';
}

export async function waitForPublication(
  name,
  version,
  integrity,
  {
    read = readVersion,
    sleep = (ms) => new Promise((done) => setTimeout(done, ms)),
    attempts = 12,
    intervalMs = 10_000,
  } = {},
) {
  let lastError = 'version is absent';
  for (let attempt = 0; attempt < attempts; attempt++) {
    try {
      if (verifyIntegrity(await read(name, version), integrity)) return;
      lastError = 'version is absent';
    } catch (error) {
      if (!(error instanceof RegistryError)) throw error;
      lastError = error.message;
    }
    if (attempt + 1 < attempts) await sleep(intervalMs);
  }
  throw new Error(`Could not verify ${name}@${version} after ${attempts} checks: ${lastError}`);
}

export async function publishAndVerify(
  { name, version, integrity, publish },
  { read = readVersion, wait = waitForPublication } = {},
) {
  if (verifyIntegrity(await read(name, version), integrity)) {
    console.log(`${name}@${version} already published with identical integrity`);
    return;
  }
  const latest = version.includes('-') ? await read(name, 'latest') : null;
  const tag = publicationTag(version, latest?.version);
  let publishFailure;
  try {
    const result = await publish(tag);
    if (result.error || result.status !== 0) {
      publishFailure = result.error?.message ?? `npm publish exited with ${result.status}`;
    }
  } catch (error) {
    publishFailure = error.message;
  }
  // An upload can succeed while its response fails. Never upload twice here:
  // inspect the registry after either outcome, and succeed only on matching bytes.
  try {
    await wait(name, version, integrity, { read });
  } catch (error) {
    throw new Error(`${publishFailure ? `${publishFailure}; ` : ''}${error.message}`, { cause: error });
  }
  console.log(`Verified public registry integrity for ${name}@${version}`);
}

async function main() {
  const npm = process.argv[2];
  if (!npm) throw new Error('Usage: node verify-npm-publication.mjs /path/to/npm (from dist)');
  const { name, version } = JSON.parse(readFileSync('package.json', 'utf8'));
  const destination = mkdtempSync(join(tmpdir(), 'sendblue-npm-'));
  try {
    const packed = JSON.parse(
      execFileSync(npm, ['pack', '--ignore-scripts', '--json', '--pack-destination', destination], {
        encoding: 'utf8',
      }),
    );
    if (packed.length !== 1 || packed[0].name !== name || packed[0].version !== version) {
      throw new Error('npm pack returned an unexpected package');
    }
    const { filename, integrity } = packed[0];
    const archive = join(destination, filename);
    const actual = `sha512-${createHash('sha512').update(readFileSync(archive)).digest('base64')}`;
    if (integrity !== actual) throw new Error('npm pack integrity does not match its archive');
    await publishAndVerify({
      name,
      version,
      integrity,
      publish: (tag) =>
        spawnSync(npm, ['publish', archive, '--ignore-scripts', '--tag', tag], {
          stdio: 'inherit',
          timeout: 180_000,
        }),
    });
  } finally {
    rmSync(destination, { recursive: true, force: true });
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  main().catch((error) => {
    console.error(error.message);
    process.exitCode = 1;
  });
}
