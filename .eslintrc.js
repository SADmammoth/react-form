const path = require('path');

module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true,
    jest: true,
  },
  parser: 'babel-eslint',
  parserOptions: {
    allowImportExportEverywhere: true,
    ecmaFeatures: {
      globalReturn: false,
    },
  },
  extends: ['airbnb'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  rules: {
    'no-console': 'off',
    'react/prop-types': 0,
    'no-undef': 1,
    'implicit-arrow-linebreak': 0,
    'operator-linebreak': 0,
    'function-paren-newline': 0,
    'react/jsx-props-no-spreading': 0,
    'react/jsx-fragments': 0,
    'react/jsx-filename-extension': 0,
    'react/jsx-closing-bracket-location': 0,
    'import/no-unresolved': 0,
    'jsx-a11y/control-has-associated-label': 0,
    'react/forbid-prop-types': 0,
    'no-param-reassign': 0,
    'object-curly-newline': 0,

    'react/require-default-props': 0,
    'react/destructuring-assignment': 0,
    'no-shadow': 0,
    'react/jsx-curly-newline': 0,
    'import/no-unused-modules': [1, { unusedExports: true }],
    indent: 0,
  },

  plugins: ['babel'],
  settings: {
    'import/resolver': {
      alias: {
        map: [
          ['@/', path.resolve('src/')],
          ['@/Validator', path.resolve('src/Validator')],
          ['@/wrappers', path.resolve('src/components/wrappers')],
          ['@/generic', path.resolve('src/components/generic')],
          ['@/basic', path.resolve('src/components/basic')],
          ['@/helpers', path.resolve('src/helpers')],
          ['@/formHelpers', path.resolve('src/helpers/formHelpers')],
          ['@/formStateHelpers', path.resolve('src/helpers/formStateHelpers')],
          ['@/maskHelpers', path.resolve('src/helpers/maskHelpers')],
          ['@/hooks', path.resolve('src/helpers/hooks')],
          ['@/maskHelpers', path.resolve('src/helpers/maskHelpers')],
          ['@/styles', path.resolve('src/styles')],
        ],
        extensions: ['.js'],
      },
    },
    react: {
      version: 'detect',
    },
  },
};
