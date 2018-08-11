module.exports = {
  presets: [['@babel/env', { modules: false, loose: true }], '@babel/react'],
  plugins: [
    ['@babel/proposal-class-properties', { loose: true }],
    ['transform-react-remove-prop-types', { mode: 'unsafe-wrap' }],
  ],
  env: {
    test: {
      plugins: ['@babel/transform-modules-commonjs'],
    },
  },
};
