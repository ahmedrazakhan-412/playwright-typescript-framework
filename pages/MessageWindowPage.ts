import { Page, Locator } from '@playwright/test';

export class MessageWindowPage {
  readonly page: Page;
  readonly body: Locator;

  constructor(page: Page) {
    this.page = page;
    this.body = page.locator('body');
  }

  async getMessage() {
    const text = await this.body.textContent();
    return text?.trim() ?? '';
  }
}
