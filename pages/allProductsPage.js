const { expect } = require('@playwright/test')
class AllProducts {

    constructor(page) {

        this.page = page
        this.productLocator = page.locator("(//i[@class='fa fa-plus-square'])")
        this.search = page.getByPlaceholder('Search Product')
        this.submitSearchButton = page.locator('#submit_search')
        this.women = page.getByRole('link', { name: ' Women' })
        this.men = page.getByRole('link', { name: ' Men' })
        this.kids = page.getByRole('link', { name: ' Kids' })
        this.womenDress = page.getByRole('link', { name: 'Dress' })
        this.womenTops = page.getByRole('link', { name: 'Tops' })
        this.womenSaree = page.getByRole('link', { name: 'Saree' })
        this.titleProducts = page.locator("//h2[@class='title text-center']")
        this.menTshirts = page.getByRole('link', { name: 'Tshirts' })
        this.menJeans = page.getByRole('link', { name: 'Jeans' })
        this.kidsDress = page.getByRole('link', { name: 'Dress' })
        this.kidsTopsShirts = page.getByRole('link', { name: 'Tops & Shirts' })
        this.productIcon = page.locator("//div[@id='cartModal']/following-sibling::div")
        this.addToCartButton = page.locator("(//div[@class='overlay-content']//a)")
        this.continueShoppingButton = page.getByRole('button', { name: 'Continue Shopping' })
        this.viewCartButton = page.getByRole('link', { name: 'View Cart' })

    }

    async verifyAllProductsPage() {
        await expect(this.page).toHaveURL('/products')
    }

    async viewProduct(number) {
        await this.productLocator.nth(number).click()
    }

    async searchProduct(name) {
        await this.search.fill(name)
    }

    async submitSearch() {
        await this.submitSearchButton.click()
    }

    async searchWomenDress() {
        await this.women.click()
        await this.womenDress.click()
    }

    async searchWomenTops() {
        await this.women.click()
        await this.womenTops.click()
    }

    async searchWomenSaree() {
        await this.women.click()
        await this.womenSaree.click()
    }

    async verifyTitleProducts(category) {
        const titleProduct = await this.titleProducts.textContent()
        await expect(titleProduct).toContain(category)
    }

    async searchMenTshirts() {
        await this.men.click()
        await this.menTshirts.click()
    }

    async searchMenJeans() {
        await this.men.click()
        await this.menJeans.click()
    }

    async searchKidsDress() {
        await this.kids.click()
        await this.kidsDress.click()
    }

    async searchKidsTopsShirts() {
        await this.kids.click()
        await this.kidsTopsShirts.click()
    }

    async addProductToCart(number) {
        await this.productIcon.nth(number).hover()
        await this.addToCartButton.nth(number).click()
    }

    async continueShopping() {
        await this.continueShoppingButton.click()
    }

    async viewCart() {
        await this.viewCartButton.click()
    }

}
module.exports = AllProducts