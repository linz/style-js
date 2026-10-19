# Migrating from @linzjs/style 6.x to 7.x

Version 7 removes two tools from the recommended `lint` setup:

- **madge** is no longer a dependency. Circular imports are now reported by oxlint's `import/no-cycle` rule.
- **`npx concurrently`** is no longer used in the `lint` script. `npx` downloads `concurrently` at run time, outside the project's lockfile. Supply-chain controls such as safe-chain can block that download, which breaks CI. The lint steps now run one after another using only tools the project already installs.

## Migration

### 1. Update @linzjs/style

```bash
npm install --save-dev @linzjs/style@^7.0.0
```

### 2. Update package.json scripts

Remove the `lint:circular` script and replace `npx concurrently` in the `lint` script:

**Before:**

```json
  scripts: {
    "lint": "npx concurrently \"npm run lint:circular\" \"npm run lint:oxlint\" \"npm run lint:fmt\" \"tsc\"",
    "lint:circular": "madge --circular --extensions js,ts,tsx --ts-config tsconfig.json ./src",
    "lint:oxlint": "oxlint --deny-warnings",
    "lint:fmt": "oxfmt --check .",
    "lint:fix": "oxlint --fix",
    "format": "oxfmt --write ."
  }
```

**After:**

```json
  scripts: {
    "lint": "npm run lint:oxlint && npm run lint:fmt && tsc",
    "lint:oxlint": "oxlint --deny-warnings",
    "lint:fmt": "oxfmt --check .",
    "lint:fix": "oxlint --fix",
    "format": "oxfmt --write ."
  }
```

> NOTE: The steps now run one after another and stop at the first failure. Run `npm run lint:oxlint`,
> `npm run lint:fmt` or `tsc` on their own to see every result from one step.

Also search CI workflows, Dockerfiles, Makefiles and other scripts for `npx concurrently` or `lint:circular`, and replace them the same way:

```bash
git grep -nE "npx concurrently|lint:circular|madge"
```

### 3. Remove madge and concurrently

If `madge` or `concurrently` is listed directly in your own `package.json`, remove it, along with any `.madgerc` file:

```bash
npm uninstall madge concurrently
```

### 4. Fix circular imports

`import/no-cycle` is enabled as an error in `@linzjs/style/oxlint.config` and `@linzjs/style/oxlint.config-react`. Projects with existing circular imports will now fail `npm run lint:oxlint`:

```
import(no-cycle): Dependency cycle detected
```

Fix the cycles. If you can't fix them yet, turn the rule off in your project's `oxlint.config.ts` for now (`lint:oxlint` uses `--deny-warnings`, so `'warn'` would still fail):

```typescript
import base from '@linzjs/style/oxlint.config';
import { defineConfig } from 'oxlint';

export default defineConfig({
  extends: [base],
  rules: {
    'import/no-cycle': 'off', // TODO: fix circular imports and remove this override
  },
});
```

### 5. Verify

```bash
npm ci
npm run lint
```
