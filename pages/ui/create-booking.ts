import { expect, Page } from "@playwright/test";
import { BasePage } from "./base-page";
import translations from "@data/languages.json";

import {
  InputFieldType,
  ProfileData,
  ProfileTemplate,
  fieldBooking,
} from "@utils/types";
import { guestInfo } from "@fixtures/test-data";
const language = translations.vi;

export class CreateBookingPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  /* Xpath locators */
  //tab guest

  //tab booking

  private fieldNumProfile =
    '//div[@role="tabpanel" and @aria-hidden="false"]//div[@class="ez-col ez-flex86 font-weight-bold text-danger ez-profile-rsv"]';
  private inp_book_name = '//input[@id="booker_name"]';
  private inp_book_telNum = '//input[@id="telNumM"]';
  private inp_book_email = '//input[@id="mail"]';
  private inp_book_nation = '(//div[@role="group"]//input[@title])[1]';
  private inp_book_arrivalDate =
    '(//div[normalize-space()="Ngày đến"]/following-sibling::div//input)[1]';
  private inp_book_arrTime =
    '(//div[normalize-space()="Ngày đến"]/following-sibling::div//input)[2]';
  private inp_book_deptDate =
    '(//div[normalize-space()="Ngày đi"]/following-sibling::div//input)[1]';
  private inp_book_deptTime =
    '(//div[normalize-space()="Ngày đi"]/following-sibling::div//input)[2]';
  private inp_book_adult = '(//input[@id="guest"])[1]';
  private inp_book_children = '(//input[@id="guest"])[2]';
  private inp_checkbox_mainGuest =
    '(//div[@id="guest-reservation-tab"]//table)[2]//tr//input';
  private inpCheckboxAllGuest = '//input[@value="check-all"]';

  private inp_companyTA =
    '(//div[normalize-space()="Cty, đại lý du lịch"]/following-sibling::div//input)[1]';
  private btnRateCode = `//button[@title="${language.rate_query}"]`;
  private btnRoomAssign = `//button[@title="${language.information}"]`;
  private addTransaction = '//span[@class="balance-value"]';
  private setPaymentAll =
    '//div[@class="ez-row set-payment-all"]//div[contains(@class, "title-normal")]';
  private btnAddMore = `//button[normalize-space(.) = "${language.add_more}"]`;
  private inpMarketSegment = `(//div[normalize-space()="Phân khúc TT"]/following-sibling::div//input)[1]`;
  private inpExternalIdentifier = '//input[@id="rsv-external-id"]';
  private textAreaNote = '//textarea[@id="notice"]';
  private labelAutoPrice = '//label[@for="rate_override"]';
  private inputPriceRoom =
    '//div[normalize-space()="Tự nhập giá"]/following-sibling::div//input';
  private checkboxShowRoomAvailable =
    '//div[@id="popup-select-room___BV_modal_body_"]//label[@class="custom-control-label"]';
  private btnDropdownRoomType =
    '//div[normalize-space()="Loại phòng đặt"]/following-sibling::div//button';
  private selectCurrency =
    '(//div[normalize-space()="Tiền tệ/Tỷ giá"]/following-sibling::div//select)[1]';
  private confirmCode = `//input[@title="Nhấn vào để sửa số xác nhận"]`;

  //tab other infomation

  /* Functions */

  async clickInpConfirmCode(): Promise<void> {
    const el = this.page.locator(this.confirmCode);
    await el.waitFor({ state: "visible", timeout: 10000 });
    await el.click();
  }

  async handleFillConfirmCode(value: string): Promise<void> {
    const el = this.page.locator(this.confirmCode);
    await this.clickInpConfirmCode();
    await expect(el).toHaveJSProperty("readOnly", false);
    await el.fill(value);
  }

  getXpathSelectCreateBooking(nameSelect: string): string {
    const xpath = `(//div[normalize-space()="${nameSelect}"]/following-sibling::div//select)[1]`;
    return xpath;
  }

  async selectOptionCreateBooking(
    nameInput: string,
    value: string
  ): Promise<void> {
    const xpath = this.getXpathSelectCreateBooking(nameInput);
    const el = this.page.locator(xpath);
    await el.waitFor({ state: "visible", timeout: 10_000 });
    await el.selectOption({ label: value });
  }

  getXpathBtnDropdownCreateBooking(nameInput: string): string {
    const xpath = `(//div[normalize-space()="${nameInput}"]/following-sibling::div//button)[1]`;
    return xpath;
  }

  async clickBtnDropdownCreateBooking(nameInput: string): Promise<void> {
    const xpath = this.getXpathBtnDropdownCreateBooking(nameInput);
    const el = this.page.locator(xpath);
    await el.waitFor({ state: "visible", timeout: 10000 });
    await el.click();
  }

  async clickOneItemSource(codeSource: string) {
    const xpath = `(//div[normalize-space()="Nguồn"]/following-sibling::div//table)[2]//tr[.//span[normalize-space()="${codeSource.trim()}"]]`;
    const el = this.page.locator(xpath);
    await el.waitFor({ state: "visible", timeout: 10_000 });
    await el.click();
  }

  async clickDropdownRoomType() {
    const el = this.page.locator(this.btnDropdownRoomType);
    await el.waitFor({ state: "visible", timeout: 10_000 });
    await el.click();
  }

  async clickOneRoomType(roomType: string): Promise<void> {
    const xpath = `(//div[normalize-space()="Loại phòng đặt"]/following-sibling::div//table)[2]//tr[.//td//span[normalize-space()="${roomType}"]]`;
    const el = this.page.locator(xpath);
    await el.waitFor({ state: "visible", timeout: 10_000 });
    await el.click();
  }

  async clickCheckboxShowRoomAvailable() {
    const el = this.page.locator(this.checkboxShowRoomAvailable);
    await el.waitFor({ state: "visible", timeout: 30000 });
    await el.click();
  }

  async clickCheckboxAutoPrice() {
    const el = this.page.locator(this.labelAutoPrice);
    await el.waitFor({ state: "visible", timeout: 30000 });
    await el.click();
  }

  async fillInputPriceRoom(price: string) {
    const el = this.page.locator(this.inputPriceRoom);
    await el.waitFor({ state: "visible", timeout: 30000 });
    await el.press("Control+A");
    await el.press("Backspace");
    await el.fill(price);
  }

  async fillNote(note: string) {
    const el = this.page.locator(this.textAreaNote);
    await el.waitFor({ state: "visible", timeout: 30_000 });
    await el.fill(note);
  }

  async clickInputMarketSegment() {
    const el = this.page.locator(this.inpMarketSegment);
    await el.waitFor({ state: "visible", timeout: 30_000 });
    await el.click();
  }

  async clickOneFieldMarketSegment(codeMarketSegment: string) {
    const xpath = `(//div[normalize-space()="Phân khúc TT"]/following-sibling::div//table)[2]//tr[.//span[normalize-space()="${codeMarketSegment.trim()}"]]`;
    const el = this.page.locator(xpath);
    await el.waitFor({ state: "visible", timeout: 30_000 });
    await el.click();
  }

  async clickCheckoxAllGuest(): Promise<void> {
    const el = this.page.locator(this.inpCheckboxAllGuest);
    await el.waitFor({ state: "visible", timeout: 30_000 });
    await el.click();
  }

  async clickInpCompanyTA(): Promise<void> {
    const el = this.page.locator(this.inp_companyTA);
    await el.waitFor({ state: "visible", timeout: 30_000 });
    await el.click();
  }

  async clickAddTransaction(): Promise<void> {
    const el = this.page.locator(this.addTransaction);
    await el.click();
  }

  async clickCloseTrnsMess(): Promise<void> {
    const xpath = `//div[@id="trns-mess-id___BV_modal_body_"]//button`;
    const el = this.page.locator(xpath);
    await el.waitFor({ state: "visible", timeout: 30_000 });
    await el.click();
  }
  async clickSetPaymentAll(): Promise<void> {
    const el = this.page.locator(this.setPaymentAll);
    await el.waitFor({ state: "visible", timeout: 30_000 });
    await el.click();
  }
  async clickBtnAddMore(): Promise<void> {
    const el = this.page.locator(this.btnAddMore);
    await el.waitFor({ state: "visible", timeout: 30_000 });
    await el.click();
  }

  async clickOneItemCompanyTA(codeCompanyTA: string): Promise<void> {
    const xpath = `(//table[@class="v-table-btable"])[5]//tr[.//span[normalize-space(.)="${codeCompanyTA}"]]`;
    const el = this.page.locator(xpath);
    await el.waitFor({ state: "visible", timeout: 5000 });
    await el.click();
  }

  async clickBtnSearchRateCode(): Promise<void> {
    await this.page.locator(this.btnRateCode).click();
  }

  async clickTdTypeRateCode(roomType: string, rateCode: string): Promise<void> {
    const xpath = `//table//tr[.//span[contains(@title, "${rateCode}")]]//td[.//div[contains(@id, "-${roomType.trim()}-")]]`;
    const el = this.page.locator(xpath);
    await el.click();
  }

  getXpathCreateBookingPage(typeField: string): string {
    let locator;

    switch (typeField) {
      case "numProfile":
        locator = this.fieldNumProfile;
        break;
      case "name":
        locator = this.inp_book_name;
        break;
      case "phone":
        locator = this.inp_book_telNum;
        break;
      case "email":
        locator = this.inp_book_email;
        break;
      case "nation":
        locator = this.inp_book_nation;
        break;
      case "arrivalDate":
        locator = this.inp_book_arrivalDate;
        break;
      case "arrTime":
        locator = this.inp_book_arrTime;
        break;
      case "deptDate":
        locator = this.inp_book_deptDate;
        break;
      case "deptTime":
        locator = this.inp_book_deptTime;
        break;
      case "adult":
        locator = this.inp_book_adult;
        break;
      case "children":
        locator = this.inp_book_children;
        break;
      default:
        throw new Error(`Xpath truong ${typeField} khong chinh xac!`);
    }
    return locator;
  }

  async getValueField(typeField: string): Promise<string> {
    const locator = this.getXpathCreateBookingPage(typeField);
    const el = this.page.locator(locator);
    let valueField: string;

    if (typeField === "numProfile") {
      valueField = (await el.textContent()) ?? "";
    } else {
      valueField = await el.inputValue();
    }

    return valueField.trim();
  }

  async checkNumProfileWithData(dataNumProfile: string): Promise<boolean> {
    const numProfile = await this.getValueField("numProfile");
    if (!numProfile) {
      throw new Error("Số profile không được tìm thấy.");
    }

    return numProfile === dataNumProfile;
  }

  async checkInfoBookingWithData(data: any): Promise<boolean> {
    const fullName = this.getFullName(data.firstName, data.lastName);
    const name = await this.getValueField("name");
    const phone = await this.getValueField("phone");
    const email = await this.getValueField("email");
    const arrivalDate = await this.getValueField("arrivalDate");
    const deptDate = await this.getValueField("deptDate");

    return (
      name === fullName &&
      phone === data.phone &&
      email === data.email &&
      arrivalDate === data.arrivalDate &&
      deptDate === data.deptDate
    );
  }

  private async getIndexColumn(nameColumn: string): Promise<number> {
    const xpath = `(//div[@id="guest-reservation-tab"]//table)[1]//tr[1]//td//span//span`;
    let index: number;
    const elements = await this.page.locator(xpath).all();
    const arrColumn = await Promise.all(
      elements.map((el) => el.textContent().then((text) => text?.trim() || ""))
    );
    index = arrColumn.indexOf(nameColumn);
    return index >= 0 ? index + 1 : -1;
  }

  async getContentItemInColumn(nameColumn: string): Promise<string> {
    const indexColumn = await this.getIndexColumn(nameColumn);
    const xpath = `(//div[@id="guest-reservation-tab"]//table)[2]//tr[1]//td[${indexColumn}]//span[not(descendant::span)]`;
    const content = await this.page.locator(xpath).textContent();

    return content?.trim() ?? "";
  }

  async checkUpdateInfoIntoGuestProfile(
    data: any,
    indexRow: number,
    columnStart?: boolean
  ): Promise<boolean> {
    await this.page.waitForTimeout(2000);

    const profileKeys = [
      "firstName",
      "lastName",
      "arrivalDate",
      "deptDate",
      "phone",
      "email",
      "address1",
    ];

    const profile: Record<string, string> = {};

    const baseXpath = `(//div[@id="guest-reservation-tab"]//table)[2]//tr[${indexRow}]//td`;

    await Promise.all(
      profileKeys.map(async (key, i) => {
        let xpath;

        if (columnStart) {
          xpath = `${baseXpath}[${i + 5}]//span[not(descendant::span)]`;
        } else {
          xpath = `${baseXpath}[${i + 3}]//span[not(descendant::span)]`;
        }

        const content = await this.page.locator(xpath).textContent();
        console.log("content web: " + content);
        console.log("value random: " + data[key]);

        profile[key] = content?.trim() ?? "";
      })
    );

    return profileKeys.every((key) => profile[key] === data[key]);
  }

  async clickOneGuestInListTabGuest(phone: string): Promise<void> {
    const xpathRowGuest = `(//div[@id="guest-reservation-tab"]//table)[2]//tr[.//span[not(descendant::span) and normalize-space(.) = "${phone}"]]`;
    const el = this.page.locator(xpathRowGuest);
    await el.click();
  }

  async isCheckedMainGuest(
    index: number,
    indexElement?: number
  ): Promise<boolean> {
    let xpath: string;
    if (indexElement) {
      xpath = `((//div[@id="guest-reservation-tab"]//table)[2]//tr[${index}]//input[@type="checkbox"])[${indexElement}]`;
    } else {
      xpath = `(//div[@id="guest-reservation-tab"]//table)[2]//tr[${index}]//input[@type="checkbox"]`;
    }
    const checkbox = this.page.locator(xpath);
    const isChecked = await checkbox.isChecked();
    return isChecked;
  }

  async getFieldAccommodationInformation(
    field: string,
    indexEl?: number
  ): Promise<string> {
    await this.page.waitForTimeout(2000);

    let xpath: string;
    if (indexEl) {
      xpath = `(//div[@class="guest-info-new-change-view"]//div[contains(text(), "${field}")]/span)[${indexEl}]`;
    } else {
      xpath = `//div[@class="guest-info-new-change-view"]//div[contains(text(), "${field}")]/span`;
    }
    const el = this.page.locator(xpath);
    const count = await el.count();

    if (count === 0) {
      console.log("khong ton tai element nao thoa man xpath");
      return "";
    }
    const content = await el?.textContent();
    console.log("content: " + content);

    return content || "";
  }

  async selectRowListGuest(indexRow: number): Promise<void> {
    const xpath = `(//div[@id="guest-reservation-tab"]//table)[2]//tr[${indexRow}]`;

    await this.page.locator(xpath).click();
  }

  async checkAccommodationInfoTabGuest(data: any): Promise<boolean> {
    const allowedFields = [
      "arrivalDate",
      "deptDate",
      "lastName",
      "firstName",
      "address1",
      "address2",
      "phone",
      "email",
    ] as const;
    await this.page.waitForTimeout(2000);
    for (const field of allowedFields) {
      const param = language.guestInfo[field];
      const xpath = `//div[@class="guest-info-new-change-view"]//div[contains(text(), "${param}")]/span`;
      const el = this.page.locator(xpath);

      const valueField = await el.textContent();

      console.log("value field accom: " + valueField);
      console.log("value dataFillRandom: " + data[field]);

      if (valueField !== data[field]) {
        return false;
      }
    }
    return true;
  }

  async clickBtnSearchRoomAssign(): Promise<void> {
    const el = this.page.locator(this.btnRoomAssign);
    await el.click();
  }

  async selectOneRoomAssign(numRoom: string): Promise<void> {
    const xpathRoom = `(//div[@id="popup-select-room___BV_modal_body_"]//table)[2]//tr[.//td//span[normalize-space()="${numRoom.trim()}"]]`;
    const elRoom = this.page.locator(xpathRoom);

    await elRoom.waitFor({ state: "visible", timeout: 15000 });
    await elRoom.click();
  }

  getXpathInpCheckboxCreateBooking(nameInput: string): string {
    const xpath = `(//div[normalize-space()="${nameInput}"]//label)[1]`;
    return xpath;
  }

  async clickCheckBoxCreateBooking(nameInput: string): Promise<void> {
    const xpath = this.getXpathInpCheckboxCreateBooking(nameInput);
    const el = this.page.locator(xpath);
    await el.waitFor({ state: "visible", timeout: 10000 });
    await el.click();
  }

  getXpathInputCreateBooking(nameInput: string, indexEl?: number): string {
    let xpath;
    if (indexEl) {
      xpath = `(//div[normalize-space()="${nameInput}"]/following-sibling::div//input)[${indexEl}]`;
    } else {
      xpath = `(//div[normalize-space()="${nameInput}"]/following-sibling::div//input)[1]`;
    }
    return xpath;
  }

  async fillInputCreateBooking(
    nameInput: string,
    value: string,
    indexEl?: number
  ): Promise<string> {
    const xpath = this.getXpathInputCreateBooking(nameInput, indexEl);
    const el = this.page.locator(xpath);
    await el.waitFor({ state: "visible", timeout: 10000 });
    await el.fill(value);

    return value;
  }
}
