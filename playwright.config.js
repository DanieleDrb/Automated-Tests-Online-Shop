
const { defineConfig, devices } = require('@playwright/test');
const { OrtoniReportConfig } = require('ortoni-report');

const reportConfig = {
  projectName: "Automation Tests Playground",
  testType: "Study Material",
  authorName: "DanieleDrb",
  preferredTheme: "dark"
}

module.exports = defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 3 : undefined,
  reporter: [["ortoni-report", reportConfig], ["dot"]],

  use: {
    baseURL: "https://automationexercise.com",
    trace: 'on',
    screenshot: 'on'
  },
  
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    }
  ]
});

