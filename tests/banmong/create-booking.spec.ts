import { expect } from "@playwright/test";
import { test } from "@fixtures/auth.fixture";
import translations from "@data/languages.json";

import { hotelDay } from "@fixtures/test-data";
import userList from "@data/guests.json";

const language = translations.vi;

userList.forEach((guest, index) => {
  test(`${guest.LastName} ${guest.FirstName}`, async ({
    homePage,
    searchBookingPage,
    createBookingPage,
    dateTimeHelper,
  }) => {
    await homePage.clickItemNavbar(language.reservation);
    await homePage.clickItemDropdown(language.create_new_reservation);
    await searchBookingPage.clickTab(language.reservation);

    await createBookingPage.fillInputCreateBooking("name", guest.FirstName);

    // await createBookingPage.fillInputCreateBooking("phone", guest.Phone);

    await createBookingPage.fillInputCreateBooking("arrivalDate", hotelDay);

    await createBookingPage.fillInputCreateBooking("deptDate", hotelDay);
    await createBookingPage.fillInputCreateBooking("arrTime", "1000");

    await searchBookingPage.fillInput("deptTime", "2300");

    await createBookingPage.fillInputCreateBooking("adult", "1");

    await createBookingPage.fillInputCreateBooking("children", "0");

    await createBookingPage.clickInpCompanyTA();
    await createBookingPage.clickOneItemCompanyTA(guest.CompanyTA);

    await createBookingPage.clickBtnSearchRateCode();
    await searchBookingPage.checkStatePopup("rate query", "visible");
    await createBookingPage.clickBtn(language.ok);
    await searchBookingPage.checkStatePopup("rate query detail", "visible");
    await createBookingPage.clickTdTypeRateCode("DLX", guest.RateCode);
    await createBookingPage.clickBtn(language.confirm);

    await createBookingPage.waitForTimeout(index * 8000);

    await createBookingPage.clickBtn(language.save);

    await searchBookingPage.isVisibleToastMessage(
      language.toast_message.created_booking_successfully
    );

    //   // checkin
    //   await searchBookingPage.clickTab(language.guest);
    //   await createBookingPage.clickCheckoxAllGuest();
    //   await createBookingPage.clickBtn(language.checkin);
    //   // await createBookingPage.waitForLoading();

    //   expect(
    //     await searchBookingPage.isVisibleToastMessage(
    //       `Check-in khách : ${user.FirstName} ${user.LastName} Thành công`
    //     )
    //   ).toBeTruthy();

    //   //payment
    //   await createBookingPage.clickAddTransaction();
    //   // await createBookingPage.waitForLoading();
    //   await createBookingPage.clickCloseToastMessage();
    //   await createBookingPage.clickBtn(language.add_more);
    //   await homePage.clickItemDropdown(language.post_room_charge);
    //   await searchBookingPage.checkStatePopup("add room charge", "visible");
    //   await createBookingPage.clickBtn(language.ok);
    //   await searchBookingPage.checkStatePopup("trns mess", "visible");
    //   await createBookingPage.clickCloseTrnsMess();

    //   await createBookingPage.clickBtn(language.payment);
    //   await searchBookingPage.checkStatePopup(
    //     "payment deposit refund",
    //     "visible"
    //   );
    //   await createBookingPage.clickSetPaymentAll();
    //   await createBookingPage.clickBtn(language.payment, 2);

    //   expect(
    //     await searchBookingPage.isVisibleToastMessage(
    //       language.toast_message.post_payment_transaction_of_page_successfully
    //     )
    //   ).toBeTruthy();

    //   // checkout
    //   await createBookingPage.clickBtn(language.checkout);
    //   await searchBookingPage.checkStatePopup("checkout guest", "visible");
    //   await createBookingPage.clickBtn(language.checkout, 2);

    //   expect(
    //     await searchBookingPage.isVisibleToastMessage(
    //       `Khách ${user.LastName} ${user.FirstName} Đã Checkout!`
    //     )
    //   ).toBeTruthy();
  });
});
