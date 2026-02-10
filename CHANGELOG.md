# Changelog

## 3.1.0 (2026-02-10)

Full Changelog: [v3.0.0...v3.1.0](https://github.com/sendblue-api/sendblue-ts/compare/v3.0.0...v3.1.0)

### Features

* **api:** manual updates ([bbfd8e6](https://github.com/sendblue-api/sendblue-ts/commit/bbfd8e663d2a2da218127ae391f028d42710e228))
* **mcp:** add initial server instructions ([60caebf](https://github.com/sendblue-api/sendblue-ts/commit/60caebf686850d8fcbe1abb390cb86ce210783dc))


### Bug Fixes

* **client:** avoid memory leak with abort signals ([a024460](https://github.com/sendblue-api/sendblue-ts/commit/a0244605d744d1480eefb01eafd7c7a2d45740e7))
* **client:** avoid removing abort listener too early ([d448c50](https://github.com/sendblue-api/sendblue-ts/commit/d448c50fecae0a1f9291eec1584afb9ef9a6ddf9))
* **docs:** fix mcp installation instructions for remote servers ([b3ac217](https://github.com/sendblue-api/sendblue-ts/commit/b3ac217fb6bddb38ff9685c7d38749a56fa2a2bc))
* **mcp:** allow falling back for required env variables ([d03ff47](https://github.com/sendblue-api/sendblue-ts/commit/d03ff47b6f9621ff0afd8060b0e744f13a83f2cd))
* **mcp:** update code tool prompt ([711163b](https://github.com/sendblue-api/sendblue-ts/commit/711163b47679bdf489c40f4e7333af71024b9771))


### Chores

* bump OpenAPI spec version to 1.1.0 ([2b6f263](https://github.com/sendblue-api/sendblue-ts/commit/2b6f26366649ffbb98c6e158a8ac44eb3b1742ef))
* **ci:** upgrade `actions/github-script` ([9bc5271](https://github.com/sendblue-api/sendblue-ts/commit/9bc52717197daade7c09f300ede5f49881f2e43f))
* **client:** do not parse responses with empty content-length ([f486b2a](https://github.com/sendblue-api/sendblue-ts/commit/f486b2a74eb6bbab1cfb9382cf3b6e4d5f87558f))
* **client:** restructure abort controller binding ([4a36480](https://github.com/sendblue-api/sendblue-ts/commit/4a364808e710c11bf4336468b949f9055e4df534))
* **internal:** add health check to MCP server when running in HTTP mode ([9cdee5c](https://github.com/sendblue-api/sendblue-ts/commit/9cdee5c9485c76225e2e3220dc2c8ef5df800b94))
* **internal:** allow basic filtering of methods allowed for MCP code mode ([95788ac](https://github.com/sendblue-api/sendblue-ts/commit/95788ac649d5b95cfde00eaca3229a620eb66a40))
* **internal:** always generate MCP server dockerfiles and upgrade associated dependencies ([d2a0484](https://github.com/sendblue-api/sendblue-ts/commit/d2a048428f15a55807ec2b9d6829bc44bc803022))
* **internal:** codegen related update ([26fabe7](https://github.com/sendblue-api/sendblue-ts/commit/26fabe771e094ea9218d87f161ea52b5e44a6d4f))
* **internal:** codegen related update ([f28ae45](https://github.com/sendblue-api/sendblue-ts/commit/f28ae4559128f5e4ed4a58d73175730e5c3bd0de))
* **internal:** codegen related update ([3a29296](https://github.com/sendblue-api/sendblue-ts/commit/3a2929613c058fa6331f50681864c8225202dba3))
* **internal:** codegen related update ([747b9c7](https://github.com/sendblue-api/sendblue-ts/commit/747b9c792696fb50c544f18d99469ddc94b5a8fc))
* **internal:** codegen related update ([5ba7ea0](https://github.com/sendblue-api/sendblue-ts/commit/5ba7ea02209345837c1178ec3aa3275b265dc7fd))
* **internal:** refactor flag parsing for MCP servers and add debug flag ([e212d08](https://github.com/sendblue-api/sendblue-ts/commit/e212d08807d41a605b0db29b515f3f3fa4999834))
* **internal:** support oauth authorization code flow for MCP servers ([f0d5fa3](https://github.com/sendblue-api/sendblue-ts/commit/f0d5fa3618f07e2f03bf27b31357bf4e9055b588))
* **internal:** update `actions/checkout` version ([1f87e00](https://github.com/sendblue-api/sendblue-ts/commit/1f87e00260e5c4188597620337001a8df7b76595))
* **internal:** update lock file ([7150196](https://github.com/sendblue-api/sendblue-ts/commit/7150196485cffa3057471768e0a7d38f83c070d1))
* **internal:** upgrade babel, qs, js-yaml ([52684c8](https://github.com/sendblue-api/sendblue-ts/commit/52684c84040d881cda2cb4916d25bd20ef06871c))
* **mcp:** add intent param to execute tool ([9c65910](https://github.com/sendblue-api/sendblue-ts/commit/9c65910da6c72205964777ef33fe75afefc518e2))
* **mcp:** pass intent param to execute handler ([944d6ba](https://github.com/sendblue-api/sendblue-ts/commit/944d6babb9da65378201d65e076f14d36a718243))
* **mcp:** up tsconfig lib version to es2022 ([8305c74](https://github.com/sendblue-api/sendblue-ts/commit/8305c74097abbb359b1aa53d730b80509c24d6ae))
* **mcp:** upgrade dependencies ([606b34a](https://github.com/sendblue-api/sendblue-ts/commit/606b34a52c62c4c893b2b5beab570f2760dbc26f))

## 3.0.0 (2026-01-08)

Full Changelog: [v2.2.0...v3.0.0](https://github.com/sendblue-api/sendblue-ts/compare/v2.2.0...v3.0.0)

### ⚠ BREAKING CHANGES

* **mcp:** remove deprecated tool schemes
* **mcp:** **Migration:** To migrate, simply modify the command used to invoke the MCP server. Currently, the only supported tool scheme is code mode. Now, starting the server with just `node /path/to/mcp/server` or `npx package-name` will invoke code tools: changing your command to one of these is likely all you will need to do.

### Features

* **api:** manual updates ([87a97a2](https://github.com/sendblue-api/sendblue-ts/commit/87a97a23741c894047a45fb401792d2a979cbe25))


### Bug Fixes

* **mcp:** correct code tool api output types ([84064d9](https://github.com/sendblue-api/sendblue-ts/commit/84064d9c79f6e968818e9459d16c5b435c58bcd4))
* **mcp:** fix env parsing ([fad5cd0](https://github.com/sendblue-api/sendblue-ts/commit/fad5cd0c4f1291aef357c6d48f44e2c1a028c200))
* **mcp:** fix options parsing ([a06d3ac](https://github.com/sendblue-api/sendblue-ts/commit/a06d3ac05810ea852722759aaf7455d851f65563))
* **mcp:** pass base url to code tool ([84878ae](https://github.com/sendblue-api/sendblue-ts/commit/84878aea79874d1bca870777cdd8b1ccad6da877))


### Chores

* break long lines in snippets into multiline ([7c60251](https://github.com/sendblue-api/sendblue-ts/commit/7c6025103c2863fa2dccec5c0fc564c78f1c2096))
* **internal:** codegen related update ([b08c346](https://github.com/sendblue-api/sendblue-ts/commit/b08c346a1bd5eb5a55d213755ddd5fe3388dea59))
* **internal:** configure MCP Server hosting ([291480b](https://github.com/sendblue-api/sendblue-ts/commit/291480b6359c0441707cad3f5968c4250d6127de))
* **internal:** fix dockerfile ([a548ecf](https://github.com/sendblue-api/sendblue-ts/commit/a548ecf7b9f3358b195cbc58d4b3c4a2b788758e))
* **mcp:** remove deprecated tool schemes ([87b7056](https://github.com/sendblue-api/sendblue-ts/commit/87b705610f69ef6db4d92ac2eb3509398711fe2a))


### Documentation

* prominently feature MCP server setup in root SDK readmes ([4d8d46d](https://github.com/sendblue-api/sendblue-ts/commit/4d8d46d5fff0b624ed6abcaa156a8693bf55c3fa))

## 2.2.0 (2025-12-13)

Full Changelog: [v2.1.0...v2.2.0](https://github.com/sendblue-api/sendblue-ts/compare/v2.1.0...v2.2.0)

### Features

* **api:** manual updates ([184a587](https://github.com/sendblue-api/sendblue-ts/commit/184a5874cb34792f5addce731afc51209e609c08))
* **api:** manual updates ([59277e3](https://github.com/sendblue-api/sendblue-ts/commit/59277e375332443f56b8a335d57a4e1166b5c1f9))
* **api:** manual updates ([eeddf82](https://github.com/sendblue-api/sendblue-ts/commit/eeddf82b85057235736114c079a9f937229e04ec))
* **api:** manual updates ([e9f1453](https://github.com/sendblue-api/sendblue-ts/commit/e9f145336e1348a9806e31bacd21ef6e2a13ed50))


### Bug Fixes

* **mcp:** add client instantiation options to code tool ([24583c9](https://github.com/sendblue-api/sendblue-ts/commit/24583c93d542b2d881634686b9abac13143435d6))


### Chores

* **mcp:** update lockfile ([d7cb954](https://github.com/sendblue-api/sendblue-ts/commit/d7cb9548a2fa569f69de7339ea589a59f60a2c92))

## 2.1.0 (2025-12-06)

Full Changelog: [v2.0.2...v2.1.0](https://github.com/sendblue-api/sendblue-ts/compare/v2.0.2...v2.1.0)

### Features

* **api/v2/contact:** removed verified field in response example ([84e9eec](https://github.com/sendblue-api/sendblue-ts/commit/84e9eeccbeb4fbd17a8b0d996a9a23c9f37bbdcc))
* **mcp:** add typescript check to code execution tool ([98896e9](https://github.com/sendblue-api/sendblue-ts/commit/98896e9892dd3569c3367abc4a98f7c249d35464))
* **mcp:** handle code mode calls in the Stainless API ([9d72f3d](https://github.com/sendblue-api/sendblue-ts/commit/9d72f3d8a4754cd35271facefcaf54490df9dcff))


### Bug Fixes

* **mcp:** correct code tool API endpoint ([8546f73](https://github.com/sendblue-api/sendblue-ts/commit/8546f73c5d8620193684f1d8091a2ae59c384951))
* **mcp:** return correct lines on typescript errors ([d007cbd](https://github.com/sendblue-api/sendblue-ts/commit/d007cbd401f459106188126d1f801dbb364c3697))


### Chores

* **internal:** codegen related update ([ad57e05](https://github.com/sendblue-api/sendblue-ts/commit/ad57e057d311de42abc91b26759c91001fc8deb0))
* **internal:** codegen related update ([7665eac](https://github.com/sendblue-api/sendblue-ts/commit/7665eacb311050999d17a500150f3361acdfe1fc))
* use latest @modelcontextprotocol/sdk ([75e400a](https://github.com/sendblue-api/sendblue-ts/commit/75e400a940b77d4b1fe8c6a32304e6ae6ac06392))

## 2.0.2 (2025-12-03)

Full Changelog: [v2.0.1...v2.0.2](https://github.com/sendblue-api/sendblue-ts/compare/v2.0.1...v2.0.2)

### Features

* **api:** manual updates ([8082281](https://github.com/sendblue-api/sendblue-ts/commit/8082281a6233b474666e76e1321e4f0394d36108))
* **api:** update via SDK Studio ([9e46ff4](https://github.com/sendblue-api/sendblue-ts/commit/9e46ff4e96807421cd976cd7e1aae934eb316d3f))
* **mcp:** add code execution tool ([3496bc1](https://github.com/sendblue-api/sendblue-ts/commit/3496bc18f125c82344526503360a28e489e0e46d))
* **mcp:** add docs search tool ([bb0281f](https://github.com/sendblue-api/sendblue-ts/commit/bb0281f4638792920fa48442411d9704e1114b1f))
* **mcp:** add option for including docs tools ([416087d](https://github.com/sendblue-api/sendblue-ts/commit/416087d790c3d6b9661a5bba792e56ec9a540522))
* **mcp:** add option to infer mcp client ([8bff5fd](https://github.com/sendblue-api/sendblue-ts/commit/8bff5fdd01806ae3a8c8e59ff098a311a0be4e46))
* **mcp:** add unix socket option for remote MCP ([52854a9](https://github.com/sendblue-api/sendblue-ts/commit/52854a9e187233ce45affbfb5b857c7ab82df0a4))
* **mcp:** allow setting logging level ([ae209df](https://github.com/sendblue-api/sendblue-ts/commit/ae209dfcc3846e9ccf88199921d89300ae809919))
* **mcp:** enable experimental docs search tool ([0cf6d4b](https://github.com/sendblue-api/sendblue-ts/commit/0cf6d4b7f256c62aa1bc0317acb6ee0de233fc0f))
* **mcp:** expose client options in `streamableHTTPApp` ([b0f5f3c](https://github.com/sendblue-api/sendblue-ts/commit/b0f5f3c131d3b619639cb22aa7f43dcd4eec6ea9))
* **mcp:** parse query string as mcp client options in mcp server ([9dfcacd](https://github.com/sendblue-api/sendblue-ts/commit/9dfcacd89e628a8d0b6386983d4ec13d07ae0c16))


### Bug Fixes

* **ci:** set permissions for DXT publish action ([0984eed](https://github.com/sendblue-api/sendblue-ts/commit/0984eed85cb1671631cc5e4ae61a87631a3b4b6a))
* coerce nullable values to undefined ([01ba4cb](https://github.com/sendblue-api/sendblue-ts/commit/01ba4cbf59295fc291233962ff4c350ba0c3896c))
* **mcp:** fix cli argument parsing logic ([bd6093e](https://github.com/sendblue-api/sendblue-ts/commit/bd6093edd285c1c13ebe3cb14880846c5b71e747))
* **mcp:** fix query options parsing ([0cfeaec](https://github.com/sendblue-api/sendblue-ts/commit/0cfeaece5fed9b1a0affbce8dad917864ed30249))
* **mcp:** fix uploading dxt release assets ([b725c4c](https://github.com/sendblue-api/sendblue-ts/commit/b725c4ca1128e106339363ec96addf90e7abab45))
* **mcp:** resolve a linting issue in server code ([1ef5423](https://github.com/sendblue-api/sendblue-ts/commit/1ef54233922af7763a6c102f2c3c03c34c45d6f3))


### Performance Improvements

* faster formatting ([573f606](https://github.com/sendblue-api/sendblue-ts/commit/573f60624b7cdd6fe3a28d9e154c951fb7babf9d))


### Chores

* add package to package.json ([f3517a6](https://github.com/sendblue-api/sendblue-ts/commit/f3517a662d725ef18396897f53a2b1568f958ae2))
* ci build action ([58da987](https://github.com/sendblue-api/sendblue-ts/commit/58da9875616d17a1f1d630ca1298a2015537052e))
* **client:** qualify global Blob ([238745c](https://github.com/sendblue-api/sendblue-ts/commit/238745cc0d461443d0de3f64929ee8a375e93c22))
* **codegen:** internal codegen update ([63f2a5b](https://github.com/sendblue-api/sendblue-ts/commit/63f2a5b05f92184ad1e06537f345600179bbfe99))
* configure new SDK language ([019dce8](https://github.com/sendblue-api/sendblue-ts/commit/019dce887551a69aec845898b364e7e70e373e62))
* **deps:** update dependency @types/node to v20.17.58 ([1da3189](https://github.com/sendblue-api/sendblue-ts/commit/1da3189a76422b53fef99cbbbf02966045a62c51))
* do not install brew dependencies in ./scripts/bootstrap by default ([636d489](https://github.com/sendblue-api/sendblue-ts/commit/636d489401108d74e5b3a03fbcacb0c1e3dc975d))
* **internal:** codegen related update ([d18e9b7](https://github.com/sendblue-api/sendblue-ts/commit/d18e9b7ac8e338fa48529368430ae79fcf17cbc0))
* **internal:** codegen related update ([0b25240](https://github.com/sendblue-api/sendblue-ts/commit/0b25240b09783f0c8c6fa52831310a0bc62f3022))
* **internal:** codegen related update ([eab1fb2](https://github.com/sendblue-api/sendblue-ts/commit/eab1fb25cc4de4e1d1dca2c4936d1287d33c3cdb))
* **internal:** codegen related update ([c2d8e8d](https://github.com/sendblue-api/sendblue-ts/commit/c2d8e8d3d8dd0c88b13d494c92f8d9ddde9fd37c))
* **internal:** codegen related update ([39ff5b8](https://github.com/sendblue-api/sendblue-ts/commit/39ff5b8b039cf9c18a226fc70480b6e632ec841f))
* **internal:** codegen related update ([a6b94f4](https://github.com/sendblue-api/sendblue-ts/commit/a6b94f494da9806a0c170d1b8bf478a716274b69))
* **internal:** codegen related update ([be0be72](https://github.com/sendblue-api/sendblue-ts/commit/be0be7299135f1b0304d0e343e47f98c4b4bf0ae))
* **internal:** codegen related update ([b6207dc](https://github.com/sendblue-api/sendblue-ts/commit/b6207dc4e332597b22215f61b1e20e1c71735183))
* **internal:** fix incremental formatting in some cases ([b9201c8](https://github.com/sendblue-api/sendblue-ts/commit/b9201c823e67e041231c5202fd0d9c57e803f9d9))
* **internal:** formatting change ([abb2aa5](https://github.com/sendblue-api/sendblue-ts/commit/abb2aa5ab745ea4952e486964fdcd4086147abfe))
* **internal:** gitignore .mcpb files ([7521bf7](https://github.com/sendblue-api/sendblue-ts/commit/7521bf7b78349b66f6a841aaffdf766a549f909f))
* **internal:** ignore .eslintcache ([44dfa98](https://github.com/sendblue-api/sendblue-ts/commit/44dfa98d200442aa26250b69115a406446e98fce))
* **internal:** make mcp-server publishing public by defaut ([67cf718](https://github.com/sendblue-api/sendblue-ts/commit/67cf71880f5e052a213ee07b62b5fb8a3494cbe2))
* **internal:** move publish config ([dc74ec7](https://github.com/sendblue-api/sendblue-ts/commit/dc74ec7cb7b2dd07f8455cbae6b5895f966dfb56))
* **internal:** refactor array check ([dc7bbd9](https://github.com/sendblue-api/sendblue-ts/commit/dc7bbd96009ec2f45d52e130690afe5266b16610))
* **internal:** remove .eslintcache ([bc737cf](https://github.com/sendblue-api/sendblue-ts/commit/bc737cf0d81abbc4902e34c8c996dcb06c80ef91))
* **internal:** remove deprecated `compilerOptions.baseUrl` from tsconfig.json ([35c1790](https://github.com/sendblue-api/sendblue-ts/commit/35c1790281b4e0ecea4d5fecd200e6502c21e5b2))
* **internal:** update comment in script ([aed11bb](https://github.com/sendblue-api/sendblue-ts/commit/aed11bb1836b68e26681d785b37d523143e09a65))
* **internal:** update global Error reference ([02735e6](https://github.com/sendblue-api/sendblue-ts/commit/02735e616927c1319b2b4f54cd34df04767b5a4d))
* **jsdoc:** fix [@link](https://github.com/link) annotations to refer only to parts of the package‘s public interface ([616a774](https://github.com/sendblue-api/sendblue-ts/commit/616a77483f31be31e809bdf2dc55246743f6e7c6))
* **mcp:** add cors to oauth metadata route ([ca21370](https://github.com/sendblue-api/sendblue-ts/commit/ca21370aee0786f0abd845ef5ce91299216afbd1))
* **mcp:** allow pointing `docs_search` tool at other URLs ([0608c74](https://github.com/sendblue-api/sendblue-ts/commit/0608c74585c4bed67205ea92ac788e4765ce9240))
* **mcp:** document remote server in README.md ([eebc118](https://github.com/sendblue-api/sendblue-ts/commit/eebc11870dc54ebe4920f3377544d908b2f51f3e))
* **mcp:** minor cleanup of types and package.json ([51cadb0](https://github.com/sendblue-api/sendblue-ts/commit/51cadb07c26c3e8dde810467cd7dac1b80e9772b))
* **mcp:** refactor streamable http transport ([08443aa](https://github.com/sendblue-api/sendblue-ts/commit/08443aa8f74ab76206381150253d91198dad1c66))
* **mcp:** rename dxt to mcpb ([74eff77](https://github.com/sendblue-api/sendblue-ts/commit/74eff77dde6893781e9bd0b7c420847bb31b641b))
* **mcp:** update package.json ([677ea16](https://github.com/sendblue-api/sendblue-ts/commit/677ea16539b3ea99664fcd3012ca0d5570297a29))
* **mcp:** update README ([6ea91e7](https://github.com/sendblue-api/sendblue-ts/commit/6ea91e77fde3b74de33e0d7ac58f45a9762a0057))
* **mcp:** update types ([eaf5940](https://github.com/sendblue-api/sendblue-ts/commit/eaf59407faadd26c52dfa03af6535f1fb0088980))
* **mcp:** upload dxt as release asset ([49c13e2](https://github.com/sendblue-api/sendblue-ts/commit/49c13e2e57a997c67aea308e5cd38f4e132bd617))
* update @stainless-api/prism-cli to v5.15.0 ([7b5c095](https://github.com/sendblue-api/sendblue-ts/commit/7b5c0955a03508b74e44c9245481625400ddd58e))
* update CI script ([1acc30f](https://github.com/sendblue-api/sendblue-ts/commit/1acc30ffe3b0160bb3ee91da6029012accf9c1ee))
* update lockfile ([ce25619](https://github.com/sendblue-api/sendblue-ts/commit/ce25619cb20ab29d00f6008edd362ce528b963f0))
* update SDK settings ([82a9f47](https://github.com/sendblue-api/sendblue-ts/commit/82a9f4768a202685dbb480ab65fd7b3045ffaf53))

## 2.0.1 (2025-08-05)

Full Changelog: [v0.1.0-alpha.1...v2.0.1](https://github.com/sendblue-api/sendblue-ts/compare/v0.1.0-alpha.1...v2.0.1)

### Features

* **api:** update via SDK Studio ([c299ba0](https://github.com/sendblue-api/sendblue-ts/commit/c299ba0821611569d575663b5a7ac9acadff42e7))
* **api:** update via SDK Studio ([e3104c9](https://github.com/sendblue-api/sendblue-ts/commit/e3104c9cee5d3c6de1750af838696149342f0f31))
* **api:** update via SDK Studio ([bf7151d](https://github.com/sendblue-api/sendblue-ts/commit/bf7151d15bea3a7747ce57c8ca0b8104e6757aae))
* **api:** update via SDK Studio ([3997f2a](https://github.com/sendblue-api/sendblue-ts/commit/3997f2a262d30d6668248f4036506aa8308ba78b))
* **api:** update via SDK Studio ([e409908](https://github.com/sendblue-api/sendblue-ts/commit/e40990866f195ccae307fa5f7ec2ed98d871d5cd))
* **api:** update via SDK Studio ([f1dc810](https://github.com/sendblue-api/sendblue-ts/commit/f1dc81032a7d60cf7a661793059bd2237e59856a))
* **api:** update via SDK Studio ([e84b446](https://github.com/sendblue-api/sendblue-ts/commit/e84b446400c48044b720edfc81d28088f948c7ed))
* **api:** update via SDK Studio ([5845783](https://github.com/sendblue-api/sendblue-ts/commit/584578373d6485849bc03b44b4a21a94db2aaece))
* **api:** update via SDK Studio ([29a2cdd](https://github.com/sendblue-api/sendblue-ts/commit/29a2cdd037451c14250f7250ba5f846eb2ecfa30))
* **api:** update via SDK Studio ([e15ad38](https://github.com/sendblue-api/sendblue-ts/commit/e15ad38cdcba822cf4ac17e93c36ea5c4c6b76c6))
* **api:** update via SDK Studio ([84682a8](https://github.com/sendblue-api/sendblue-ts/commit/84682a8ac423389b45b06df30900412ebc40d21e))
* **api:** update via SDK Studio ([09cfbe8](https://github.com/sendblue-api/sendblue-ts/commit/09cfbe82c6a45182cc8db06a3eff171d56e71fa1))
* **api:** update via SDK Studio ([764665e](https://github.com/sendblue-api/sendblue-ts/commit/764665e478c9b2032da0ab2ee9cd9d90895b35ed))
* **api:** update via SDK Studio ([178f58c](https://github.com/sendblue-api/sendblue-ts/commit/178f58c33aa6c3681d60cdf14f4d79207f363bc5))
* **api:** update via SDK Studio ([13d42f1](https://github.com/sendblue-api/sendblue-ts/commit/13d42f157e42056c095d1a406aa843b11758d145))
* **api:** update via SDK Studio ([adf0e70](https://github.com/sendblue-api/sendblue-ts/commit/adf0e7076010e893469488fba38a888afe84ac4d))
* **mcp:** add logging when environment variable is set ([254b4aa](https://github.com/sendblue-api/sendblue-ts/commit/254b4aac516563dc515a27d120e0b770b47000b3))
* **mcp:** remote server with passthru auth ([6edbf68](https://github.com/sendblue-api/sendblue-ts/commit/6edbf68c31b676f03a4db3b5e32cd6a3f0196395))


### Bug Fixes

* **mcp:** avoid sending `jq_filter` to base API ([8d5cd86](https://github.com/sendblue-api/sendblue-ts/commit/8d5cd869bf343874d0efb70b5a85e2b8af5851c0))
* **mcp:** reverse validJson capability option and limit scope ([d16b4a4](https://github.com/sendblue-api/sendblue-ts/commit/d16b4a48b7f30edce26ef729fd3ca17a5e23e34e))


### Chores

* add docs to RequestOptions type ([cea001b](https://github.com/sendblue-api/sendblue-ts/commit/cea001bd8ffb2f19962d7f1444b5f92f3c51cd6f))
* configure new SDK language ([0c92a57](https://github.com/sendblue-api/sendblue-ts/commit/0c92a5720a524951a3bbcabaa33c94778bea6ff0))
* **internal:** codegen related update ([2472362](https://github.com/sendblue-api/sendblue-ts/commit/2472362bb98422843e895e8ab898f1405a63e513))
* **internal:** remove redundant imports config ([a76ad73](https://github.com/sendblue-api/sendblue-ts/commit/a76ad733b52598b12f471edbdb2e34266c31b484))
* make some internal functions async ([73dccd6](https://github.com/sendblue-api/sendblue-ts/commit/73dccd65b25a998a0d8a4c928029bd7ff23e80e9))
* **ts:** reorder package.json imports ([e5a51c0](https://github.com/sendblue-api/sendblue-ts/commit/e5a51c007c3e10e2d1ffe31c0e71ad05d9982134))
* update SDK settings ([ed9a0ab](https://github.com/sendblue-api/sendblue-ts/commit/ed9a0ab41d524cdd615514ed3a1af396f90e105d))

## 0.1.0-alpha.1 (2025-08-05)

Full Changelog: [v0.0.1-alpha.0...v0.1.0-alpha.1](https://github.com/sendblue-api/sendblue-ts/compare/v0.0.1-alpha.0...v0.1.0-alpha.1)

### Features

* **api:** update via SDK Studio ([bf7151d](https://github.com/sendblue-api/sendblue-ts/commit/bf7151d15bea3a7747ce57c8ca0b8104e6757aae))
* **api:** update via SDK Studio ([3997f2a](https://github.com/sendblue-api/sendblue-ts/commit/3997f2a262d30d6668248f4036506aa8308ba78b))
* **api:** update via SDK Studio ([e409908](https://github.com/sendblue-api/sendblue-ts/commit/e40990866f195ccae307fa5f7ec2ed98d871d5cd))
* **api:** update via SDK Studio ([f1dc810](https://github.com/sendblue-api/sendblue-ts/commit/f1dc81032a7d60cf7a661793059bd2237e59856a))
* **api:** update via SDK Studio ([e84b446](https://github.com/sendblue-api/sendblue-ts/commit/e84b446400c48044b720edfc81d28088f948c7ed))
* **api:** update via SDK Studio ([5845783](https://github.com/sendblue-api/sendblue-ts/commit/584578373d6485849bc03b44b4a21a94db2aaece))
* **api:** update via SDK Studio ([29a2cdd](https://github.com/sendblue-api/sendblue-ts/commit/29a2cdd037451c14250f7250ba5f846eb2ecfa30))
* **api:** update via SDK Studio ([e15ad38](https://github.com/sendblue-api/sendblue-ts/commit/e15ad38cdcba822cf4ac17e93c36ea5c4c6b76c6))
* **api:** update via SDK Studio ([84682a8](https://github.com/sendblue-api/sendblue-ts/commit/84682a8ac423389b45b06df30900412ebc40d21e))
* **api:** update via SDK Studio ([09cfbe8](https://github.com/sendblue-api/sendblue-ts/commit/09cfbe82c6a45182cc8db06a3eff171d56e71fa1))
* **api:** update via SDK Studio ([764665e](https://github.com/sendblue-api/sendblue-ts/commit/764665e478c9b2032da0ab2ee9cd9d90895b35ed))
* **api:** update via SDK Studio ([178f58c](https://github.com/sendblue-api/sendblue-ts/commit/178f58c33aa6c3681d60cdf14f4d79207f363bc5))
* **api:** update via SDK Studio ([13d42f1](https://github.com/sendblue-api/sendblue-ts/commit/13d42f157e42056c095d1a406aa843b11758d145))
* **api:** update via SDK Studio ([adf0e70](https://github.com/sendblue-api/sendblue-ts/commit/adf0e7076010e893469488fba38a888afe84ac4d))
* **mcp:** add logging when environment variable is set ([254b4aa](https://github.com/sendblue-api/sendblue-ts/commit/254b4aac516563dc515a27d120e0b770b47000b3))
* **mcp:** remote server with passthru auth ([6edbf68](https://github.com/sendblue-api/sendblue-ts/commit/6edbf68c31b676f03a4db3b5e32cd6a3f0196395))


### Bug Fixes

* **mcp:** avoid sending `jq_filter` to base API ([8d5cd86](https://github.com/sendblue-api/sendblue-ts/commit/8d5cd869bf343874d0efb70b5a85e2b8af5851c0))
* **mcp:** reverse validJson capability option and limit scope ([d16b4a4](https://github.com/sendblue-api/sendblue-ts/commit/d16b4a48b7f30edce26ef729fd3ca17a5e23e34e))


### Chores

* add docs to RequestOptions type ([cea001b](https://github.com/sendblue-api/sendblue-ts/commit/cea001bd8ffb2f19962d7f1444b5f92f3c51cd6f))
* configure new SDK language ([0c92a57](https://github.com/sendblue-api/sendblue-ts/commit/0c92a5720a524951a3bbcabaa33c94778bea6ff0))
* **internal:** codegen related update ([2472362](https://github.com/sendblue-api/sendblue-ts/commit/2472362bb98422843e895e8ab898f1405a63e513))
* **internal:** remove redundant imports config ([a76ad73](https://github.com/sendblue-api/sendblue-ts/commit/a76ad733b52598b12f471edbdb2e34266c31b484))
* make some internal functions async ([73dccd6](https://github.com/sendblue-api/sendblue-ts/commit/73dccd65b25a998a0d8a4c928029bd7ff23e80e9))
* **ts:** reorder package.json imports ([e5a51c0](https://github.com/sendblue-api/sendblue-ts/commit/e5a51c007c3e10e2d1ffe31c0e71ad05d9982134))
* update SDK settings ([ed9a0ab](https://github.com/sendblue-api/sendblue-ts/commit/ed9a0ab41d524cdd615514ed3a1af396f90e105d))
