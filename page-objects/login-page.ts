import { Locator, Page } from "@playwright/test"

export class LoginPage {
    readonly page: Page
    public readonly usernameInput: Locator
    private readonly passwordInput: Locator
    private readonly loginButton: Locator

    constructor(page: Page) {
        this.page = page
        this.usernameInput = page.getByRole('textbox', { name: "Username" })
        this.passwordInput = page.getByRole('textbox', { name: "Password" })
        this.loginButton = page.getByRole('button', { name: "Login" })
    }

    public async login(userName: string, password: string) {
        await this.usernameInput.fill(userName)
        await this.passwordInput.fill(password)
        await this.loginButton.click()
    }
}
