import { Page, BrowserContext, Locator, expect } from '@playwright/test';

export class BrowserUtils {
  static async navigate(page: Page, url: string): Promise<void> {
    await page.goto(url);
  }

  static async click(locator: Locator): Promise<void> {
    await locator.waitFor({ state: 'visible' });
    await locator.click();
  }

  static async typeText(locator: Locator, text: string, clearBefore = true): Promise<void> {
    await locator.waitFor({ state: 'visible' });
    if (clearBefore) {
      await locator.fill('');
    }
    await locator.fill(text);
  }

  static async waitForText(locator: Locator, expectedText: string, timeout = 5000): Promise<void> {
    await expect(locator).toHaveText(expectedText, { timeout });
  }

  static async takeScreenshot(page: Page, path: string): Promise<void> {
    await page.screenshot({ path, fullPage: true });
  }

  static async switchToNewTab(context: BrowserContext, originalPage: Page): Promise<Page> {
    const [newPage] = await Promise.all([
      context.waitForEvent('page'),
      originalPage.waitForEvent('popup'),
    ]);
    await newPage.waitForLoadState();
    return newPage;
  }
}
