import { test, expect } from '@playwright/test';

test('Swag Labs simple standard flow', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');

  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');

  await page.click('button:has-text("Add to cart")');
  await page.click('button:has-text("Add to cart")');
  await page.click('button:has-text("Add to cart")');

  await expect(page.locator('.shopping_cart_badge')).toHaveText('3');

  await page.click('.shopping_cart_link');
  await expect(page.locator('.cart_item')).toHaveCount(3);
});
