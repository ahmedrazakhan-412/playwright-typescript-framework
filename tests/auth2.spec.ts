import { test, expect, chromium } from '@playwright/test';

test('Basic Auth Header', async () => {

    const browser = await chromium.launch({
        headless: false
    });

    const context = await browser.newContext();

    const auth = Buffer
        .from('admin:admin')
        .toString('base64');

    await context.setExtraHTTPHeaders({
        Authorization: `Basic ${auth}`
    });

    const page = await context.newPage();

    await page.goto(
        'https://the-internet.herokuapp.com/basic_auth'
    );

    await page.waitForTimeout(5000);

    await expect(page.locator('p')).toContainText('Congratulations');

    await browser.close();
});