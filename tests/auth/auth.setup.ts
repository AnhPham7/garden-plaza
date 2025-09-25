import { test as setup } from "@playwright/test";

import { LoginPage } from "@pages/ui/login-page";
import { loginData, urlWeb } from "@fixtures/test-data";

setup("Đăng nhập và lưu trạng thái", async ({ page }) => {
  const storageState = "fixtures/storageState.json";

  await page.goto(urlWeb.url, { timeout: 60000 });
  await page.waitForTimeout(7000);

  const loginPage = new LoginPage(page);
  await loginPage.login(loginData.username, loginData.password);

  await loginPage.isVisibleToastMessage("Đăng nhập thành công");

  await page.context().storageState({ path: storageState });
});
