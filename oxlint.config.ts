import { defineConfig } from 'oxlint';

export default defineConfig({
  options: {
    reportUnusedDisableDirectives: 'warn',
    typeAware: true,
    typeCheck: false,
  },

  plugins: ['eslint', 'typescript', 'jsx-a11y', 'import'],

  rules: {
    // madge (lint:circular) doesn't support TypeScript 7; this is oxlint's
    // native equivalent, using its own Rust-based module resolution instead
    // of the TypeScript Compiler API.
    'import/no-cycle': 'error',

    curly: 'error',
    eqeqeq: ['error', 'always', { null: 'ignore' }],
    'no-constant-binary-expression': 'error',
    'no-sequences': 'error',
    'no-unsafe-optional-chaining': 'error',
    'no-unused-expressions': 'off',
    'no-useless-rename': 'off',
    'no-var': 'error',

    'typescript/ban-ts-comment': 'error',
    'typescript/explicit-function-return-type': 'off',
    'typescript/no-misused-promises': 'error',
    'typescript/no-namespace': 'error',
    'typescript/no-unnecessary-type-assertion': 'error',
    'typescript/no-unsafe-argument': 'error',
    'typescript/no-unsafe-assignment': 'error',
    'typescript/no-unsafe-call': 'error',
    'typescript/no-unsafe-member-access': 'error',
    'typescript/no-unused-vars': [
      'warn',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        caughtErrorsIgnorePattern: '^_',
      },
    ],
    'typescript/prefer-promise-reject-errors': 'error',
    'typescript/require-await': 'error',
    'typescript/restrict-plus-operands': 'error',
  },

  overrides: [
    {
      files: ['**/*.test.ts', '**/*.test.tsx', '**/*.stories.*'],
      rules: {
        'no-console': 'off',
        'typescript/no-non-null-assertion': 'off',
      },
    },
  ],
});
