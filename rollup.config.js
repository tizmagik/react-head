import babel from 'rollup-plugin-babel';
import buble from 'rollup-plugin-buble';
import { sizeSnapshot } from 'rollup-plugin-size-snapshot';
import pkg from './package.json';

const input = './src/index.js';

// treat as external everything from node_modules
// const external = id => !id.startsWith('/') && !id.startsWith('.');

const babelOptions = {
  babelrc: false,
  plugins: ['@babel/plugin-transform-object-assign'],
};

const bubleOptions = {
  objectAssign: 'Object.assign',
};

const external = ['react', 'react-dom', 'prop-types'];

export default [
  {
    input,
    output: { file: pkg.main, format: 'cjs', exports: 'named' },
    external,
    plugins: [buble(bubleOptions), babel(babelOptions), sizeSnapshot()],
  },
  {
    input,
    output: {
      file: pkg.module,
      format: 'es',
    },
    external,
    plugins: [buble(bubleOptions), babel(babelOptions), sizeSnapshot()],
  },
];
