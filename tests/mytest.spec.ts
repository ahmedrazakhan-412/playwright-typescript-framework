import {test, expect} from "@playwright/test";

test("my test", async ({page}) => {
    await page.goto("https://playwright.dev/");
    await expect(page).toHaveTitle(/Playwright/);
});