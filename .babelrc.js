module.exports = {
  presets: [
    ['@babel/env', { modules: false, loose: true }],
    ['@babel/stage-3', { loose: true }],
    '@babel/react',
  ],
  env: {
    test: {
      plugins: ['@babel/transform-modules-commonjs'],
    },
  },
};
