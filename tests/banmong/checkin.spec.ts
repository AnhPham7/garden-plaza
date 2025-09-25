import { expect } from "@playwright/test";
import { test } from "@fixtures/auth.fixture";
import translations from "@data/languages.json";

import { hotelDay } from "@fixtures/test-data";
import userList from "@data/guests.json";

const language = translations.vi;

test.describe("gan phong", () => {
  test("gan phong", async ({
    searchBookingPage,
    createBookingPage,
    homePage,
  }) => {
    await homePage.clickItemNavbar("Lễ tân");
    await homePage.clickItemDropdown("Khách đến");
    await searchBookingPage.waitForLoading();
    await searchBookingPage.waitForTimeout(4000);

    let totalRows = await searchBookingPage.getTotalRowGuest();

    while (totalRows > 0) {
      console.log(`🔄 Processing row, current total: ${totalRows}`);
      await searchBookingPage.clickRightMouseRowCheckin(); // Luôn click row đầu tiên
      await searchBookingPage.clickItemDropdown(language.checkin);
      await searchBookingPage.isVisibleToastMessageLast("Check-in thành công");
      totalRows = await searchBookingPage.getTotalRowGuest();
    }
  });
});
