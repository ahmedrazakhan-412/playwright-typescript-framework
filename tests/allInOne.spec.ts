import { test, expect, Page } from '@playwright/test';

// Simple helpers combined into one spec file
async function navigate(page: Page, url: string) {
  await page.goto(url);
}

async function openNewTab(page: Page) {
  const context = page.context();
  const [newPage] = await Promise.all([
    context.waitForEvent('page'),
    page.locator('#tabButton').click(),
  ]);
  await newPage.waitForLoadState();
  return newPage;
}

async function openNewWindow(page: Page) {
  const context = page.context();
  const [newWindow] = await Promise.all([
    context.waitForEvent('page'),
    page.locator('#windowButton').click(),
  ]);
  await newWindow.waitForLoadState();
  return newWindow;
}

async function openMessageWindow(page: Page) {
  const context = page.context();
  const [messageWindow] = await Promise.all([
    context.waitForEvent('page'),
    page.locator('#messageWindowButton').click(),
  ]);
  await messageWindow.waitForLoadState();
  return messageWindow;
}

async function getHeading(page: Page) {
  return (await page.locator('#sampleHeading').textContent()) ?? '';
}

async function getMessage(page: Page) {
  return (await page.locator('body').textContent())?.trim() ?? '';
}

test.describe('All-in-one Browser window tests', () => {
  test('New tab shows sample heading', async ({ page }) => {
    await navigate(page, 'https://demoqa.com/browser-windows');

    const newTab = await openNewTab(page);
    const heading = (await getHeading(newTab)).toLowerCase();

    console.log('New tab heading:', heading);
    expect(heading).toContain('sample page');

    await newTab.close();
    await page.bringToFront();
  });

  test('New window shows sample heading', async ({ page }) => {
    await navigate(page, 'https://demoqa.com/browser-windows');

    const newWindow = await openNewWindow(page);
    const heading = (await getHeading(newWindow)).toLowerCase();

    console.log('New window heading:', heading);
    expect(heading).toContain('sample page');

    await newWindow.close();
    await page.bringToFront();
  });

  test('Message window contains text', async ({ page }) => {
    await navigate(page, 'https://demoqa.com/browser-windows');

    const msgWin = await openMessageWindow(page);
    const message = await getMessage(msgWin);

    console.log('Message window text:', message);
    expect(message.length).toBeGreaterThan(0);

    await msgWin.close();
    await page.bringToFront();
  });
});
