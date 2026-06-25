import { test, expect } from '@playwright/test';

test('Swag Labs simple standard flow', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');

  await page.locator('#user-name').fill('standard_user');
  await page.locator('#password').fill('secret_sauce');
  await page.locator('#login-button').click();

  await page.getByText('Add to cart').nth(0).click();
  await page.getByText('Add to cart').nth(1).click();
  await page.getByText('Add to cart').nth(2).click();

  await expect(page.locator('.shopping_cart_badge')).toHaveText('3');

  await page.locator('.shopping_cart_link').click();
  await expect(page.locator('.cart_item')).toHaveCount(3);
});
