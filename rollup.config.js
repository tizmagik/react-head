import nodeResolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import { sizeSnapshot } from 'rollup-plugin-size-snapshot';
import pkg from './package.json';

const input = './src/index.js';

// treat as external everything from node_modules
const external = id => !id.startsWith('/') && !id.startsWith('.');

const getBabelOptions = ({ useESModules }) => ({
  runtimeHelpers: true,
  plugins: [['@babel/transform-runtime', { useBuiltIns: true, useESModules }]],
});

const globals = {
  react: 'React',
  'react-dom': 'ReactDOM',
  'prop-types': 'PropTypes',
};

export default [
  {
    input,
    output: {
      file: 'dist/index.umd.js',
      format: 'umd',
      exports: 'named',
      name: 'ReactHead',
      globals,
    },
    external: Object.keys(globals),
    plugins: [
      nodeResolve(),
      babel(getBabelOptions({ useESModules: true })),
      sizeSnapshot(),
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
    output: { file: pkg.module, format: 'es' },
    external,
    plugins: [babel(getBabelOptions({ useESModules: true })), sizeSnapshot()],
  },
];
