module.exports = {
  presets: [
    ['@babel/env', { modules: false, loose: true }],
    ['@babel/stage-3', { loose: true }],
    '@babel/react',
  ],
  plugins: [['transform-react-remove-prop-types', { mode: 'wrap' }]],
  env: {
    test: {
      plugins: ['@babel/transform-modules-commonjs'],
    },
  },
};
