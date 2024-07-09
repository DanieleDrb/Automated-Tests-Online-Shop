const { test } = require('@playwright/test')
const MainFooter = require('../pages/mainFooter')
const MainPage = require('../pages/mainPage')
const MainHeader = require('../pages/mainHeader')


test.describe("Test Case 7 : Test the Subscription functionality", () => {

    let mainPage
    let mainFooter
    let mainHeader

    test.beforeEach(async ({ page }) => {

        mainPage = new MainPage(page)
        mainFooter = new MainFooter(page)
        mainHeader = new MainHeader(page)
        await mainPage.openWebsiteAndAcceptConsent()

    })

    test("Verify Subscription in Home page", async () => {

        await mainFooter.checkSubscriptionHeader()
        await mainFooter.emailSubscription(`test@mail.com`)
        await mainFooter.checkSuccessMessage()

    })

    test("Verify Subscription in Cart Page", async () => {

        await mainHeader.gotoCart()
        await mainFooter.checkSubscriptionHeader()
        await mainFooter.emailSubscription(`test@mail.com`)
        await mainFooter.checkSuccessMessage()

    })
})