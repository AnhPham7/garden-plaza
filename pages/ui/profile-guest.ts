import { expect, Page } from "@playwright/test";
import { BasePage } from "./base-page";
import translations from "@data/languages.json";
import countries from "@data/countries.json";
import ports from "@data/ports.json";
// import guestProfile from "@data/guest-profile.json";
import { generateRandomProfile } from "@utils/commonHelpers";
import {
  InputFieldType,
  ProfileData,
  ProfileTemplate,
  fieldBooking,
} from "@utils/types";

const language = translations.vi;

export class ProfileGuestPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  //   xpath locator
  private inp_guestInfo = '(//input[@type="text"])[1]';

  private popup_change_profile =
    '//div[@id="popup-change-profile___BV_modal_content_"]';

  private inp_lastname = '(//div[@role="tabpanel"]//input)[2]';
  private inp_firstname = '(//div[@role="tabpanel"]//input)[3]';
  private inp_birthday = '(//div[@role="tabpanel"]//input)[6]';
  private inp_greeting = '(//div[@role="tabpanel"]//input)[7]';
  private inp_email = '(//div[@role="tabpanel"]//input)[8]';
  private inp_phone = '(//div[@role="tabpanel"]//input)[9]';
  private inp_levelGuest = '(//div[@role="tabpanel"]//input)[10]';
  private inp_numMember = '(//div[@role="tabpanel"]//input)[12]';
  private inp_passport = '(//div[@role="tabpanel"]//input)[13]';
  private inp_visa = '(//div[@role="tabpanel"]//input)[14]';
  private inp_expriseDate = '(//div[@role="tabpanel"]//input)[15]';
  private inp_placeOfIssue = '(//div[@role="tabpanel"]//input)[16]';
  private inp_idNo = '(//div[@role="tabpanel"]//input)[17]';
  private inp_issueDate = '(//div[@role="tabpanel"]//input)[18]';
  private inp_identityIssueBy = '(//div[@role="tabpanel"]//input)[19]';
  private inp_otherDocument = '(//div[@role="tabpanel"]//input)[20]';
  private inp_address1 = '(//div[@role="tabpanel"]//input)[25]';
  private inp_address2 = '(//div[@role="tabpanel"]//input)[26]';

  // function
  async clickOneProfileGuest(numProfile: number | string): Promise<void> {
    const xpath = `//tr[.//td//span[normalize-space(.) = "${numProfile}"]]`;
    const el = this.page.locator(xpath);
    await el.waitFor({ state: "visible", timeout: 10_000 });
    await el.click();
  }

  async getNumProfileNewGuest(numProfile: number | string): Promise<void> {
    const xpath = `//tr[.//td//span[normalize-space(.) = "${numProfile}"]]`;
    const el = this.page.locator(xpath);
    await el.click();
  }

  async clickBtnEditProfile(): Promise<void> {
    const xpath = `//button[normalize-space(.) = "${language.edit_profile}"]`;
    const el = this.page.locator(xpath);
    await el.click();
  }

  async getXpathInput(numInput: number): Promise<string> {
    return `(//input[@type='text'])[${numInput}]`;
  }
  async getProfileInputValues(): Promise<Record<string, string>> {
    const inputs: Record<string, string> = {
      lastName: this.inp_lastname,
      firstName: this.inp_firstname,
      email: this.inp_email,
      phone: this.inp_phone,
      address1: this.inp_address1,
      address2: this.inp_address2,
    };

    const result: Record<string, string> = {};

    await this.page.waitForTimeout(4000);

    for (const [key, xpath] of Object.entries(inputs)) {
      const locator = this.page.locator(xpath);
      const value = await locator.inputValue();
      result[key] = value.trim();
    }

    return result;
  }

  async checkFieldsInfoGuest(
    profileData: Record<string, string>,
    inputValues: Record<string, string>
  ): Promise<boolean> {
    const keysToCheck = [
      "lastName",
      "firstName",
      "email",
      "phone",
      "address1",
      "address2",
    ];

    for (const key of keysToCheck) {
      // console.log(
      //   `Key - ${key}|| Profile value = "${profileData[key]}", Input value = "${inputValues[key]}"`
      // );

      if (profileData[key] === undefined || inputValues[key] === undefined) {
        return false;
      } else {
        if (profileData[key] !== inputValues[key]) {
          console.log(
            `Mismatch found - ${key}: Profile value = "${profileData[key]}", Input value = "${inputValues[key]}"`
          );
          return false;
        }
      }
    }
    return true;
  }

  async searchGuestProfile(numProfile: string): Promise<void> {
    await this.page.locator(this.inp_guestInfo).fill(numProfile);
    await this.page.keyboard.press("Enter");
    await this.waitForLoading();
    await this.page.waitForTimeout(2000);
  }
}
