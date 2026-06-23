import { Locator, Page } from '@playwright/test';

export class ProductsPage {
  readonly addToCartButtons: Locator;
  readonly cartBadge: Locator;
  readonly cartIcon: Locator;
  readonly cartItems: Locator;

  constructor(private page: Page) {
    this.addToCartButtons = page.getByRole('button', { name: 'Add to cart' });
    this.cartBadge = page.locator('.shopping_cart_badge');
    this.cartIcon = page.locator('.shopping_cart_link');
    this.cartItems = page.locator('.cart_item');
  }

  async addFirstNProducts(count: number) {
    for (let i = 0; i < count; i++) {
      await this.addToCartButtons.nth(i).click();
    }
  }

  async openCart() {
    await this.cartIcon.click();
  }
}
