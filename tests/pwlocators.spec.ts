/*Quick Guide
These are the recommended built-in locators.

page.getByRole() to locate by explicit and implicit accessibility attributes.
page.getByText() to locate by text content.
page.getByLabel() to locate a form control by associated label's text.
page.getByPlaceholder() to locate an input by placeholder.
page.getByAltText() to locate an element, usually image, by its text alternative.
page.getByTitle() to locate an element by its title attribute.
page.getByTestId() to locate an element based on its data-testid attribute (other attributes can be configured).
*/

import { test, expect, Locator } from "@playwright/test";

test("Playwright Locators", async ({ page }) => {
    await page.goto("https://demo.nopcommerce.com/");

    let title: string = await page.title();
    console.log(title);

    await expect(page).toHaveTitle("nopCommerce demo store. Home page title");
    /*Locate by alt text
    All images should have an alt attribute that describes the image. 
    You can locate an image based on the text alternative using page.getByAltText().
    */
    const logo: Locator = page.getByAltText("nopCommerce demo store");
    await expect(logo).toBeVisible();

    /*Locate by text
    Find an element by the text it contains. You can match by a substring, exact string, or a regular expression when using page.getByText().
    */

    await expect(page.getByText("Welcome to our store")).toBeVisible();

    /*Locate by role
    The page.getByRole() locator reflects how users and assistive technology perceive the page, 
    for example whether some element is a button or a checkbox. When locating by role, you should usually pass the accessible name as well, so that the locator pinpoints the exact element.
    */

    await page.getByRole("link", { name: "Register" }).click();
    await expect(page.getByRole("heading", { name: "Register" })).toBeVisible();

    /*Locate by label
    Most form controls usually have dedicated labels that could be conveniently used to interact with the form. 
    In this case, you can locate the control by its associated label using page.getByLabel().
    */
    await page.getByLabel("First name:").fill("John");  // type is deprecated, use fill instead of type
    await page.getByLabel("Last name:").fill("Doe");
    await page.getByLabel("Email:").fill("abc@example.com");

    /*Locate by placeholder
    Inputs may have a placeholder attribute to hint to the user what value should be entered. You can locate such an input using page.getByPlaceholder().
    */
    await page.getByPlaceholder("Search store").fill("Apple MacBook Pro 13-inch");

    /*Locate by title
    Locate an element with a matching title attribute using page.getByTitle().
    */

    await page.goto("https://demo.nopcommerce.com/");
    await page.getByTitle("My account").click();

    /*Locate by test id
    Testing by test ids is the most resilient way of testing as even if your text or role of the attribute changes, the test will still pass. 
    QA's and developers should define explicit test ids and query them with page.getByTestId(). 
    However testing by test ids is not user facing. If the role or text value is important to you then consider using user facing locators such as role and text locators.
    */

    await expect(page.getByTestId("example-test-id")).toHaveText("Example test id");

});