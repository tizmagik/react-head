module.exports = {
  parser: 'babel-eslint',
  plugins: ['prettier'],
  extends: ['airbnb', 'prettier', 'prettier/react'],
  env: {
    browser: true,
    jest: true,
  },
  rules: {
    'global-require': 0,
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'react/forbid-prop-types': 0,
    'react/prop-types': 0,
    'react/no-did-mount-set-state': 0,
    'react/sort-comp': 0,
    'react/no-unused-state': 0,
    'react/require-default-props': 0,
  },
};
