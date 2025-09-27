import { Locator, Page, expect } from "@playwright/test";
import { InputFieldType } from "@utils/types";

import { Country } from "@utils/types";
import countriesData from "@data/countries.json";
import translations from "@data/languages.json";

const language = translations.vi;

export class BasePage {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // Xpath locators
  private iconUser = '//span[text()="account_circle"]';
  private flagVi = '(//div[contains(@class, "item-lang")])[1]';
  private flagEn = '(//div[contains(@class, "item-lang")])[2]';
  private loading = '//div[@class="loading-ez"]';

  private btnAddGuest = '//button[contains(text(), "Thêm khách")]';
  private headerPopupAddGuest =
    '//header[@id="popup-guest-for-reservation___BV_modal_header_"]';
  private popupSwalModel = '//div[@role="dialog" and @class="swal-modal"]';
  private contentPopupSwalModel =
    '//div[@role="dialog" and @class="swal-modal"]//div[@class="swal-text"]';
  private btnSaveAddGuest = `//div[@id="guest-reservation-tab"]//button[normalize-space(.) = "${language.save}"]`;

  // màn thêm/sua khách cho đặt phòng / add guest to booking
  protected inpProfile =
    '//input[@class="profile-num form-control form-control-sm"]';
  protected noImg = '//img[containcheckboxMainGuests(@class, "no-imag")]';
  protected lastName = '//input[@id="last-name"]';
  protected firstName = '//input[@id="first-name"]';
  protected btnRadio = '//div[@role="radiogroup"]//input[@name="gender-guest"]';
  protected checkboxChild = '//input[@id="is-children"]';
  protected labelCheckboxChild = '//label[@for="is-children"]';
  protected checkboxMainGuest = '//input[@id="main-guest"]';
  protected labelMainGuest = '//label[@for="main-guest"]';
  protected searchProfile =
    '//div[@id="popup-guest-for-reservation___BV_modal_content_"]//button[i[contains(@class, "fa-search")]]';
  protected arrivalDate = '//div[@id="arrival-time"]//input';
  protected deptDate = '//div[@id="departure-time"]//input';
  protected inpBirthday =
    '(//div[@id="guest-reservation-tab"]//div[@class="ez-col ez-flex9"]//input)[4]';
  protected inpNational =
    '(//div[@id="guest-reservation-tab"]//div[@class="ez-col ez-flex9"]//input)[10]';
  protected inpNationality =
    '(//div[@id="guest-reservation-tab"]//div[@class="ez-col ez-flex9"]//input)[12]';
  protected inpNumMember =
    '(//div[@id="guest-reservation-tab"]//div[@class="ez-col ez-flex9"]//input)[14]';
  protected btnDropdownGuestLevel = '(//button[@type="button"])[44]';
  protected inpGuestLevel =
    '(//div[@id="guest-reservation-tab"]//div[@class="ez-col ez-flex9"]//input)[15]';
  protected address1 = '//input[@id="address-line1"]';
  protected address2 = '//input[@id="address-line2"]';
  protected inpPhone = '//input[@id="tel"]';
  protected flagNation =
    '//div[@aria-label="Country Code Selector"]//span[@class="vti__flag --"]';
  protected inpEmail = '//input[@id="email"]';
  protected inpOccupation =
    '(//div[@id="guest-reservation-tab"]//div[@class="ez-col ez-flex9"]//input)[21]';
  protected inpPassport = '//input[@id="passport"]';
  protected inpTypePassport =
    '(//div[@id="guest-reservation-tab"]//div[@class="ez-col ez-flex9"]//input)[23]';
  protected inpResidentCard =
    '(//div[@id="guest-reservation-tab"]//div[@class="ez-col ez-flex9"]//input)[24]';

