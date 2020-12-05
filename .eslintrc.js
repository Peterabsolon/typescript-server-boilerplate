module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'airbnb-base',
    'prettier',
    'prettier/@typescript-eslint',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'jest'],
  rules: {
    semi: 0,
    'no-console': 0,
    'arrow-body-style': 0,
    'max-classes-per-file': 0,
    'no-useless-constructor': 0,
    'no-unused-vars': 0, // handled by TS
    'no-shadow': 'off', // handled by TS eslint
    'no-empty-function': 'off', // handled by TS eslint

    'import/prefer-default-export': 0,
    'import/extensions': 0,

    '@typescript-eslint/no-shadow': ['error'],
    '@typescript-eslint/no-empty-function': ['error'],
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    '@typescript-eslint/no-var-requires': 0, // handled by Prettier
    '@typescript-eslint/no-inferrable-types': 0, // doesn't play well with type-graphql
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
}
