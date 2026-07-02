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

| Command                                             | Purpose                            |
| --------------------------------------------------- | ---------------------------------- |
| `npx playwright test`                               | Run all tests                      |
| `npx playwright test login.spec.ts`                 | Run a single file                  |
| `npx playwright test -g "Login"`                    | Run by test title                  |
| `npx playwright test --grep "@smoke"`               | Run tagged tests                   |
| `npx playwright test --grep-invert "@wip"`          | Exclude tagged tests               |
| `npx playwright test --project=chromium`            | Run on Chromium                    |
| `npx playwright test --headed`                      | Run with browser UI                |
| `npx playwright test --debug`                       | Launch Playwright Inspector        |
| `npx playwright test --ui`                          | Open Playwright Test UI            |
| `npx playwright show-report`                        | Open HTML report                   |
| `npx playwright show-trace trace.zip`               | Open Trace Viewer                  |
| `npx playwright codegen`                            | Generate automation code           |
| `npx playwright install`                            | Install browser binaries           |
| `npx playwright test --workers=4`                   | Parallel execution                 |
| `npx playwright test --retries=2`                   | Retry failed tests                 |
| `npx playwright test --last-failed`                 | Rerun only previously failed tests |
| `npx playwright test --repeat-each=5`               | Repeat each test multiple times    |
| `npx playwright test --update-snapshots`            | Update visual snapshots            |
| `npx playwright test --config=playwright.config.ts` | Use a specific configuration file  |

The Playwright CLI itself has around **35–45 primary commands/options**. 
To reach **100 interview-useful commands**, we include:

* Playwright Test commands
* Browser installation commands
* Codegen commands
* Trace Viewer commands
* Reporter commands
* Project execution commands
* UI mode commands
* Debug commands
* Sharding commands
* Snapshot commands
* Environment variable examples
* npm scripts commonly used with Playwright

Below is a **100-command cheat sheet** in the same format as your table.

| No | Command | Purpose |
|----|---------|---------|
| 1 | npx playwright test | Run all tests |
| 2 | npx playwright test login.spec.ts | Run a single test file |
| 3 | npx playwright test tests/api | Run tests in a folder |
| 4 | npx playwright test login.spec.ts:25 | Run test from line number |
| 5 | npx playwright test -g "Login" | Run tests by title |
| 6 | npx playwright test --grep "@smoke" | Run smoke tests |
| 7 | npx playwright test --grep "@regression" | Run regression tests |
| 8 | npx playwright test --grep "@sanity" | Run sanity tests |
| 9 | npx playwright test --grep-invert "@wip" | Exclude WIP tests |
| 10 | npx playwright test --grep-invert "@skip" | Exclude skipped tags |

| 11 | npx playwright test --headed | Run headed |
| 12 | npx playwright test --debug | Debug mode |
| 13 | npx playwright test --ui | Open Playwright UI |
| 14 | npx playwright test --workers=1 | Sequential execution |
| 15 | npx playwright test --workers=4 | Parallel execution |
| 16 | npx playwright test --workers=8 | Parallel with 8 workers |
| 17 | npx playwright test --retries=2 | Retry failures |
| 18 | npx playwright test --repeat-each=5 | Repeat every test |
| 19 | npx playwright test --timeout=60000 | Test timeout |
| 20 | npx playwright test --global-timeout=600000 | Global timeout |

| 21 | npx playwright test --project=chromium | Chromium |
| 22 | npx playwright test --project=firefox | Firefox |
| 23 | npx playwright test --project=webkit | WebKit |
| 24 | npx playwright test --project="Mobile Chrome" | Mobile Chrome |
| 25 | npx playwright test --project="Mobile Safari" | Mobile Safari |
| 26 | npx playwright test --project=chromium --headed | Chromium headed |
| 27 | npx playwright test --project=firefox --headed | Firefox headed |
| 28 | npx playwright test --project=webkit --headed | WebKit headed |
| 29 | npx playwright test --browser=chromium | Chromium browser |
| 30 | npx playwright test --browser=firefox | Firefox browser |

| 31 | npx playwright show-report | Open HTML report |
| 32 | npx playwright show-trace trace.zip | Open Trace Viewer |
| 33 | npx playwright merge-reports ./blob-report | Merge reports |
| 34 | npx playwright test --reporter=html | HTML reporter |
| 35 | npx playwright test --reporter=list | List reporter |
| 36 | npx playwright test --reporter=line | Line reporter |
| 37 | npx playwright test --reporter=dot | Dot reporter |
| 38 | npx playwright test --reporter=json | JSON reporter |
| 39 | npx playwright test --reporter=junit | JUnit reporter |
| 40 | npx playwright test --reporter=blob | Blob reporter |

