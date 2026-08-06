import { defineConfig, devices } from '@playwright/test';

// Pull requests run a two-engine smoke to keep feedback fast; master pushes,
// scheduled runs and local runs exercise the full cross-browser matrix.
const smokeProjects = [
  { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
  { name: 'Mobile Chrome', use: { ...devices['Pixel 5'] } },
];
const extendedProjects = [
  { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
  { name: 'webkit', use: { ...devices['Desktop Safari'] } },
  { name: 'Mobile Safari', use: { ...devices['iPhone 12'] } },
];
const isPullRequest = process.env.GITHUB_EVENT_NAME === 'pull_request';

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 2 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
  },
  projects: isPullRequest
    ? smokeProjects
    : [...smokeProjects, ...extendedProjects],
  webServer: {
    command: process.env.CI ? 'npm run build && npm run start' : 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000,
    env: {
      ...process.env,
      CONSENT_SECRET: 'playwright-only-consent-secret-not-for-production',
      NEXT_PUBLIC_ANALYTICS_TEST_MODE: 'true',
    },
  },
});
