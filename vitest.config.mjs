import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    include: ['src/__tests__/**/*.test.{ts,tsx}'],
    exclude: [
      'node_modules/',
      'dist/',
      'src/app/layout.tsx',
      'src/app/page.tsx',
      'cz-adapter.js',
      'next.config.mjs',
    ],
    coverage: {
      provider: 'istanbul',
      include: ['src/**/*.{ts,tsx}'],
      watermarks: {
        statements: [100, 100],
        functions: [100, 100],
        branches: [100, 100],
        lines: [100, 100],
      },
      exclude: [
        'node_modules/',
        'dist/',
        'src/__tests__/**',
        'cz-adapter.js',
        'next.config.mjs',
      ],
      reporter: ['text', 'json', 'html'],
      all: true,
    },
  },
})
