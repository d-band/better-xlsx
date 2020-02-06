import babel from 'rollup-plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import nodeResolve from '@rollup/plugin-node-resolve';

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
    nodeResolve(),
    commonjs({
      include: 'node_modules/**'
    }),
    babel({
      babelrc: false,
      presets: [
        ['@babel/preset-env', { modules: false }]
      ],
      plugins: [
        ['class-properties', {
          superClasses: ['Node'],
          props: [{
            key: 'name',
            static: true
          }]
        }],
        ['@babel/plugin-proposal-decorators', { decoratorsBeforeExport: false }],
        '@babel/plugin-proposal-class-properties',
        '@babel/plugin-external-helpers',
        '@babel/plugin-transform-runtime'
      ],
      runtimeHelpers: true,
      externalHelpers: true,
      exclude: 'node_modules/**'
    })
  ]
};
