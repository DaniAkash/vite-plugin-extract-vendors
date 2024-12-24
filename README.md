# vite-plugin-extract-vendors
Extract all the 3rd party libraries from `node_modules/` into `vendors/` directory of the build output directory.

This provides the following benefits to your application:

1. Improved Browser Caching

	•	**Why it’s important**: Vendor libraries (like React, Vue, or Lodash) change less frequently than application code.


	•	**Benefit**: By separating vendors into a distinct file, users can leverage long-term caching. This allows browsers to cache these files for extended periods, reducing the need to re-download them unless the content changes.

2. Smaller Incremental Updates

	•	**Why it’s important**: Deploying only what has changed minimizes bandwidth usage.

	•	**Benefit**: Updates to the app will only require users to download the small, application-specific chunk, leaving the vendor chunk untouched if unchanged.

> This plugin is built to take full advantage of browser caching mechanism and HTTP2 － read about it on [the hey blog](https://world.hey.com/dhh/modern-web-apps-without-javascript-bundling-or-transpiling-a20f2755) post.

## Install
```sh
npm i -D vite-plugin-extract-vendors
# or
bun i -D vite-plugin-extract-vendors
# or
yarn add -D vite-plugin-extract-vendors
# or
pnpm add -D vite-plugin-extract-vendors
```

## Usage

```ts
import { defineConfig } from 'vite'
import { extractVendors } from 'vite-plugin-extract-vendors'

export default defineConfig({
  plugins: [
    // ...
    extractVendors(),
  ],
});
```

## Options

Currently this plugin supports no options

## How it works

For a standard Vite project with following `node_modules` directory

```
-> % tree node_modules -L 1
node_modules
├── @esbuild
├── @rollup
├── @types
├── dayjs
├── esbuild
├── fsevents
├── lodash
├── nanoid
├── picocolors
├── postcss
├── rollup
├── source-map-js
├── typescript
└── vite
```

The build output will move all the required javascript from inside `node_modules` to `<build_output>/assets/vendor/*`

```
-> % tree dist -L 3
dist
├── assets
│   ├── index-DeW0Mihf.js
│   ├── index-dv8c_Ups.css
│   └── vendor
│       ├── dayjs
│       └── lodash
├── index.html
└── vite.svg
```

Since only `dayjs` and `lodash` are referred in the application source code, they have been moved into the vendor directory. Also the vendor filenames are hashed to ensure they can be cache busted if the specific library is updated.

```
-> % tree dist/assets/vendor -L 2
dist/assets/vendor
├── dayjs
│   ├── dayjs.min.js-7k9w9mz7.js
│   ├── dayjs.min.js_commonjs-es-import-TtisqAT9.js
│   └── dayjs.min.js_commonjs-module-CcuaHt6D.js
└── lodash
    ├── lodash.js-BLimN7ew.js
    ├── lodash.js_commonjs-es-import-AWz_NZqP.js
    └── lodash.js_commonjs-module-BwOMhnNI.js
```