| 41 | npx playwright install | Install browsers |
| 42 | npx playwright install chromium | Install Chromium |
| 43 | npx playwright install firefox | Install Firefox |
| 44 | npx playwright install webkit | Install WebKit |
| 45 | npx playwright install --with-deps | Install with dependencies |
| 46 | npx playwright uninstall | Remove browsers |
| 47 | npx playwright install-deps | Install Linux dependencies |
| 48 | npx playwright install msedge | Install Edge |
| 49 | npx playwright install chrome | Install Chrome |
| 50 | npx playwright install chromium firefox | Install multiple browsers |

| 51 | npx playwright codegen | Record script |
| 52 | npx playwright codegen https://google.com | Record against URL |
| 53 | npx playwright codegen --target=java | Java code |
| 54 | npx playwright codegen --target=python | Python code |
| 55 | npx playwright codegen --target=csharp | C# code |
| 56 | npx playwright codegen --target=javascript | JavaScript code |
| 57 | npx playwright codegen --target=playwright-test | Playwright Test code |
| 58 | npx playwright codegen --save-storage=state.json | Save login state |
| 59 | npx playwright codegen --load-storage=state.json | Load login state |
| 60 | npx playwright open https://google.com | Open browser |

| 61 | npx playwright test --list | List tests |
| 62 | npx playwright test --last-failed | Run failed tests |
| 63 | npx playwright test --max-failures=1 | Stop after first failure |
| 64 | npx playwright test --max-failures=5 | Stop after five failures |
| 65 | npx playwright test --output=test-results | Output folder |
| 66 | npx playwright test --quiet | Quiet output |
| 67 | npx playwright test --forbid-only | Prevent test.only |
| 68 | npx playwright test --update-snapshots | Update snapshots |
| 69 | npx playwright test --ignore-snapshots | Ignore snapshots |
| 70 | npx playwright test --pass-with-no-tests | Pass if no tests |

| 71 | npx playwright test --config=playwright.config.ts | Default config |
| 72 | npx playwright test --config=qa.config.ts | QA config |
| 73 | npx playwright test --config=uat.config.ts | UAT config |
| 74 | npx playwright test --config=prod.config.ts | Prod config |
| 75 | BASE_URL=https://qa.site.com npx playwright test | Environment variable |
| 76 | ENV=QA npx playwright test | QA execution |
| 77 | ENV=UAT npx playwright test | UAT execution |
| 78 | ENV=PROD npx playwright test | PROD execution |
| 79 | USER=admin npx playwright test | User variable |
| 80 | PASSWORD=secret npx playwright test | Password variable |

| 81 | npx playwright test --shard=1/2 | First shard |
| 82 | npx playwright test --shard=2/2 | Second shard |
| 83 | npx playwright test --shard=1/4 | First shard of four |
| 84 | npx playwright test --shard=4/4 | Fourth shard |
| 85 | npx playwright test --trace=on | Enable trace |
| 86 | npx playwright test --trace=retain-on-failure | Retain trace |
| 87 | npx playwright test --trace=on-first-retry | Trace on retry |
| 88 | npx playwright test --video=on | Record video |
| 89 | npx playwright test --screenshot=only-on-failure | Screenshot on failure |
| 90 | npx playwright test --video=retain-on-failure | Retain video |

| 91 | npm init playwright@latest | Create Playwright project |
| 92 | npm install @playwright/test | Install Playwright |
| 93 | npm update @playwright/test | Update Playwright |
| 94 | npx playwright --help | CLI help |
| 95 | npx playwright test --help | Test help |
| 96 | npx playwright codegen --help | Codegen help |
| 97 | npx playwright install --help | Install help |
| 98 | npx playwright show-report --help | Report help |
| 99 | npx playwright show-trace --help | Trace help |
|100| npx playwright test --version | Display Playwright version |


## Senior QA Interview Tip

You do **not** need to memorize all 100 commands.

The **20 most frequently asked** commands in interviews are:

* `npx playwright test`
* `--headed`
* `--debug`
* `--ui`
* `--workers`
* `--project`
* `--grep`
* `--grep-invert`
* `--retries`
* `--last-failed`
* `--repeat-each`
* `--config`
* `--reporter`
* `show-report`
* `show-trace`
* `codegen`
* `install`
* `--trace`
* `--video`
* `--screenshot`

These are the commands you'll most likely use in day-to-day 
Playwright automation and encounter in senior QA interviews.
*/