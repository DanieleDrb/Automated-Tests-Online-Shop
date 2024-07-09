const { test, expect } = require('@playwright/test')
const MainHeader = require('../pages/mainHeader')
const Cart = require('../pages/cartPage')
const Checkout = require('../pages/checkoutPage')
const Payment = require('../pages/paymentPage')
const MainPage = require('../pages/mainPage')
const AllProducts = require('../pages/allProductsPage')

test.describe("Test Case 9 : Place Order", () => {

    let page
    let mainHeader
    let cart
    let checkout
    let payment
    let mainPage
    let allProductsPage

    test.beforeEach(async ({ browser }) => {

        const context = await browser.newContext({ storageState: 'storageState.json' })
        page = await context.newPage()

        mainHeader = new MainHeader(page)
        cart = new Cart(page)
        checkout = new Checkout(page)
        payment = new Payment(page)
        mainPage = new MainPage(page)
        allProductsPage = new AllProducts(page)

        await mainPage.openWebsite()
        await mainPage.verifyIfLoggedIn()
        await mainHeader.gotoProducts()
        await allProductsPage.addProductToCart(0)
        await allProductsPage.viewCart()

    })

    test("Test checkout Functionality, already logged in", async () => {

        await cart.proceedToCheckout()

        await checkout.verifyCheckoutPage()
        await checkout.commentOrder("automation testing with playwright and javascript")
        await checkout.placeOrder()

        await payment.verifyPaymentPage()
        await payment.completePayment("Tester Software", "987654321", "777", "12", "2024")
        await payment.payAndConfirmOrder()
        await payment.verifyOrderPlaced()

    })

    test("Test Download Invoice after purchase order", async () => {

        await cart.proceedToCheckout()
        await checkout.placeOrder()
        await payment.verifyPaymentPage()
        await payment.completePayment("Tester Software", "987654321", "777", "12", "2024")
        await payment.payAndConfirmOrder()
        await payment.verifyOrderPlaced()
        await payment.downloadInvoice()
    })

})