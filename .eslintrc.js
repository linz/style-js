module.exports = {
  extends: ['plugin:prettier/recommended'],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  /** Default rules for Javascript, Typescript & Tests */
  rules: {
    'no-var': 'error',
    eqeqeq: ['error', 'always', { null: 'ignore' }],
  },

  overrides: [
    {
      /** Overrides for typescript */
      files: ['**/*.ts', '**/*.tsx'],
      extends: ['plugin:@typescript-eslint/recommended', 'plugin:prettier/recommended'],
      rules: {
        '@typescript-eslint/no-unused-vars': 'error',
        '@typescript-eslint/explicit-function-return-type': 'error',
      },
      parser: '@typescript-eslint/parser',
    },

    {
      /**
       * Overrides for typescript tests
       * All rules in the Typescript overrides are also applied
       * They can be overwriten here
       */
      files: ['**/*.test.ts', '**/*.test.tsx'],
      rules: {
        '@typescript-eslint/no-non-null-assertion': 'off',
      },
    },
  ],
};
