module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true,
    jest: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    allowImportExportEverywhere: true,
    ecmaFeatures: {
      globalReturn: false,
    },
  },
  extends: ['airbnb', 'plugin:@typescript-eslint/recommended', 'prettier'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  rules: {
    'no-console': 'off',
    'import/extensions': 0,
    'react/jsx-props-no-spreading': [2, { custom: 'ignore' }],
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/jsx-filename-extension': [2, { extensions: ['.jsx', '.tsx'] }],
    'import/no-unused-modules': [1, { unusedExports: true }],
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': ['error'],
    'react/jsx-fragments': 0,
  },

  plugins: ['react', '@typescript-eslint', 'prettier'],
  overrides: [
    {
      files: ['**/*.tsx'],
      rules: {
        'react/prop-types': 'off',
      },
    },
  ],
  settings: {
    'import/resolver': {
      alias: {
        map: [
          ['@/', 'src/*'],
          ['@/Validator', 'src/Validator/*'],
          ['@/wrappers', 'src/components/wrappers/*'],
          ['@/generic', 'src/components/generic/*'],
          ['@/basic', 'src/components/basic/*'],
          ['@/helpers', 'src/helpers/*'],
          ['@/genericHelpers', 'src/helpers/generic/*'],
          ['@/stateHelpers', 'src/helpers/states/*'],
          ['@/maskHelpers', 'src/helpers/maskHelpers/*'],
          ['@/outputHelpers', 'src/helpers/output/*'],
          ['@/hooks', 'src/helpers/hooks/*'],
          ['@/styles', 'src/styles/*'],
        ],
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
      },
    },
    react: {
      version: 'detect',
    },
  },
};
