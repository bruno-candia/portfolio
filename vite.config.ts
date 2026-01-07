import { defineConfig } from 'vite';
import { resolve } from 'path';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

export default defineConfig({
  root: '.',
  publicDir: 'public',

  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@components': resolve(__dirname, 'src/ts/components'),
      '@services': resolve(__dirname, 'src/ts/services'),
      '@core': resolve(__dirname, 'src/ts/core'),
      '@config': resolve(__dirname, 'src/ts/config'),
      '@types': resolve(__dirname, 'src/types'),
      '@data': resolve(__dirname, 'src/data'),
      '@css': resolve(__dirname, 'src/css'),
    },
  },

  build: {
    outDir: 'dist',
    sourcemap: true,
    target: 'es2022',
  },

  server: {
    port: 3000,
    open: true,
  },
});