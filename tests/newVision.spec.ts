import { test, expect } from '@playwright/test';

test('Amazon add product to cart flow', async ({ page }) => {
  await page.goto('https://www.amazon.com/');
  await page.locator('#twotabsearchtextbox').fill('Apple iPhone 14 Pro Max');
  await page.locator('#nav-search-submit-button').click();
  let productTitle = null;
  productTitle = await page.locator('//div[@role="listitem"]//a//h2/span').first().innerText();
    console.log(`Product title: ${productTitle}`);
    await page.getByText('Add to cart').first().click();
    await page.locator('nav-cart-icon nav-sprite').click();
    await expect(page.locator('(//li[@class="sc-item-product-title-cont"]//h3//span)[3]')).toHaveText(productTitle);
});