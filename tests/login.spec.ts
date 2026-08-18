import { test } from '../fixtures/baseTest';
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
    test(getLoginCaseTitle(caseId), async ({ logger }) => {
      const { username, password, expected } = getLoginCase(caseId);

      await logger.step('Login to the application', async () => {
        await loginPage.loginToPage(username, password);
      });

      switch (expected) {
        case 'invalidCredentials':
          await logger.step('Verify invalid credentials message', async () => {
            await loginPage.verifyInvalidLoginMessage();
          });
          break;
        case 'requiredAll':
          await logger.step('Verify required username message', async () => {
            await loginPage.verifyRequiredUsernameMessage();
          });
          await logger.step('Verify required password message', async () => {
            await loginPage.verifyRequiredPasswordMessage();
          });
          break;
        case 'requiredUsername':
          await logger.step('Verify required username message', async () => {
            await loginPage.verifyRequiredUsernameMessage();
          });
          break;
        case 'requiredPassword':
          await logger.step('Verify required password message', async () => {
            await loginPage.verifyRequiredPasswordMessage();
          });
          break;
      }
    });
  }
});
