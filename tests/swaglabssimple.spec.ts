import { test, expect } from '@playwright/test';

test('Swag Labs simple standard flow', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');

  /* Auto-wait only waits immediately before an action or assertion. 
  It does not wait just because you created a locator.*/
  const loginButton = page.locator('#login');
  console.log('Login button text:', loginButton);

  /* When does auto-wait start?
  Only when you perform an action such as:
  await loginButton.click();
  Now Playwright begins checking.

Internally it performs something similar to:

Is element attached?
        ↓
Is element visible?
        ↓
Is element enabled?
        ↓
Is element stable?
        ↓
Is nothing covering it?
        ↓
Click

This waiting is built into actions like:

click()
fill()
check()
uncheck()
hover()
dblclick()
dragTo()

and assertions like:
await expect(locator).toBeVisible();
When should you use waitFor()?
Use it when:
Waiting for a loading spinner to disappear.
Waiting for an element to appear before doing non-action work.
Waiting for a modal, toast, or notification.
Waiting for an element to be removed from the DOM.
Synchronizing with asynchronous UI changes when no action or assertion naturally expresses the wait.

Don't use it before every click or fill. For example, this is redundant:

Most Common Waits Used in Real Projects
| Wait                                   | Usage                                                      |
| -------------------------------------- | ---------------------------------------------------------- |
| `expect(locator).toBeVisible()`        | Verify UI elements                                         |
| `expect(locator).toHaveText()`         | Validate displayed text                                    |
| `locator.waitFor({ state: 'hidden' })` | Wait for loaders/spinners to disappear                     |
| `page.waitForURL()`                    | Wait after login or navigation                             |
| `page.waitForResponse()`               | Synchronize with backend APIs                              |
| `page.waitForLoadState('networkidle')` | Wait for page/network activity to settle (use judiciously) |
| Auto-wait                              | Built into Playwright actions                              |

different waiting mechanisms in Playwright,

| Wait Method                      | Purpose                                                              | Recommended?               |
| -------------------------------- | -------------------------------------------------------------------- | -------------------------- |
| `locator.waitFor()`              | Wait for an element to become visible, hidden, attached, or detached | ✅ Yes                      |
| `expect(locator).toBeVisible()`  | Wait until an element becomes visible                                | ✅ Best for assertions      |
| `expect(locator).toHaveText()`   | Wait until text matches                                              | ✅ Best for text validation |
| `expect(locator).toHaveValue()`  | Wait until an input has the expected value                           | ✅ Yes                      |
| `expect(locator).toBeEnabled()`  | Wait until element is enabled                                        | ✅ Yes                      |
| `expect(locator).toBeDisabled()` | Wait until element is disabled                                       | ✅ Yes                      |
| `expect(locator).toBeChecked()`  | Wait until checkbox/radio is checked                                 | ✅ Yes                      |
| `expect(locator).toHaveCount()`  | Wait until the expected number of elements exists                    | ✅ Yes                      |
| `page.waitForURL()`              | Wait until the page navigates to a specific URL                      | ✅ Yes                      |
| `page.waitForLoadState()`        | Wait for page loading states                                         | ✅ Yes                      |
| `page.waitForResponse()`         | Wait for a specific network response                                 | ✅ Yes                      |
| `page.waitForRequest()`          | Wait for a specific network request                                  | ✅ Yes                      |
| `page.waitForEvent()`            | Wait for browser/page events (popup, download, etc.)                 | ✅ Yes                      |
| `browserContext.waitForEvent()`  | Wait for context-level events                                        | ✅ Yes                      |
| `page.waitForFunction()`         | Wait until a custom JavaScript condition becomes true                | ✅ For advanced scenarios   |
| `page.waitForTimeout()`          | Wait a fixed amount of time                                          | ❌ Avoid unless debugging   |

  */

  await page.locator('#user-name').fill('standard_user');
  await page.locator('#password').fill('secret_sauce');
  await page.locator('#login-button').click();

  await page.getByText('Add to cart').nth(0).click();
  await page.getByText('Add to cart').nth(1).click();
  await page.getByText('Add to cart').nth(2).click();

  await expect(page.locator('.shopping_cart_badge')).toHaveText('3');

  await page.locator('.shopping_cart_link').click();
  await expect(page.locator('.cart_item')).toHaveCount(3);
});
