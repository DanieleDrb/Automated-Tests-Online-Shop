const { expect } = require('@playwright/test')
class Checkout {

    constructor(page) {

        this.page = page
        this.comment = page.locator('textarea[name="message"]')
        this.placeOrderButton = page.getByRole('link', { name: 'Place Order' })
    }

    async verifyCheckoutPage() {
        await expect(this.page).toHaveURL('/checkout')
    }

    async commentOrder(text) {
        await this.comment.fill(text)
    }

    async placeOrder() {
        await this.placeOrderButton.click()
    }
}
module.exports = Checkout