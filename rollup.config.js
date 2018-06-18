import babel from 'rollup-plugin-babel';
import buble from 'rollup-plugin-buble';
import { sizeSnapshot } from 'rollup-plugin-size-snapshot';
import pkg from './package.json';

const input = './src/index.js';

// treat as external everything from node_modules
const external = id => !id.startsWith('/') && !id.startsWith('.');

const getBabelOptions = ({ useESModules }) => ({
  babelrc: false,
  runtimeHelpers: true,
  plugins: [
    '@babel/plugin-transform-object-assign',
    ['@babel/transform-runtime', { polyfill: false, useESModules }],
  ],
});

export default [
  {
    input,
    output: { file: pkg.main, format: 'cjs', exports: 'named' },
    external,
    plugins: [
      buble({ objectAssign: 'Object.assign' }),
      babel(getBabelOptions({ useESModules: false })),
      sizeSnapshot(),
    ],
  },
  {
    input,
    output: {
      file: pkg.module,
      format: 'es',
    },
    external,
    plugins: [
      buble({ objectAssign: 'Object.assign' }),
      babel(getBabelOptions({ useESModules: true })),
      sizeSnapshot(),
    ],
  },
];
