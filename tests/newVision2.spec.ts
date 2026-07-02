import { test, expect, Page, Locator } from '@playwright/test';

const BASE_URL = 'https://react-shopping-cart-67954.firebaseapp.com/';
const PRICE_THRESHOLD = 14;

/** Extracts a numeric price from a string like "$14.99" or "14,99". */
function parsePrice(raw: string | null): number {
  return parseFloat((raw ?? '').replace(/[^0-9.]/g, ''));
}

test.describe('Shopping cart - add products above price threshold', () => {
  test(`Add all products priced above $${PRICE_THRESHOLD} and validate cart`, async ({ page }) => {
    // This test iterates every product on the page and, for each eligible one,
    // opens/validates/closes the cart drawer — with 16+ products that easily
    // exceeds Playwright's default 30s per-test timeout, so extend it here.
    test.setTimeout(120_000);

    await page.goto(BASE_URL);

    const products = page.locator("div[tabindex='1']");
    const totalProducts = await products.count();
    console.log(`Total Products: ${totalProducts}`);

    const cart = page.locator('div.sc-1h98xa9-4');
    const eligibleProducts: { name: string; price: number }[] = [];

    for (let i = 0; i < totalProducts; i++) {
      // Re-query on every iteration since React re-renders the DOM.
      const product = products.nth(i);

      const productName = (await product.locator('p.sc-124al1g-4').textContent())?.trim() ?? '';
      const productPrice = parsePrice(await product.locator('p.sc-124al1g-6').textContent());

      console.log(`${productName} --> ${productPrice}`);

      if (productPrice <= PRICE_THRESHOLD) continue;

      await test.step(`Add "${productName}" ($${productPrice}) to cart`, async () => {
        await product.scrollIntoViewIfNeeded();
        await product.getByRole('button', { name: 'Add to cart' }).click();
        await expect(cart).toBeVisible();

        // Scope to the specific row for THIS product, not the whole cart,
        // otherwise once >1 items are in the cart the locator matches
        // multiple elements and .textContent() throws a strict-mode error.
        const cartRow: Locator = cart
          .locator('p.sc-11uohgb-2')
          .filter({ hasText: productName })
          .first()
          .locator('xpath=ancestor::div[contains(@class, "sc-11uohgb-1")][1]');

        // Fallback: if the row wrapper class differs, just locate by name directly.
        const cartItemName = cart.locator('p.sc-11uohgb-2', { hasText: productName }).first();
        await expect(cartItemName).toHaveText(productName);

        const cartItemPriceText = await cartItemName
          .locator('xpath=following::div[contains(@class,"sc-11uohgb-4")][1]//p')
          .first()
          .textContent();
        const cartPrice = parsePrice(cartItemPriceText);

        console.log(`Cart Product: ${productName} | Cart Price: ${cartPrice}`);

        // Use toBeCloseTo for float-safe comparison of prices.
        expect(cartPrice).toBeCloseTo(productPrice, 2);

        eligibleProducts.push({ name: productName, price: productPrice });
      });

      await test.step('Close cart drawer', async () => {
        const closeBtn = page.locator("button:has-text('X')");
        await closeBtn.click();
        await expect(closeBtn).toBeHidden();
      });

      console.log('-----------------------------------');
    }

    console.log(`Added ${eligibleProducts.length} eligible product(s) to the cart.`);
    expect(eligibleProducts.length).toBeGreaterThan(0);
  });
});