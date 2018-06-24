import { resolve } from 'path';
import babel from 'rollup-plugin-babel';
import buble from 'rollup-plugin-buble';
import { sizeSnapshot } from 'rollup-plugin-size-snapshot';
import pkg from './package.json';

const input = './src/index.js';

const babelOptions = {
  babelrc: false,
  plugins: ['@babel/plugin-transform-object-assign'],
};

const bubleOptions = {
  objectAssign: 'Object.assign',
};

export default [
  {
    input,
    output: { file: pkg.main, format: 'cjs', exports: 'named' },
    external: ['react', 'react-dom', 'prop-types'],
    plugins: [buble(bubleOptions), babel(babelOptions), sizeSnapshot()],
  },
  {
    input,
    output: {
      file: pkg.module,
      format: 'es',
    },
    external: [
      'react',
      'react-dom',
      'prop-types',
      resolve('./src/HeadTag.js'),
      resolve('./src/HeadCollector.js'),
    ],
    plugins: [buble(bubleOptions), babel(babelOptions)],
  },
  {
    input: './src/HeadCollector.js',
    output: {
      file: 'dist/HeadCollector.js',
      format: 'es',
    },
    external: ['react', 'prop-types'],
    plugins: [buble(bubleOptions)],
  },
  {
    input: './src/HeadTag.js',
    output: {
      file: 'dist/HeadTag.js',
      format: 'es',
    },
    external: ['react', 'react-dom', 'prop-types'],
    // TODO: OMG WTF IS THIS SHIT?! Make sure no object.assign is left!
    plugins: [buble(bubleOptions), babel(babelOptions), sizeSnapshot()],
  },
];
