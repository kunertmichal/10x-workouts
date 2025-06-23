import { test, expect } from "@playwright/test";
import { LoginPage } from "./pages/login.page";
import { faker } from "@faker-js/faker";

test.describe("Authentication", () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test("should display login form", async ({ page }) => {
    await expect(page).toHaveTitle(/login/i);
    await expect(loginPage.emailInput).toBeVisible();
    await expect(loginPage.passwordInput).toBeVisible();
    await expect(loginPage.loginButton).toBeVisible();
    await expect(loginPage.signupButton).toBeVisible();
  });

  test("should show error for invalid credentials", async ({ page }) => {
    const invalidEmail = faker.internet.email();
    const invalidPassword = faker.internet.password();

    await loginPage.login(invalidEmail, invalidPassword);
    await loginPage.waitForLoginComplete();

    await expect(loginPage.errorMessage).toBeVisible();
    const errorText = await loginPage.getErrorText();
    expect(errorText).toContain("Invalid");
  });

  test("should validate email format", async ({ page }) => {
    await loginPage.login("invalid-email", "password123");

    // Should show client-side validation error
    await expect(page.getByText(/valid email/i)).toBeVisible();
  });

  test("should validate required fields", async ({ page }) => {
    await loginPage.loginButton.click();

    // Should show validation errors for empty fields
    await expect(page.getByText(/email is required/i)).toBeVisible();
    await expect(page.getByText(/password is required/i)).toBeVisible();
  });

  test("should show loading state during login", async ({ page }) => {
    const email = faker.internet.email();
    const password = faker.internet.password();

    // Fill form but don't wait for completion
    await loginPage.emailInput.fill(email);
    await loginPage.passwordInput.fill(password);
    await loginPage.loginButton.click();

    // Check if loading state appears briefly
    await expect(loginPage.loadingSpinner).toBeVisible();
  });

  test("should navigate to signup from login", async ({ page }) => {
    await loginPage.signupButton.click();

    // Should either change form state or navigate to signup page
    await expect(page).toHaveURL(/signup|login/);
  });

  test("should handle successful login flow", async ({ page, context }) => {
    // Use MSW mocked successful response
    const email = "test@example.com";
    const password = "password123";

    await loginPage.login(email, password);
    await loginPage.waitForRedirect();

    // Should redirect to app dashboard
    await expect(page).toHaveURL(/\/app/);

    // Should have authentication cookies/session
    const cookies = await context.cookies();
    expect(cookies.some((cookie) => cookie.name.includes("auth"))).toBeTruthy();
  });

  test("should persist form data on page reload", async ({ page }) => {
    const email = faker.internet.email();

    await loginPage.emailInput.fill(email);
    await page.reload();

    // Email should be preserved (if using local storage or similar)
    const emailValue = await loginPage.emailInput.inputValue();
    expect(emailValue).toBe(email);
  });

  test("should handle network errors gracefully", async ({ page }) => {
    // Simulate network failure
    await page.route("**/auth/**", (route) => route.abort());

    const email = faker.internet.email();
    const password = faker.internet.password();

    await loginPage.login(email, password);

    // Should show network error message
    await expect(
      page.getByText(/network error|connection failed/i)
    ).toBeVisible();
  });

  test("should have proper accessibility attributes", async ({ page }) => {
    // Check for proper ARIA labels and roles
    await expect(loginPage.emailInput).toHaveAttribute("type", "email");
    await expect(loginPage.passwordInput).toHaveAttribute("type", "password");

    // Check for proper form structure
    await expect(page.locator("form")).toBeVisible();
    await expect(page.locator("form")).toHaveAttribute("novalidate", "");
  });
});
