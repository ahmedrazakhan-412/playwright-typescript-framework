import { Page, Locator } from '@playwright/test';

export class WindowPage {
  readonly page: Page;
  readonly heading: Locator;

  constructor(page: Page) {
    this.page = page;
    this.heading = page.locator('#sampleHeading');
  }

  async getHeading() {
    return await this.heading.textContent();
  }
}
