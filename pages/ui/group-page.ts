import { Page } from "@playwright/test";
import { BasePage } from "./base-page";
import translations from "@data/languages.json";
import { DateTimeHelper } from "@utils/dateTimeHelper";

const language = translations["vi"];

export class GroupPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  private textareaNameGroup =
    '//textarea[@class="textarea-group-name form-control"]';
  private inpArrivalDate =
    '//div[normalize-space()="Ngày đến đầu"]/following-sibling::div//input';
  private inpDeptDate =
    '//div[normalize-space()="Ngày đi cuối"]/following-sibling::div//input';
  private inputCompanyTA =
    '(//div[normalize-space()="Cty, đại lý du lịch"]/following-sibling::div//input)[1]';
  private inpRateCode =
    '(//div[normalize-space()="Mã giá"]/following-sibling::div//input)[1]';
  private inpNumRoom =
    '//div[@class="v-table-body v-table-body-class"]//table//tr//td[5]//input';
  private inpNumGuest =
    '//div[@class="v-table-body v-table-body-class"]//table//tr//td[6]//input';
  private inpSelfImportedPrice =
    '//div[@class="v-table-body v-table-body-class"]//table//tr//td[8]//input';
  private inpExternalIdentifier = '//input[@id="group-external-id"]';
  private inpBookerName = '//input[@id="booker_name"]';
  private textareaNoteGroup = '//textarea[@id="note"]';

  private inpSearchGroup = '//input[@id="group_infor"]';

  private inpNumRoomSubGroup = `((//div[normalize-space()="SL phòng"])[1]/following-sibling::div//input)[1]`;
  private inpNumGuestSubGroup = `((//div[normalize-space()="SL phòng"])[1]/following-sibling::div//input)[2]`;
  private selectRatecodeSubGroup = `//div[normalize-space()="Mã giá"]/following-sibling::div//select`;
  private btnBookedRmType =
    '//div[normalize-space()="Loại phòng đặt"]/following-sibling::div//button';
  private checkboxRateOveride = '//input[@id="rate-overide"]/parent::div';
  private inpRateOveride =
    '//div[normalize-space()="Tự nhập giá"]/following-sibling::div//input';

  async selectRows(): Promise<void> {
    const xpath = '(//select[@class="row-per-page-select custom-select"])[1]';
    const el = this.page.locator(xpath);
    await el.waitFor({ state: "visible", timeout: 10000 });
    await el.selectOption({ label: "100" });
  }

  async getContent(): Promise<void> {
    const xpath = `(//table)[2]//tr//td[6]//span`;
    const el = this.page.locator(xpath);
    const arr = await el.allTextContents();
    for (const val of arr) {
      console.log(val);
    }
  }

  async clickCheckboxRateOveride(): Promise<void> {
    const el = this.page.locator(this.checkboxRateOveride);
    await el.waitFor({ state: "visible", timeout: 10000 });
    await el.click();
  }

  async fillSelfImportedPriceSubGroup(value: string): Promise<void> {
    const el = this.page.locator(this.inpRateOveride);
    await el.waitFor({ state: "visible", timeout: 10000 });
    await el.fill(value);
  }

  async clickInpBookedRmTypeSubGroup(): Promise<void> {
    const el = this.page.locator(this.btnBookedRmType);
    await el.waitFor({ state: "visible", timeout: 30000 });
    await el.click();
  }

  async selectOneFieldInpBookedRmTypeSubGroup(roomType: string): Promise<void> {
    // console.log(roomType);
    const xpath = `(//div[normalize-space()="Loại phòng đặt"]/following-sibling::div//ul//table)[2]//tr[.//td[normalize-space(.)="${roomType}"]]`;
    const el = this.page.locator(xpath);
    await el.waitFor({ state: "visible", timeout: 30000 });
    await el.click();
  }

  async selectOneItemRateCodeSubGroup(rateCode: string): Promise<void> {
    const el = this.page.locator(this.selectRatecodeSubGroup);
    await el.waitFor({ state: "visible", timeout: 30000 });
    await el.selectOption({ label: rateCode });
  }

  async fillNumRoomSubGroup(value: string): Promise<void> {
    const el = this.page.locator(this.inpNumRoomSubGroup);
    await el.waitFor({ state: "visible", timeout: 30000 });
    await el.fill(value);
  }

  async fillNumGuestSubGroup(value: string): Promise<void> {
    const el = this.page.locator(this.inpNumGuestSubGroup);
    await el.waitFor({ state: "visible", timeout: 30000 });
    await el.fill(value);
  }

  async selectOneRoomAssign(numRoom: string): Promise<void> {
    const xpathRoom = `(//div[@id="popup-select-room___BV_modal_body_"]//table)[2]//tr[.//td//span[normalize-space()="${numRoom.trim()}"]]`;
    const elRoom = this.page.locator(xpathRoom);

    await elRoom.waitFor({ state: "visible", timeout: 30000 });
    await elRoom.click();
  }

  async clickRowRoomingList(index: number): Promise<void> {
    const xpath = `((//div[@class="container-fluid"]//table)[2]//tr[.//td[11]//span[normalize-space()="${index}"]])[1]`;
    const el = this.page.locator(xpath);
    await el.waitFor({ state: "visible", timeout: 30000 });
    await el.click();
  }

  async fillTdNumRoomInputRoomingList(
    index: number,
    num: string
  ): Promise<void> {
    const xpath = `(//div[@class="container-fluid"]//table)[2]//tr[${index}]//td[10]//input`;
    const el = this.page.locator(xpath);
    await el.waitFor({ state: "visible", timeout: 30000 });
    await el.fill(num);
  }

  async clickRowByRoomType(
    roomTypeCode: string,
    arrDate: string,
    deptDate: string
  ): Promise<void> {
    const xpath = `(//div[@class="ez-row ez-group-header" and contains(text(), "Đoàn phụ")]/following-sibling::div[1]//table)[2]//tr[.//td//span[normalize-space()="${roomTypeCode}" ] and .//td//span[normalize-space()="${arrDate}"] and .//td//span[normalize-space()="${deptDate}"]]`;
    const el = this.page.locator(xpath);
    await el.waitFor({ state: "visible", timeout: 30000 });
    await el.click();
  }

  async fillNote(value: string): Promise<void> {
    const el = this.page.locator(this.textareaNoteGroup);
    await el.waitFor({ state: "visible", timeout: 30000 });
    await el.fill(value.trim());
  }

  async clickCheckboxSelfImportedPrice(codeRoomType: string): Promise<void> {
    const xpath = `(//div[@class="v-table-body v-table-body-class"]//table//tr[.//td//span[normalize-space()="${codeRoomType}"]]//td)[7]//input[@type="checkbox"]`;
    const el = this.page.locator(xpath);
    await el.waitFor({ state: "visible", timeout: 30000 });
    await el.click();
  }

  async clickTdSelfImportedPrice(codeRoomType: string): Promise<void> {
    const xpath = `(//div[@class="v-table-body v-table-body-class"]//table//tr[.//td//span[normalize-space()="${codeRoomType}"]]//td)[8]`;
    const el = this.page.locator(xpath);
    await el.waitFor({ state: "visible", timeout: 30000 });
    await el.click();
  }

  async fillTdSelfImportedPrice(value: string): Promise<void> {
    const el = this.page.locator(this.inpSelfImportedPrice);
    await el.waitFor({ state: "visible", timeout: 30000 });
    await el.fill(value);
  }

  async handleSelectInpDateGroup(
    nameInp: string,
    date: string,
    strict: boolean,
    index?: number
  ): Promise<void> {
    const dateTimeHelper = new DateTimeHelper();
    const { day, month, year } = dateTimeHelper.parseDateString(date);

    await this.clickInpDateGroup(nameInp, index);
    await this.clickYear(nameInp);
    await this.selectYear(nameInp, year);
    await this.page.waitForTimeout(1000);
    await this.selectMonth(nameInp, month);
    await this.page.waitForTimeout(1000);
    await this.selectDay(nameInp, day, strict);
  }

  async clickInpDateGroup(nameInp: string, index?: number): Promise<void> {
    let xpath;
    if (index) {
      xpath = `(//div[normalize-space()="${nameInp}"]/following-sibling::div//input)[${index}]`;
    } else {
      xpath = `//div[normalize-space()="${nameInp}"]/following-sibling::div//input`;
    }
    const el = this.page.locator(xpath);
    await el.waitFor({ state: "visible", timeout: 30000 });
    await el.click();
  }
  async clickInpArrivalDateGroup(): Promise<void> {
    const el = this.page.locator(this.inpArrivalDate);
    await el.waitFor({ state: "visible", timeout: 30000 });
    await el.click();
  }

  async clickYear(nameInp: string): Promise<void> {
    const xpath = `(//div[normalize-space()="${nameInp}"]/following-sibling::div//div[@class="ivu-date-picker-header"]//span[@class="ivu-date-picker-header-label"])[2]`;
    const el = this.page.locator(xpath);
    await el.waitFor({ state: "visible", timeout: 30000 });
    await el.click();
  }
  async clickMonth(nameInp: string): Promise<void> {
    const xpath = `(//div[normalize-space()="${nameInp}"]/following-sibling::div//div[@class="ivu-date-picker-header"]//span[@class="ivu-date-picker-header-label"])[1]`;
    const el = this.page.locator(xpath);
    await el.waitFor({ state: "visible", timeout: 30000 });
    await el.click();
  }

  async selectYear(nameInp: string, year: string): Promise<void> {
    const xpath = `//div[normalize-space()="${nameInp}"]/following-sibling::div//em[normalize-space()="${year}"]`;
    const el = this.page.locator(xpath);
    await el.waitFor({ state: "visible", timeout: 30000 });
    await el.click();
  }

  async selectMonth(nameInp: string, month: string): Promise<void> {
    const xpath = `//div[normalize-space()="${nameInp}"]/following-sibling::div//em[normalize-space()="Th.${month}"]`;
    const el = this.page.locator(xpath);
    await el.waitFor({ state: "visible", timeout: 30000 });
    await el.click();
  }

  async selectDay(
    nameInp: string,
    day: string,
    strict: boolean
  ): Promise<void> {
    let xpath;
    if (strict === true) {
      xpath = `//div[normalize-space()="${nameInp}"]/following-sibling::div//span[not(contains(@class, "next-month") or contains(@class, "disabled") or contains(@class, "prev-month"))]//em[normalize-space()="${day}"]`;
    } else {
      xpath = `//div[normalize-space()="${nameInp}"]/following-sibling::div//span[not(contains(@class, "next-month") or contains(@class, "disabled") or contains(@class, "prev-month"))]//em[normalize-space()="${day}"]`;
    }
    const el = this.page.locator(xpath);
    await el.waitFor({ state: "visible", timeout: 30000 });
    await el.click();
  }

  async fillBookerName(value: string) {
    const el = this.page.locator(this.inpBookerName);
    await el.waitFor({ state: "visible", timeout: 30000 });
    await el.fill(value);
  }

  async fillExternalIdentifier(value: string) {
    const el = this.page.locator(this.inpExternalIdentifier);
    await el.waitFor({ state: "visible", timeout: 30000 });
    await el.fill(value);
  }

  async clickOneDayDeptDateGroup(day: string) {
    const xpath = `(//div[@class="ivu-picker-panel-body"])[2]//span//em[normalize-space(.)="${day}"]`;
    const el = this.page.locator(xpath);
    await el.waitFor({ state: "visible", timeout: 30000 });
    await el.click();
  }

  async fillSearchGroup(name: string) {
    const el = this.page.locator(this.inpSearchGroup);
    await el.waitFor({ state: "visible", timeout: 30000 });
    await el.fill(name);
  }

  async fillNameGroup(name: string) {
    await this.page.fill(this.textareaNameGroup, name);
  }

  async clickInputCompanyTA() {
    await this.page.click(this.inputCompanyTA);
  }
  async clickInputRateCode() {
    await this.page.click(this.inpRateCode);
  }

  async clickOneItemCompanyTA(nameCompanyTA: string) {
    const xpath = `(//table[@class="v-table-btable"])[1]//tr[.//span[normalize-space(.)="${nameCompanyTA}"]]`;
    const el = this.page.locator(xpath);
    await el.waitFor({ state: "visible", timeout: 30000 });
    await el.click();
  }

  async clickOneItemRateCode(rateCode: string) {
    const xpath = `(//table[@class="v-table-btable"])[7]//tr[.//td[normalize-space(.)="${rateCode}"]]`;
    const el = this.page.locator(xpath);
    await el.waitFor({ state: "visible", timeout: 30000 });
    await el.click();
  }

  async handleSelectInpDateGroupRoomType(
    inputType: string,
    codeRoomType: string,
    date: string
  ): Promise<void> {
    const dateTimeHelper = new DateTimeHelper();
    const { day, month, year } = dateTimeHelper.parseDateString(date);
    const monthEng = dateTimeHelper.monthNumberToEnglish(month);

    if (inputType === "from date") {
      await this.clickInputFromDate(codeRoomType);
    } else if (inputType === "to date") {
      await this.clickInputToDate(codeRoomType);
    }

    await this.page.waitForTimeout(1000);
    await this.fillYearRoomType(year);
    // await this.page.waitForTimeout(1000);
    // await this.clickMonthRoomType();
    await this.page.waitForTimeout(1000);
    await this.selectMonthRoomType(monthEng);
    await this.page.waitForTimeout(1000);
    await this.selectDayRoomType(day);
  }

  async clickMonthRoomType(): Promise<void> {
    const xpath = `//div[contains(@class, "open")]//select[@class="flatpickr-monthDropdown-months"]`;
    const el = this.page.locator(xpath);
    await el.waitFor({ state: "visible", timeout: 30000 });
    await el.click();
  }

  async selectDayRoomType(day: string): Promise<void> {
    const xpath = `//div[contains(@class, "open")]//span[normalize-space()="${day}" and not(contains(@class, "nextMonthDay")) and not(contains(@class, "prevMonthDay"))]`;
    const el = this.page.locator(xpath);
    await el.waitFor({ state: "visible", timeout: 30000 });
    await el.click();
  }

  async selectMonthRoomType(month: string): Promise<void> {
    const xpath = `//div[contains(@class, "open")]//select[@class="flatpickr-monthDropdown-months"]`;
    const el = this.page.locator(xpath);
    await el.waitFor({ state: "visible", timeout: 30000 });
    await el.selectOption({ label: month });
  }

  async fillYearRoomType(year: string): Promise<void> {
    const xpath = `//div[contains(@class, "open")]//input[@aria-label="Year"]`;
    const el = this.page.locator(xpath);
    await el.waitFor({ state: "visible", timeout: 30000 });
    await el.fill(year);
  }

  async clickInputFromDate(codeRoomType: string) {
    const xpath = `(//div[@class="v-table-body v-table-body-class"]//table//tr[.//td//span[normalize-space()="${codeRoomType}"]]//td)[3]//input`;
    const el = this.page.locator(xpath);
    await el.waitFor({ state: "visible", timeout: 30000 });
    await el.click();
  }

  async clickInputToDate(codeRoomType: string) {
    const xpath = `(//div[@class="v-table-body v-table-body-class"]//table//tr[.//td//span[normalize-space()="${codeRoomType}"]]//td)[4]//input`;
    const el = this.page.locator(xpath);
    await el.waitFor({ state: "visible", timeout: 30000 });
    await el.click();
  }

  async clickTdNumRoom(codeRoomType: string) {
    const xpath = `(//div[@class="v-table-body v-table-body-class"]//table//tr[.//td//span[normalize-space()="${codeRoomType}"]]//td)[5]`;
    const el = this.page.locator(xpath);
    await el.waitFor({ state: "visible", timeout: 10000 });
    await el.click();
  }

  async fillTdNumRoom(num: string) {
    const el = this.page.locator(this.inpNumRoom);
    await el.waitFor({ state: "visible", timeout: 30000 });
    // await this.page.waitForTimeout(1000);
    await el.fill(num);
  }

  async clickTdNumGuest(codeRoomType: string) {
    const xpath = `(//div[@class="v-table-body v-table-body-class"]//table//tr[.//td//span[normalize-space()="${codeRoomType}"]]//td)[6]`;
    const el = this.page.locator(xpath);
    await el.waitFor({ state: "visible", timeout: 10000 });
    await el.click();
  }

  async fillTdNumGuest(num: string) {
    const el = this.page.locator(this.inpNumGuest);
    await el.waitFor({ state: "visible", timeout: 30000 });
    await el.fill(num);
  }
}
