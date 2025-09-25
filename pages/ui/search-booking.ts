import { expect, Page } from "@playwright/test";
import { BasePage } from "./base-page";
import translations from "@data/languages.json";
import countries from "@data/countries.json";
import ports from "@data/ports.json";
import {
  generateRandomProfile,
  generateRandomString,
} from "@utils/commonHelpers";
import { InputFieldType, ProfileTemplate } from "@utils/types";

const language = translations.vi;

export class SearchBookingPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  private searchBtn = '//button[contains(text(), "Tìm kiếm")]';
  private sb_inpFirstName =
    '//div[@class="ez-row search-row"][3]//div[contains(@class, "ez-col")][3]//input';
  private sb_inpMainInfo = '(//div[@class="ez-row search-row"][1]//input)[1]';
  private checkboxArrivalDate = '//label[@for="cb-arrival-time"]';
  private inpArrivalDateBeginFrom =
    '(//div[@class="ez-flat-pickr-wrapper"]//input)[1]';
  private qvr_guest =
    '//div[@id="advance___BV_modal_content_"]//div[@class="v-checkbox-group"]//table//tr';
  private btnRemoveAttachProfile = '//button[./i[@class="fa fa-remove"]]';
  private inputGuestInfo =
    '//div[@class="ez-row ez-row-no-padding"]//div[@class="ez-col ez-flex7"]//input[@id]';
  private btnSearchSelectGuestProfile =
    '//div[@class="ez-col ez-flex3 text-right"]//button[@type="button"][contains(text(),"Tìm kiếm")]';
  private btnClosePopupSelectGuestProfile =
    '//header[@id="popup-attach-profile___BV_modal_header_"]//button[@aria-label="Close"]';
  private btnClosePopupEditProfile =
    '//header[@id="popup-change-profile___BV_modal_header_"]//button[@aria-label="Close"]';
  private btnClosePopupShortInfo =
    '//header[@id="shortInfoCheckIn___BV_modal_header_"]//button[@aria-label="Close"]';
  private btnClosePopupRegistrationCard =
    '//header[@id="md-report-printer___BV_modal_header_"]//button[@aria-label="Close"]';
  private btnCLosePopupQuickOfReservation =
    '//header[@id="advance___BV_modal_header_"]//button[@aria-label="Close"]';

  // private iziToastMess = '//p[@class="iziToast-message"]';

  async clickSearchBtn(): Promise<void> {
    await this.page.locator(this.searchBtn).click();
  }

  async clickRightMouseRow(indexRow: number): Promise<void> {
    await this.page.click(`(//tr[@class="v-table-row"])[${indexRow}]`, {
      button: "right",
    });
  }

  async clickItemDropdown(string: string): Promise<void> {
    await this.page
      .locator(
        `xpath=//a[@class="list-group-item list-group-item-action"]//span[contains(text(), "${string}")]`
      )
      .click();
  }

  async clickCheckBoxBookStatus(content: string): Promise<void> {
    await this.page
      .locator(`xpath=//label[contains(text(), "${content}")]`)
      .click();
  }

  async clickSearchProfile(): Promise<void> {
    const el = this.page.locator(this.searchProfile);
    await expect(el).toBeVisible({ timeout: 10_000 });
    await el.click();
  }

  async clickOneGuestHasProfile(indexGuest: number): Promise<void> {
    const el = this.page.locator(
      `xpath=//div[@id="popup-attach-profile___BV_modal_body_"]//tr[@class="v-table-row"][${indexGuest}]`
    );
    await expect(el).toBeVisible({ timeout: 10_000 });
    await el.click();
  }

  async clickAttachProfile(string: string): Promise<void> {
    const el = this.page.locator(
      `xpath=//button[contains(text(), "${string}")]`
    );
    await el.click();
    await expect(el).toBeHidden();
  }

  async clickBtnSearchSelectGuestProfile(): Promise<void> {
    await this.page.locator(this.btnSearchSelectGuestProfile).click();
  }

  async clickCheckboxMainGuest(): Promise<void> {
    await this.page.locator(this.labelMainGuest).click();
  }

  async clickCheckboxArrivalDate(): Promise<void> {
    await this.page.locator(this.checkboxArrivalDate).click();
  }

  async clickInpArrivalDateBeginFrom(): Promise<void> {
    const el = this.page.locator(this.inpArrivalDateBeginFrom);
    await el.dblclick();
  }

  async clickBtnRemoveAttachProfile(): Promise<void> {
    await this.page.locator(this.btnRemoveAttachProfile).click();
  }

  async clickBtnClosePopupSelectGuestProfile(): Promise<void> {
    await this.page.locator(this.btnClosePopupSelectGuestProfile).click();
  }
  async clickBtnClosePopupEditProfile(): Promise<void> {
    await this.page.locator(this.btnClosePopupEditProfile).click();
  }

  async clickBtnClosePopupShortInfo(): Promise<void> {
    await this.page.locator(this.btnClosePopupShortInfo).click();
  }

  async clickBtnClosePopupRegistrationCard(): Promise<void> {
    await this.page.locator(this.btnClosePopupRegistrationCard).click();
  }

  async clickBtnCLosePopupQuickOfReservation(): Promise<void> {
    const el = this.page.locator(this.btnCLosePopupQuickOfReservation);
    await el.waitFor({ state: "visible" });
    await el.click();
  }

  async selectMonth(indexInput: number, month: string): Promise<void> {
    if (indexInput <= 0) {
      throw new Error(
        `Invalid indexInput: ${indexInput}. Must be greater than 0`
      );
    }

    const xpathSelectMonth = `(//select[@aria-label="Month"])[${indexInput}]`;
    const elSelectMonth = this.page.locator(xpathSelectMonth);

    try {
      await elSelectMonth.selectOption(month);

      const selectedValue = await elSelectMonth.inputValue();
      if (selectedValue !== month) {
        throw new Error(
          `Failed to select month. Expected: ${month}, Actual: ${selectedValue}`
        );
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(
          `Failed to select month at index ${indexInput}: ${error.message}`
        );
      }
      throw error;
    }
  }

  async selectDay(indexInput: number, day: number): Promise<void> {
    const xpathDay = `(//div[@class="dayContainer"])[${indexInput}]//span[@class="flatpickr-day " and text()="${day}"]`;
    const el = this.page.locator(xpathDay);

    await el.click();
  }

  async handleInputCalendar(
    indexInput: number,
    day: number,
    month: string
  ): Promise<void> {
    await this.clickCheckboxArrivalDate();
    await this.clickInpArrivalDateBeginFrom();
    await this.selectMonth(indexInput, month);
    await this.selectDay(indexInput, day);
  }

  async isDisableInputProfile(): Promise<boolean> {
    const el = this.page.locator(this.inpProfile);
    return await el.isDisabled();
  }

  async isEmptyInput(inputType: InputFieldType): Promise<boolean> {
    const locator = this.getXpath(inputType);
    const el = this.page.locator(locator);
    await this.page.waitForTimeout(3000);
    const value = await el.inputValue();

    return value.trim() === "";
  }

  async checkVisibleNoImg(): Promise<boolean> {
    const noImg = await this.page.locator(this.noImg).count();
    if (noImg == 2) {
      return true;
    } else {
      return false;
    }
  }

  async getElementNoImg(): Promise<number> {
    return await this.page.locator(this.noImg).count();
  }

  async getColumnInfo(nameColumn: string): Promise<number> {
    const xpath = `//div[@id="tbl-list-profile"]//tr//td//div//span[@class="table-title"]//span`;
    const arrColumn = await this.page.locator(xpath).allInnerTexts();
    const index = arrColumn.findIndex((text) => text.trim() === nameColumn);
    return index >= 0 ? index + 1 : -1;
  }

  async checkInfoColumn(nameColumn: string, value: string): Promise<boolean> {
    const indexColumn = await this.getColumnInfo(nameColumn);
    const xpath = `(//div[@id="popup-attach-profile___BV_modal_body_"]//table)[4]//tr//td[${indexColumn}]`;
    const els = await this.page.locator(xpath).elementHandles();

    for (const el of els) {
      const text = await el.innerText();
      if (text.trim() !== value) {
        return false;
      }
    }
    return true;
  }

  async getContentItemInColumn(nameColumn: string): Promise<string> {
    const indexColumn = await this.getColumnInfo(nameColumn);
    const xpath = `//div[@id="popup-attach-profile___BV_modal_body_"]//tr[@style="background-color: rgb(179, 236, 255);"]//td[${indexColumn}]`;
    const content = await this.page.locator(xpath).textContent();

    return content?.trim() ?? "";
  }

  async checkGuestInfo(
    valueProfile: string,
    type: InputFieldType
  ): Promise<boolean> {
    await this.page.waitForTimeout(1000);

    const valueInput = await this.getValueInput(type);

    return valueProfile === valueInput;
  }

  async fillInputInfo(value: string): Promise<void> {
    const el = this.page.locator(this.inputGuestInfo);
    await expect(el).toBeVisible({ timeout: 10_000 });
    await el.fill(value);
  }

  async fillInput(inputType: InputFieldType, value: string): Promise<string> {
    const locator = this.getXpath(inputType);
    const el = this.page.locator(locator);

    await expect(el).toBeVisible({ timeout: 10_000 });

    await el.click();
    await el.press("Control+A");
    await el.press("Backspace");
    await el.fill(value);
    await this.page.mouse.click(1, 1);

    return value;
  }

  async handleSearchProfile(numProfile: string): Promise<void> {
    await this.clickSearchProfile();
    await this.fillInputInfo(numProfile);
    await this.clickBtnSearchSelectGuestProfile();
    await this.waitForLoading();
    await this.clickOneGuestHasProfile(1);
    await this.clickAttachProfile(language.attach_profile);
  }

  async checkInputCharacterString(
    string: string,
    inputType: InputFieldType,
    maxChars: number
  ): Promise<boolean> {
    const limitedString = string.slice(0, maxChars);
    const locator = this.getXpath(inputType);

    await this.fillInput(inputType, string);
    const inputValue = await this.page.locator(locator).inputValue();

    return limitedString === inputValue;
  }

  async isCheckedRadioGender(content: string): Promise<boolean> {
    const contentLower = content.toLowerCase();
    const radioGender = this.page.locator(this.btnRadio);

    if (contentLower === "nam") {
      const radio = radioGender.first();
      return await radio.isChecked();
    } else if (contentLower === "nữ") {
      const radio = radioGender.last();
      return await radio.isChecked();
    }
    return false;
  }

  async checkInputRadioGenderDefault(): Promise<boolean> {
    const radioMale = this.page.locator(this.btnRadio).first();
    return await radioMale.isChecked();
  }

  async checkEmptyCheckboxChild(): Promise<boolean> {
    const el = this.page.locator(this.checkboxChild);
    const isChecked = await el.isChecked();
    const isEnabled = await el.isEnabled();
    return !isChecked && isEnabled;
  }

  async checkEmptyCheckboxMainGuest(): Promise<boolean> {
    const el = this.page.locator(this.checkboxMainGuest);
    const isChecked = await el.isChecked();
    const isEnabled = await el.isEnabled();
    return !isChecked && isEnabled;
  }

  async isAllowCheckCheckboxChild(): Promise<boolean> {
    const radioChild = this.page.locator(this.checkboxChild);
    const isEnabled = await radioChild.isEnabled();

    return isEnabled;
  }

  async isAllowCheckCheckboxMainGuest(): Promise<boolean> {
    const radioChild = this.page.locator(this.checkboxMainGuest);
    const isEnabled = await radioChild.isEnabled();

    return isEnabled;
  }

  async isCheckedCheckboxChid(): Promise<boolean> {
    const el = this.page.locator(this.checkboxChild);

    return await el.isChecked();
  }

  async isCheckedCheckboxMainGuest(): Promise<boolean> {
    const el = this.page.locator(this.checkboxMainGuest);

    return await el.isChecked();
  }

  async clickCheckboxChild(): Promise<void> {
    await this.page.locator(this.labelCheckboxChild).click();
  }

  async sb_fillInputFirstName(value: string): Promise<void> {
    await this.page.locator(this.sb_inpFirstName).fill(value);
  }

  async sb_fillInputMainInfo(value: string): Promise<void> {
    await this.page.locator(this.sb_inpMainInfo).fill(value);
  }

  private async sb_getIndexColumn(nameColumn: string): Promise<number> {
    const xpath = `(//table)[15]//span//span`;
    let index: number;
    const elements = await this.page.locator(xpath).all();
    const arrColumn = await Promise.all(
      elements.map((el) => el.textContent().then((text) => text?.trim() || ""))
    );
    index = arrColumn.indexOf(nameColumn);
    return index >= 0 ? index + 1 : -1;
  }

  async sb_getContentItemInColumn(nameColumn: string): Promise<string> {
    const indexColumn = await this.sb_getIndexColumn(nameColumn);
    const xpath = `(//table)[16]//tr[2]//td[${indexColumn}]`;
    const content = await this.page.locator(xpath).textContent();

    return content?.trim() ?? "";
  }

  async isEnabledField(inputType: InputFieldType): Promise<boolean> {
    const locator = this.getXpath(inputType);
    const el = this.page.locator(locator);
    await expect(el).toBeVisible({ timeout: 10_000 });
    const isEnabled = await el.isEnabled();

    return isEnabled;
  }

  async clickInputDate(indexInput: number): Promise<void> {
    const el = this.page.locator(
      `xpath=(//div[@id="guest-reservation-tab"]//input[@placeholder="__/__/____"])[${indexInput}]`
    );
    await el.click();
  }

  async checkAllowedToChooseOneDate(
    indexCalendar: number,
    arrDate: number,
    deptDate: number
  ): Promise<boolean> {
    for (let i = arrDate; i <= deptDate; i++) {
      const el = this.page.locator(
        `xpath=(//div[@id="popup-guest-for-reservation___BV_modal_body_"]//div[@class="ivu-date-picker-cells"])[${indexCalendar}]//span[.//em[text()="${i}"] and not(contains(@class, "disabled"))]`
      );
      const isAllowed = await el.isVisible();

      if (isAllowed === false) {
        return false;
      }
    }
    return true;
  }

  async isVisibleContentWhenSelectProfile(
    inputType: InputFieldType,
    valueData: string
  ): Promise<boolean> {
    const locator = this.getXpath(inputType);
    const el = this.page.locator(locator);
    await this.page.waitForTimeout(2000);
    const contentInput = await el.inputValue();

    return valueData === contentInput.trim();
  }

  async clickInputNational(): Promise<void> {
    const el = this.page.locator(this.inpNational);
    await expect(el).toBeVisible({ timeout: 10_000 });
    await el.click();
  }

  async clickInputNationality(): Promise<void> {
    const el = this.page.locator(this.inpNationality);
    await expect(el).toBeVisible({ timeout: 10_000 });
    await el.click();
  }

  async fillInputSearch(indexInput: number, valueFill: string): Promise<void> {
    const el = this.page.locator(
      `xpath=(//input[@placeholder="${language.please_enter_info_search}"])[${indexInput}]`
    );

    await expect(el).toBeVisible({ timeout: 10_000 });
    await el.focus();
    await this.page.keyboard.type(valueFill);
  }

  async isEnabledFieldInputSearch(indexInput: number): Promise<boolean> {
    const el = this.page.locator(
      `xpath=(//input[@placeholder="${language.please_enter_info_search}"])[${indexInput}]`
    );

    await expect(el).toBeVisible({ timeout: 10_000 });

    const isEnabled = await el.isEnabled();
    return isEnabled;
  }

  async clickOneFieldNational(string: string): Promise<void> {
    const elItem = this.page.locator(
      `(//table[@class="v-table-btable"])[10]//tr//td[1]//span[contains(text(), "${string}")]`
    );

    await expect(elItem).toBeVisible({ timeout: 10_000 });
    await elItem.click();
  }

  async clickOneFieldNationality(string: string): Promise<void> {
    const elItem = this.page.locator(
      `(//table[@class="v-table-btable"])[11]//tr//td[1]//span[contains(text(), "${string}")]`
    );

    await expect(elItem).toBeVisible({ timeout: 10_000 });
    await elItem.click();
  }

  async getOneFieldNational(string: string): Promise<string> {
    const elSpan = this.page.locator(
      `(//table[@class="v-table-btable"])[10]//tr//td[1]//span[contains(text(), "${string}")]`
    );
    const valueCodeNational = await elSpan?.textContent();
    return valueCodeNational?.trim() || "";
  }

  async getOneFieldNationality(string: string): Promise<string> {
    const elSpan = this.page.locator(
      `(//table[@class="v-table-btable"])[11]//tr//td[1]//span[contains(text(), "${string}")]`
    );
    const valueCodeNational = await elSpan?.textContent();
    return valueCodeNational?.trim() || "";
  }

  async getCountryNameByCode(nameColumn: string): Promise<string> {
    const nameCountry = await this.getContentItemInColumn(nameColumn);

    const country = countries.find((c) => c.description === nameCountry.trim());

    return country ? country.code : "";
  }

  async checkVisibleCorrectContent(
    value1: string,
    value2: string
  ): Promise<boolean> {
    return value1 === value2;
  }

  async clickBtnDeleteFieldInput(fieldInput: InputFieldType): Promise<void> {
    let xpathBtnDelete;

    switch (fieldInput) {
      case "national":
        xpathBtnDelete =
          '(//div[@id="guest-reservation-tab"]//div[@class="ez-col ez-flex9"]//input)[10]/following-sibling::span/i';
        break;
      case "nationality":
        xpathBtnDelete =
          '(//div[@id="guest-reservation-tab"]//div[@class="ez-col ez-flex9"]//input)[12]/following-sibling::span/i';
        break;
      case "entryPort":
        xpathBtnDelete =
          '(//div[@id="guest-reservation-tab"]//div[@class="ez-col ez-flex9"]//input)[38]/following-sibling::span/i';
        break;
      default:
        break;
    }
    if (!xpathBtnDelete) {
      throw new Error(
        `xpathBtnDelete is undefined for fieldInput: ${fieldInput}`
      );
    }
    const el = this.page.locator(xpathBtnDelete);
    await el.waitFor({ state: "visible" });
    await el.click();
  }

  async checkValueDefaultInputNationality(): Promise<boolean> {
    const el = this.page.locator(this.inpNationality);

    await expect(el).toBeVisible({ timeout: 10_000 });

    const content = await el?.inputValue();

    return content.trim() === "VNM";
  }

  async checkListNational(index: number): Promise<boolean> {
    const el = this.page.locator(
      `xpath=(//table[@class="v-table-btable"])[${index}]//tr`
    );

    await this.page.waitForTimeout(2000);
    const countNation = await el.count();

    for (let i = 1; i <= countNation; i++) {
      const elCode = this.page.locator(
        `xpath=(//table[@class="v-table-btable"])[${index}]//tr[${i}]//td[1]//span`
      );
      const elDescription = this.page.locator(
        `xpath=(//table[@class="v-table-btable"])[${index}]//tr[${i}]//td[2]//span`
      );

      const contentCode = await elCode?.textContent();
      const contentDescription = await elDescription?.textContent();

      const dataCode = countries[i - 1].code;
      const dataDescription = countries[i - 1].description;

      const cleanContentCode = contentCode?.trim();
      const cleanContentDescription = contentDescription?.trim();

      if (
        cleanContentCode !== dataCode ||
        cleanContentDescription !== dataDescription
      ) {
        return false;
      }
    }
    return true;
  }

  async handleCommonStepsSearchReservation(): Promise<void> {
    await this.clickSearchBtn();
    await this.clickRightMouseRow(2);
    await this.clickItemDropdown(language.quick_view_of_reservation);
  }

  async fillInpNumMember(value: string | number): Promise<void> {
    await this.page.locator(this.inpNumMember).fill(value.toString());
  }

  private getXpathItemCalenderDisable(indexCalendar: number): string {
    const xpathDisabled = `(//div[@class="ivu-select-dropdown"])[${indexCalendar}]//span[contains(@class, "ivu-date-picker-cells-cell-disabled")]`;
    return xpathDisabled;
  }

  async checkAllowSelectOneDay(indexCalendar: number): Promise<boolean> {
    const xpathDisabled = this.getXpathItemCalenderDisable(indexCalendar);
    const countDayDisable = await this.page
      .locator(`xpath=${xpathDisabled}`)
      .count();

    return countDayDisable === 0;
  }

  async clickOneDayInCalendar(
    indexCalendar: number,
    day: number
  ): Promise<void> {
    const el = this.page.locator(
      `xpath=(//div[@class="ivu-select-dropdown"])[${indexCalendar}]//span[.//em[text()="${day}"]]`
    );
    await expect(el).toBeVisible({ timeout: 10_000 });
    await el.click();
  }

  async checkDateFormat(dateInput: string): Promise<boolean> {
    const dateRegex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;

    return dateRegex.test(dateInput);
  }

  async handleClickSelectPurpose(valueOption: string): Promise<void> {
    const el = this.page.locator(this.selectPurpose);

    await el.selectOption(valueOption);
    const result = await el.inputValue();

    return expect(result).toBe(valueOption);
  }

  async clickInputPort(): Promise<void> {
    const el = this.page.locator(this.inpEntryPort);

    await el.waitFor({ state: "visible" });
    await el.click();
  }

  async checkListPorts(): Promise<boolean> {
    const el = this.page.locator(
      `xpath=(//table[@class="v-table-btable"])[13]//tr`
    );

    const countPorts = await el.count();

    for (let i = 1; i <= countPorts; i++) {
      const elCode = this.page.locator(
        `xpath=(//table[@class="v-table-btable"])[13]//tr[${i}]//td[1]//span`
      );
      const elDescription = this.page.locator(
        `xpath=(//table[@class="v-table-btable"])[13]//tr[${i}]//td[2]//span`
      );

      const contentCode = await elCode?.textContent();
      const contentDescription = await elDescription?.textContent();

      const dataCode = ports[i - 1].code;
      const dataDescription = ports[i - 1].description;

      const cleanContentCode = contentCode?.trim();
      const cleanContentDescription = contentDescription?.trim();

      if (
        cleanContentCode !== dataCode ||
        cleanContentDescription !== dataDescription
      ) {
        return false;
      }
    }
    return true;
  }

  async getOneFieldPort(string: string): Promise<string> {
    const elSpan = this.page.locator(
      `(//table[@class="v-table-btable"])[13]//tr//td[1]//span[contains(text(), "${string}")]`
    );
    const valueCodeNational = await elSpan?.textContent();
    return valueCodeNational?.trim() || "";
  }

  async clickOneFieldPorts(string: string): Promise<void> {
    const elItem = this.page.locator(
      `(//table[@class="v-table-btable"])[13]//tr//td[1]//span[contains(text(), "${string}")]`
    );

    await expect(elItem).toBeVisible({ timeout: 10_000 });
    await elItem.click();
  }

  async clickBtnSaveAndUpdateGuestProfile(): Promise<void> {
    await this.page.waitForTimeout(2000);
    await this.page.locator(this.btnSaveAndUpdateGuestProfile).click();
  }

  async handleFillFieldsProfile(): Promise<ProfileTemplate> {
    const randomProfile = generateRandomProfile();

    for (const [key, value] of Object.entries(randomProfile)) {
      if (value) {
        await this.fillInput(key as InputFieldType, value.toString());
      }
    }

    return randomProfile;
  }

  async qvr_clickOneRowGuest(): Promise<void> {
    await this.page.waitForTimeout(3000);
    const el = this.page.locator(this.qvr_guest).last();
    await el.click();
  }

  private async getIndexColumnTableQuickViewOfReservation(
    nameColumn: string
  ): Promise<number> {
    const xpath = `(//div[@id="advance"]//table)[1]//td//span[not(descendant::span)]`;
    let index: number;
    const elements = await this.page.locator(xpath).all();
    const arrColumn = await Promise.all(
      elements.map((el) => el.textContent().then((text) => text?.trim() || ""))
    );
    index = arrColumn.indexOf(nameColumn);
    return index >= 0 ? index + 1 : -1;
  }

  async getContentInColumnTableQuickViewOfReservation(
    nameColumn: string
  ): Promise<string> {
    const indexColumn =
      await this.getIndexColumnTableQuickViewOfReservation(nameColumn);
    const xpath = `((//div[@id="advance"]//table)[2]//tr[1]//td//span[not(descendant::span)])[${indexColumn}]`;
    const content = await this.page.locator(xpath).textContent();

    return content?.trim() ?? "";
  }

  async getNumberPhoneTableQuickViewOfReservation(
    nameColumn: string,
    indexRow: number
  ): Promise<string> {
    const indexColumn =
      await this.getIndexColumnTableQuickViewOfReservation(nameColumn);
    const xpathColumn = `((//div[@id="advance"]//table)[2]//tr[${indexRow}]//td//span[not(descendant::span)])[${indexColumn}]`;
    const elField = this.page.locator(xpathColumn);
    const content = await elField.textContent();

    return content?.trim() ?? "";
  }

  async clickOneRowTableQuickViewOfReservation(
    indexRow: number
  ): Promise<void> {
    const xpathRow = `(//div[@id="advance"]//table)[2]//tr[${indexRow}]`;
    const elRow = this.page.locator(xpathRow);

    await elRow.click();
  }

  async checkAllowOneDay(
    indexCalendar: number,
    dayHotel: number,
    totalDays: number
  ): Promise<boolean> {
    try {
      for (let d = 1; d < dayHotel; d++) {
        const xpath = `(//div[@id="popup-guest-for-reservation___BV_modal_body_"]//div[@class="ivu-date-picker-cells"])[${indexCalendar}]//span[.//em[text()="${d}"] and contains(@class, "disabled")]`;
        const count = await this.page.locator(xpath).count();
        if (count !== 1) {
          return false;
        }
      }

      for (let d = dayHotel; d <= totalDays; d++) {
        const xpath = `(//div[@id="popup-guest-for-reservation___BV_modal_body_"]//div[@class="ivu-date-picker-cells"])[${indexCalendar}]//span[.//em[text()="${d}"] and not(contains(@class, "disabled")) and not(contains(@class, "next-month"))]`;
        const count = await this.page.locator(xpath).count();
        if (count > 0) {
          if (count !== 1) {
            return false;
          }
        }
      }
      return true;
    } catch (error) {
      console.error("Error in checkAllowOneDay:", error);
      return false;
    }
  }

  async getValueFieldsEditProfile(indexField: number): Promise<string> {
    const xpath = `(//div[@id="popup-change-profile___BV_modal_content_"]//input)[${indexField}]`;
    const el = this.page.locator(xpath);
    await this.page.waitForTimeout(2000);
    const inputValue = await el.inputValue();
    console.log("value field edit profile: " + inputValue);

    return inputValue;
  }

  async selectRandomOneFieldGuestLevel(): Promise<boolean> {
    const xpath = `(//table[@class="v-table-btable"])[12]//tr`;
    const xpathInput = this.getXpath("guestLevel");
    const countRow = await this.page.locator(xpath).count();

    if (countRow === 0) {
      throw new Error("Không tìm thấy dữ liệu guest level");
    }

    const randomIndex = Math.floor(Math.random() * countRow) + 1;

    const randomRowXpath = `(//table[@class="v-table-btable"])[12]//tr[${randomIndex}]`;
    const el = this.page.locator(randomRowXpath);
    const xpathNameGuestLevel = `(//table[@class="v-table-btable"])[12]//tr[${randomIndex}]//td[2]//span`;
    const content = await this.page.locator(xpathNameGuestLevel).textContent();
    await el.click();
    const contentInput = await this.page.locator(xpathInput).inputValue();

    console.log("Content data: " + content?.trim());
    console.log("Content Input: " + contentInput);

    return content?.trim() === contentInput.trim();
  }

  async clickInputGuestLevel(): Promise<void> {
    const xpath = this.getXpath("guestLevel");
    await this.page.locator(xpath).click();
  }

  async getContentInputShortInfo(indexInput: number): Promise<string> {
    const xpath = `(//div[@id="shortInfoCheckIn___BV_modal_content_"]//input)[${indexInput}]`;
    const el = this.page.locator(xpath);
    const inpValue = await el.inputValue();

    console.log("shortinfo inpvalue: " + inpValue);

    return inpValue;
  }

  async clickRightMouseRowCheckin(): Promise<void> {
    await this.page.click(`((//table)[16]//tr[position() > 1])[1]`, {
      button: "right",
    });
  }

  async getTotalRowGuest(): Promise<number> {
    const xpath = "(//table)[16]//tr[position() > 1]";
    const el = this.page.locator(xpath);

    return await el.count();
  }
}
