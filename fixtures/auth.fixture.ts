import { test as base } from "@playwright/test";

//data
import { loginData, urlWeb } from "@fixtures/test-data";
import translations from "@data/languages.json";

//pages
import { HomePage } from "@pages/ui/home-page";
import { SearchBookingPage } from "@pages/ui/search-booking";
import { CreateBookingPage } from "@pages/ui/create-booking";
import { ProfileGuestPage } from "@pages/ui/profile-guest";
import { GroupPage } from "@pages/ui/group-page";
import { JSONHelper } from "@utils/jsonHelper";
import { DateTimeHelper } from "@utils/dateTimeHelper";

const language = translations.vi;

interface MyFixtures {
  homePage: HomePage;
  searchBookingPage: SearchBookingPage;
  createBookingPage: CreateBookingPage;
  profileGuestPage: ProfileGuestPage;
  groupPage: GroupPage;
  jsonHelper: JSONHelper;
  dateTimeHelper: DateTimeHelper;
}

const test = base.extend<MyFixtures>({
  jsonHelper: async ({}, use) => {
    const jsonHelper = new JSONHelper("../data/guest-profile.json");
    await use(jsonHelper);
  },

  dateTimeHelper: async ({}, use) => {
    const dateTimeHelper = new DateTimeHelper();
    await use(dateTimeHelper);
  },

  homePage: async ({ page }, use) => {
    page.goto(urlWeb.url);

    const homePage = new HomePage(page);

    await use(homePage);
  },

  searchBookingPage: async ({ page, homePage }, use) => {
    // await homePage.clickUser();
    // await homePage.clickFlagLanguage("vi");

    const searchBookingPage = new SearchBookingPage(page);

    // await homePage.clickItemNavbar(language.reservation);
    // await homePage.clickItemDropdown(language.search_reservation);

    await use(searchBookingPage);
  },
  createBookingPage: async ({ page }, use) => {
    const createBookingPage = new CreateBookingPage(page);

    await use(createBookingPage);
  },
  profileGuestPage: async ({ page }, use) => {
    const profileGuest = new ProfileGuestPage(page);

    await use(profileGuest);
  },

  groupPage: async ({ page, homePage }, use) => {
    const groupPage = new GroupPage(page);
    await homePage.clickItemNavbar("Đoàn");
    await homePage.clickItemDropdown("Tạo đoàn mới");
    await use(groupPage);
  },
});

export { test };
