import { test as base, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';

type Fixtures = {
    loginPage: LoginPage;
    productsPage: ProductsPage;
};

const test = base.extend<Fixtures>({
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },

    productsPage: async ({ page }, use) => {
        await use(new ProductsPage(page));
    },
});

test('Test with Fixtures', async ({ loginPage, productsPage }) => {
    await loginPage.login('username', 'password');
});

test('Test 1 without Fixtures', async ({ page }) => {
    const login = new LoginPage(page);
    const products = new ProductsPage(page);
});

test('Test 2 without Fixtures', async ({ page }) => {
    const login = new LoginPage(page);
    const products = new ProductsPage(page);
});

test('Example', async ({ page, browser, context }) => {

});
/* Common built-in fixtures:
| Fixture       | Description          |
| ------------- | -------------------- |
| `page`        | Browser tab          |
| `browser`     | Browser instance     |
| `context`     | Browser context      |
| `request`     | API request context  |
| `browserName` | Current browser name |

These are **very important Playwright interview questions**, especially for **Senior QA Automation Engineer** roles.

---

# 1. What are Fixtures?

## Interview Answer

> Fixtures are reusable objects or setup logic that Playwright provides to prepare the test environment before a test runs and clean it up afterward. They allow us to share common resources, such as a browser page, logged-in user, or page objects, across tests without duplicating code.

Think of fixtures as **dependency injection** for your tests.

Instead of creating everything manually:

```typescript
const loginPage = new LoginPage(page);
const homePage = new HomePage(page);
const cartPage = new CartPage(page);
```

A fixture can provide them automatically.

---

# Why were Fixtures introduced?

Without fixtures:

```typescript
test('Test 1', async ({ page }) => {

    const login = new LoginPage(page);
    const home = new HomePage(page);

});
```

```typescript
test('Test 2', async ({ page }) => {

    const login = new LoginPage(page);
    const home = new HomePage(page);

});
```

Same code repeated in every test.

With fixtures:

```typescript
test('Test', async ({ loginPage, homePage }) => {

});
```

Much cleaner.

---

# 2. Why use Fixtures?

Advantages:

* Remove duplicate setup code.
* Reuse page objects and utilities.
* Keep tests short and readable.
* Centralize setup and teardown.
* Improve maintainability.
* Enable dependency injection.

---

# 3. Built-in Fixtures

Playwright already provides several built-in fixtures.

Example:

```typescript
test('Example', async ({
    page,
    browser,
    context
}) => {

});
```

Common built-in fixtures:

| Fixture       | Description          |
| ------------- | -------------------- |
| `page`        | Browser tab          |
| `browser`     | Browser instance     |
| `context`     | Browser context      | 
| `request`     | API request context  |
| `browserName` | Current browser name |

Example:

```typescript
test('Google', async ({ page }) => {

    await page.goto('https://google.com');

});
```

No need to create the page yourself.

---

# 4. Custom Fixtures

Custom fixtures are created when you need your own reusable objects.

Suppose you have:

```typescript
const loginPage = new LoginPage(page);
```

Instead of creating it in every test, define a custom fixture.

---

### baseFixture.ts

```typescript
import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

type MyFixtures = {
    loginPage: LoginPage;
};

export const test = base.extend<MyFixtures>({
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    }
});

export { expect } from '@playwright/test';
```

---

### Test

```typescript
import { test, expect } from '../fixtures/baseFixture';

test('Login Test', async ({ loginPage }) => {

    await loginPage.navigate();

    await loginPage.login(
        'standard_user',
        'secret_sauce'
    );

});
```

No object creation inside the test.

---

# 5. beforeEach vs Fixtures

| beforeEach                                 | Fixtures                                          |
| ------------------------------------------ | ------------------------------------------------- |
| Runs before every test                     | Provides reusable dependencies                    |
| Good for common setup                      | Good for dependency injection                     |
| Can become large and difficult to maintain | Cleaner and modular                               |
| Doesn't return reusable objects            | Can provide page objects, data, API clients, etc. |
| Executes before every test                 | Can be scoped per test or per worker              |

Example using `beforeEach`:

```typescript
test.beforeEach(async ({ page }) => {

    await page.goto('/');

});
```

Example using a fixture:

```typescript
test('Login', async ({
    loginPage
}) => {

});
```

### Which is better?

For small setup tasks:

* `beforeEach`

For reusable page objects, API helpers, authenticated users:

* Fixtures

---

# 6. Global Setup vs Fixtures

Many candidates confuse these.

---

## Global Setup

Runs:

```text
One Time

Before ALL Tests
```

Example:

* Generate auth token
* Save Storage State
* Seed database
* Create test users

Example:

```typescript
async function globalSetup() {

    // Login once

    // Save auth.json

}
```

Runs only once.

---

## Fixtures

Run:

```text
Every Test

or

Every Worker
```

Example:

```typescript
test('Example', async ({
    loginPage
}) => {

});
```

They prepare resources for individual tests or workers.

---

# Comparison

| Global Setup                                  | Fixtures                                        |
| --------------------------------------------- | ----------------------------------------------- |
| Runs once before the test suite               | Runs per test or per worker, depending on scope |
| Used for suite-wide initialization            | Used to provide reusable resources to tests     |
| Good for authentication and environment setup | Good for page objects, API clients, utilities   |
| Does not inject objects into tests            | Injects objects directly into tests             |

---

# Real Project Example

In one project:

Global Setup:

* Logged in once.
* Saved `auth.json` using Storage State.

Fixture:

* Created:

  * `LoginPage`
  * `HomePage`
  * `CartPage`

Then every test became:

```typescript
test('Checkout', async ({
    homePage,
    cartPage
}) => {

});
```

Very clean and maintainable.

---

# Interview Answer (2–3 minutes)

"Fixtures in Playwright are reusable objects or setup logic that prepare the test environment and inject dependencies into tests. 
Playwright provides built-in fixtures such as `page`, `browser`, `context`, and `request`, and we can create custom fixtures for page objects, 
API clients, or authenticated sessions. Compared to `beforeEach`, fixtures are more modular 
because they provide reusable dependencies instead of just executing setup code. 
Global Setup is different—it runs once before the entire test suite and is 
typically used for tasks like generating a Storage State or seeding test data, 
whereas fixtures run per test or per worker and supply the resources that each test needs."

| Tool            | Real-Life Example                       | Why?                                                        |
| --------------- | --------------------------------------- | ----------------------------------------------------------- |
| **Cypress**     | Person sitting inside one room          | Can control only that room (single tab)                     |
| **Selenium**    | Person outside the house with a remote  | Can control all rooms through WebDriver                     |
| **Playwright**  | Apartment building with many apartments | Multiple isolated users (BrowserContexts) and multiple tabs |
| **WebdriverIO** | Professional driver driving the car     | Uses WebDriver (or DevTools/BiDi) to control the browser    |


*/