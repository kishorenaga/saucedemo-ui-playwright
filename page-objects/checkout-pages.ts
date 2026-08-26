import { Page, Locator, expect } from "@playwright/test"
import { faker } from "@faker-js/faker"

export class CheckoutPage {
    readonly page: Page
    private readonly firstNameTextbox: Locator
    private readonly lastNameTextbox: Locator
    private readonly postCodeText: Locator
    private readonly continueButton: Locator
    private readonly cartItems: Locator
    private readonly orderFinishButton: Locator
    public readonly orderCompleteThankyouText: Locator

    constructor(page: Page) {
        this.page = page
        this.firstNameTextbox = page.getByRole('textbox', { name: 'First Name' })
        this.lastNameTextbox = page.getByRole('textbox', { name: 'Last Name' })
        this.postCodeText = page.getByRole('textbox', { name: 'Zip/Postal Code' })
        this.continueButton = page.getByRole('button', { name: 'Continue' })
        this.cartItems = page.locator('.cart_item')
        this.orderFinishButton = page.getByRole('button', { name: 'Finish' })
        this.orderCompleteThankyouText = page.locator('[data-test="complete-header"]')
    }

    public async addShippingDetailsAndContinue() {

        const firstName = faker.person.firstName()
        const lastName = faker.person.lastName()
        const postCode = faker.location.zipCode()

        await this.firstNameTextbox.fill(firstName)
        await this.lastNameTextbox.fill(lastName)
        await this.postCodeText.fill(postCode)
        await this.continueButton.click()
        await expect(this.page).toHaveURL(/checkout-step-two\.html/)
    }

    public async verifyProductsInCheckout(productNames: string[]) {

        for (const productName of productNames) {
            const cartItem = this.cartItems.filter({ has: this.page.getByText(productName, { exact: true }) })
            await expect(cartItem).toBeVisible()
        }
        await expect(this.cartItems).toHaveCount(productNames.length)
    }

    public async completeOrder() {
        await this.orderFinishButton.click()
        await expect(this.page).toHaveURL(/checkout-complete\.html/)
    }

}