  protected inpValidToDate =
    '(//div[@id="guest-reservation-tab"]//div[@class="ez-col ez-flex9"]//input[@placeholder="__/__/____"])[4]';
  protected inpIdNo =
    '(//div[@id="guest-reservation-tab"]//div[@class="ez-col ez-flex9"]//input)[26]';
  protected inpIdentityIssueDate =
    '(//div[@id="guest-reservation-tab"]//div[@class="ez-col ez-flex9"]//input)[27]';
  protected inpIdentityIssueBy =
    '(//div[@id="guest-reservation-tab"]//div[@class="ez-col ez-flex9"]//input)[28]';
  protected inpOtherDocument =
    '(//div[@id="guest-reservation-tab"]//div[@class="ez-col ez-flex9"]//input)[29]';
  protected inpVisa =
    '(//div[@id="guest-reservation-tab"]//div[@class="ez-col ez-flex9"]//input)[30]';
  protected inpTypeVisa =
    '(//div[@id="guest-reservation-tab"]//div[@class="ez-col ez-flex9"]//input)[31]';
  protected inpIssueDate =
    '(//div[@id="guest-reservation-tab"]//div[@class="ez-col ez-flex9"]//input)[32]';
  protected inpExpriseDate =
    '(//div[@id="guest-reservation-tab"]//div[@class="ez-col ez-flex9"]//input)[33]';
  protected inpIssuedBy =
    '(//div[@id="guest-reservation-tab"]//div[@class="ez-col ez-flex9"]//input)[34]';
  protected inpEntryDateFrom =
    '(//div[@id="guest-reservation-tab"]//div[@class="ez-col ez-flex9"]//input)[35]';
  protected inpEntryDateTo =
    '(//div[@id="guest-reservation-tab"]//div[@class="ez-col ez-flex9"]//input)[36]';
  protected inpEntryFrom =
    '(//div[@id="guest-reservation-tab"]//div[@class="ez-col ez-flex9"]//input)[37]';
  protected inpEntryPort =
    '(//div[@id="guest-reservation-tab"]//div[@class="ez-col ez-flex9"]//input)[38]';
  protected selectPurpose = '(//select[@class="custom-select"])[3]';
  protected textareaNote = '//textarea[@id="remark"]';
  protected btnSaveAndUpdateGuestProfile =
    '//button[contains(text(), "Lưu khách và Cập nhật Hồ sơ khách")]';
  protected inpArrTime = '(//input[@placeholder="__:__"])[1]';
  protected inpDeptTime = '(//input[@placeholder="__:__"])[2]';

  protected checkboxAssignAll =
    '//table[@id="tableAssign"]//tr//child::th[1]//div';

  //Popup
  private popupQuickViewOfReservation =
    '//div[@id="advance___BV_modal_content_"]';
  private popupAddGuestOfReservation =
    '//div[@id="popup-guest-for-reservation___BV_modal_content_"]';
  private popupSelectGuestProfile =
    '//div[@id="popup-attach-profile___BV_modal_content_"]';
  private popupShortInformation =
    '//div[@id="shortInfoCheckIn___BV_modal_content_"]';
  private popupRegistrationCard =
    '//div[@id="md-report-printer___BV_modal_content_"]';
  private popupRateQuery = '//div[@id="id-rate-query___BV_modal_content_"]';
  private popupRateQueryDetail =
    '//div[@id="id-rate-query-detail___BV_modal_content_"]';
  private popupSelectRoom =
    '//div[@id="popup-select-room___BV_modal_content_"]';
  private popupAddRoomCharge =
    '//div[@id="post-rm-charge___BV_modal_content_"]';
  private trnsMess = '//div[@id="trns-mess-id___BV_modal_body_"]';
  private popupPaymentDepositRefund =
    '//div[@id="payment-deposit-refund___BV_modal_content_"]';
  private popupCheckoutGuest = '//div[@id="checkout-guest"]';

  private qvr_btnRegcard = `//div[@id="advance___BV_modal_content_"]//button[normalize-space(.) = "${language.reg_card}"]`;

