import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';
import authData from '../test-data/authData.json';

test('Add 3 products using POM', async ({ page }) => {

  const loginPage = new LoginPage(page);
  const productsPage = new ProductsPage(page);

  await loginPage.goto(authData.appUrl);
  await loginPage.login(authData.login.username, authData.login.password);

  await productsPage.addFirstNProducts(3);
  await expect(productsPage.cartBadge).toHaveText('3');

  await productsPage.openCart();
  await expect(productsPage.cartItems).toHaveCount(3);
});