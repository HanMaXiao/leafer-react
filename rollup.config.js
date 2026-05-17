import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';

const external = ['react', 'react-dom', 'react-dom/client', 'react/jsx-runtime', 'react-reconciler', 'react-reconciler/constants', '@leafer-ui/core', '@leafer-ui/interface', '@leafer-ui/web', 'tslib'];

const plugins = [
  resolve(),
  typescript({
    declaration: true,
    rootDir: 'src',
    outDir: 'dist'
  })
];

export default [
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/index.esm.js',
      format: 'es',
      inlineDynamicImports: true
    },
    external,
    plugins
  },
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/index.cjs',
      format: 'cjs',
      inlineDynamicImports: true
    },
    external,
    plugins
  }
];
