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
yarn add -D @linzjs/style
# Or
npm install @linzjs/style
```

2. Create the base configuration files
```bash
# If on windows run `node node_modules\@linzjs\style\build\src\install.js`
# - tsconfig.json
# - .eslintrc.js
# - .prettierrc.js
npx linz-style-install
```


3. Apply the formatting/linting to all source code
```
npx eslint src/**/*.ts
```

