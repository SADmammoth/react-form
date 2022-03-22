const path = require('path');

module.exports = {
  type: 'react-component',
  npm: {
    cjs: false,
    esModules: false,
    umd: 'ReactForm',
  },
  webpack: {
    extra: {
      // externals: ['react'],
    },
    aliases: {
      '@/': path.resolve('src/'),
      '@/Validator': path.resolve('src/Validator'),
      '@/wrappers': path.resolve('src/components/wrappers'),
      '@/generic': path.resolve('src/components/generic'),
      '@/basic': path.resolve('src/components/basic'),
      '@/helpers': path.resolve('src/helpers'),
      '@/genericHelpers': path.resolve('src/helpers/generic'),
      '@/stateHelpers': path.resolve('src/helpers/states'),
      '@/maskHelpers': path.resolve('src/helpers/maskHelpers'),
      '@/outputHelpers': path.resolve('src/helpers/output'),
      '@/hooks': path.resolve('src/helpers/hooks'),
      '@/styles': path.resolve('src/styles'),
    },
    config: (config) => {
      config.resolve.extensions = ['.ts', '.tsx', '.js', '.jsx'];
      config.module.rules.push({
        test: /\.tsx?$/,
        loader: 'ts-loader',
      });
      return config;
    },
  },
  devServer: {
    host: '0.0.0.0',
    allowedHosts: ['.gitpod.io'],
  },
};
