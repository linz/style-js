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


## Usage

```bash
yarn add @linzjs/style
# npm install @linzjs/style

# Create all the base configuration files
# If on windows run `node node_modules\@linzjs\style\build\src\install.js`
# - tsconfig.json
# - .eslintrc.js
# - .prettierrc.js
npx linz-style-install

# Adjust the configuration as needed
# ...


# Apply the formatting/linting to all source code
npx eslint src/**/*.ts
```