  protected iziToastMess = '//p[@class="iziToast-message"]';
  protected swalModalMess =
    '//div[@class="swal-modal"]//div[@class="swal-text"]';
  protected btnCloseLicense =
    '//div[@aria-live="polite"]//button[@class="close"]';
  protected headerPage = '//div[contains(@class, "ez-page-header")]';
  private btnDeleteSaler =
    '(//div[normalize-space()="NV kinh doanh"]/following-sibling::div//i)[1]';
  private selectStatus =
    '(//div[normalize-space()="Trạng thái"]/following-sibling::div//select[@name="status"])[1]';
  private btnDropdownRateCode =
    '(//div[normalize-space()="Mã giá"]/following-sibling::div//button)[1]';
  private inpArrCarrier = '//input[@id="arr_carrier"]';
  private inpArrTimeGroup = '//input[@id="arr_fl_time"]';
  private inpDeptCarrier = '//input[@id="dpt_carrier"]';
  private inpDeptTimeGroup = '//input[@id="dpt_flt_time"]';
  private checkboxNett = '//label[@for="chkNett"]';

  // Function
  async clickCheckboxNett(): Promise<void> {
    const el = this.page.locator(this.checkboxNett);
    await el.waitFor({ state: "visible", timeout: 10000 });
    await el.click();
  }

  async getXpathNett() {
    return this.page.locator(this.checkboxNett);
  }

  async fillArrCarrier(arrCarrier: string): Promise<void> {
    const el = this.page.locator(this.inpArrCarrier);
    await el.waitFor({ state: "visible", timeout: 10000 });
    await el.fill(arrCarrier);
  }

  async fillArrTime(arrTime: string): Promise<void> {
    const el = this.page.locator(this.inpArrTimeGroup);
    await el.waitFor({ state: "visible", timeout: 10000 });
    await el.fill(arrTime);
  }

  async fillDeptCarrier(deptCarrier: string): Promise<void> {
    const el = this.page.locator(this.inpDeptCarrier);
    await el.waitFor({ state: "visible", timeout: 10000 });
    await el.fill(deptCarrier);
  }

  async fillDeptTime(deptTime: string): Promise<void> {
    const el = this.page.locator(this.inpDeptTimeGroup);
    await el.waitFor({ state: "visible", timeout: 10000 });
    await el.fill(deptTime);
  }

  async clickFieldRateCode(): Promise<void> {
    const el = this.page.locator(this.btnDropdownRateCode);
    await el.waitFor({ state: "visible", timeout: 10000 });
    await el.click();
  }

  async selectOneItemRateCode(rateCode: string): Promise<void> {
    const xpath = `(//div[normalize-space()="Mã giá"]/following-sibling::div//table)[2]//tr[.//span[normalize-space()="${rateCode}"]]`;
    const el = this.page.locator(xpath);
    await el.waitFor({ state: "visible", timeout: 10000 });
    await el.click();
  }

  async selectStatusReservation(status: string): Promise<void> {
    const el = this.page.locator(this.selectStatus);
    await el.waitFor({ state: "visible", timeout: 10000 });
    await el.selectOption({ label: status });
  }

  async clickBtnDeleteSaler(): Promise<void> {
    const el = this.page.locator(this.btnDeleteSaler);
    await el.waitFor({ state: "visible", timeout: 10000 });
    await el.click();
  }

  getXpathBtnDeleteInput(nameInput: string): Locator {
    const xpath = `(//div[normalize-space()="${nameInput}"]/following-sibling::div//span[@title="Xóa dữ liệu"]//i)[1]`;
    const el = this.page.locator(xpath);
    return el;
  }

  async clickBtnDeleteInput(nameInput: string): Promise<void> {
    const btn = this.getXpathBtnDeleteInput(nameInput);
    await btn.waitFor({ state: "visible", timeout: 10_000 });
    await btn.click();
  }

  getXpathHeaderPage(): Locator {
    const el = this.page.locator(this.headerPage);
    return el;
  }

  getElMessageSwalModal(): Locator {
    const el = this.page.locator(this.swalModalMess);
    return el;
  }

  async clickBtnCloseLicense() {
    const el = this.page.locator(this.btnCloseLicense);
    await el.waitFor({ state: "visible", timeout: 10_000 });
    await el.click();
  }

  async waitForTimeout(timeout: number): Promise<void> {
    await this.page.waitForTimeout(timeout);
  }

  async waitForLoading(): Promise<void> {
    await expect(this.page.locator(this.loading)).toBeHidden({
      timeout: 50_000,
    });
  }

