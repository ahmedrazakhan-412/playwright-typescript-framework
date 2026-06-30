/*
# 1. How do you upload files?

There are two common scenarios.

## Scenario 1: Input element (`<input type="file">`) **(Most Common)**

If the page contains a file input, use `setInputFiles()`.

### HTML

```html
<input type="file" id="upload">
```

### Playwright

```typescript
await page.locator('#upload')
          .setInputFiles('test-data/sample.pdf');
```

Upload multiple files:

```typescript
await page.locator('#upload').setInputFiles([
    'test-data/file1.pdf',
    'test-data/file2.pdf'
]);
```

Remove uploaded files:

```typescript
await page.locator('#upload').setInputFiles([]);
```

---

## Scenario 2: Upload button opens the file chooser

If clicking a button opens the operating system's file picker:

```typescript
const fileChooserPromise = page.waitForEvent('filechooser');

await page.locator('#uploadButton').click();

const fileChooser = await fileChooserPromise;

await fileChooser.setFiles('test-data/sample.pdf');
```

---

# 2. How do you download files?

Playwright provides the `download` event.

```typescript
const downloadPromise = page.waitForEvent('download');

await page.locator('#downloadButton').click();

const download = await downloadPromise;
```

You now have a `Download` object.

---

# Save the Download

```typescript
await download.saveAs('downloads/report.pdf');
```

---

# Get the Suggested Filename

```typescript
const fileName = download.suggestedFilename();

console.log(fileName);
```

---

# Get the Download Path

```typescript
const path = await download.path();

console.log(path);
```

> **Note:** `download.path()` is available only for local browser execution. It isn't available when running against a remote browser.

---

# 3. How do you verify downloaded files?

There are several ways.

---

## Verify the filename

```typescript
await expect(download.suggestedFilename())
    .toBe('report.pdf');
```

---

## Verify the file exists

Using Node.js:

```typescript
import fs from 'fs';

expect(fs.existsSync('downloads/report.pdf'))
    .toBeTruthy();
```

---

## Verify the file size

```typescript
const stats = fs.statSync('downloads/report.pdf');

console.log(stats.size);
```

---

## Verify the file content

For a text file:

```typescript
const content = fs.readFileSync(
    'downloads/report.txt',
    'utf8'
);

expect(content).toContain('Order Details');
```

---

# Complete Download Example

```typescript
import fs from 'fs';
import { test, expect } from '@playwright/test';

test('Download Report', async ({ page }) => {

    await page.goto('https://example.com');

    const downloadPromise = page.waitForEvent('download');

    await page.locator('#download').click();

    const download = await downloadPromise;

    await download.saveAs('downloads/report.pdf');

    expect(
        fs.existsSync('downloads/report.pdf')
    ).toBeTruthy();

});
```

---

# Upload vs Download

| Upload                                  | Download                             |
| --------------------------------------- | ------------------------------------ |
| `setInputFiles()`                       | `waitForEvent('download')`           |
| Uploads a local file to the application | Receives a file from the application |
| Uses `FileChooser` when needed          | Uses the `Download` object           |

---

# Real Project Example

> "In one project, users could upload supporting documents such as PDF invoices. I automated the upload using `setInputFiles()` because the application used a standard file input. Another module generated sales reports in Excel format. I captured the download using `page.waitForEvent('download')`, saved the file locally, verified that it existed, and validated the generated filename before completing the test."

---

# Interview Answer (2 minutes)

> "For file uploads, I use `setInputFiles()` when the application uses a standard `<input type='file'>` element. If clicking a button opens the native file picker, I first wait for the `filechooser` event and then call `setFiles()`. For downloads, I wait for the `download` event before triggering the download, save the file using `download.saveAs()`, and then verify the downloaded file by checking its filename, existence, size, or content depending on the test scenario."
*/