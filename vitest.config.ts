import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true
  },
  resolve: {
    alias: {
      '@leafer-ui/core': '@leafer-ui/core'
    }
  }
});
