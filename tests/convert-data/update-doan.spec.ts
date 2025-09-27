import fs from "fs";
import path from "path";
import { parse } from "csv-parse/sync";
import { expect } from "@playwright/test";

import { test } from "@fixtures/auth.fixture";
import translations from "@data/languages.json";
import { getRoomTypeCode } from "@utils/commonHelpers";
import { BookingRecord, Group } from "@utils/types";

const language = translations.vi;
const records: Group[] = parse(
  fs.readFileSync(
    path.join(__dirname, "../../data/csv/khachdoan_gardenplaza.csv"),
    "utf8"
  ),
  {
    columns: true,
    skip_empty_lines: true,
  }
);

records.forEach((group) => {
  test(`Cập nhật dữ liệu cho đoàn ${group.STT}: ${group.NameGroup}`, async ({
    groupPage,
    createBookingPage,
  }) => {
    // tên đoàn
    await groupPage.fillNameGroup(group.NameGroup);

    // ngày đi
    await groupPage.handleSelectInpDateGroup(
      "Ngày đi cuối",
      group.DeptDate,
      true
    );

    // ngày đến
    await groupPage.waitForTimeout(1000);
    await groupPage.handleSelectInpDateGroup(
      "Ngày đến đầu",
      group.ArrivalDate,
      true
    );

    // select trang thái đặt phòng
    await groupPage.selectStatusReservation(group.Status.trim());

    // fill note
    await groupPage.fillNote(group.Note);

    // select cty đại lí du lich
    await groupPage.waitForTimeout(3000);
    await groupPage.clickInputCompanyTA();
    await groupPage.clickOneItemCompanyTA(group.CompanyTA.trim());

    // xóa saler
    await groupPage.clickBtnDeleteSaler();

    // select mã Giá
    await groupPage.clickFieldRateCode();
    await groupPage.selectOneItemRateCode(group.RateCode.trim());

    //chọn phân khúc thị trg
    if (group.MarketSegment.trim() !== "") {
      await createBookingPage.clickInputMarketSegment();
      await createBookingPage.clickOneFieldMarketSegment(
        group.MarketSegment.trim()
      );
    }

    // chọn nguồn
    await createBookingPage.clickBtnDropdownCreateBooking(
      language.createBooking.source
    );
    await createBookingPage.clickOneItemSource(group.Source.trim());

    // fill thông tin phương tiện đến - đi
    await groupPage.fillArrCarrier(group.ArrivalCarrier);
    await groupPage.fillArrTime(group.ArrivalTime);
    await groupPage.fillDeptCarrier(group.DeptCarrier);
    await groupPage.fillDeptTime(group.DeptTime);

    // flll ttin phòng loại 1
    await groupPage.clickTdNumRoom(group.BookedRmType1);
    await groupPage.fillTdNumRoom(group.NumOfRoomType1);
    await groupPage.clickTdNumGuest(group.BookedRmType1);
    await groupPage.fillTdNumGuest(group.NumberOfGuests1);

    // await groupPage.clickCheckboxSelfImportedPrice(group.BookedRmType1);
    // await groupPage.clickTdSelfImportedPrice(group.BookedRmType1);
    // await groupPage.waitForTimeout(1000);
    // await groupPage.fillTdSelfImportedPrice("0");

    if (group.BookedRmType2.trim() === "") {
      await groupPage.clickBtn(language.save);
      await groupPage.clickBtn("Đoàn Master");

      await expect(createBookingPage.getXpathHeaderPage()).toHaveText(
        "Đoàn Master"
      );

      return;
    }
    if (group.BookedRmType1.trim() !== group.BookedRmType2.trim()) {
      await groupPage.clickTdNumRoom(group.BookedRmType2);
      await groupPage.fillTdNumRoom(group.NumOfRoomType2);
      await groupPage.clickTdNumGuest(group.BookedRmType2);
      await groupPage.fillTdNumGuest(group.NumberOfGuests2);
      // await groupPage.clickCheckboxSelfImportedPrice(group.BookedRmType2);
      // await groupPage.clickTdSelfImportedPrice(group.BookedRmType2);
      // await groupPage.waitForTimeout(1000);
      // await groupPage.fillTdSelfImportedPrice("0");

      await groupPage.clickBtn(language.save);
      await groupPage.clickBtn("Đoàn Master");

      await expect(createBookingPage.getXpathHeaderPage()).toHaveText(
        "Đoàn Master"
      );
    } else {
      await groupPage.clickBtn(language.save);
      await groupPage.clickBtn("Đoàn Master");

      await expect(createBookingPage.getXpathHeaderPage()).toHaveText(
        "Đoàn Master"
      );

      await groupPage.clickBtn("Tạo đoàn phụ mới");
      await groupPage.waitForTimeout(3000);
      await groupPage.clickInpBookedRmTypeSubGroup();
      await groupPage.selectOneFieldInpBookedRmTypeSubGroup(
        group.BookedRmType2
      );
      await groupPage.waitForTimeout(1000);
      await groupPage.fillNumRoomSubGroup(group.NumOfRoomType2);
      await groupPage.fillNumGuestSubGroup(group.NumberOfGuests2);
      // await groupPage.selectOneItemRateCodeSubGroup("CB");
      await groupPage.clickCheckboxRateOveride();
      // await groupPage.fillSelfImportedPriceSubGroup(subGroup[0].Price);
      await groupPage.clickBtn("Lưu");

      await expect(createBookingPage.getXpathHeaderPage()).toHaveText(
        "Đoàn Master"
      );
    }
    // }
  });
});
