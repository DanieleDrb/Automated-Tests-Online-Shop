const { expect } = require('@playwright/test')

class Product {

    constructor(page) {

        this.page = page
        this.name = page.locator("//div[@class='product-information']//h2")
        this.category = page.locator("//div[@class='product-information']//p[1]")
        this.availability = page.locator("//div[@class='product-information']//p[2]")
        this.condition = page.locator("//div[@class='product-information']//p[3]")
        this.brand = page.locator("//div[@class='product-information']//p[4]")
        this.price = page.locator("(//div[@class='product-information']//span)[2]")
        this.quantity = page.locator('#quantity')
        this.addToCartButton = page.getByRole('button', { name: ' Add to cart' })
        this.reviewHeader = page.getByText('Write Your Review', { exact: true })
        this.yourName = page.getByPlaceholder('Your Name')
        this.emailAddress = page.getByPlaceholder('Email Address', { exact: true })
        this.addReviewText = page.getByPlaceholder('Add Review Here!')
        this.addReviewButton =  page.getByRole('button', { name: 'Submit' })
        this.verifyReviewLocator = page.getByText('Thank you for your review.')
    }

    async verifyName(name) {
        const nameSearch = await this.name.textContent()
        await expect(nameSearch).toBe(name)
    }

    async verifyDetailIsVisible() {
        await expect(this.name).toBeVisible()
        await expect(this.price).toBeVisible()
        await expect(this.category).toBeVisible()
        await expect(this.availability).toBeVisible()
        await expect(this.condition).toBeVisible()
        await expect(this.brand).toBeVisible()
    }

    async verifyReviewHeader() {
        await expect(this.reviewHeader).toBeVisible()
    }

    async logTheDetails() {
        const name = await this.name.textContent()
        const price = await this.price.textContent()
        const category = await this.category.textContent()
        const availability = await this.availability.textContent()
        const condition = await this.condition.textContent()
        const brand = await this.brand.textContent()

        console.log(`Name: ${name}`)
        console.log(`Price: ${price}`)
        console.log(category)
        console.log(availability)
        console.log(condition)
        console.log(brand)
    }

    async changeQuantity(number) {
        await this.quantity.fill(number)
    }

    async addToCart() {
        await this.addToCartButton.click()
    }

    async addReview(name, email, text) {
        await this.yourName.fill(name)
        await this.emailAddress.fill(email)
        await this.addReviewText.fill(text)
    }

    async submitReview() {
        await this.addReviewButton.click()
    }

    async verifyReviewWasSubmited() {
        await expect(this.verifyReviewLocator).toBeVisible()
    }

    async verifyProductPage(product) {
        await expect(this.page).toHaveURL('/products?search=' + product)
    }

    async verifyViewProductPage(number) {
        await expect(this.page).toHaveURL('/product_details/' + number)
    }

}
module.exports = Product