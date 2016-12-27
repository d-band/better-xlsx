import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';

export default {
  entry: 'src/index.js',
  dest: 'dist/xlsx.js',
  format: 'umd',
  moduleName: 'xlsx',
  globals: {
    jszip: 'JSZip'
  },
  plugins: [
    nodeResolve({
      jsnext: true,
      main: true,
      skip: ['jszip']
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
