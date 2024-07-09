const { test, expect } = require('@playwright/test')
const MainPage = require('../pages/mainPage')
const MainHeader = require('../pages/mainHeader')
const AllProducts = require('../pages/allProductsPage')
const Product = require('../pages/product.Page')

test.describe("Test Case 6: Search Product/s", () => {

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

    test("Verify the Search by Name", async ({ page }) => {

        await allProducts.searchProduct("Premium Polo T-Shirts")
        await allProducts.submitSearch()

        await product.verifyProductPage("Premium Polo T-Shirts")

        await allProducts.viewProduct(0)
        await product.verifyName("Premium Polo T-Shirts")

    })

    test("Verify the Search by Category - Women", async () => {

        await allProducts.searchWomenDress()
        await allProducts.verifyTitleProducts("Dress")

        await allProducts.searchWomenTops()
        await allProducts.verifyTitleProducts("Tops")

        await allProducts.searchWomenSaree()
        await allProducts.verifyTitleProducts("Saree")

    })

    test("Verify the Search by Category - Men", async () => {

        await allProducts.searchMenTshirts()
        await allProducts.verifyTitleProducts("Tshirts")

        await allProducts.searchMenJeans()
        await allProducts.verifyTitleProducts("Jeans")

    })

    test("Verify the Search by Category - Kids", async () => {

        await allProducts.searchKidsDress()
        await allProducts.verifyTitleProducts("Dress")

        await allProducts.searchKidsTopsShirts()
        await allProducts.verifyTitleProducts("Tops & Shirts")

    })

})