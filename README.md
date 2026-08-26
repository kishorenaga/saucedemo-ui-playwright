# SauceDemo Playwright Tests

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