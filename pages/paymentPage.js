const { expect } = require('@playwright/test')
const fs = require('fs')
const path = require('path')

class Payment {

    constructor(page) {

        this.page = page
        this.nameOnCard = page.locator('input[name="name_on_card"]')
        this.cardNumber = page.locator('input[name="card_number"]')
        this.cvc = page.getByPlaceholder('ex.')
        this.expirationMonth = page.getByPlaceholder('MM')
        this.expirationYear = page.getByPlaceholder('YYYY')
        this.payAndConfirmButton = page.getByRole('button', { name: 'Pay and Confirm Order' })
        this.orderPlaced = page.getByText('Order Placed!')
        this.downloadButton = page.getByRole('link', { name: 'Download Invoice' })

    }

    async verifyPaymentPage() {
        await expect(this.page).toHaveURL('/payment')
    }

    async completePayment(name, card, cvc, month, year) {
        await this.nameOnCard.fill(name)
        await this.cardNumber.fill(card)
        await this.cvc.fill(cvc)
        await this.expirationMonth.fill(month)
        await this.expirationYear.fill(year)
    }

    async payAndConfirmOrder() {
        await this.payAndConfirmButton.click()
    }

    async verifyOrderPlaced() {
        await expect(this.orderPlaced).toBeVisible()
    }

    async downloadInvoice() {
        const downloadPromise = this.page.waitForEvent('download')
        await this.downloadButton.click()
        const download = await downloadPromise

        const suggestedFilename = download.suggestedFilename()
        const downloadPath = path.join(__dirname, suggestedFilename)
        await download.saveAs(downloadPath)

        if (fs.existsSync(downloadPath)) {
            console.log('Invoice downloaded successfully:', downloadPath);
        } else {
            console.error('Invoice download failed.');
        }
    }
}
module.exports = Payment