import { LoginPage } from '../page-object/loginPage';
import { test } from "@playwright/test"
import { adminDetails } from '../data/userDetails';
import { SharedSteps } from "../helper/SharedSteps";


test.describe('Login tests', () => {
  let loginPage
  let sharedSteps


  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page)
    sharedSteps = new SharedSteps(page)
  })

  test.afterEach(async ({ page }, testInfo) => {
    await sharedSteps.takeScreenshotOnFailure(page, testInfo);
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