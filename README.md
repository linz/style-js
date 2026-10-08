# @linzjs/style

[![Build Status](https://github.com/linz/style-js/workflows/Build/badge.svg)](https://github.com/linz/style-js/actions)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/linz/style-js/blob/master/LICENSE)

NPM configuration for base typescript projects

Includes:

- [oxlint](https://oxc.rs/docs/guide/usage/linter) — fast JavaScript/TypeScript linter
- [oxfmt](https://oxc.rs/docs/guide/usage/formatter) — fast JavaScript/TypeScript formatter
- TypeScript

And configuration for saneish defaults, which can be extended

Most of these are the raw defaults/recommended settings from typescript, eslint and prettier.

## IDE Usage

### Usage VS Code

Install the [oxc](https://marketplace.visualstudio.com/items?itemName=oxc.oxc-vscode) extension, then update `settings.json`:

```json
"editor.defaultFormatter": "oxc.oxc-vscode",
"editor.formatOnSave": true,
```

### Usage with IntelliJ

IntelliJ has an Oxc plugin supporting oxfmt and oxlint: https://plugins.jetbrains.com/plugin/27061-oxc

## Project Usage

1. Install `@linzjs/style`:

```bash
# this also installs dependencies: oxfmt oxlint oxlint-tsgolint
npm install --save-dev @linzjs/style
```

2. Install the config files:
   There are two ways to apply the config

**Either create the base configuration files**

```bash
# If on windows run `node ./node_modules/@linzjs/style/build/src/install.js`
# - oxfmt.config.ts
# - oxlint.config.ts
# - tsconfig.json
npx linz-style-install
```

**Or extend your existing `oxlint.config.ts` config**

Example extending the `oxlint.config.ts` file in your project

```typescript
import base from '@linzjs/style/oxlint.config-react';
import { defineConfig } from 'oxlint';

export default defineConfig({
  extends: [base],
  overrides: [
    {
      /** Overrides for typescript */
      files: ['**/*.ts', '**/*.tsx'],
      rules: {
        'react/super-crazy-hook-rule': 'error',
      },
    },
  ],
});
```

3. Update `package.json` scripts

Add/update lint-related commands in package.json:

```json
  scripts: {
    "lint": "npx concurrently \"npm run lint:oxlint\" \"npm run lint:fmt\" \"tsc\"",
    "lint:oxlint": "oxlint --deny-warnings",
    "lint:fmt": "oxfmt --check .",
    "lint:fix": "oxlint --fix",
    "format": "oxfmt --write ."
  }
```

4. Apply the formatting/linting to all source code

```
npm run lint .
```

## Migration from 3.x to 4.x

See [Migration Docs](./migration.4.md)

## Migration from 5.x to 6.x

See [Migration Docs](./migration.6.md)
