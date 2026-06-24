import { test, expect } from '@playwright/test';
import { BrowserUtils } from '../utils/BrowserUtils';
import { DashboardPage } from '../pages/DashboardPage';
import { NewTabPage } from '../pages/NewTabPage';
import { WindowPage } from '../pages/WindowPage';
import { MessageWindowPage } from '../pages/MessageWindowPage';

test.describe('Browser windows combined tests', () => {
  test('Click on new tab and see heading in new tab', async ({ page }) => {
    await BrowserUtils.navigate(page, 'https://demoqa.com/browser-windows');

    const dashboardPage = new DashboardPage(page);
    const newTab = await dashboardPage.openNewTab();

    const newTabPage = new NewTabPage(newTab);
    const headingText = (await newTabPage.getHeading()) ?? '';

    console.log(`New tab heading: ${headingText}`);
    expect(headingText.toLowerCase()).toContain('sample page');

    await newTab.close();
    await page.bringToFront();
  });

  test('Open new window and read heading', async ({ page }) => {
    await BrowserUtils.navigate(page, 'https://demoqa.com/browser-windows');

    const dashboard = new DashboardPage(page);
    const newWindow = await dashboard.openNewWindow();

    const windowPage = new WindowPage(newWindow);
    const heading = (await windowPage.getHeading()) ?? '';

    console.log(`Window heading: ${heading}`);
    expect(heading.toLowerCase()).toContain('sample page');

    await newWindow.close();
    await page.bringToFront();
  });

  test('Open message window and read message', async ({ page }) => {
    await BrowserUtils.navigate(page, 'https://demoqa.com/browser-windows');

    const dashboard = new DashboardPage(page);
    const messageWindow = await dashboard.openMessageWindow();

    const messagePage = new MessageWindowPage(messageWindow);
    const message = await messagePage.getMessage();

    console.log(`Message window text: ${message}`);
    expect(message.length).toBeGreaterThan(0);

    await messageWindow.close();
    await page.bringToFront();
  });
});