  async clickUser(): Promise<void> {
    const el = this.page.locator(this.iconUser);
    await expect(el).toBeVisible({
      timeout: 60_000,
    });
    await el.click();
  }

  async clickFlagLanguage(language: string): Promise<void> {
    if (language === "vi") {
      await this.page.locator(this.flagVi).click();
    } else if (language === "en") {
      await this.page.locator(this.flagEn).click();
    }
  }

  async clickTab(nameTab: string): Promise<void> {
    await this.page
      .locator(
        `xpath=//ul[@role="tablist"]//li[.//a[contains(text(), "${nameTab}")]]`
      )
      .click();
  }

  async clickBtnAddGuest(): Promise<void> {
    await this.page
      .locator(this.btnAddGuest)
      .waitFor({ state: "visible", timeout: 10_000 });

    await this.page.locator(this.btnAddGuest).click();
    await expect(
      this.page.locator(`xpath=${this.headerPopupAddGuest}`)
    ).toBeVisible({ timeout: 30_000 });
  }

  async clickBtn(nameBtn: string, indexBtn?: number): Promise<void> {
    let xpath;

    if (indexBtn) {
      xpath = `(//button[normalize-space(.) = "${nameBtn}"])[${indexBtn}]`;
    } else {
      xpath = `//button[normalize-space(.) = "${nameBtn}"]`;
    }

    const el = this.page.locator(xpath);
    // await el.waitFor({ state: "visible", timeout: 30_000 });
    await el.waitFor({ state: "visible" });
    await expect(el).toBeEnabled({ timeout: 30_000 });
    await el.click(); // force click nếu button có thể bị vô hiệu hóa
  }

  getFullName(firstName: string, lastName: string): string {
    return `${lastName} ${firstName}`;
  }

  async waitForPopupSwalModel(): Promise<void> {
    const el = this.page.locator(this.popupSwalModel);
    await el.waitFor({ state: "visible", timeout: 10_000 });
  }

  async verifyPopupSwalModelMessage(expectedMessage: string): Promise<void> {
    const el = this.page.locator(this.contentPopupSwalModel);
    await expect(el).toContainText(expectedMessage);
  }

  async clickBtnOkPopupSwalModel(nameBtn: string): Promise<void> {
    const xpath = `//div[@role="dialog" and @class="swal-modal"]//button[normalize-space(.) = "${nameBtn}"]`;

    await this.page.locator(xpath).click();
  }

  async clickBtnSaveAddGuest(): Promise<void> {
    await this.page.waitForTimeout(2000);
    await this.page.locator(this.btnSaveAddGuest).click();
  }

  async isEnabledBtn(nameBtn: string): Promise<boolean> {
    const locator = `//button[normalize-space(.) = "${nameBtn}"]`;
    const el = this.page.locator(locator);
    await expect(el).toBeVisible({ timeout: 10_000 });
    const isEnabled = await el.isEnabled();

    return isEnabled;
  }

