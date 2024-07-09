const { expect } = require('@playwright/test')
class Cart {

    constructor(page) {

        this.page = page
        this.descriptionProduct = page.locator("(//td[@class='cart_description']//a)")
        this.quantityProduct = page.getByRole('button', { name: '4' })
        this.checkoutButton = page.getByText('Proceed To Checkout')
        this.removeButton =  page.getByRole('cell', { name: '' }).locator('a')
        this.emptyLoctor = page.locator('#empty_cart')
        this.removeLocator = page.locator("(//i[@class='fa fa-times'])")
    }

    async verifyProductInCart(number) {
        await expect(this.descriptionProduct.nth(number)).toBeVisible()
    }

    async verifyQuantity() {
        await expect(this.quantityProduct).toBeVisible()
    }

    async proceedToCheckout() {
        await this.checkoutButton.click()
    }

    async removeProductFromCart() {
        await this.removeButton.click()
    }

    async verifyProductsRemoved() {
        await expect(this.emptyLoctor).toBeVisible()
    }

    async removeAllProductsFromCart() {
        while (await this.removeLocator.count() > 0) {
            await this.removeLocator.first().click({ delay: 300 })
        }
    }
}
module.exports = Cart