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
    path.join(__dirname, "../../data/csv/data_group.csv"),
    "utf8"
  ),
  {
    columns: true,
    skip_empty_lines: true,
  }
);

const grouped = Object.values(
  records.reduce(
    (acc: { [key: string]: BookingRecord[] }, item) => {
      if (!acc[item.ExternalIdentifier]) acc[item.ExternalIdentifier] = [];
      acc[item.ExternalIdentifier].push(item);
      return acc;
    },
    {} as { [key: string]: BookingRecord[] }
  )
);

// Nhóm tiếp theo BookedRmType trong mỗi mảng con
const data = grouped.map((subArray) => {
  const groupedByRoomType = Object.values(
    subArray.reduce(
      (acc: { [key: string]: BookingRecord[] }, item) => {
        if (!acc[item.BookedRmType]) acc[item.BookedRmType] = [];
        acc[item.BookedRmType].push(item);
        return acc;
      },
      {} as { [key: string]: BookingRecord[] }
    )
  );

  // Tiếp tục chia nhỏ theo ngày đến và ngày đi trong cùng loại phòng
  return groupedByRoomType
    .map((roomTypeGroup) => {
      return Object.values(
        roomTypeGroup.reduce(
          (acc: { [key: string]: BookingRecord[] }, item) => {
            // Tạo key duy nhất cho mỗi khoảng thời gian: RoomType_ArrivalDate_DeptDate
            const dateRangeKey = `${item.BookedRmType}_${item.ArrivalDate}_${item.DeptDate}`;
            if (!acc[dateRangeKey]) acc[dateRangeKey] = [];
            acc[dateRangeKey].push(item);
            return acc;
          },
          {} as { [key: string]: BookingRecord[] }
        )
      );
    })
    .flat();
});

// Thống kê kết quả nhóm
// console.log("=== THỐNG KÊ NHÓM DATA ===");
// data.forEach((group, groupIdx) => {
//   console.log(
//     `\nĐoàn ${groupIdx + 1} - ExternalIdentifier: ${group[0][0].ExternalIdentifier}`
//   );
//   console.log(`Tổng số nhóm phòng: ${group.length}`);

//   group.forEach((subGroup, subIdx) => {
//     const roomType = subGroup[0].BookedRmType;
//     const arrivalDate = subGroup[0].ArrivalDate;
//     const deptDate = subGroup[0].DeptDate;
//     const numRoom = subGroup.length;
//     const numGuest = subGroup.reduce((total, record) => {
//       return total + Number(record.Adult) + Number(record.Children);
//     }, 0);

//     console.log(`  Nhóm ${subIdx + 1}:`);
//     console.log(`    - Loại phòng: ${roomType}`);
//     console.log(`    - Ngày đến: ${arrivalDate}`);
//     console.log(`    - Ngày đi: ${deptDate}`);
//     console.log(`    - Số phòng: ${numRoom}`);
//     console.log(`    - Số khách: ${numGuest}`);
//   });
// });

