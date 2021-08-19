const path = require('path');

module.exports = {
  type: 'react-component',
  npm: {
    cjs: true,
    esModules: true,
    umd: 'ReactForm',
  },
  webpack: {
    aliases: {
      '@/': path.resolve('src/'),
      '@/Validator': path.resolve('src/Validator'),
      '@/wrappers': path.resolve('src/components/wrappers'),
      '@/generic': path.resolve('src/components/generic'),
      '@/basic': path.resolve('src/components/basic'),
      '@/helpers': path.resolve('src/helpers'),
      '@/formHelpers': path.resolve('src/helpers/formHelpers'),
      '@/formStateHelpers': path.resolve('src/helpers/formStateHelpers'),
      '@/maskHelpers': path.resolve('src/helpers/maskHelpers'),
      '@/hooks': path.resolve('src/helpers/hooks'),
      '@/maskHelpers': path.resolve('src/helpers/maskHelpers'),
      '@/styles': path.resolve('src/styles'),
    },
  },
};
