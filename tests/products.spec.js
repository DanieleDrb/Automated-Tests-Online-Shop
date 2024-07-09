const { test, expect } = require('@playwright/test')
const MainHeader = require('../pages/mainHeader')
const MainPage = require('../pages/mainPage')
const AllProducts = require('../pages/allProductsPage')
const Product = require('../pages/product.Page')

test.describe("Test Case 5 : Verify Products and product detail page", () => {

    let mainPage
    let mainHeader
    let allProducts
    let product

    test.beforeEach( async ({ page }) => {

        mainPage = new MainPage(page)
        mainHeader = new MainHeader(page)
        allProducts = new AllProducts(page)
        product = new Product(page)

        await mainPage.openWebsiteAndAcceptConsent()

        await mainHeader.gotoProducts()

        await allProducts.verifyAllProductsPage()
    })

    test("Verify first product", async () => {

        await allProducts.viewProduct(0)

        await product.verifyViewProductPage(1)
        await product.verifyDetailIsVisible()
        await product.logTheDetails()


    })

    test("Verify last product", async () => {

        await allProducts.viewProduct(33)

        await product.verifyViewProductPage(43)
        await product.verifyDetailIsVisible()
        await product.logTheDetails()

    })
})