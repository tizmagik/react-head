import path from 'path';
import nodeResolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import babel from 'rollup-plugin-babel';
import { terser } from 'rollup-plugin-terser';
import { sizeSnapshot } from 'rollup-plugin-size-snapshot';
import pkg from './package.json';

const input = './src/index.js';

const name = 'ReactHead';

// treat as external everything from node_modules
const external = id => !path.isAbsolute(id) && !id.startsWith('.');

const getBabelOptions = ({ useESModules }) => ({
  runtimeHelpers: true,
  plugins: [['@babel/transform-runtime', { useESModules }]],
});

const globals = {
  react: 'React',
  'react-dom': 'ReactDOM',
};

export default [
  {
    input,
    output: { file: 'dist/index.umd.js', format: 'umd', name, globals },
    external: Object.keys(globals),
    plugins: [
      nodeResolve(),
      babel(getBabelOptions({ useESModules: true })),
      replace({ 'process.env.NODE_ENV': JSON.stringify('development') }),
      sizeSnapshot(),
    ],
  },

  {
    input,
    output: { file: 'dist/index.min.js', format: 'umd', name, globals },
    external: Object.keys(globals),
    plugins: [
      nodeResolve(),
      babel(getBabelOptions({ useESModules: true })),
      replace({ 'process.env.NODE_ENV': JSON.stringify('production') }),
      sizeSnapshot(),
      terser(),
    ],
  },

  {
    input,
    output: { file: pkg.main, format: 'cjs', exports: 'named' },
    external,
    plugins: [babel(getBabelOptions({ useESModules: false })), sizeSnapshot()],
  },

  {
    input,
    output: { file: pkg.module, format: 'esm' },
    external,
    plugins: [babel(getBabelOptions({ useESModules: true })), sizeSnapshot()],
  },
];
