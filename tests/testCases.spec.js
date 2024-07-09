const { test, expect } = require('@playwright/test')
const TestCases = require('../pages/testCasesPage')
const MainHeader = require('../pages/mainHeader')
const MainPage = require('../pages/mainPage')

test.describe("Test Case 4: Verify Test Cases Page", () => {

    let testCases
    let mainHeader
    let mainPage

    test("Check the presence of every test case", async ({ page }) => {

        testCases = new TestCases(page)
        mainHeader = new MainHeader(page)
        mainPage = new MainPage(page)

        await mainPage.openWebsiteAndAcceptConsent()

        await mainHeader.gotoTestCase()

        await testCases.verifyTestCasePage()
        await testCases.verifyEveryTestCase()

    })
})