  protected getXpath(inputType: InputFieldType): string {
    let locator: string;
    switch (inputType) {
      case "arrivalDate":
        locator = this.arrivalDate;
        break;
      case "deptDate":
        locator = this.deptDate;
        break;
      case "lastName":
        locator = this.lastName;
        break;
      case "firstName":
        locator = this.firstName;
        break;
      case "profile":
        locator = this.inpProfile;
        break;
      case "birthday":
        locator = this.inpBirthday;
        break;
      case "national":
        locator = this.inpNational;
        break;
      case "nationality":
        locator = this.inpNationality;
        break;
      case "numMember":
        locator = this.inpNumMember;
        break;
      case "guestLevel":
        locator = this.inpGuestLevel;
        break;
      case "address1":
        locator = this.address1;
        break;
      case "address2":
        locator = this.address2;
        break;
      case "phone":
        locator = this.inpPhone;
        break;
      case "email":
        locator = this.inpEmail;
        break;
      case "occupation":
        locator = this.inpOccupation;
        break;
      case "passport":
        locator = this.inpPassport;
        break;
      case "typePassport":
        locator = this.inpTypePassport;
        break;
      case "residentCard":
        locator = this.inpResidentCard;
        break;
      case "validToDate":
        locator = this.inpValidToDate;
        break;
      case "idNo":
        locator = this.inpIdNo;
        break;
      case "identityIssueDate":
        locator = this.inpIdentityIssueDate;
        break;
      case "identityIssueBy":
        locator = this.inpIdentityIssueBy;
        break;
      case "otherDocument":
        locator = this.inpOtherDocument;
        break;
      case "visa":
        locator = this.inpVisa;
        break;
      case "typeVisa":
        locator = this.inpTypeVisa;
        break;
      case "issueDate":
        locator = this.inpIssueDate;
        break;
      case "expriseDate":
        locator = this.inpExpriseDate;
        break;
      case "issuedBy":
        locator = this.inpIssuedBy;
        break;
      case "entryDateFrom":
        locator = this.inpEntryDateFrom;
        break;
      case "entryDateTo":
        locator = this.inpEntryDateTo;
        break;
      case "entryFrom":
        locator = this.inpEntryFrom;
        break;
      case "purpose":
        locator = this.selectPurpose;
        break;
      case "entryPort":
        locator = this.inpEntryPort;
        break;
      case "note":
        locator = this.textareaNote;
        break;
      case "saveAndUpdateGuestProfile":
        locator = this.btnSaveAndUpdateGuestProfile;
        break;
      case "guestLevel":
        locator = this.btnDropdownGuestLevel;
        break;
      case "arrTime":
        locator = this.inpArrTime;
        break;
      case "deptTime":
        locator = this.inpDeptTime;
        break;
      default:
        throw new Error(`Unsupported input type: ${inputType}`);
    }

    return locator;
  }

  async getValueInput(inputType: InputFieldType): Promise<string> {
    const locator = this.getXpath(inputType);
    const el = this.page.locator(locator);
    await this.page.waitForTimeout(2000);
    const inputValue = await el.inputValue();

    console.log("input value: " + inputValue);

    return inputValue;
  }

  async checkStatePopup(
    namePopup: string,
    state: "visible" | "hidden"
  ): Promise<boolean> {
    let xpath;
    switch (namePopup) {
      case "quick view of reservation":
        xpath = this.popupQuickViewOfReservation;
        break;
      case "add guest of reservation":
        xpath = this.popupAddGuestOfReservation;
        break;
      case "select guest profile":
        xpath = this.popupSelectGuestProfile;
        break;
      case "short information":
        xpath = this.popupShortInformation;
        break;
      case "registration card":
        xpath = this.popupRegistrationCard;
        break;
      case "rate query":
        xpath = this.popupRateQuery;
        break;
      case "rate query detail":
        xpath = this.popupRateQueryDetail;
        break;
      case "select room":
        xpath = this.popupSelectRoom;
        break;
      case "add room charge":
        xpath = this.popupAddRoomCharge;
        break;
      case "trns mess":
        xpath = this.trnsMess;
        break;
      case "payment deposit refund":
        xpath = this.popupPaymentDepositRefund;
        break;
      case "checkout guest":
        xpath = this.popupCheckoutGuest;
        break;
      default:
        return false;
    }
    if (!xpath) return false;

    const el = this.page.locator(`xpath=${xpath}`);

    try {
      if (state === "visible") {
        await el.waitFor({ state: "visible", timeout: 30_000 });
        // console.log(`Popup "${namePopup}" đã hiển thị thành công`);
        return true;
      } else if (state === "hidden") {
        await el.waitFor({ state: "hidden", timeout: 30_000 });
        // console.log(`Popup "${namePopup}" đã ẩn thành công`);
        return true;
      } else return false;
    } catch (error) {
      console.log(
        `Popup "${namePopup}" không ${state === "visible" ? "hiển thị" : "ẩn"} trong thời gian chờ`
      );
      return false;
    }
  }

  async waitElement(): Promise<void> {
    const el = this.page.locator(this.popupRegistrationCard);
    await el.waitFor({ state: "visible", timeout: 30_000 });
  }

