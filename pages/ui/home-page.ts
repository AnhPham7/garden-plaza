import { Page } from "@playwright/test";
import { BasePage } from "./base-page";
import translations from "@data/languages.json";

export class HomePage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  // Xpath locators
  private configuration = '//a//span[text()="Cấu hình"]';
  private connectionConfiguration =
    '//li//a[contains(text(), "Cấu hình kết nối")]';
  private inputPassValue = '//input[@id="passValue"]';
  private btnContinue = '//button[contains(text(), "Tiếp tục")]';
  private invoiceSystem = '//li//span[text()="Hệ thống hóa đơn"]';
  private navbar = '//div[@id="main-menu-nav-collapse"]';

  // Function
  async waitForTimeout(timeout: number): Promise<void> {
    await this.page.waitForTimeout(timeout);
  }

  async clickItemNavbar(string: string): Promise<void> {
    const el = this.page.locator(`xpath=//a[.//span[text()="${string}"]]`);
    await el.waitFor({ state: "visible", timeout: 30_000 });
    await el.click();
  }

  async clickItemDropdown(string: string): Promise<void> {
    await this.page
      .locator(`xpath=//li//a[normalize-space(.) = "${string}"]`)
      .click();
  }

  async clickCheckboxBookStatus(string: string): Promise<void> {
    await this.page
      .locator(`xpath=//label[contains(text(), "${string}")]`)
      .click();
  }

  async handleFillPass(value: string): Promise<void> {
    await this.page.locator(`xpath=${this.inputPassValue}`).fill(value);
    await this.page.locator(`xpath=${this.btnContinue}`).click();
  }

  async clickInvoiceSystem(): Promise<void> {
    await this.page.locator(`xpath=${this.invoiceSystem}`).waitFor({
      state: "visible",
    });
    await this.page.locator(`xpath=${this.invoiceSystem}`).click();
  }
}
