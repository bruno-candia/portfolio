import { defineConfig, UserConfig } from 'vitest/config'
import path from 'node:path'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()] as UserConfig['plugins'],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  test: {
    onConsoleLog(log) {
      if (
        log.includes('ReactDOM.render is no longer supported in React 18') ||
        log.includes(
          'unmountComponentAtNode is deprecated and will be removed',
        ) ||
        log.includes(
          'ReactDOMTestUtils.act is deprecated in favor of React.act',
        )
      ) {
        return false
      }
      return true
    },
    setupFiles: './vitest.setup.ts',
    include: ['**/*.{test,spec}.?(c|m)[jt]s?(x)'],
    environment: 'jsdom',
    exclude: [
      '**/node_modules/**',
      '**/styles/**',
      '**/dist/**',
      '**/cypress/**',
      '**/.{idea,git,cache,output,temp}/**',
      '**/{karma,rollup,webpack,vite,vitest,jest,ava,babel,nyc,cypress,tsup,build,eslint,prettier}.config.*',
      '**/assets/**',
      '**/i18n/**',
      '**/config/**',
    ],
    globals: true,
    coverage: {
      provider: 'istanbul',
      reportsDirectory: './coverage',
      reporter: ['cobertura', 'html', 'lcov', 'text-summary', 'text'],
      include: ['src/**/*'],
      exclude: [
        '**/mocks/**/*',
        '**/styles/**',
        '**/providers/**',
        '**/src/app/layout.tsx',
        '**/assets/**',
        '**/i18n/**',
        '**/config/**',
      ],
      all: true,
      thresholds: {
        statements: 100,
        branches: 100,
        functions: 100,
        lines: 100,
      },
    },
  },
})