  async isContainContentInput(
    inputType: InputFieldType,
    content?: string
  ): Promise<boolean> {
    const locator = this.getXpath(inputType);
    const el = this.page.locator(locator);
    await this.page.waitForTimeout(2000);
    const check = await el.inputValue();
    console.log(inputType + ": " + check);

    if (content) {
      return content === check;
    } else {
      return check === "";
    }
  }

  getCountryCodeByDescription(description: string): string {
    const country = (countriesData as Country[]).find(
      (country) =>
        country.description.toLowerCase() === description.toLowerCase()
    );

    console.log("code national: " + country?.code);
    return country ? country.code : "";
  }
  async getContentFieldRegistrationCard(
    indexTable: number,
    field: string
  ): Promise<string> {
    const xpath = `(//div[contains(@id, "regcard")]//table)[${indexTable}]//tr//td[2]//span[contains(text(), "${field}")]`;
    const frame = this.page.frameLocator('xpath=//iframe[@id="temp-report"]');
    const el = frame.locator(xpath);

    await el.waitFor({ state: "visible", timeout: 30_000 });

    const count = await el.count();
    console.log(`Số lượng element match với xpath: ${count}`);

    if (count === 0) {
      throw new Error(`Không tìm thấy element với xpath: ${xpath}`);
    }

    const content = await el.first().textContent();
    const valueField = content?.trim().split(" ").pop();
    console.log(`regcard value ${field}: ${valueField}`);

    return valueField || "";
  }

  async qvr_clickBtnRegCard(): Promise<void> {
    await this.page.locator(this.qvr_btnRegcard).click();
  }

  async clickOneRowGuestTableQuickViewReservation(
    phone: string
  ): Promise<void> {
    const xpath = `(//div[@id="advance"]//table)[2]//tr[.//span[not(descendant::span) and normalize-space(.) = "${phone}"]]`;
    const el = this.page.locator(xpath);

    await el.click();
  }

  async getToastMessage(): Promise<string> {
    const el = this.page.locator(this.iziToastMess).last();
    await el.waitFor({ state: "visible", timeout: 60_000 });
    const notice = await el.textContent();
    const noticeWithoutDate = notice?.split("!")[0] + "!";

    return noticeWithoutDate;
  }

  async isVisibleToastMessage(content: string): Promise<boolean> {
    const xpath = `//p[@class="iziToast-message" and contains(text(), "${content}")]`;
    const el = this.page.locator(xpath);
    await el.waitFor({ state: "visible", timeout: 30_000 });
    const isVisibled = await el.isVisible();

    return isVisibled;
  }
  async isVisibleToastMessageLast(content: string): Promise<boolean> {
    const xpath = `//p[@class="iziToast-message" and contains(text(), "${content}")]`;
    const x = '//p[@class="iziToast-message"]';
    const e = this.page.locator(x);
    await e.waitFor({ state: "visible", timeout: 30_000 });
    console.log(await e.textContent());
    const el = this.page.locator(xpath).last();
    await el.waitFor({ state: "visible", timeout: 30_000 });
    const isVisibled = await el.isVisible();

    return isVisibled;
  }

  async clickCloseToastMessage(): Promise<void> {
    const xpath =
      '//p[contains(text(), "Bạn cần kiểm toán đêm")]/ancestor::div[contains(@class, "iziToast")]/button[@class="iziToast-close"]';
    const element = this.page.locator(xpath).first();

    await element.waitFor({ state: "visible", timeout: 20_000 });

    await element.click();
  }

  async clickCheckboxAssignAll(): Promise<void> {
    const el = this.page.locator(this.checkboxAssignAll);

    await el.waitFor({ state: "visible", timeout: 30_000 });
    await el.click({ force: true });
  }

  async isCheckedCheckboxAssignAll(): Promise<boolean> {
    const el = this.page.locator(this.checkboxAssignAll);
    await el.waitFor({ state: "visible", timeout: 20_000 });
    const isChecked = await el.isChecked();

    return isChecked;
  }

  async clickSearchRoomAssign(): Promise<void> {
    const xpath = '//button[@title="Tìm thông tin khách"]';
    const el = this.page.locator(xpath);
    await el.waitFor({ state: "visible", timeout: 20_000 });
    await el.click();
  }
}
