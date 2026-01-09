import { defineConfig } from 'vite';
import { resolve } from 'path';
import { fileURLToPath } from 'url';
import basicSsl from '@vitejs/plugin-basic-ssl';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

export default defineConfig({
  root: '.',
  publicDir: 'public',
  plugins: [basicSsl()],

  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@ts': resolve(__dirname, 'src/ts/'),
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
    host: true,
  },
});
