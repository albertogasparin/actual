import { babel } from '@rollup/plugin-babel';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import peggy from 'rollup-plugin-peggy';

export default {
  input: 'src/index.js',
  output: {
    file: 'lib-dist/browser/kcab.worker.dev.js',
    // file: 'lib-dist/kcab.worker.dev.js',
    format: 'cjs',
    inlineDynamicImports: true,
    sourcemap: true,
  },
  plugins: [
    commonjs(),
    peggy(),
    nodeResolve({
      extensions: ['.web.js', '.js', '.json'],
    }),
    babel({
      // babelHelpers: 'bundled',
      // exclude: 'node_modules/**',
      presets: [['@babel/preset-env', { useBuiltIns: 'entry', corejs: 3 }]],
    }),
  ],
};
