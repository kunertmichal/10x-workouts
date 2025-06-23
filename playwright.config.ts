import { defineConfig, devices } from "@playwright/test";

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  // Test directory
  testDir: "./e2e",

  // Run tests in files in parallel
  fullyParallel: true,

  // Fail the build on CI if you accidentally left test.only in the source code
  forbidOnly: !!process.env.CI,

  // Retry on CI only
  retries: process.env.CI ? 2 : 0,

  // Opt out of parallel tests on CI
  workers: process.env.CI ? 1 : undefined,

  // Reporter configuration
  reporter: [
    ["html"],
    ["json", { outputFile: "test-results/results.json" }],
    ["junit", { outputFile: "test-results/results.xml" }],
  ],

  // Global test settings
  use: {
    // Base URL for tests
    baseURL: "http://localhost:8000",

    // Collect trace for failed tests
    trace: "on-first-retry",

    // Take screenshot on failure
    screenshot: "only-on-failure",

    // Record video on failure
    video: "retain-on-failure",

    // Browser context options
    ignoreHTTPSErrors: true,

    // Viewport size
    viewport: { width: 1280, height: 720 },
  },

  // Browser configuration - Chromium/Desktop Chrome only as per guidelines
  projects: [
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
        // Additional Chrome-specific options
        launchOptions: {
          args: [
            "--disable-web-security",
            "--disable-features=VizDisplayCompositor",
          ],
        },
      },
    },
  ],

  // Development server configuration
  webServer: {
    command: "npm run dev",
    url: "http://localhost:8000",
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000,
  },

  // Output directories
  outputDir: "test-results/",

  // Test timeout
  timeout: 30 * 1000,
  expect: {
    // Timeout for expect() calls
    timeout: 5 * 1000,
  },

  // Global setup and teardown
  globalSetup: require.resolve("./e2e/global-setup.ts"),
  globalTeardown: require.resolve("./e2e/global-teardown.ts"),
});
