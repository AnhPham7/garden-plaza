import { expect } from "@playwright/test";
import { test } from "@fixtures/auth.fixture";
import translations from "@data/languages.json";

import { hotelDay } from "@fixtures/test-data";
import guestList from "@data/guests.json";

const language = translations.vi;

guestList.forEach((guest, index) => {
  test(`user: ${guest.LastName} ${guest.FirstName}`, async ({
    homePage,
    searchBookingPage,
    createBookingPage,
    dateTimeHelper,
  }) => {
    // await new Promise((res) => setTimeout(res, index * 1500));

    await homePage.waitForTimeout(index * 1500);
    await homePage.clickUser();
    await homePage.clickFlagLanguage("vi");
    await homePage.clickItemNavbar(language.reservation);
    await homePage.clickItemDropdown(language.create_new_reservation);
    await homePage.clickBtnAddGuest();
    await searchBookingPage.fillInput("lastName", guest.LastName);
    await searchBookingPage.fillInput("firstName", guest.FirstName);
    await searchBookingPage.fillInput(
      "arrivalDate",
      dateTimeHelper.adjustDate(hotelDay, 0)
    );
    await searchBookingPage.fillInput(
      "deptDate",
      dateTimeHelper.adjustDate(hotelDay, 1)
    );
    // await searchBookingPage.fillInput("email", guest.Email);
    // await searchBookingPage.fillInput("phone", guest.MobileNum);
    // await searchBookingPage.fillInput("address1", guest.Address1);
    await searchBookingPage.waitForTimeout(2000);

    await searchBookingPage.clickBtnSaveAddGuest();

    expect(
      await searchBookingPage.isVisibleToastMessage(
        language.toast_message
          .added_this_guest_to_the_booking_and_saved_to_the_guest_profile_list
      )
    ).toBeTruthy();

    await searchBookingPage.clickTab(language.reservation);
    await createBookingPage.clickInpCompanyTA();
    await createBookingPage.clickOneItemCompanyTA(2);
    await createBookingPage.clickBtnSearchRateCode();
    await searchBookingPage.checkStatePopup("rate query", "visible");
    await searchBookingPage.waitForTimeout(2000);

    await createBookingPage.clickBtn(language.ok);
    await searchBookingPage.checkStatePopup("rate query detail", "visible");
    await createBookingPage.clickTdTypeRateCode();
    await searchBookingPage.waitForTimeout(2000);
    await createBookingPage.clickBtn(language.confirm);
    await searchBookingPage.waitForTimeout(3000);
    await createBookingPage.clickBtn(language.save);

    expect(
      await searchBookingPage.isVisibleToastMessage(
        language.toast_message.created_booking_successfully
      )
    ).toBeTruthy();
  });
});
