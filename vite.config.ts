import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  root: '.',
  publicDir: false,
  server: {
    port: 3000,
    open: true,
  },
  resolve: {
    alias: {
      '@leafer-ui/core': '@leafer-ui/core',
      '@leafer-react': path.resolve(__dirname, './src'),
    },
  },
  optimizeDeps: {
    include: ['react', 'react-dom', '@leafer-ui/core'],
  },
});
