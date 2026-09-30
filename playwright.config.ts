import { defineConfig } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

const getCdpUrl = (capabilities: Record<string, any>) => {
  return `wss://cdp.lambdatest.com/playwright?capabilities=${encodeURIComponent(
    JSON.stringify(capabilities)
  )}`;
};

export default defineConfig({
  testDir: './tests',
  timeout: 90000,
  fullyParallel: true,
  workers: 2, // parallel execution
  projects: [
    {
      name: 'Chromium - Windows 10',
      use: {
        connectOptions: {
          wsEndpoint: getCdpUrl({
            browserName: 'Chrome',
            browserVersion: 'latest',
            'LT:Options': {
              platform: 'Windows 10',
              build: 'Playwright 101 Certification',
              name: 'Scenario Tests - Win10 Chrome',
              user: process.env.LT_USERNAME,
              accessKey: process.env.LT_ACCESS_KEY,
              network: true,
              video: true,
              console: true,
              visual: true,
            },
          }),
        },
      },
    },
    {
      name: 'Firefox - macOS Sonoma',
      use: {
        connectOptions: {
          wsEndpoint: getCdpUrl({
            browserName: 'pw-firefox',
            browserVersion: 'latest',
            'LT:Options': {
              platform: 'macOS Sonoma',
              build: 'Playwright 101 Certification',
              name: 'Scenario Tests - macOS Sonoma Firefox',
              user: process.env.LT_USERNAME,
              accessKey: process.env.LT_ACCESS_KEY,
              network: true,
              video: true,
              console: true,
              visual: true,
            },
          }),
        },
      },
    },
  ],
});