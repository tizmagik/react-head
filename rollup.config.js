import babel from 'rollup-plugin-babel';
import { sizeSnapshot } from 'rollup-plugin-size-snapshot';
import pkg from './package.json';

const input = './src/index.js';

// treat as external everything from node_modules (skip also special rollup prefix)
const external = id => !id.startsWith('\0') && !id.startsWith('/') && !id.startsWith('.');

export default [
  {
    input,
    output: { file: pkg.main, format: 'cjs', exports: 'named' },
    external,
    plugins: [babel({ plugins: ['external-helpers'] }), sizeSnapshot()],
  },

  {
    input,
    output: { file: pkg.module, format: 'es', exports: 'named' },
    external,
    plugins: [babel({ plugins: ['external-helpers'] }), sizeSnapshot()],
  },
];
