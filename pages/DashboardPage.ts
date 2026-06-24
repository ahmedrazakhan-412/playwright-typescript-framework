import { Page, Locator } from '@playwright/test';

export class DashboardPage {
  readonly page: Page;
  readonly newTabButton: Locator;
  readonly newWindowButton: Locator;
  readonly messageWindowButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.newTabButton = page.locator('#tabButton');
    this.newWindowButton = page.locator('#windowButton');
    this.messageWindowButton = page.locator('#messageWindowButton');
  }

  async openNewTab() {
    const context = this.page.context();

    const [newTab] = await Promise.all([
      context.waitForEvent('page'),
      this.newTabButton.click()
    ]);

    await newTab.waitForLoadState();

    return newTab;
  }

  async openNewWindow() {
    const context = this.page.context();

    const [newWindow] = await Promise.all([
      context.waitForEvent('page'),
      this.newWindowButton.click()
    ]);

    await newWindow.waitForLoadState();

    return newWindow;
  }

  async openMessageWindow() {
    const context = this.page.context();

    const [messageWindow] = await Promise.all([
      context.waitForEvent('page'),
      this.messageWindowButton.click()
    ]);

    await messageWindow.waitForLoadState();

    return messageWindow;
  }
}