async function globalTeardown() {
  console.log("🧹 Starting global E2E test teardown...");

  try {
    // Cleanup operations after all tests
    // For example: cleanup test data, reset database state, etc.

    // Clean up any temporary files
    // await fs.rmdir('temp-test-data', { recursive: true })

    // Reset any global state
    // await resetTestDatabase()

    console.log("✅ Global E2E test teardown completed");
  } catch (error) {
    console.error("❌ Global teardown failed:", error);
    // Don't throw - teardown failures shouldn't fail the test run
  }
}

export default globalTeardown;
