import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';

test('Add 3 products using POM', async ({ page }) => {

    const loginPage = new LoginPage(page);
    const productsPage = new ProductsPage(page);

    await page.goto('https://www.saucedemo.com/');

    await loginPage.login('standard_user', 'secret_sauce');

    await productsPage.addFirstNProducts(3);

    await expect(page.locator('.shopping_cart_badge')).toHaveText('3');

    await productsPage.openCart();

    await expect(page.locator('.cart_item')).toHaveCount(3);
});