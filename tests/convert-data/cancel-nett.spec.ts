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

test("cap nhat lai checbox nett", async ({ homePage, searchBookingPage }) => {
  for (const guest of records) {
    if (guest.RateCode.trim() === "") {
      console.log(`Cập nhật booking ${guest.STT}`);
      await homePage.clickItemNavbar(language.reservation);
      await homePage.clickItemDropdown(language.search_reservation);
      await searchBookingPage.sb_fillInputMainInfo(guest.ConfirmCode);
      await searchBookingPage.handleClickSearchReservation();
      await searchBookingPage.waitForTimeout(5000);
      await searchBookingPage.clickCheckboxNett();
      await searchBookingPage.waitForTimeout(1500);
      // await expect(await searchBookingPage.getXpathNett()).toBeChecked();
      await searchBookingPage.clickBtn("Cập nhật");

      expect(
        await searchBookingPage.isVisibleToastMessage("Cập nhật thành công!")
      ).toBeTruthy();
    } else {
      console.log(`Bỏ qua booking ${guest.STT} do có RateCode`);
    }
  }
});
