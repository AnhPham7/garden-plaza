<!-- GETTING STARTED -->

## Getting Started

Playwright Test Framework with XPath Locators and Class-Based Design
This repository demonstrates a structured Playwright testing framework using classes to encapsulate XPath locators, reusable page functions, and modular test definitions.

### Project structure

project/
│
├── fixtures/
│ └── testdata.json # json file to store test data for testing
├── pages/
│ └── loginPage.ts # Page class for login functionality
├── tests/
│ └── loginTest.ts # Test class for login scenarios
├── utils/ # costimize function to handle the utils logic
├── playwright.config.ts # Playwright configuration
├── package.json # Node.js project dependencies
└── README.md # Project documentation

### Prerequisites

This is an example of how to list things you need to use the software and how to install them.

- npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/shanksleorux/ezCloud.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Install Playwright browsers:
   ```sh
   npx playwright install
   ```
4. Change git remote url to avoid accidental pushes to base project
   ```sh
   git remote set-url origin github_username/repo_name
   git remote -v # confirm the changes
   ```

<!-- USAGE EXAMPLES -->

## How to Run Tests

1. Run all tests:
   ```sh
   npx playwright test
   ```
2. View the HTML report after the tests:
   ```sh
   npx playwright show-report
   ```

<!-- FRAMEWORK DESIGN -->

## Page Class (pages/loginPage.ts)

The LoginPage class encapsulates:

- XPath Locators: Define all locators specific to the login page.
- Reusable Functions: Methods to interact with login fields and buttons.

Example:

```ts
import { Page } from "@playwright/test";

export class LoginPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  private usernameInput = '//input[@name="username"]';
  private passwordInput = '//input[@name="password"]';
  private loginButton = '//button[text()="Login"]';

  async navigate(url: string): Promise<void> {
    await this.page.goto(url);
  }

  async fillUsername(username: string): Promise<void> {
    await this.page.locator(`xpath=${this.usernameInput}`).fill(username);
  }

  async fillPassword(password: string): Promise<void> {
    await this.page.locator(`xpath=${this.passwordInput}`).fill(password);
  }

  async clickLogin(): Promise<void> {
    await this.page.locator(`xpath=${this.loginButton}`).click();
  }
}
```

## Test Class (tests/loginTest.ts)

The loginTest.ts defines test cases:

- Uses beforeEach to initialize the LoginPage class and navigate to the login page.
- Calls methods from the LoginPage class for reusability.

Example:

```ts
import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/loginPage";

test.describe("Login Tests", () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigate("https://example.com/login");
  });

  test("Successful login", async () => {
    await loginPage.fillUsername("validUser");
    await loginPage.fillPassword("validPassword");
    await loginPage.clickLogin();

    const welcomeMessage = await loginPage.page.locator(
      'xpath=//h1[text()="Welcome"]',
    );
    await expect(welcomeMessage).toBeVisible();
  });

  test("Invalid login", async () => {
    await loginPage.fillUsername("invalidUser");
    await loginPage.fillPassword("invalidPassword");
    await loginPage.clickLogin();

    const errorMessage = await loginPage.page
      .locator('xpath=//div[contains(@class, "error-message")]')
      .textContent();
    expect(errorMessage).toContain("Invalid username or password");
  });
});
```

<!-- Customization -->

### Adding New Pages

1. Create a new file in the pages/ directory.
2. Define locators and reusable methods for the page.
3. Use the new page class in your test files.

### Adding New Tests

1. Create a new test file in the tests/ directory.
2. Use the appropriate Page Classes to access locators and methods.

### Configuring Playwright

Modify the playwright.config.ts file to:

- Change browser settings (e.g., headless mode).
- Define base URLs, timeouts, and other configurations.

## Best Practices

1. Modular Design: Separate page objects and test logic.
2. Reusable Locators: Use centralized page classes for easy maintenance.
3. XPath Locators: Useful for dynamic and complex DOM structures.
4. Test Reports: Always review the HTML reports for better debugging.

## Steps to Use This Dockerfile

Build the Docker image:

```sh
  docker build -t playwright-ci .
```

Run the container locally for testing:

```sh
docker run --rm -v $(pwd):/usr/src/app playwright-ci

```
