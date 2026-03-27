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
    },
    {
      file: 'dist/index.umd.js',
      format: 'umd',
      name: 'LeaferReact',
      globals: {
        'react': 'React',
        'react-dom': 'ReactDOM',
        'react-dom/client': 'ReactDOM',
        '@leafer-ui/core': 'Leafer',
        'html2canvas': 'html2canvas'
      }
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