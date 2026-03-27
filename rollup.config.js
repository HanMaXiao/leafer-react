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
  external: ['react', 'react-dom', 'react-dom/client', 'react/jsx-runtime', '@leafer-ui/core', '@leafer-ui/interface', 'html2canvas', 'tslib'],
  plugins: [
    resolve(),
    typescript({
      declaration: true,
      rootDir: 'src',
      outDir: 'dist'
    })
  ]
};