const { test, expect } = require('@playwright/test')
const fs = require('fs')
const MainPage = require('../pages/mainPage')
const MainHeader = require('../pages/mainHeader')
const SignupLogin = require('../pages/signupLoginPage')

test.describe(" Test Case 2: Login user ", () => {

    let mainHeader
    let signupLoginPage
    let mainPage

    test('Login user with correct email and password', async ({ page }) => {

        mainHeader = new MainHeader(page)
        signupLoginPage = new SignupLogin(page)
        mainPage = new MainPage(page)

        await mainPage.openWebsiteAndAcceptConsent()

        await mainHeader.gotoSignupLogin()

        await signupLoginPage.login('testersoftware@gmail.com', 'tester')
        await signupLoginPage.clickLogin()

        await mainPage.verifyIfLoggedIn()

        const storage = await page.context().storageState()
        fs.writeFileSync('storageState.json', JSON.stringify(storage))

    })

    test('Login user with incorrect email and password', async ({ page }) => {

        mainHeader = new MainHeader(page)
        signupLoginPage = new SignupLogin(page)
        mainPage = new MainPage(page)

        await mainPage.openWebsiteAndAcceptConsent()

        await mainHeader.gotoSignupLogin()

        await signupLoginPage.login('dummy@mail.com', 'dummy')
        await signupLoginPage.clickLogin()
        await signupLoginPage.verifyIncorrectEmailOrPassword()

    })

    test('Logout User', async ({ browser }) => {

        const context = await browser.newContext({ storageState: 'storageState.json' })
        const page = await context.newPage()

        mainHeader = new MainHeader(page)
        mainPage = new MainPage(page)
        signupLoginPage = new SignupLogin(page)

        await mainPage.openWebsite()
        await mainPage.verifyIfLoggedIn()

        await mainHeader.logout()
        
        await signupLoginPage.verifySignUpLoginPage()

    })
})