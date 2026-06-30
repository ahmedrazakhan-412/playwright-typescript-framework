/*

# 1. How do you handle Standard Dropdowns?

## What is a Standard Dropdown?

A standard dropdown is created using the HTML `<select>` tag.

Example:

```html
<select id="country">
    <option>India</option>
    <option>USA</option>
    <option>UK</option>
</select>
```

### Playwright Method

Use `selectOption()`.

### By Visible Text
await page.locator('#country').selectOption({ label: 'India' });

### By Value
await page.locator('#country').selectOption({ value: 'IN' });

### By Index
await page.locator('#country').selectOption({ index: 1 });

### Verify Selection
await expect(page.locator('#country')).toHaveValue('IN');

# 2. How do you handle Custom Dropdowns?

## What is a Custom Dropdown?

A custom dropdown is **not** built using `<select>`. Instead, it is created using elements like `<div>`, `<ul>`, `<li>`, `<span>`, etc.

Example:

```html
<div class="dropdown">
    <div>Select Country</div>

    <ul>
        <li>India</li>
        <li>USA</li>
        <li>UK</li>
    </ul>
</div>
```

Since it isn't a `<select>`, `selectOption()` won't work.

### Steps

1. Click the dropdown.
2. Wait for the options to appear (if needed).
3. Click the desired option.

Example:
await page.locator('#countryDropdown').click();
await page.getByText('India').click();

Or:

await page.locator('.dropdown-option')
          .filter({ hasText: 'India' })
          .click();


# 3. Multi-Select Dropdown Handling

### Standard HTML Multi-Select

<select multiple>

Playwright supports selecting multiple options:

await page.locator('#skills')
          .selectOption([
              'Java',
              'Playwright',
              'Selenium'
          ]);

### Custom Multi-Select

For custom controls, click each option individually.

await page.locator('#skillDropdown').click();
await page.getByText('Java').click();
await page.getByText('Playwright').click();
await page.getByText('Selenium').click();


Then verify the selected values.


# 4. Auto-Suggestion Dropdown Handling

Example:
Google Search
Type "Play"

↓

Playwright
Playstation
Play Store
```

### Steps

1. Type the text.
2. Wait for suggestions.
3. Select the matching option.

Example:

await page.locator('#search').fill('Play');
await page.locator('.suggestion')
          .filter({ hasText: 'Playwright' })
          .click();

Or iterate through the suggestions:

const options = page.locator('.suggestion');

const count = await options.count();

for (let i = 0; i < count; i++) {

    const text = await options.nth(i).innerText();

    if (text === 'Playwright') {

        await options.nth(i).click();

        break;
    }
}

# Comparison Table

| Dropdown Type       | HTML Tag                | Playwright Method                                |
| ------------------- | ----------------------- | ------------------------------------------------ |
| Standard Dropdown   | `<select>`              | `selectOption()`                                 |
| Custom Dropdown     | `<div>`, `<ul>`, `<li>` | Click dropdown, then click option                |
| Multi-Select        | `<select multiple>`     | `selectOption(['A', 'B'])`                       |
| Custom Multi-Select | Custom HTML             | Click each option                                |
| Auto-Suggestion     | Dynamic list            | Type, wait for suggestions, select matching item |

# Real Project Example

> "In my recent project, we worked with React-based Material UI dropdowns. These were custom dropdowns implemented with `div` and `li` elements rather than `<select>`. Since `selectOption()` only works with native `<select>` elements, I clicked the dropdown, waited for the option list to render, and selected the required value using Playwright locators. For searchable dropdowns, I typed the search text, waited for the filtered suggestions, and then clicked the matching option."


# Interview Answer (2 minutes)

> "The approach depends on the type of dropdown. For standard HTML `<select>` elements, I use Playwright's `selectOption()` method and can select by value, label, or index. For custom dropdowns built with elements like `div` or `li`, I first open the dropdown and then click the required option because `selectOption()` does not work on custom controls. For multi-select dropdowns, I use `selectOption()` with an array for native controls or click multiple options for custom controls. For auto-suggestion dropdowns, I enter the search text, wait for the dynamic suggestions to appear, and then select the required item using a locator or by iterating through the suggestion list."

| Function             | Example                                                                               | Purpose                      |
| -------------------- | ------------------------------------------------------------------------------------- | ---------------------------- |
| `contains()`         | `//div[contains(@class,'active')]`                                                    | Partial text/attribute match |
| `starts-with()`      | `//input[starts-with(@id,'user')]`                                                    | Prefix matching              |
| `text()`             | `//button[text()='Login']`                                                            | Exact text match             |
| `normalize-space()`  | `//button[normalize-space()='Login']`                                                 | Ignore extra whitespace      |
| `number()`           | `//tr[number(td[2]) > 50000]`                                                         | Numeric comparison           |
| `count()`            | `//table[count(.//tr) > 5]`                                                           | Count child nodes            |
| `position()`         | `//tr[position()=2]`                                                                  | Select by index              |
| `last()`             | `//tr[last()]`                                                                        | Last matching node           |
| `not()`              | `//button[not(@disabled)]`                                                            | Negate a condition           |
| `string-length()`    | `//td[string-length(.) > 10]`                                                         | Length-based filtering       |
| `translate()`        | `translate(text(),'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')='login'` | Case-insensitive matching    |
| `sum()`              | `sum(//td)`                                                                           | Sum numeric node values      |
| `substring()`        | `substring(@id,string-length(@id)-2)='123'`                                           | Extract part of a string     |
| `substring-before()` | `substring-before(//td,' ')`                                                          | Text before a delimiter      |
| `substring-after()`  | `substring-after(//td,'-')`                                                           | Text after a delimiter       |


*/