const { expect } = require('@playwright/test')
class MainFooter {

    constructor(page) {

        this.page = page
        this.subscription = page.getByPlaceholder('Your email address')
        this.subscriptionButton = page.getByRole('button', { name: '' })
        this.subscriptionHeader = page.getByRole('heading', { name: 'Subscription' })
        this.verifyMessage = page.getByText('You have been successfully')
    }

    async emailSubscription(email) {
        await this.subscription.fill(email)
        await this.subscriptionButton.click()
    }

    async checkSubscriptionHeader() {
        await expect(this.subscriptionHeader).toBeVisible()
    }

    async checkSuccessMessage() {
        await expect(this.verifyMessage).toBeVisible()
    }

}
module.exports = MainFooter