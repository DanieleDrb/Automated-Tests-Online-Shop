const { expect } = require('@playwright/test')

class TestCases {

    constructor(page) {

        this.page = page
        this.testCaseLocator = page.locator("(//h4[@class='panel-title']//u)")
        this.testCaseHeader = page.getByText('Below is the list of test')
    }

    async verifyEveryTestCase() {

        const count = await this.testCaseLocator.count()

        for (let i = 0; i < count; i ++) {
            
            const testCaseElement = this.testCaseLocator.nth(i)
            await testCaseElement.click( {delay: 300} )
            console.log(await testCaseElement.textContent())

        }
    }

    async verifyTestCasePage() {
        await expect(this.page).toHaveURL('/test_cases')
        await expect(this.testCaseHeader).toBeVisible()
    }


}
module.exports = TestCases