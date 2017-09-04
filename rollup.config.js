import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';

export default {
  output: {
    file: 'dist/xlsx.js',
    format: 'umd',
    name: 'xlsx',
    globals: {
      jszip: 'JSZip'
    }
  },
  input: 'src/index.js',
  external: ['jszip'],
  plugins: [
    nodeResolve({
      jsnext: true,
      main: true
    }),
    commonjs(),
    babel({
      babelrc: false,
      presets: [
        ['es2015', {
          modules: false
        }],
        'stage-0'
      ],
      plugins: [
        'transform-decorators-legacy',
        'external-helpers',
        'transform-runtime'
      ],
      runtimeHelpers: true,
      externalHelpers: true,
      exclude: 'node_modules/**'
    })
  ]
};
