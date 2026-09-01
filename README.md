# SauceDemo Playwright Tests

Author: Naga Appari

UI automation tests for SauceDemo using Playwright and TypeScript

# Automation Approach

This project uses the Page Object Model (POM) with Playwright and TypeScript

Tests are configured to run on Chromium (Chrome), and an HTML test report is generated after execution

Tests are configured to run with 2 workers

# Install Packages:

npm ci

# Install Playwright browsers:

npx playwright install

# Run all tests:

npx playwright test

# Run tests in headed mode:

npx playwright test --headed

# View Test Report

npx playwright show-report

# Authentication

The project uses Playwright's storageState to persist the authenticated browser session

After a successful login, the authentication state is saved using -

await page.context().storageState({ path: authFile })

Tests reuse the saved authentication state, so they do not need to log in before each test

Authentication state files should not be committed to source control because they may contain session cookies or other authentication data.

# Project Structure

```text
saucedemo-ui-playwright
├── page-objects
│   └── LoginPage.ts
├── tests
│   └── login.spec.ts
├── testData
│   └── users.ts
├── playwright.config.ts
└── README.md
```
