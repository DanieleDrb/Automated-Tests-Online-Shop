const { test, expect } = require('@playwright/test')
const MainHeader = require('../pages/mainHeader')
const AllProducts = require('../pages/allProductsPage')
const Cart = require('../pages/cartPage')
const Product = require('../pages/product.Page')
const MainPage = require('../pages/mainPage')

test.describe("Test Case 8 : Test Cart Functionalities", () => {

    let mainHeader
    let allProducts
    let cart
    let product
    let page
    let mainPage

    test.beforeEach(async ({ browser }) => {

        const context = await browser.newContext({ storageState: 'storageState.json' })
        page = await context.newPage()
        mainHeader = new MainHeader(page)
        allProducts = new AllProducts(page)
        cart = new Cart(page)
        product = new Product(page)
        mainPage = new MainPage(page)
        
        await mainPage.openWebsite()
        await mainPage.verifyIfLoggedIn()

    })

    test("Add Products in Cart", async () => {

        await mainHeader.gotoProducts()
        await allProducts.addProductToCart(0)
        await allProducts.continueShopping()
        await allProducts.addProductToCart(1)
        await allProducts.viewCart()
        await cart.verifyProductInCart(0)
        await cart.verifyProductInCart(1)

    })

    test("Verify Product quantity in Cart", async () => {

        await mainHeader.gotoProducts()
        await allProducts.viewProduct(3)
        await product.changeQuantity('4')
        await product.addToCart()
        await allProducts.viewCart()

        await cart.verifyQuantity()

    })

    test("Add to Cart from Recommended items", async () => {

        await mainPage.verifyRecommendedItemsHeader()
        await mainPage.addToCartProductFromRecommended()
        await allProducts.viewCart()
        await cart.verifyProductInCart(2)

    })
})