data.forEach((group, groupIdx) => {
  test(`Update Doan ${group[0][0].NameGroup}: ${group[0][0].ExternalIdentifier}`, async ({
    createBookingPage,
    homePage,
    groupPage,
  }) => {
    await homePage.clickItemNavbar("Đoàn");
    await homePage.clickItemDropdown("Tạo đoàn mới");

    await groupPage.fillExternalIdentifier(group[0][0].ExternalIdentifier);
    await groupPage.fillBookerName(group[0][0].FullName);
    await groupPage.fillNameGroup(group[0][0].NameGroup);

    await groupPage.waitForTimeout(2000);
    await groupPage.clickInputCompanyTA();
    await groupPage.waitForTimeout(1500);
    await groupPage.clickOneItemCompanyTA(group[0][0].CompanyTA);

    await groupPage.clickInputRateCode();
    await groupPage.clickOneItemRateCode(group[0][0].RateCode);

    //Click checkbox khong in gia

    // Tìm ngày đến sớm nhất và ngày rời muộn nhất trong cả group
    const allRecords = group.flat(); // Gộp tất cả subGroup thành mảng phẳng

    // Hàm parse ngày từ DD/MM/YYYY sang Date object
    const parseDate = (dateStr: string): Date => {
      const [day, month, year] = dateStr.split("/");
      return new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
    };

    // Debug: In ra tất cả ngày để kiểm tra
    // console.log("=== DEBUG: Tất cả ngày trong group ===");
    // allRecords.forEach((record, index) => {
    //   console.log(
    //     `Record ${index + 1}: ArrivalDate = ${record.ArrivalDate}, DeptDate = ${record.DeptDate}`
    //   );
    // });

    const earliestArrivalDate = allRecords.reduce((earliest, record) => {
      const currentDate = parseDate(record.ArrivalDate);
      const earliestDate = parseDate(earliest);
      // console.log(
      //   `So sánh ArrivalDate: ${record.ArrivalDate} (${currentDate.getTime()}) vs ${earliest} (${earliestDate.getTime()})`
      // );
      return currentDate < earliestDate ? record.ArrivalDate : earliest;
    }, allRecords[0].ArrivalDate);

    const latestDeptDate = allRecords.reduce((latest, record) => {
      const currentDate = parseDate(record.DeptDate);
      const latestDate = parseDate(latest);
      // console.log(
      //   `So sánh DeptDate: ${record.DeptDate} (${currentDate.getTime()}) vs ${latest} (${latestDate.getTime()})`
      // );
      return currentDate > latestDate ? record.DeptDate : latest;
    }, allRecords[0].DeptDate);

    // console.log(
    //   `Kết quả cuối cùng: earliestArrivalDate = ${earliestArrivalDate}, latestDeptDate = ${latestDeptDate}`
    // );

    await groupPage.handleSelectInpDateGroup(
      "Ngày đi cuối",
      latestDeptDate,
      true
    );
    await groupPage.waitForTimeout(1000);
    await groupPage.handleSelectInpDateGroup(
      "Ngày đến đầu",
      earliestArrivalDate,
      true
    );

    if (group[0][0].MarketSegment.trim() !== "") {
      await groupPage.waitForTimeout(1000);
      await createBookingPage.clickInputMarketSegment();
      await groupPage.waitForTimeout(1000);
      await createBookingPage.clickOneFieldMarketSegment(
        group[0][0].MarketSegment
      );
    }

    await groupPage.waitForTimeout(4000);

    // Track các loại phòng đã được fill để tránh fill trùng
    const processedRoomTypes = new Set<string>();
    const remainingSubGroups: any[] = []; // Lưu trữ các subGroup chưa được fill cho đoàn phụ

    for (const subGroup of group) {
      const roomType = subGroup[0].BookedRmType;
      const fromDate = subGroup[0].ArrivalDate;
      const toDate = subGroup[0].DeptDate;
      // const roomTypeCode = getRoomTypeCode(roomType);

      // Nếu loại phòng này đã được fill rồi thì bỏ qua và lưu vào remainingSubGroups
      if (processedRoomTypes.has(roomType)) {
        remainingSubGroups.push(subGroup); // Lưu để dùng cho đoàn phụ
        continue;
      }

      const numRoom = subGroup.length;
      const numGuest = subGroup.reduce((total, record) => {
        return total + Number(record.Adult) + Number(record.Children);
      }, 0);

      // console.log(
      //   `Fill cho nhóm đầu tiên: ${roomType} - ${subGroup[0].ArrivalDate} -> ${subGroup[0].DeptDate}`
      // );

      await groupPage.handleSelectInpDateGroupRoomType(
        "from date",
        roomType,
        fromDate
      );
      await groupPage.waitForTimeout(1500);
      await groupPage.handleSelectInpDateGroupRoomType(
        "to date",
        roomType,
        toDate
      );

      await groupPage.clickTdNumRoom(roomType);
      await groupPage.fillTdNumRoom(numRoom.toString());

      await groupPage.clickTdNumGuest(roomType);
      await groupPage.fillTdNumGuest(numGuest.toString());

      await groupPage.clickCheckboxSelfImportedPrice(roomType);
      await groupPage.clickTdSelfImportedPrice(roomType);
      await groupPage.waitForTimeout(1000);
      await groupPage.fillTdSelfImportedPrice(subGroup[0].Price);
      await groupPage.waitForTimeout(1000);

      // Đánh dấu loại phòng này đã được fill
      processedRoomTypes.add(roomType);
    }

    console.log(`Số nhóm đã fill cho đoàn chính: ${processedRoomTypes.size}`);
    console.log(`Số nhóm còn lại cho đoàn phụ: ${remainingSubGroups.length}`);

    await groupPage.fillNote(group[0][0].Note);

    await groupPage.clickBtn(language.save);
    await groupPage.clickBtn("Đoàn Master");
    await groupPage.waitForTimeout(2000);

    //them doan phu
    if (remainingSubGroups.length > 0) {
      for (const subGroup of remainingSubGroups) {
        const roomType = subGroup[0].BookedRmType;
        // const roomTypeCode = getRoomTypeCode(roomType);
        const numRoom = subGroup.length;
        const numGuest: number = subGroup.reduce(
          (total: number, record: BookingRecord): number => {
            return total + Number(record.Adult) + Number(record.Children);
          },
          0
        );

        await groupPage.clickBtn("Tạo đoàn phụ mới");

        await groupPage.handleSelectInpDateGroup(
          "Ngày đi",
          subGroup[0].DeptDate,
          false,
          1
        );
        await groupPage.waitForTimeout(1000);
        await groupPage.handleSelectInpDateGroup(
          "Ngày đến",
          subGroup[0].ArrivalDate,
          false,
          1
        );
        await groupPage.waitForTimeout(1000);

        await groupPage.clickInpBookedRmTypeSubGroup();
        await groupPage.waitForTimeout(1000);
        await groupPage.selectOneFieldInpBookedRmTypeSubGroup(roomType);
        await groupPage.waitForTimeout(1000);
        await groupPage.fillNumRoomSubGroup(numRoom.toString());
        await groupPage.fillNumGuestSubGroup(numGuest.toString());
        await groupPage.waitForTimeout(1000);
        await groupPage.selectOneItemRateCodeSubGroup("CB");
        await groupPage.clickCheckboxRateOveride();
        await groupPage.waitForTimeout(1000);
        await groupPage.fillSelfImportedPriceSubGroup(subGroup[0].Price);
        await groupPage.clickBtn("Lưu");
      }
    }

    for (const subGroup of group) {
      const roomType = subGroup[0].BookedRmType;
      const arrDate = subGroup[0].ArrivalDate;
      const deptDate = subGroup[0].DeptDate;
      // const roomTypeCode = getRoomTypeCode(roomType);
      await groupPage.clickRowByRoomType(roomType, arrDate, deptDate);
      await groupPage.clickBtn("Nhập DS phòng");
      await groupPage.waitForTimeout(3000);

      if (
        subGroup.some(
          (record) => record.NumRoom && record.NumRoom.trim() !== ""
        )
      ) {
        let index = 1;
        for (const record of subGroup) {
          if (!record.NumRoom || record.NumRoom.trim() === "") {
            continue;
          }
          await groupPage.clickRowRoomingList(index);
          await groupPage.waitForTimeout(1000);
          await groupPage.clickBtn("Chọn phòng [f5]");
          await groupPage.waitForTimeout(2000);
          await groupPage.selectOneRoomAssign(record.NumRoom);
          await groupPage.clickBtn("Chọn");
          // await groupPage.waitForTimeout(1500);
          // await groupPage.fillTdNumRoomInputRoomingList(index, record.NumRoom);
          index++;
        }
      }

      await groupPage.clickBtn("Cập nhật");

      expect(await groupPage.getToastMessage()).toBe(
        "Nhập danh sách phòng thành công!"
      );
      await groupPage.waitForTimeout(3000);
    }
  });
});
