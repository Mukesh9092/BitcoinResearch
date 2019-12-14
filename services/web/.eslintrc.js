module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'prettier', 'react', 'simple-import-sort'],
  extends: [
    'eslint:recommended',
    'plugin:import:errors',
    'plugin:import:warnings',
    'plugin:import:typescript',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier/@typescript-eslint',
    'plugin:prettier/recommended',
  ],
  parserOptions: {
    project: './src/tsconfig.json',
    sourceType: 'module',
    ecmaVersion: 2019,
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    '@typescript-eslint/ban-ts-ignore': [0],
    '@typescript-eslint/camelcase': [0],
    '@typescript-eslint/explicit-function-return-type': [0],
    '@typescript-eslint/max-classes-per-file': [0],
    '@typescript-eslint/no-console': [0],
    '@typescript-eslint/no-explicit-any': [0],
    '@typescript-eslint/no-floating-promises': [2],
    '@typescript-eslint/no-unused-vars': [1],
    '@typescript-eslint/no-var-requires': [0],
    '@typescript-eslint/object-literal-key-quotes': [0],
    '@typescript-eslint/object-literal-sort-keys': [0],
    '@typescript-eslint/ordered-imports': [0],
    'jsx-quotes': [2, 'prefer-single'],
    'react/prop-types': [0],

    'sort-imports': [0],
    'import/order': [0],
    'simple-import-sort/sort': [2],
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
}
