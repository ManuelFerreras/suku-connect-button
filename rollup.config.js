import typescript from 'rollup-plugin-typescript2';
import { terser } from "rollup-plugin-terser";

export default {
  input: 'src/index.ts', // our source file
  output: [
    {
      file: 'dist/index.js',
      format: 'cjs'
    },
    {
      file: 'dist/index.es.js',
      format: 'es' // the preferred format
    }
  ],
  plugins: [
    typescript({
      typescript: require('typescript'),
    }),
    terser() // minifies generated bundles
  ]
};