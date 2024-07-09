const { expect } = require("@playwright/test")

class SignupLogin {

    constructor(page) {

        this.page = page
        this.emailLogin = page.locator('form').filter({ hasText: 'Login' }).getByPlaceholder('Email Address')
        this.password = page.getByPlaceholder('Password')
        this.name = page.getByPlaceholder('Name')
        this.emailSignUp = page.locator('form').filter({ hasText: 'Signup' }).getByPlaceholder('Email Address')
        this.loginButton = page.getByRole('button', { name: 'Login' })
        this.signupButton = page.getByRole('button', { name: 'Signup' })
        this.incorrectEmailOrPassword = page.getByText('Your email or password is')
    }

    async signUp(signupName, emailForSignup) {
        await this.name.fill(signupName)
        await this.emailSignUp.fill(emailForSignup)
    }

    async login(emailForLogin, passwordForLogin) {
        await this.emailLogin.fill(emailForLogin)
        await this.password.fill(passwordForLogin)
    }

    async clickLogin() {
        await this.loginButton.click()
    }

    async clickSignup() {
        await this.signupButton.click()
    }

    async verifySignUpLoginPage() {
        await expect(this.page).toHaveURL('/login')
    }

    async verifyIncorrectEmailOrPassword() {
        await expect(this.incorrectEmailOrPassword).toBeVisible()
    }

}
module.exports = SignupLogin