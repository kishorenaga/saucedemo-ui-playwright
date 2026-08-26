import { Page, expect, Locator } from "@playwright/test"

export class CartPage {
    readonly page: Page
    private readonly cartItems: Locator
    private readonly checkoutButton: Locator

    constructor(page: Page) {
        this.page = page
        this.cartItems = page.locator('.cart_item')
        this.checkoutButton = page.getByRole('button', { name: 'Checkout' })
    }

    public async verifyProductsInCart(productNames: string[]) {

        for (const productName of productNames) {
            const cartItem = this.cartItems.filter({ has: this.page.getByText(productName, { exact: true }) })
            await expect(cartItem).toBeVisible()
        }
        await expect(this.cartItems).toHaveCount(productNames.length)

    }

    public async checkoutCart() {
        await this.checkoutButton.click()
    }
}