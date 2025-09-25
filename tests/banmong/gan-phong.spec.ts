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
    await homePage.clickItemDropdown("Gán phòng");
    await searchBookingPage.clickSearchRoomAssign();
    // await searchBookingPage.waitForLoading();
    await searchBookingPage.waitForTimeout(4000);
    await searchBookingPage.clickCheckboxAssignAll();
    await searchBookingPage.clickBtn("Gán phòng");
    expect(await searchBookingPage.isCheckedCheckboxAssignAll()).toBeTruthy();

    await searchBookingPage.clickBtn("Gán tất cả phòng");
    await searchBookingPage.waitForLoading();
    await searchBookingPage.clickBtn("Cập nhật");
    await searchBookingPage.waitForLoading();

    await searchBookingPage.isVisibleToastMessage("Cập nhật thành công");
  });
});
