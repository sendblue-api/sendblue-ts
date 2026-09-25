## Setting up the environment

This repository uses [`yarn@v1`](https://classic.yarnpkg.com/lang/en/docs/install).
Other package managers may work but are not officially supported for development.

To set up the repository, run:

```sh
$ yarn
$ yarn build
```

This will install all the required dependencies and build output files to `dist/`.

## Modifying/Adding code

The SDK started as generated code and is now maintained by hand. When the API spec changes, update the types in
`src/resources/`, the request params in `tests/api-resources/`, `api.md` and the MCP server's bundled docs data
(`packages/mcp-server/src/local-docs-search.ts`) together, following the existing style: JSDoc taken from the spec
descriptions, `| null` for nullable fields.

## Adding and running examples

All files in the `examples/` directory can be freely edited or added to.

```ts
// add an example to examples/<your-example>.ts

#!/usr/bin/env -S npm run tsn -T
…
```

```sh
$ chmod +x examples/<your-example>.ts
# run the example against your api
$ yarn tsn -T examples/<your-example>.ts
```

## Using the repository from source

If you’d like to use the repository from source, you can either install from git or link to a cloned repository:

To install via git:

```sh
$ npm install git+ssh://git@github.com:sendblue-api/sendblue-ts.git
```

Alternatively, to link a local copy of the repo:

```sh
# Clone
$ git clone https://www.github.com/sendblue-api/sendblue-ts
$ cd sendblue-ts

# With yarn
$ yarn link
$ cd ../my-package
$ yarn link sendblue

# With pnpm
$ pnpm link --global
$ cd ../my-package
$ pnpm link --global sendblue
```

## Running tests

```sh
$ yarn run test
```

## Linting and formatting

This repository uses [prettier](https://www.npmjs.com/package/prettier) and
[eslint](https://www.npmjs.com/package/eslint) to format the code in the repository.

To lint:

```sh
$ yarn lint
```

To format and fix all lint issues automatically:

```sh
$ yarn fix
```

## Publishing and releases

Releases are cut by [release-please](https://github.com/googleapis/release-please) (`.github/workflows/release-please.yml`).
On every push to `main` it opens or updates a `release: X.Y.Z` PR from the Conventional Commit messages since the last
release (`feat:` bumps the minor version, `fix:` the patch version). Merging that PR tags `vX.Y.Z`, creates the GitHub
release, and dispatches [the `Publish NPM` GitHub action](https://www.github.com/sendblue-api/sendblue-ts/actions/workflows/publish-npm.yml)
on the new tag, which publishes `sendblue` and `sendblue-mcp` to npm and attaches the MCP bundle to the release.

### Publish with a GitHub workflow

If a publish failed, re-run [the `Publish NPM` GitHub action](https://www.github.com/sendblue-api/sendblue-ts/actions/workflows/publish-npm.yml)
on the release tag. Leave `path` empty to publish both packages, or set it to `.` or `packages/mcp-server`. Publishing
uses npm trusted publishing (GitHub OIDC), so no npm token secret is needed, and it is bound to the `publish-npm.yml`
file name.

### Publish manually

If you need to manually release a package, you can run the `bin/publish-npm` script with an `NPM_TOKEN` set on
the environment.
