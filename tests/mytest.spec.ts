import { chromium, test, expect } from "@playwright/test";

test("my test", async ({ page }) => {
    await page.goto("https://playwright.dev/");
    await expect(page).toHaveTitle(/Playwright/);

    const browser = await chromium.launch({headless: false, slowMo: 1000, args: ['--start-maximized']});

    const adminContext = await browser.newContext();
    const userContext = await browser.newContext();

    const adminPage = await adminContext.newPage();
    const userPage = await userContext.newPage();

    await adminPage.goto('https://example.com');
    await userPage.goto('https://example.com');

});