module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'prettier', 'react'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'prettier/@typescript-eslint',
    'plugin:prettier/recommended',
    'plugin:react/recommended',
  ],
  parserOptions: {
    project: './tsconfig.json',
    sourceType: 'module',
    ecmaVersion: 2019,
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    '@typescript-eslint/max-classes-per-file': [0],
    '@typescript-eslint/no-console': [0],
    '@typescript-eslint/no-floating-promises': [2],
    '@typescript-eslint/no-explicit-any': [0],
    '@typescript-eslint/object-literal-key-quotes': [0],
    '@typescript-eslint/object-literal-sort-keys': [0],
    '@typescript-eslint/ordered-imports': [0],
    'jsx-quotes': [2, 'prefer-single'],
    // 'sort-imports': [
    //   'error',
    //   {
    //     ignoreCase: false,
    //     ignoreDeclarationSort: false,
    //     ignoreMemberSort: false,
    //     memberSyntaxSortOrder: ['none', 'all', 'single', 'multiple'],
    //   },
    // ],
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
}
