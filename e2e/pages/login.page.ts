import { Page, Locator } from "@playwright/test";

export class LoginPage {
  readonly page: Page;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly signupButton: Locator;
  readonly errorMessage: Locator;
  readonly loadingSpinner: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailInput = page.getByLabel(/email/i);
    this.passwordInput = page.getByLabel(/password/i);
    this.loginButton = page.getByRole("button", { name: /sign in/i });
    this.signupButton = page.getByRole("button", { name: /sign up/i });
    this.errorMessage = page.getByTestId("error-message");
    this.loadingSpinner = page.getByTestId("loading-spinner");
  }

  async goto() {
    await this.page.goto("/login");
  }

  async login(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async signup(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.signupButton.click();
  }

  async waitForRedirect() {
    await this.page.waitForURL("/app/**");
  }

  async getErrorText() {
    return await this.errorMessage.textContent();
  }

  async isLoading() {
    return await this.loadingSpinner.isVisible();
  }

  async waitForLoginComplete() {
    // Wait for either success redirect or error message
    await Promise.race([
      this.page.waitForURL("/app/**"),
      this.errorMessage.waitFor({ state: "visible" }),
    ]);
  }
}
