import fs from "fs";
import path from "path";
import { parse } from "csv-parse/sync";
import { expect } from "@playwright/test";

import { test } from "@fixtures/auth.fixture";
import translations from "@data/languages.json";
import { getRoomTypeCode } from "@utils/commonHelpers";
import { BookingRecord, Group } from "@utils/types";

test.only("Kiểm tra tên khách đoàn", async ({ homePage, groupPage }) => {
  await homePage.clickItemNavbar("Đoàn");
  await homePage.clickItemDropdown("Tìm kiếm đoàn");
  await groupPage.clickBtn("Tìm kiếm nâng cao");
  await groupPage.selectRows();
  await groupPage.waitForTimeout(5000);
  await groupPage.getContent();
});
