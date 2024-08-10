import { LoginPage } from '../page-object/loginPage';
import { test } from "@playwright/test"
import { adminDetails } from '../data/userDetails';

test.describe('Login tests', () => {
  let loginPage

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page)
  })

  test.afterEach(async ({ page }, testInfo) => {
    if (testInfo.status !== 'passed') {
      const screenshotPath = `screenshots/${testInfo.title.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.png`;
      await page.screenshot({ path: screenshotPath, fullPage: true });
      console.log(`Screenshot saved: ${screenshotPath}`);
    }
  });

  test('TC001 - Login', async ({ }) => {
    await loginPage.loginToPage(adminDetails.username, adminDetails.password)
  })
  test('TC002 - Invalid Password Login', async ({ }) => {
    await loginPage.loginToPage(adminDetails.username, adminDetails.invalidPassword)
    await loginPage.verifyInvalidLoginMessage()
  })
  test('TC003 - Invalid Username Login', async ({ }) => {
    await loginPage.loginToPage(adminDetails.invalidUsername, adminDetails.password)
    await loginPage.verifyInvalidLoginMessage()
  })
  test('TC004 - Required all fields Login', async ({ }) => {
    await loginPage.loginToPage("", "")
    await loginPage.verifyRequiredUsernameMessage()
    await loginPage.verifyRequiredPasswordMessage()
  })
  test('TC005 - Required username fields Login', async ({ }) => {
    await loginPage.loginToPage("", adminDetails.password)
    await loginPage.verifyRequiredUsernameMessage()
  })
  test('TC006 - Required password fields Login.', async ({ }) => {
    await loginPage.loginToPage(adminDetails.username, "")
    await loginPage.verifyRequiredPasswordMessage()
  })
})