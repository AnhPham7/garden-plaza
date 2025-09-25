import { Page } from "@playwright/test";
import { BasePage } from "./base-page";
export class LoginPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  // XPath locators
  private usernameInput = '//input[@placeholder="Tên đăng nhập"]';
  private passwordInput = '//input[@id="login-password-input"]';
  private loginButton = '//button[contains(text(), "Đăng nhập")]';

  async navigate(url: string): Promise<void> {
    await this.page.waitForURL(url, { timeout: 60_000 });
  }

  // Fill email
  async fillUsername(username: string): Promise<void> {
    await this.page
      .locator(`xpath=${this.usernameInput}`)
      .waitFor({ state: "visible" });
    await this.page.locator(`xpath=${this.usernameInput}`).fill(username);
  }

  // Fill password
  async fillPassword(password: string): Promise<void> {
    await this.page
      .locator(`xpath=${this.passwordInput}`)
      .waitFor({ state: "visible" });
    await this.page.locator(`xpath=${this.passwordInput}`).fill(password);
  }

  // Click login button
  async clickLoginBtn(): Promise<void> {
    await this.page
      .locator(`xpath=${this.loginButton}`)
      .waitFor({ state: "visible" });
    await this.page.locator(`xpath=${this.loginButton}`).click();
  }

  // Login
  async login(username: string, password: string): Promise<void> {
    await this.fillUsername(username);
    await this.fillPassword(password);
    await this.clickLoginBtn();
  }
}
