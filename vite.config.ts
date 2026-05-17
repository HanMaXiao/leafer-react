import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  root: './playground',
  publicDir: false,
  server: {
    port: 3000,
    open: true,
  },
  resolve: {
    alias: {
      '@leafer-ui/core': '@leafer-ui/core',
      '@leafer-react': resolve(__dirname, './src'),
    },
    dedupe: ['react', 'react-dom', 'react-reconciler'],
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-reconciler', '@leafer-ui/core'],
  },
});

declare const __dirname: string;
