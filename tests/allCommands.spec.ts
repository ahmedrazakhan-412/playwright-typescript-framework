/*
| Purpose                             | Command                                    | Example                                                 |
| ----------------------------------- | ------------------------------------------ | ------------------------------------------------------- |
| Run all tests                       | `npx playwright test`                      | `npx playwright test`                                   |
| Run a specific test file            | `npx playwright test <filename>`           | `npx playwright test tests/login.spec.ts`               |
| Run tests matching a title          | `npx playwright test -g "<title>"`         | `npx playwright test -g "should login successfully"`    |
| Run a specific test by line number  | `npx playwright test <file>:<line>`        | `npx playwright test tests/login.spec.ts:15`            |
| Run tests in a directory            | `npx playwright test <directory>`          | `npx playwright test tests/api`                         |
| Run tests with a specific tag       | `npx playwright test --grep "@tag"`        | `npx playwright test --grep "@smoke"`                   |
| Exclude tests with a tag            | `npx playwright test --grep-invert "@tag"` | `npx playwright test --grep-invert "@wip"`              |
| Run tests in parallel (default)     | `npx playwright test`                      | `npx playwright test`                                   |
| Run tests sequentially              | `npx playwright test --workers=1`          | `npx playwright test --workers=1`                       |
| Run only failed tests (last failed) | `npx playwright test --last-failed`        | `npx playwright test --last-failed`                     |
| Run a specific test by name         | `npx playwright test -g "<test name>"`     | `npx playwright test -g "Search box should be visible"` |
| Use a specific config file          | `npx playwright test --config=<config>`    | `npx playwright test --config=playwright.dev.config.ts` |
| Run a specific browser project      | `npx playwright test --project=<project>`  | `npx playwright test --project=chromium`                |
| Generate HTML report                | `npx playwright test --reporter=html`      | `npx playwright test --reporter=html`                   |
| Run in headed mode                  | `npx playwright test --headed`             | `npx playwright test --headed`                          |
| Run in debug mode                   | `npx playwright test --debug`              | `npx playwright test --debug`                           |
| Use environment variables           | `ENV_VAR=value npx playwright test`        | `BASE_URL=https://dev.site.com npx playwright test`     |
*/