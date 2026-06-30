/*
# Types of JavaScript Alerts

There are three main JavaScript dialogs:

1. **Alert**
2. **Confirm**
3. **Prompt**

Playwright handles all of them through:

```typescript
page.on('dialog', async dialog => {
    ...
});
```

or

```typescript
const dialog = await page.waitForEvent('dialog');
```

---

# 1. How do you handle Alerts?

## What is an Alert?

A simple alert displays a message with only an **OK** button.

Example:

```javascript
alert("Login Successful");
```

### Accept the Alert

```typescript
page.on('dialog', async dialog => {
    console.log(dialog.message());

    await dialog.accept();
});

await page.locator('#alertButton').click();
```

### Output

```
Login Successful
```

---

# 2. How do you handle a Confirm Dialog?

A confirm dialog has **OK** and **Cancel** buttons.

Example:

```javascript
confirm("Delete record?");
```

### Click OK

```typescript
page.on('dialog', async dialog => {

    console.log(dialog.message());

    await dialog.accept();

});

await page.locator('#delete').click();
```

---

### Click Cancel

```typescript
page.on('dialog', async dialog => {

    await dialog.dismiss();

});

await page.locator('#delete').click();
```

* `accept()` → OK
* `dismiss()` → Cancel

---

# 3. How do you handle a Prompt Dialog?

A prompt dialog accepts text input.

Example:

```javascript
prompt("Enter your name");
```

### Enter Text and Click OK

```typescript
page.on('dialog', async dialog => {

    console.log(dialog.message());

    await dialog.accept('Ahmed');

});

await page.locator('#promptButton').click();
```

The dialog receives **Ahmed** as the input.

---

### Click Cancel

```typescript
page.on('dialog', async dialog => {

    await dialog.dismiss();

});

await page.locator('#promptButton').click();
```

---

# Useful `Dialog` Methods

| Method                  | Purpose                                                               |
| ----------------------- | --------------------------------------------------------------------- |
| `dialog.accept()`       | Click **OK**                                                          |
| `dialog.accept('text')` | Enter text and click **OK** (prompt only)                             |
| `dialog.dismiss()`      | Click **Cancel**                                                      |
| `dialog.message()`      | Get the dialog message                                                |
| `dialog.type()`         | Get the dialog type (`alert`, `confirm`, `prompt`, or `beforeunload`) |
| `dialog.defaultValue()` | Get the default value of a prompt                                     |

---

## Example

```typescript
page.on('dialog', async dialog => {

    console.log(dialog.type());

    console.log(dialog.message());

    console.log(dialog.defaultValue());

    await dialog.accept();

});
```

---

# `page.on('dialog')` vs `page.waitForEvent('dialog')`

### `page.on('dialog')`

Use when dialogs may appear multiple times.

```typescript
page.on('dialog', async dialog => {

    await dialog.accept();

});
```

---

### `page.waitForEvent('dialog')`

Use when expecting a single dialog.

```typescript
const dialogPromise = page.waitForEvent('dialog');

await page.locator('#alert').click();

const dialog = await dialogPromise;

console.log(dialog.message());

await dialog.accept();
```

---

# Real Project Example

> "In one project, deleting a customer record displayed a JavaScript confirm dialog asking, 'Are you sure you want to delete this record?'. I used `page.waitForEvent('dialog')` to capture the dialog, validated the message using `dialog.message()`, and called `dialog.accept()` to proceed with the deletion. For negative test scenarios, I used `dialog.dismiss()` to verify that the record was not deleted."

---

# Interview Summary

| Dialog Type       | JavaScript  | Playwright                      |
| ----------------- | ----------- | ------------------------------- |
| Alert             | `alert()`   | `dialog.accept()`               |
| Confirm           | `confirm()` | `accept()` or `dismiss()`       |
| Prompt            | `prompt()`  | `accept('text')` or `dismiss()` |
| Get Message       | -           | `dialog.message()`              |
| Get Type          | -           | `dialog.type()`                 |
| Get Default Value | -           | `dialog.defaultValue()`         |

---

# Interview Answer (2 minutes)

> "Playwright handles JavaScript dialogs through the `dialog` event. For an alert dialog, I use `dialog.accept()` to click OK. For a confirm dialog, I use `dialog.accept()` to confirm or `dialog.dismiss()` to cancel. For a prompt dialog, I use `dialog.accept('input text')` to provide input and submit it, or `dialog.dismiss()` to cancel. I can also validate the dialog's message with `dialog.message()` and identify its type using `dialog.type()`. Depending on the scenario, I use `page.waitForEvent('dialog')` for a single expected dialog or `page.on('dialog')` when multiple dialogs may appear during the test.`
*/