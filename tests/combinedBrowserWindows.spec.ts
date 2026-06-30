import { test, expect } from '@playwright/test';

test.describe('Browser windows combined tests', () => {
  test('Click on new tab and see heading in new tab', async ({ page }) => {
    await page.goto('https://demoqa.com/browser-windows');

    const [newTab] = await Promise.all([
      page.context().waitForEvent('page'),
      page.locator('#tabButton').click(),
    ]);

    await newTab.waitForLoadState();
    const headingText = (await newTab.locator('#sampleHeading').textContent()) ?? '';

    console.log(`New tab heading: ${headingText}`);
    expect(headingText.toLowerCase()).toContain('sample page');

    await newTab.close();
    await page.bringToFront();
  });

  test('Open new window and read heading', async ({ page }) => {
    await page.goto('https://demoqa.com/browser-windows');

    const [newWindow] = await Promise.all([
      page.context().waitForEvent('page'),
      page.locator('#windowButton').click(),
    ]);

    await newWindow.waitForLoadState();
    const heading = (await newWindow.locator('#sampleHeading').textContent()) ?? '';

    console.log(`Window heading: ${heading}`);
    expect(heading.toLowerCase()).toContain('sample page');

    await newWindow.close();
    await page.bringToFront();
  });

  test('Open message window and read message', async ({ page }) => {
    await page.goto('https://demoqa.com/browser-windows');

    const [messageWindow] = await Promise.all([
      page.context().waitForEvent('page'),
      page.locator('#messageWindowButton').click(),
    ]);

    await messageWindow.waitForLoadState();
    const message = (await messageWindow.locator('body').textContent())?.trim() ?? '';

    console.log(`Message window text: ${message}`);
    expect(message.length).toBeGreaterThan(0);

    await messageWindow.close();
    await page.bringToFront();
  });
});

/* | Scenario          | Playwright Method                                     |
| ----------------- | ----------------------------------------------------- |
| Single iframe     | `frameLocator()`                                      |
| Nested iframe     | Chain `frameLocator()`                                |
| New browser tab   | `context.waitForEvent('page')`                        |
| Popup window      | `page.waitForEvent('popup')`                          |
| Switch to new tab | Store the returned `Page` object and interact with it |
| Frame by name/URL | `page.frame()`                                        |

"To handle iframes in Playwright, 
I generally use frameLocator() because it automatically waits for the frame and allows direct interaction with elements inside it. 
For nested iframes, I chain multiple frameLocator() calls. 
When an action opens a new browser tab, I use context.waitForEvent('page') 
to capture the new Page object and interact with it. 
For popup windows opened by the current page, such as OAuth login windows, 
I use page.waitForEvent('popup'). These approaches make handling frames, tabs, 
and popups reliable and easy to maintain."
*/
