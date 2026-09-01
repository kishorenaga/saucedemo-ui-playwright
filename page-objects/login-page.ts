import { Locator, Page } from "@playwright/test"

export class LoginPage {
    readonly page: Page
    public readonly usernameInput: Locator
    public readonly passwordInput: Locator
    public readonly loginButton: Locator

    constructor(page: Page) {
        this.page = page
        this.usernameInput = page.getByRole('textbox', { name: "Username" })
        this.passwordInput = page.getByRole('textbox', { name: "Password" })
        this.loginButton = page.getByRole('button', { name: "Login" })
    }
}
