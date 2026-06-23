import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';

test('Add 3 products using POM', async ({ page }) => {

  const loginPage = new LoginPage(page);
  const productsPage = new ProductsPage(page);

  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');

  await productsPage.addFirstNProducts(3);
  await expect(productsPage.cartBadge).toHaveText('3');

  await productsPage.openCart();
  await expect(productsPage.cartItems).toHaveCount(3);
});