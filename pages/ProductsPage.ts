import { Page } from '@playwright/test';

export class ProductsPage {

constructor(private page: Page) {}

cartBadge = '.shopping_cart_badge';
cartIcon = '.shopping_cart_link';

async addFirstNProducts(count: number) {
    const products = this.page.locator("button:text('Add to cart')");

    for (let i = 0; i < count; i++) {
        await products.nth(i).click();
    }
}

async openCart() {
    await this.page.click(this.cartIcon);
}

}
