# @linzjs/style

[![Build Status](https://github.com/linz/style-js/workflows/Build/badge.svg)](https://github.com/linz/style-js/actions)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/linz/style-js/blob/master/LICENSE)

NPM configuration for base typescript projects

Includes:

- Prettier
- Eslint
- Typescript

And configuration for saneish defaults, which can be extended

Most of these are the raw defaults/recommended settings from typescript, eslint and prettier.

```typescript
export class FooBar {
  get foo(): number {
    return 1;
  }

  async bar(): Promise<string> {
    return 'bar';
  }

  /**
   * @param foo foo to bar
   */
  fooBar(foo = 'foo'): string {
    return `${foo}bar`;
  }
}
```

## IDE Usage

### Usage VS Code

1. Install `eslint` using the extensions menu
2. Add the following to your settings.json

```json
"editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
},
"eslint.validate": ["javascript"],
```

### Usage with IntelliJ

IntelliJ has ESLint support by default,

1. Open the settings in Languages & Frameworks > JavaScript > Code Quality Tools > ESLint
2. Check Automatic ESLint Configuration

## Project Usage

1. Install LINZ Style

```bash
npm install @linzjs/style
```

2. Applying eslint config
There are two ways to apply the config

**Either create the base configuration files**
```bash
# If on windows run `node ./node_modules/@linzjs/style/build/src/install.js`
# - tsconfig.json
# - .eslintrc.cjs
# - .prettierrc.cjs
npx linz-style-install
```

**Or extend your existing `eslintrc.js` config**   

For standard js or ts projects extend `.eslintrc.cjs`

Example extending the `.eslintrc.js` file in your project
```js
module.exports = {
  extends: ["./node_modules/@linzjs/style/.eslintrc.cjs"],

  overrides: [
    {
      /** Overrides for typescript */
      files: ["**/*.ts", "**/*.tsx"],      
      rules: {
        "@typescript-eslint/super-crazy-hook-rule": "error",
      },
    },
  ]
}
```

For React projects extend `.eslintrc-react.cjs`:

Example extending the `.eslintrc.js` file in your project for React
```js
module.exports = {
  extends: ["./node_modules/@linzjs/style/.eslintrc-react.cjs"]
}
```

4. Apply the formatting/linting to all source code

```
npx eslint .
```


## Migration from 3.x to 4.x

See [Migration Docs](./migration.4.md)
