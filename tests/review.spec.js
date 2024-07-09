const { test, expect } = require('@playwright/test')
const MainPage = require('../pages/mainPage')
const MainHeader = require('../pages/mainHeader')
const AllProducts = require('../pages/allProductsPage')
const Product = require('../pages/product.Page')

test.describe("Test Case 11 : Test the Review functionality", () => {

    let mainPage
    let mainHeader
    let allProductsPage
    let product

    test("Add Review on product", async ({ page }) => {

        mainPage = new MainPage(page)
        mainHeader = new MainHeader(page)
        allProductsPage = new AllProducts(page)
        product = new Product(page)


        await mainPage.openWebsiteAndAcceptConsent()
        await mainHeader.gotoProducts()
        await allProductsPage.verifyAllProductsPage()
        await allProductsPage.viewProduct(2)
        await product.verifyReviewHeader()
        await product.addReview("Tester", "testersoftware@gmail.com", "I like test automation with playwright and javascript")
        await product.submitReview()
        await product.verifyReviewWasSubmited()
        
    })
})