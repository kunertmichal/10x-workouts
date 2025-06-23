import { chromium, FullConfig } from "@playwright/test";

async function globalSetup(config: FullConfig) {
  console.log("🚀 Starting global E2E test setup...");

  // Launch browser for setup operations
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    // Wait for the development server to be ready
    const baseURL = config.projects[0].use.baseURL || "http://localhost:8000";
    console.log(`⏳ Waiting for development server at ${baseURL}...`);

    await page.goto(baseURL, { waitUntil: "networkidle" });
    console.log("✅ Development server is ready");

    // Perform any necessary authentication or data seeding here
    // For example, creating test users, seeding database, etc.

    // Save authentication state if needed
    // await context.storageState({ path: 'e2e/auth.json' })
  } catch (error) {
    console.error("❌ Global setup failed:", error);
    throw error;
  } finally {
    await context.close();
    await browser.close();
  }

  console.log("✅ Global E2E test setup completed");
}

export default globalSetup;
