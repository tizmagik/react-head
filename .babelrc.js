module.exports = {
  presets: [
    ['@babel/env', { modules: false, loose: true }],
    ['@babel/stage-3', { loose: true }],
    '@babel/react',
  ],
  plugins: [['transform-react-remove-prop-types', { mode: 'unsafe-wrap' }]],
  env: {
    test: {
      plugins: ['@babel/transform-modules-commonjs'],
    },
  },
};
