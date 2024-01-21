/* eslint-env node */
module.exports = {
  root: true,
  parser: 'vue-eslint-parser',
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'airbnb-base',
    'plugin:jsdoc/recommended',
  ],
  parserOptions: {
    parser: {
      ts: '@typescript-eslint/parser',
      js: '@typescript-eslint/parser',
    },
    ecmaVersion: 'latest',
  },
  settings: {
    'import/resolver': {
      typescript: {
        project: path.join(__dirname, './tsconfig.json'),
      },
      'eslint-import-resolver-custom-alias': {
        map: [
          ['@', path.join(__dirname, './src')],
        ],
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.json', '.vue'],
      },
    },
    'import/core-modules': ['vite', '@vitejs/plugin-vue'],
  },
  rules: {
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    'jsdoc/no-undefined-types': 'off',
    'class-methods-use-this': 'off',
    'no-undef': 'off',
  },
};
