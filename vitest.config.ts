import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './vitest.setup.ts',
    alias: {
      '@': resolve(__dirname, './src'),
    },
    // A background agent checks out a worktree under .claude, which carries
    // its own copy of the suite. Without this the run scores the other
    // branch's code as if it were this one.
    exclude: ['**/node_modules/**', '**/dist/**', '**/e2e/**', '**/.claude/**'],
  },
});
