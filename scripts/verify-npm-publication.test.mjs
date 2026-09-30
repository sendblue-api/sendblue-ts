import assert from 'node:assert/strict';
import test from 'node:test';
import {
  IntegrityError,
  RegistryError,
  publicationTag,
  publishAndVerify,
  readVersion,
  waitForPublication,
} from './verify-npm-publication.mjs';

const publication = { name: 'sendblue', version: '3.18.0', integrity: 'sha512-expected' };
const manifest = {
  name: publication.name,
  version: publication.version,
  dist: { integrity: publication.integrity },
};
const forbidden = () => assert.fail('Unexpected publication or polling');

// Registry operations are injected. These tests never contact npm or upload.
test('an identical exact version skips uploading and visibility polling', async () => {
  const reads = [];
  await publishAndVerify(
    { ...publication, publish: forbidden },
    {
      read: async (...args) => {
        reads.push(args);
        return manifest;
      },
      wait: forbidden,
    },
  );
  assert.deepEqual(reads, [[publication.name, publication.version]]);
});

test('an existing version with different or absent integrity refuses uploading', async () => {
  for (const dist of [{ integrity: 'sha512-other' }, {}]) {
    await assert.rejects(
      publishAndVerify(
        { ...publication, publish: forbidden },
        {
          read: async () => ({ ...manifest, dist }),
          wait: forbidden,
        },
      ),
      IntegrityError,
    );
  }
});

test('only registry 404 means absence', async () => {
  const lookup = (response) =>
    readVersion(publication.name, publication.version, {
      fetchImpl: async () => response,
    });
  assert.equal(await lookup({ status: 404, ok: false }), null);
  for (const status of [401, 403, 429, 500, 503]) {
    await assert.rejects(lookup({ status, ok: false }), RegistryError);
  }
  await assert.rejects(
    readVersion(publication.name, publication.version, {
      fetchImpl: async () => {
        throw new Error('connection reset');
      },
    }),
    RegistryError,
  );
});

test('registry identity and exact version must match the requested package', async () => {
  for (const invalid of [
    { ...manifest, name: 'another-package' },
    { ...manifest, version: '3.17.0' },
    { error: 'upstream failure' },
  ]) {
    await assert.rejects(
      readVersion(publication.name, publication.version, {
        fetchImpl: async () => ({ status: 200, ok: true, json: async () => invalid }),
      }),
      RegistryError,
    );
  }
});

test('registry uncertainty before uploading stops without a publish attempt', async () => {
  await assert.rejects(
    publishAndVerify(
      { ...publication, publish: forbidden },
      {
        read: async () => {
          throw new RegistryError('registry unavailable');
        },
        wait: forbidden,
      },
    ),
    /registry unavailable/,
  );
});

test('uncertain upload responses still verify once without uploading twice', async () => {
  for (const outcome of [{ status: 1 }, { status: null, error: new Error('timed out') }, 'throw']) {
    let uploads = 0;
    let checks = 0;
    await publishAndVerify(
      {
        ...publication,
        publish: async (tag) => {
          uploads++;
          assert.equal(tag, 'latest');
          if (outcome === 'throw') throw new Error('connection reset after upload');
          return outcome;
        },
      },
      {
        read: async () => null,
        wait: async (name, version, integrity) => {
          checks++;
          assert.deepEqual({ name, version, integrity }, publication);
        },
      },
    );
    assert.equal(uploads, 1);
    assert.equal(checks, 1);
  }
});

test('a successful upload exit alone does not prove publication', async () => {
  let uploads = 0;
  await assert.rejects(
    publishAndVerify(
      {
        ...publication,
        publish: async () => {
          uploads++;
          return { status: 0 };
        },
      },
      {
        read: async () => null,
        wait: async () => {
          throw new Error('version is absent');
        },
      },
    ),
    /version is absent/,
  );
  assert.equal(uploads, 1);
});

test('visibility polling tolerates temporary absence and registry failure', async () => {
  const responses = [null, new RegistryError('HTTP 503'), manifest];
  const delays = [];
  const reads = [];
  await waitForPublication(publication.name, publication.version, publication.integrity, {
    attempts: 3,
    intervalMs: 7,
    sleep: async (ms) => {
      delays.push(ms);
    },
    read: async (...args) => {
      reads.push(args);
      const response = responses.shift();
      if (response instanceof Error) throw response;
      return response;
    },
  });
  assert.equal(reads.length, 3);
  assert.ok(reads.every(([name, version]) => name === publication.name && version === publication.version));
  assert.deepEqual(delays, [7, 7]);
});

test('visibility polling stops at its bound and exposes the last failure', async () => {
  let reads = 0;
  let sleeps = 0;
  await assert.rejects(
    waitForPublication(publication.name, publication.version, publication.integrity, {
      attempts: 3,
      sleep: async () => {
        sleeps++;
      },
      read: async () => {
        reads++;
        throw new RegistryError('HTTP 503');
      },
    }),
    /after 3 checks: HTTP 503/,
  );
  assert.equal(reads, 3);
  assert.equal(sleeps, 2);
});

test('visibility polling fails immediately on conflicting archive integrity', async () => {
  let reads = 0;
  await assert.rejects(
    waitForPublication(publication.name, publication.version, publication.integrity, {
      read: async () => {
        reads++;
        return { ...manifest, dist: { integrity: 'sha512-other' } };
      },
      sleep: forbidden,
    }),
    IntegrityError,
  );
  assert.equal(reads, 1);
});

test('prereleases preserve stable latest while initial prereleases establish it', () => {
  assert.equal(publicationTag('3.19.0', '3.18.0'), 'latest');
  assert.equal(publicationTag('3.19.0-beta.1', '3.18.0'), 'beta');
  assert.equal(publicationTag('3.19.0-rc.1', '3.18.0'), 'rc');
  assert.equal(publicationTag('3.19.0-1', '3.18.0'), 'prerelease');
  assert.equal(publicationTag('3.19.0-beta.1', undefined), 'latest');
  assert.equal(publicationTag('3.19.0-beta.2', '3.19.0-beta.1'), 'latest');
});
