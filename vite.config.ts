import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    port: 3000,
    open: true
  },
  resolve: {
    alias: {
      '@leafer-ui/core': '@leafer-ui/core'
    }
  }
});
