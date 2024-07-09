const { test, expect } = require('@playwright/test')
const MainPage = require('../pages/mainPage')
const MainHeader = require('../pages/mainHeader')
const ContactUs = require('../pages/contactUsPage')

test.describe('Test Case 3: Contact Us Form', () => {

    let mainHeader
    let contactUs
    let mainPage

    test('Complete form and upload file', async ({ page }) => {

        mainHeader = new MainHeader(page)
        contactUs = new ContactUs(page)
        mainPage = new MainPage(page)

        await mainPage.openWebsiteAndAcceptConsent()

        await mainHeader.gotoContactUs()

        await contactUs.verifyContactUsHeader()
        await contactUs.addNameEmailSubject(
            'test', 'test@mail.com', 'automation'
        )
        await contactUs.addMessage('Automation test Scripts using JavaScript')
        await contactUs.addFile('automation-website.txt')
        await contactUs.acceptDialog()
        await contactUs.clickSubmit()
        await contactUs.verifySubmitedSuccessfully()

    })
})