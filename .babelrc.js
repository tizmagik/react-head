module.exports = {
  presets: [['@babel/env', { modules: false, loose: true }], '@babel/react'],
  plugins: [
    ['@babel/proposal-class-properties', { loose: true }],
    ['transform-react-remove-prop-types', { mode: 'unsafe-wrap' }],
    // used for stripping out the `invariant` messages in production builds
    'dev-expression',
  ],
  env: {
    test: {
      plugins: ['@babel/transform-modules-commonjs'],
    },
  },
};
