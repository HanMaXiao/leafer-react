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
        '@leafer-ui/web': 'Leafer'
      }
    }
  ],
  external: ['react', 'react-dom', 'react-dom/client', 'react/jsx-runtime', 'react-reconciler', 'react-reconciler/constants', '@leafer-ui/core', '@leafer-ui/interface', '@leafer-ui/web', 'tslib'],
  plugins: [
    resolve(),
    typescript({
      declaration: true,
      rootDir: 'src',
      outDir: 'dist'
    })
  ]
};