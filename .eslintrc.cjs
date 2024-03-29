module.exports = {
  extends: ['plugin:prettier/recommended'],
  plugins: ['simple-import-sort'],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  /** Default rules for Javascript, Typescript & Tests */
  rules: {
    // Use const/let
    'no-var': 'error',

    /**
     *  Force `===` but allow `== null`
     *  to prevent `x === undefined || x === null`
     */
    eqeqeq: ['error', 'always', { null: 'ignore' }],

    // https://eslint.org/blog/2022/07/interesting-bugs-caught-by-no-constant-binary-expression/
    'no-constant-binary-expression': 'error',

    // Default simple-import-sort rules
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',

    // Disallow comma operators
    'no-sequences': 'error',
  },

  overrides: [
    {
      /** Overrides for JSON */
      files: ['**/*.json'],
      extends: [],
      rules: {},
      parser: '@typescript-eslint/parser',
    },
    /** Lint/format mjs files */
    {
      files: ['**/*.mjs'],
      extends: ['plugin:@typescript-eslint/recommended', 'plugin:prettier/recommended'],
      parser: '@typescript-eslint/parser',
    },
    {
      parserOptions: {
        project: true,
      },
      /** Overrides for typescript */
      files: ['**/*.ts', '**/*.tsx'],
      extends: [
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-type-checked',
        'plugin:prettier/recommended',
      ],
      rules: {
        '@typescript-eslint/no-unused-vars': 'error',
        '@typescript-eslint/explicit-function-return-type': 'error',
      },
      parser: '@typescript-eslint/parser',
    },
    {
      /** Overrides for tsx (this will add to the above .tsx rules) */
      files: ['**/*.tsx'],
      extends: ['plugin:react/recommended', 'plugin:react-hooks/recommended'],
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
