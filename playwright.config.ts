/// <reference types="node" />
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'https://parabank.parasoft.com',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'],
        storageState: 'playwright/.auth/user.json',
      },
      testIgnore: [
        '**/api/**/*.spec.ts',
        '**/login/**/*.spec.ts',
        '**/register/**/*.spec.ts',
      ],
      dependencies: ['setup'],
    },
    {
      name: 'no-auth',
      use: { ...devices['Desktop Chrome'] },
      testMatch: ['**/login/**/*.spec.ts', '**/register/**/*.spec.ts'],
    },
    {
      name: 'api', 
      testMatch: '**/api/**/*.spec.ts' },
    {
      name: 'setup',
      testMatch: '**/auth.setup.ts',
    },
  ],
});