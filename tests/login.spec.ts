import { test } from '@playwright/test';
import { LoginPage } from '../page-object/LoginPage';
import { SharedSteps } from '../helper/SharedSteps';
import { getLoginCase, getLoginCaseIds, getLoginCaseTitle } from '../data/testData';

test.describe('Login tests', () => {
  let loginPage: LoginPage;
  let sharedSteps: SharedSteps;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    sharedSteps = new SharedSteps(page);
  });

  test.afterEach(async ({ page }, testInfo) => {
    await sharedSteps.takeScreenshotOnFailure(page, testInfo);
  });

  for (const caseId of getLoginCaseIds()) {
    test(getLoginCaseTitle(caseId), async () => {
      const { username, password, expected } = getLoginCase(caseId);
      await loginPage.loginToPage(username, password);

      switch (expected) {
        case 'invalidCredentials':
          await loginPage.verifyInvalidLoginMessage();
          break;
        case 'requiredAll':
          await loginPage.verifyRequiredUsernameMessage();
          await loginPage.verifyRequiredPasswordMessage();
          break;
        case 'requiredUsername':
          await loginPage.verifyRequiredUsernameMessage();
          break;
        case 'requiredPassword':
          await loginPage.verifyRequiredPasswordMessage();
          break;
      }
    });
  }
});
