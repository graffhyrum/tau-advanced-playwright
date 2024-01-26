import { chromium, FullConfig } from '@playwright/test';
import LoginPage from '../ui/pages/login-page';
import uiPages from '../utils/uiPages';
import envHandler from "../utils/environmentHandler";

async function globalSetup(config: FullConfig) {
    const {userName: user, password} = envHandler().getMainUser();
    const {baseURL, storageState} = config.projects[0].use;
    const browser = await chromium.launch({headless: true, timeout: 10000});
    const context = await browser.newContext({baseURL, storageState: {cookies: [], origins: []}});
    const page = await context.newPage();
    try {
        await context.tracing.start({screenshots: true, snapshots: true});
        const loginPage = getLoginPage(page);

  await page.goto(baseURL+uiPages.login);
  await loginPage.doLogin(user, password);
  await loginPage.checkLoggedIn();
  await page.context().storageState({ path: storageState as string });
  await browser.close();
}

export default globalSetup;

// https://playwright.dev/docs/test-global-setup-teardown#capturing-trace-of-failures-during-global-setup
// https://playwright.dev/docs/trace-viewer
