import { test as setup, expect } from '@playwright/test'
import { LoginPage } from '../page-objects/login-page'
import { testUser } from '../testData/users'
import path from 'path'


const authFile = path.join(__dirname, '../playwright/.auth/user.json')

setup('authenticate', async ({ page }) => {
    const loginPage = new LoginPage(page)
    await page.goto('/')
    await loginPage.usernameInput.fill(testUser.userName)
    await loginPage.passwordInput.fill(testUser.password)
    await loginPage.loginButton.click()
    //Verify successful Login
    await expect(page).toHaveURL(/inventory\.html/)
    await expect(loginPage.usernameInput).not.toBeVisible()
    // Save authenticated session state for reuse
    await page.context().storageState({ path: authFile })
})