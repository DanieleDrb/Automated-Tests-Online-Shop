const { expect } = require('@playwright/test')
class MainPage {

    constructor(page) {

        this.page = page
        this.acceptCookie = page.getByLabel('Consent', { exact: true })
        this.loggedIn = page.getByText('Logged in as test')
        this.recommendedItemsHeader = page.getByRole('heading', { name: 'recommended items' })
        this.addToCartRecommendedButton = page.locator("(//a[@data-product-id='1'])[3]")
    }

    async openWebsiteAndAcceptConsent() {
        await this.page.goto('/')
        await this.acceptCookie.click()
    }

    async openWebsite() {
        await this.page.goto('/')
    }

    async verifyIfLoggedIn() {
        await expect(this.loggedIn).toBeVisible({ timeout: 10000 })
    }

    async verifyRecommendedItemsHeader() {
        await expect(this.recommendedItemsHeader).toBeVisible()
    }

    async addToCartProductFromRecommended() {
        await this.addToCartRecommendedButton.click()
    }
    
}
module.exports = MainPage