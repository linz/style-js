# Migrating from @linzjs/style 5.x to 6.x

Version 6 replaces ESLint + Prettier with [oxlint](https://oxc.rs/docs/guide/usage/linter) and [oxfmt](https://oxc.rs/docs/guide/usage/formatter).

## Migration

### 1. Remove ESLint and Prettier

> NOTE: oxlint/oxfmt use .eslintignore, .gitignore, and .prettierignore files

```bash
npm uninstall eslint prettier @typescript-eslint/eslint-plugin @typescript-eslint/parser \
  eslint-config-prettier eslint-plugin-prettier eslint-plugin-react \
  eslint-plugin-react-hooks eslint-plugin-simple-import-sort

# remove eslint, prettier, and stylelint config files, names are usually like:
# rm .eslintrc.cjs .eslintrc-react.cjs .prettierrc.cjs
```

### 2. Update @linzjs/style

```bash
npm install --save-dev @linzjs/style@^6.0.0
```

### 3. Migrate tsconfig.json

Update your `tsconfig.json` to extend `@linzjs/style/tsconfig.base.json` and keep only project-specific overrides:

```json
{
  "extends": "@linzjs/style/tsconfig.base.json",
  "compilerOptions": {
    "outDir": "build"
  },
  "include": ["src"]
}
```

Remove any compiler options already provided by `tsconfig.base.json` (strict mode, module resolution, target, lib, etc.). Retain only settings specific to your project such as `outDir`, `rootDir`, `paths`, or `include`/`exclude`.

### 5. Update CI / scripts

Update lint-related commands in package.json:

```json
  scripts: {
    "lint": "npx concurrently \"npm run lint:oxlint\" \"npm run lint:fmt\" \"tsc\"",
    "lint:oxlint": "oxlint --deny-warnings",
    "lint:fmt": "oxfmt --check .",
    "lint:fix": "oxlint --fix",
    "format": "oxfmt --write ."
  }
```

### 6. Check for unexpected changes

> It may be best to temporarily override linting rules during migration,
> and commit lint fixes separately so they are easier to ignore in git blame.

- stage changes _before_ running `npm run lint` and `npm run format`

  ```
  git add .
  npm run format
  ```

- compare previous overrides from eslint/prettier and ignored files are working properly
  - overrides in new configs `oxlint.config.ts` and `oxfmt.config.ts`
    - make sure `.editorconfig` does not conflict

  - `.gitignore` is used to ignore generated files and must be _inside working directory_
    https://oxc.rs/docs/guide/usage/linter/ignore-files.html#ignore-files

  - nested configurations can customize different areas in same repository
    https://oxc.rs/docs/guide/usage/linter/nested-config.html#nested-configuration-files

- git can revert unstaged changes if there is unexpected formatting, allowing rules to iteratively tested

  ```
  git checkout -- .
  ```

### 7. Update IDE settings

Install the [oxc](https://marketplace.visualstudio.com/items?itemName=oxc.oxc-vscode) VS Code extension.

**Before:**

```json
"editor.codeActionsOnSave": { "source.fixAll.eslint": true },
"eslint.validate": ["javascript"]
```

**After:**

```json
"editor.defaultFormatter": "oxc.oxfmt-vscode",
"editor.formatOnSave": true
```
