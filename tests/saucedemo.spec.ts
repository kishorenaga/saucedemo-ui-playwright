import { test, expect } from '@playwright/test'
import { LoginPage } from '../page-objects/login-page'
import { ProductsPage } from '../page-objects/products-page'
import { CartPage } from '../page-objects/cart-page'
import { CheckoutPage } from '../page-objects/checkout-pages'

let loginPage: LoginPage
test.describe('SauceDemo E2E Test Suite', () => {

  test.beforeEach(async ({ page }) => {

    //Navigate to products page
    await page.goto('/inventory.html')

  })

  test('user can login, access Products page, and logout successfully', async ({ page }) => {

    const productsPage = new ProductsPage(page)
    loginPage = new LoginPage(page)

    //Verify successful Login
    await expect(page).toHaveURL(/inventory\.html/)
    await expect(loginPage.usernameInput).not.toBeVisible()

    //User lands on the Products page
    await expect(page.getByText('Products')).toBeVisible()

    //Logout
    await productsPage.logout()

    //Verify LogOut
    await expect(loginPage.usernameInput).toBeVisible()
    await expect(page).toHaveURL('https://www.saucedemo.com/')

  })

  test('user checkout single item', async ({ page }) => {

    const productsPage = new ProductsPage(page)
    const cartPage = new CartPage(page)
    const checkoutPage = new CheckoutPage(page)

    //Add Products to Cart
    const productNames = ['Sauce Labs Bike Light']
    await productsPage.addProductsToCart(productNames)

    //Verify products count attached to cart
    await expect(productsPage.shoppingCartLink).toHaveText(productNames.length.toString())

    //Navigate to Cart
    await productsPage.navigateToCart()

    //Verify products in cart
    await cartPage.verifyProductsInCart(productNames)

    //Checkout Cart
    await cartPage.checkoutCart()

    //Add Shipping details
    await checkoutPage.addShippingDetailsAndContinue()

    //Verify checkout Page
    await expect(page.getByText('Checkout: Overview')).toBeVisible()

    //Verify products in Checkout
    await checkoutPage.verifyProductsInCheckout(productNames)

    //Complete Order
    await checkoutPage.completeOrder()

    //Verify Order Success
    await expect(page.getByText('Checkout: Complete!')).toBeVisible()
    await expect(checkoutPage.orderCompleteThankyouText).toHaveText('Thank you for your order!')
  })

  test('user checkout multiple items', async ({ page }) => {

    const productsPage = new ProductsPage(page)
    const cartPage = new CartPage(page)
    const checkoutPage = new CheckoutPage(page)

    //Add Products to Cart
    const productNames = ['Sauce Labs Backpack', 'Sauce Labs Bike Light', 'Sauce Labs Onesie']
    await productsPage.addProductsToCart(productNames)

    //Verify products count attached to cart
    await expect(productsPage.shoppingCartLink).toHaveText(productNames.length.toString())

    //Navigate to Cart
    await productsPage.navigateToCart()

    //Verify products in cart
    await cartPage.verifyProductsInCart(productNames)

    //Checkout Cart
    await cartPage.checkoutCart()

    //Add Shipping details
    await checkoutPage.addShippingDetailsAndContinue()

    //Verify checkout Page
    await expect(page.getByText('Checkout: Overview')).toBeVisible()

    //Verify products in Checkout
    await checkoutPage.verifyProductsInCheckout(productNames)

    //Complete Order
    await checkoutPage.completeOrder()

    //Verify Order Success
    await expect(page.getByText('Checkout: Complete!')).toBeVisible()
    await expect(checkoutPage.orderCompleteThankyouText).toHaveText('Thank you for your order!')

  })

})