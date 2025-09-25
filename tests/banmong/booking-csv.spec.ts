// import { expect } from "@playwright/test";
// import { test } from "@fixtures/auth.fixture";
// import translations from "@data/languages.json";
// import { readBookingCSV, BookingCSVData } from "@utils/csvHelpers";
// import { hotelDay } from "@fixtures/test-data";

// const language = translations.vi;

// // Đọc dữ liệu từ CSV
// const bookingData = readBookingCSV();

// // Chạy test cho từng booking trong CSV
// bookingData.forEach((booking: BookingCSVData, index: number) => {
//   test(`Booking CSV #${index + 1}: ${booking.firstName}`, async ({
//     homePage,
//     searchBookingPage,
//     createBookingPage,
//     dateTimeHelper,
//   }) => {
//     await homePage.clickItemNavbar(language.reservation);
//     await homePage.clickItemDropdown(language.create_new_reservation);
//     await homePage.clickBtnAddGuest();
//     await searchBookingPage.fillInput("firstName", booking.firstName);

//     let arrivalDate: string;
//     let deptDate: string;
//     arrivalDate = dateTimeHelper.adjustDate(hotelDay, -3);
//     deptDate = dateTimeHelper.adjustDate(hotelDay, -3);

//     await searchBookingPage.fillInput("arrivalDate", arrivalDate);
//     await searchBookingPage.fillInput("deptDate", deptDate);
//     await searchBookingPage.clickBtnSaveAddGuest();

//     // Kiểm tra toast message thành công
//     expect(
//       await searchBookingPage.isVisibleToastMessage(
//         language.toast_message
//           .added_this_guest_to_the_booking_and_saved_to_the_guest_profile_list
//       )
//     ).toBeTruthy();

//     await searchBookingPage.clickTab(language.reservation);
//     await createBookingPage.clickInpCompanyTA();
//     await createBookingPage.clickOneItemCompanyTA(booking.companyTA);

//     await createBookingPage.clickBtnSearchRateCode();
//     await searchBookingPage.checkStatePopup("rate query", "visible");
//     await createBookingPage.clickBtn(language.ok);
//     await searchBookingPage.checkStatePopup("rate query detail", "visible");
//     await createBookingPage.clickTdTypeRateCode(
//       booking.bookedRmType,
//       booking.rateCode
//     );
//     await createBookingPage.clickBtn(language.confirm);
//     await createBookingPage.clickBtnSearchRoomAssign();
//     await searchBookingPage.checkStatePopup("select room", "visible");
//     await createBookingPage.selectOneRoomAssign(index + 1);
//     await createBookingPage.clickBtn(language.select);
//     const arrTime = convertTime(booking.timeToCome);
//     const deptTime = convertTime(booking.timeToGo);

//     await searchBookingPage.fillInput("arrTime", arrTime);
//     await searchBookingPage.fillInput("deptTime", deptTime);

//     await createBookingPage.clickBtn(language.save);

//     expect(
//       await searchBookingPage.isVisibleToastMessage(
//         language.toast_message.created_booking_successfully
//       )
//     ).toBeTruthy();

//     // Bước 5: Check-in
//     await searchBookingPage.clickTab(language.guest);
//     await createBookingPage.clickCheckoxAllGuest();
//     await createBookingPage.clickBtn(language.checkin);

//     expect(
//       await searchBookingPage.isVisibleToastMessage(`Check-in khách`)
//     ).toBeTruthy();

//     // Bước 6: Payment
//     await createBookingPage.clickAddTransaction();
//     await createBookingPage.clickCloseToastMessage();
//     await createBookingPage.clickBtn(language.add_more);
//     await homePage.clickItemDropdown(language.post_room_charge);
//     await searchBookingPage.checkStatePopup("add room charge", "visible");
//     await createBookingPage.clickBtn(language.ok);
//     await searchBookingPage.checkStatePopup("trns mess", "visible");
//     await createBookingPage.clickCloseTrnsMess();

//     await createBookingPage.clickBtn(language.payment);
//     await searchBookingPage.checkStatePopup(
//       "payment deposit refund",
//       "visible"
//     );
//     await createBookingPage.clickSetPaymentAll();
//     await createBookingPage.clickBtn(language.payment, 2);

//     expect(
//       await searchBookingPage.isVisibleToastMessage(
//         language.toast_message.post_payment_transaction_of_page_successfully
//       )
//     ).toBeTruthy();

//     // Bước 7: Check-out
//     // await createBookingPage.clickBtn(language.checkout);
//     // await searchBookingPage.checkStatePopup("checkout guest", "visible");
//     // await createBookingPage.clickBtn(language.checkout, 2);

//     // expect(
//     //   await searchBookingPage.isVisibleToastMessage(
//     //     `Khách ${booking.firstName} Đã Checkout!`
//     //   )
//     // ).toBeTruthy();

//     console.log(`✅ Hoàn thành booking cho ${booking.firstName}`);
//   });
// });

// // Hàm helper chuyển đổi format ngày từ m/d/yyyy sang dd/mm/yyyy
// function convertDateFormat(dateStr: string): string {
//   if (!dateStr || dateStr.trim() === "") {
//     throw new Error("Ngày không hợp lệ");
//   }

//   const parts = dateStr.split("/");
//   if (parts.length !== 3) {
//     throw new Error("Format ngày không đúng");
//   }

//   const month = parts[0].padStart(2, "0");
//   const day = parts[1].padStart(2, "0");
//   const year = parts[2];

//   return `${day}/${month}/${year}`;
// }

// // Hàm helper chuyển đổi thời gian về format HHMM
// function convertTime(timeStr: string): string {
//   if (!timeStr || timeStr.trim() === "") {
//     return "0000"; // Default time
//   }

//   // Loại bỏ dấu : và chuyển về format HHMM
//   const cleanTime = timeStr.replace(":", "").padStart(4, "0");

//   // Đảm bảo là 4 ký tự
//   return cleanTime.substring(0, 4);
// }
