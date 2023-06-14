module.exports = {
  extends: ['./.eslintrc.cjs'],

  overrides: [
    {
      /** Overrides for typescript */
      files: ['**/*.ts', '**/*.tsx'],
      extends: [
        'plugin:react/recommended',
        'plugin:react-hooks/recommended',
      ],
      rules: {
        '@typescript-eslint/no-unused-vars': 'error',
        '@typescript-eslint/explicit-function-return-type': 'error',
      },
    },
  ],
};
