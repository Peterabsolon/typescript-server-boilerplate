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
  ignorePatterns: ['generated/graphql.ts'],
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

    'import/prefer-default-export': 0,
    'import/extensions': 0,

    '@typescript-eslint/no-var-requires': 0, // handled by Prettier
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
}
