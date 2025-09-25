import { defineConfig, devices } from "@playwright/test";
import path from "path";
import fs from "fs";

/*
 * configuration for html report
 */

// function generateReportPath(testName: string): string {
//   const today = new Date().toISOString().split("T")[0];
//   const reportDir = path.join(__dirname, "reports", today);
//   const timestamp = new Date()
//     .toISOString()
//     .replace(/[-:T.]/g, "")
//     .slice(0, 14);
//   console.log("[DEBUG] call generateReportPath");

// Kiểm tra và tạo thư mục nếu chưa tồn tại
//   if (!fs.existsSync(reportDir)) {
//     fs.mkdirSync(reportDir, { recursive: true });
//     console.log(`[DEBUG] Directory created: ${reportDir}`);
//   } else {
//     console.log(`[DEBUG] Directory already exists: ${reportDir}`);
//   }

//   const reportPath = path.join(reportDir, `${testName}-${timestamp}.html`);
//   console.log(`[DEBUG] Report path generated: ${reportPath}`);
//   return reportPath;
// }

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

export default defineConfig({
  maxFailures: 1,
  // globalSetup: require.resolve("./pages/ui/globalSetup.ts"),
  testDir: "./tests",
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  // reporter: [
  //   [
  //     "html",
  //     {
  //       outputFile: (testInfo: any) => {
  //         console.log(`Processing test file: ${testInfo.file}`);
  //         return generateReportPath(
  //           testInfo.file.replace(/.*\//, "").replace(/\.spec\.(ts|js)$/, ""),
  //         );
  //       },
  //       open: "never",
  //     },
  //   ],
  // ],
  reporter: [
    ["list"],
    ["junit", { outputFile: "results.xml" }],
    ["json", { outputFile: "results.json" }],
    ["html", { outputFolder: "test-report" }],
  ],
  timeout: 300_000,
  use: {
    baseURL: "http://127.0.0.1:3000",
    trace: "on-first-retry",
    screenshot: {
      mode: "only-on-failure",
      fullPage: true,
    },
    navigationTimeout: 60_000,
    actionTimeout: 60_000,
    launchOptions: {
      args: [
        "--disable-popup-blocking",
        "--disable-notifications",
        "--disable-extensions",
        "--no-default-browser-check",
        "--no-first-run",
      ],
    },
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: "chrome web",
      use: {
        browserName: "chromium",
        launchOptions: {
          args: ["--ignore-certificate-errors"],
        },
        storageState: "fixtures/storageState.json",
        contextOptions: {
          bypassCSP: true,
          ignoreHTTPSErrors: true,
          javaScriptEnabled: true,
          hasTouch: false,
          isMobile: false,
          locale: "vi-VN",
          timezoneId: "Asia/Ho_Chi_Minh",
          viewport: { width: 1280, height: 720 },
        },
      },
      dependencies: ["setup"],
    },
    {
      name: "setup",
      testMatch: "**/*.setup.ts",
    },

    // {
    //   name: "firefox",
    //   use: { ...devices["Desktop Firefox"] },
    // },

    // {
    //   name: "webkit",
    //   use: { ...devices["Desktop Safari"] },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
