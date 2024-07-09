const { expect } = require("@playwright/test")

class ContactUs {

    constructor(page) {

        this.page = page
        this.name = page.getByPlaceholder('Name')
        this.email = page.getByPlaceholder('Email', { exact: true })
        this.subject = page.getByPlaceholder('Subject')
        this.message = page.getByPlaceholder('Your Message Here')
        this.chooseFile = page.locator('input[name="upload_file"]')
        this.submit = page.getByRole('button', { name: 'Submit' })
        this.contactUsHeader = page.getByRole('heading', { name: 'Contact Us' })
        this.successMessage = page.locator('#contact-page').getByText('Success! Your details have')
    }

    async addNameEmailSubject(name, email, subject) {
        await this.name.fill(name)
        await this.email.fill(email)
        await this.subject.fill(subject)
    }

    async addMessage(message) {
        await this.message.fill(message)
    }

    async addFile(file) {
        await this.chooseFile.setInputFiles(file)
    }

    async clickSubmit() {
        await this.submit.click()
    }

    async verifyContactUsHeader() {
        await expect(this.contactUsHeader).toBeVisible()
    }

    async acceptDialog() {
        await this.page.on('dialog', async (dialog) => {
            console.log(dialog.message())
            await dialog.accept()
        })
    }

    async verifySubmitedSuccessfully() {
        await expect(this.successMessage).toBeVisible()
    }
}
module.exports = ContactUs