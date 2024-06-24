import { LoginPage } from '../page-object/loginPage';
import { test } from "@playwright/test"
import { adminDetails } from '../data/userDetails';

test.describe('Login tests', () => {
  let loginPage
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page)
  })

  test('Login to page', async ({ page }) => {
    await loginPage.loginToPage(adminDetails.username, adminDetails.password)
  })
  test('Invalid Password Login', async ({ page }) => {
    await loginPage.loginToPage(adminDetails.username, adminDetails.invalidPassword)
    await loginPage.verifyInvalidLoginMessage()
  })
  test('Invalid Username Login', async ({ page }) => {
    await loginPage.loginToPage(adminDetails.invalidUsername, adminDetails.password)
    await loginPage.verifyInvalidLoginMessage()
  })
  test('Required all fields Login', async ({ page }) => {
    await loginPage.loginToPage("", "")
    await loginPage.verifyRequiredUsernameMessage()
    await loginPage.verifyRequiredPasswordMessage()
  })
  test('Required username fields Login', async ({ page }) => {
    await loginPage.loginToPage("", adminDetails.password)
    await loginPage.verifyRequiredUsernameMessage()
  })
  test('Required password fields Login', async ({ page }) => {
    await loginPage.loginToPage(adminDetails.username, "")
    await loginPage.verifyRequiredPasswordMessage()
  })
})