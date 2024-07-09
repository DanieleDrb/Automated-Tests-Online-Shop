const { expect } = require('@playwright/test')

class SignupPage {

    constructor(page) {

        this.page = page
        this.title = page.getByLabel('Mr.')
        this.password = page.getByLabel('Password *')
        this.day = page.locator('#days')
        this.month = page.locator('#months')
        this.year = page.locator('#years')
        this.newsletter = page.getByLabel('Sign up for our newsletter!')
        this.specialOffers = page.getByLabel('Receive special offers from')
        this.firstName = page.getByLabel('First name *')
        this.lastName = page.getByLabel('Last name *')
        this.company = page.getByLabel('Company', { exact: true })
        this.address = page.getByLabel('Address * (Street address, P.')
        this.country = page.getByLabel('Country *')
        this.state = page.getByLabel('State *')
        this.city = page.getByLabel('City *')
        this.zipcode = page.locator('#zipcode')
        this.mobileNumber = page.getByLabel('Mobile Number *')
        this.createAccountButton = page.getByRole('button', { name: 'Create Account' })
        this.accountInformationHeader = page.getByText('Enter Account Information')
        this.accountCreatedHeader = page.getByText('Account Created!')
        this.continueButton = page.getByRole('link', { name: 'Continue' })
        this.deleteAccountHeader = page.getByText('Account Deleted!')
    }

    async verifyAccountInformation() {
        await expect(this.accountInformationHeader).toBeVisible()
    }

    async checkTitle() {
        await this.title.check()
    }

    async introducePassword(passwordForSignUp) {
        await this.password.fill(passwordForSignUp)
    }

    async dateOfBirth(day, month, year) {
        await this.day.selectOption(day)
        await this.month.selectOption(month)
        await this.year.selectOption(year)
    }

    async checkNewsletterAndSpecialOffers() {
        await this.newsletter.check()
        await this.specialOffers.check()
    }

    async addressInformation(firstName, lastName, company, address, country, state, city, zipcode, mobileNumber) {
        await this.firstName.fill(firstName)
        await this.lastName.fill(lastName)
        await this.company.fill(company)
        await this.address.fill(address)
        await this.country.selectOption(country)
        await this.state.fill(state)
        await this.city.fill(city)
        await this.zipcode.fill(zipcode)
        await this.mobileNumber.fill(mobileNumber)
    }

    async clickCreateAccount() {
        await this.createAccountButton.click()
    }

    async verifyAccountCreated() {
        await expect(this.accountCreatedHeader).toBeVisible()
    }

    async clickContinueButton() {
        await this.continueButton.click()
    }

    async verifyDeleteAccount() {
        await expect(this.deleteAccountHeader).toBeVisible()
    }
}
module.exports = SignupPage