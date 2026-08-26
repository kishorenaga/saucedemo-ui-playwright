import { Page, Locator, expect } from "@playwright/test"

export class ProductsPage {
    readonly page: Page
    private readonly inventoryItems: Locator
    private readonly burgerMenuButton: Locator
    private readonly logoutLink: Locator
    public readonly shoppingCartLink: Locator

    constructor(page: Page) {
        this.page = page
        this.inventoryItems = page.locator('[data-test="inventory-item"]')
        this.burgerMenuButton = page.getByRole('button', { name: "Open Menu" })
        this.logoutLink = page.getByRole('link', { name: "Logout" })
        this.shoppingCartLink = page.locator('[data-test="shopping-cart-link"]')
    }

    public async addProductsToCart(productNames: string[]) {

        for (const productName of productNames) {
            const product = this.inventoryItems.filter({ has: this.page.getByText(productName, { exact: true }) })
            await product.getByRole('button', { name: 'Add to cart' }).click()
        }
    }

    public async logout() {

        await this.burgerMenuButton.click()
        await this.logoutLink.click()
    }

    public async navigateToCart() {

        await this.shoppingCartLink.click()
        await expect(this.page).toHaveURL(/cart\.html/)
    }


}