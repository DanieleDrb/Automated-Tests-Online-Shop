const { test, expect } = require('@playwright/test')
const MainPage = require('../pages/mainPage')
const AllProducts = require('../pages/allProductsPage')
const MainHeader = require('../pages/mainHeader')
const Cart = require('../pages/cartPage')

test.describe("Test Case 10 : Remove functionalities", () => {

    let mainPage
    let page
    let allProducts
    let mainHeader
    let cart

    test("Remove all the Products From Cart as user loged in", async ({ browser }) => {

        const context = await browser.newContext({ storageState: 'storageState.json' })
        page = await context.newPage()

        mainPage = new MainPage(page)
        allProducts = new AllProducts(page)
        cart = new Cart(page)

        await mainPage.openWebsite()
        await mainPage.verifyIfLoggedIn()

        await allProducts.addProductToCart(5)
        await allProducts.continueShopping()
        await allProducts.addProductToCart(4)
        await allProducts.viewCart()
        
        await cart.removeAllProductsFromCart()
        await cart.verifyProductsRemoved()

    })

    test("Remove Products From Cart as Guest", async ({ page }) => {

        mainPage = new MainPage(page)
        mainHeader = new MainHeader(page)
        allProducts = new AllProducts(page)
        cart = new Cart(page)


        await mainPage.openWebsiteAndAcceptConsent()
        await mainHeader.gotoProducts()
        await allProducts.addProductToCart(2)
        await allProducts.viewCart()

        await cart.removeProductFromCart()
        await cart.verifyProductsRemoved()
    })
})