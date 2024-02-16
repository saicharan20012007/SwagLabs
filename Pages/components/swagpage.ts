import { Page, expect } from '@playwright/test';

class SwagLabsPage {
    
  constructor(private page: Page) {}

  async visitHomePage() {
    await this.page.goto('https://www.saucedemo.com/v1/');
  }

  async login(username: string, password: string) {
    await this.page.fill('#user-name', username);
    await this.page.fill('#password', password);
    await this.page.click('#login-button');
    await this.page.waitForSelector('.product_label');
  }

  async addProductToCart(productName: string) {
    await this.page.waitForSelector('.product_label');
    await expect(this.page.locator(`.inventory_item_name >> text="${productName}"`)).toBeVisible();
    await this.page.click(`.inventory_item_name >> text="${productName}"`);
    await expect(this.page.locator('.inventory_details_back_button')).toBeVisible();
    const addButton = await this.page.locator('.btn_inventory');
    await addButton.click();
    await expect(this.page.locator('.btn_inventory')).toContainText('REMOVE');
  }

  async goToCart() {
    const cartIcon = await this.page.locator('#shopping_cart_container');
    await cartIcon.click();
    await expect(this.page.locator('.cart_quantity')).toContainText('1');
  }

  async checkout() {
    await this.page.click('.checkout_button');
    await expect(this.page.locator('.subheader')).toContainText('Checkout: Your Information');
  }

  async providePaymentInfo(firstName: string, lastName: string, postalCode: string) {
    await this.page.fill('#first-name', firstName);
    await this.page.fill('#last-name', lastName);
    await this.page.fill('#postal-code', postalCode);
    const continueButton = await this.page.locator('.cart_button[value="CONTINUE"]');
    await continueButton.click();
    await expect(this.page.locator('.subheader')).toContainText('Checkout: Overview');
  }

  async finishOrder() {
    const finishButton = await this.page.locator('.cart_button');
    await finishButton.click();
    await expect(this.page.locator('.complete-header')).toBeVisible();
  }
}


export default SwagLabsPage