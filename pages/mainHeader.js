
class MainHeader {

    constructor(page) {

        this.page = page
        this.homeButton = page.getByRole('link', { name: ' Home' })
        this.productsButton = page.getByRole('link', { name: ' Products' })
        this.cartButton = page.getByRole('link', { name: ' Cart' })
        this.signupLoginButton = page.getByRole('link', { name: ' Signup / Login' })
        this.testCaseButton = page.getByRole('link', { name: ' Test Cases' })
        this.apiTestingButton = page.getByRole('link', { name: ' API Testing' })
        this.videoTutorialsButton = page.getByRole('link', { name: ' Video Tutorials' })
        this.contactUsButton = page.getByRole('link', { name: ' Contact us' })
        this.logoutButton = page.getByRole('link', { name: ' Logout' })
        this.deleteAccountButton = page.getByRole('link', { name: ' Delete Account' })

    }

    async gotoHome() {
        await this.homeButton.click()
    }

    async gotoProducts() {
        await this.productsButton.click()
    }

    async gotoCart() {
        await this.cartButton.click()
    }

    async gotoSignupLogin() {
        await this.signupLoginButton.click()
    }

    async gotoTestCase() {
        await this.testCaseButton.click()
    }

    async gotoApiTesting() {
        await this.apiTestingButton.click()
    }

    async gotoVideoTutorials() {
        await this.videoTutorialsButton.click()
    }

    async gotoContactUs() {
        await this.contactUsButton.click()
    }

    async logout() {
        await this.logoutButton.click()
    }

    async deleteAccount() {
        await this.deleteAccountButton.click()
    }
    
}
module.exports = MainHeader