import fs from "fs";
import path from "path";
import { parse } from "csv-parse/sync";
import { expect } from "@playwright/test";

import { test } from "@fixtures/auth.fixture";
import translations from "@data/languages.json";
import { getRoomTypeCode } from "@utils/commonHelpers";
import { BookingRecord } from "@utils/types";

const language = translations.vi;
const records: BookingRecord[] = parse(
  fs.readFileSync(
    path.join(__dirname, "../../data/csv/khachle_gardenplaza.csv"),
    "utf8"
  ),
  {
    columns: true,
    skip_empty_lines: true,
  }
);

for (const guest of records) {
  test(`Cập nhật data cho booking ${guest.STT}: ${guest.FullName}`, async ({
    homePage,
    createBookingPage,
  }) => {
    // const roomTypeCode = getRoomTypeCode(guest.BookedRmType);

    await homePage.clickItemNavbar(language.reservation);
    await homePage.clickItemDropdown(language.create_new_reservation);

    // await createBookingPage.clickBtnCloseLicense();

    await createBookingPage.clickTab(language.reservation);
    await createBookingPage.waitForTimeout(1000);

    //fill mã xác nhận (nếu có)
    await createBookingPage.handleFillConfirmCode(guest.ConfirmCode);

    // fill các trường
    await createBookingPage.fillInputCreateBooking(
      language.createBooking.fullName,
      guest.FullName
    );
    await createBookingPage.fillInputCreateBooking(
      language.createBooking.deptDate,
      guest.DeptDate
    );
    await createBookingPage.fillInputCreateBooking(
      language.createBooking.arrivalDate,
      guest.ArrivalDate
    );

    await createBookingPage.fillInputCreateBooking(
      language.createBooking.arrivalDate,
      guest.ArrivalTime,
      2
    );
    await createBookingPage.fillInputCreateBooking(
      language.createBooking.deptDate,
      guest.DeptTime,
      2
    );

    await createBookingPage.fillInputCreateBooking(
      language.createBooking.adultChild,
      guest.Adult,
      1
    );
    await createBookingPage.fillInputCreateBooking(
      language.createBooking.adultChild,
      guest.Children,
      2
    );

    // chọn loại phòng
    await createBookingPage.clickDropdownRoomType();
    // await createBookingPage.waitForTimeout(1000);
    await createBookingPage.clickOneRoomType(guest.BookedRmType.trim());

    // điền số phòng (nếu có)
    if (guest.MultiResv !== "") {
      await createBookingPage.clickCheckBoxCreateBooking(
        language.createBooking.multiResv
      );
      await createBookingPage.fillInputCreateBooking(
        language.createBooking.numOfRoom,
        guest.MultiResv
      );
    } else {
      if (guest.NumRoom.trim() !== "") {
        await createBookingPage.waitForTimeout(2000);
        await createBookingPage.clickBtnSearchRoomAssign();
        await createBookingPage.selectOneRoomAssign(guest.NumRoom);
        await createBookingPage.clickBtn("Chọn");
      }
    }

    // if (guest.NumRoom.trim() !== "") {
    //   await createBookingPage.clickBtnSearchRoomAssign();
    //   // await createBookingPage.clickCheckboxShowRoomAvailable();
    //   // await createBookingPage.clickBtn("Lọc");
    //   await searchBookingPage.waitForTimeout(3000);
    //   await createBookingPage.selectOneRoomAssign(guest.NumRoom);
    //   await createBookingPage.clickBtn("Chọn");
    // }

    // chọn cty đại lý du lịch
    await createBookingPage.waitForTimeout(3000);
    await createBookingPage.clickInpCompanyTA();
    await createBookingPage.clickOneItemCompanyTA(guest.CompanyTA);

    await createBookingPage.clickBtnDeleteSaler(); // xóa nv kinh doanh

    // chọn phân khúc thị trường
    if (guest.MarketSegment.trim() !== "") {
      await createBookingPage.clickInputMarketSegment();
      await createBookingPage.clickOneFieldMarketSegment(guest.MarketSegment);
    }

    // chọn mã giá
    if (guest.RateCode.trim() !== "") {
      await createBookingPage.clickBtnSearchRateCode();
      await createBookingPage.checkStatePopup("rate query", "visible");
      await createBookingPage.clickBtn(language.ok);
      await createBookingPage.checkStatePopup("rate query detail", "visible");
      await createBookingPage.clickTdTypeRateCode(
        guest.BookedRmType,
        guest.RateCode
      ); // type phòng BAR, rate code??
      await createBookingPage.clickBtn(language.confirm);
    }

    // chọn loại tiền tệ
    await createBookingPage.selectOptionCreateBooking(
      language.createBooking.currencyExRate,
      guest.Currency
    );

    // nhập giá
    await createBookingPage.clickCheckboxAutoPrice();
    await createBookingPage.fillInputPriceRoom(guest.Price);

    //chọn nguồn
    if (guest.Source.trim() !== "") {
      await createBookingPage.clickBtnDropdownCreateBooking(
        language.createBooking.source
      );
      await createBookingPage.clickOneItemSource(guest.Source);
    }

    // chọn phương thức thanh toán
    await createBookingPage.selectOptionCreateBooking(
      language.createBooking.paymentMethod,
      guest.PaymentMethod
    );

    // fill note
    await createBookingPage.fillNote(guest.Note);

    // điền các thông tin khác
    await createBookingPage.clickTab("Thông tin khác");
    await createBookingPage.fillInputCreateBooking(
      "Mã định danh ngoài",
      guest.ExternalIdentifier
    );

    if (guest.ArrivalCarrier.trim() !== "") {
      await createBookingPage.fillInputCreateBooking(
        "Phương tiện đến",
        guest.ArrivalCarrier
      );
    }
    await createBookingPage.clickBtn(language.save);

    if (guest.MultiResv !== "") {
      await expect(createBookingPage.getElMessageSwalModal()).toHaveText(
        "Thêm nhóm đặt phòng thành công!"
      );
    } else {
      expect(
        await createBookingPage.isVisibleToastMessage(
          language.toast_message.created_booking_successfully
        )
      ).toBeTruthy();
    }
  });
}
