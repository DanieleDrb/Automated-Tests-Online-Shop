const { test, expect } = require('@playwright/test')
const MainPage = require('../pages/mainPage')
const MainHeader = require('../pages/mainHeader')
const SignupLogin = require('../pages/signupLoginPage')
const SignupPage = require('../pages/signupPage')

test.describe(" Test Case 1: Register User ", () => {

    let mainHeader
    let signupLoginPage
    let signupPage
    let mainPage

    test(" Create Account and Delete account ", async ({ page }) => {

        mainPage = new MainPage(page)
        mainHeader = new MainHeader(page)
        signupLoginPage = new SignupLogin(page)
        signupPage = new SignupPage(page)

        await mainPage.openWebsiteAndAcceptConsent()

        await mainHeader.gotoSignupLogin()
        
        await signupLoginPage.signUp('testerSoftware', 'testersoftware97@gmail.com')
        await signupLoginPage.clickSignup()


        await signupPage.verifyAccountInformation()
        await signupPage.checkTitle()
        await signupPage.introducePassword('testerSoftware')
        await signupPage.dateOfBirth('31', '3', '2021')
        await signupPage.checkNewsletterAndSpecialOffers()
        await signupPage.addressInformation(
            'tester', 'software', 'Automation', 'Road to SDET',
            'New Zealand', 'wano', 'onigashima', '999999', '0234567890'
        )
        await signupPage.clickCreateAccount()
        await signupPage.verifyAccountCreated()
        await signupPage.clickContinueButton()

        await mainHeader.deleteAccount()

        await signupPage.verifyDeleteAccount()
    })

})