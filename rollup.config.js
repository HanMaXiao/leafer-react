import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';

export default {
  input: 'src/index.ts',
  output: [
    {
      file: 'dist/index.esm.js',
      format: 'es'
    },
    {
      file: 'dist/index.cjs',
      format: 'cjs'
    }
  ],
  external: ['react', '@leafer-ui/core', '@leafer-ui/interface', 'html2canvas'],
  plugins: [
    resolve(),
    typescript({
      declaration: true,
      declarationDir: 'types',
      rootDir: 'src'
    })
  ]
};