module.exports = {
  presets: [['@babel/env', { loose: true }], '@babel/react'],
  plugins: [
    ['@babel/proposal-class-properties', { loose: true }],
    // used for stripping out the `invariant` messages in production builds
    'dev-expression',
  ],
};
