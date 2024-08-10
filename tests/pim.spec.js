import { test } from "@playwright/test"
import { adminDetails } from '../data/userDetails';
import { LoginPage } from '../page-object/loginPage';
import { PIMPage } from '../page-object/PIMPage';
import { employeeDetails } from '../data/userDetails';
import { SharedSteps } from "../helper/SharedSteps";

test.describe('Employee related tests', () => {
    let loginPage
    let pimPage
    let sharedSteps

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page)
        pimPage = new PIMPage(page)
        sharedSteps = new SharedSteps(page)
    })

    test.afterEach(async ({ page }, testInfo) => {
        if (testInfo.status !== 'passed') {
          const screenshotPath = `screenshots/${testInfo.title.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.png`;
          await page.screenshot({ path: screenshotPath, fullPage: true });
          console.log(`Screenshot saved: ${screenshotPath}`);
        }
      });

    test.only('TC07 - Verify Added Employee test', async ({page}) => {
        await loginPage.loginToPage(adminDetails.username, adminDetails.password)
        await pimPage.clickOnPIMLink()
        await sharedSteps.selectRandomOptionAndSave('Job Title')
        await sharedSteps.selectRandomOptionAndSave('Include')
        await sharedSteps.selectRandomOptionAndSave('Sub Unit')
        await sharedSteps.selectRandomOptionAndSave('Employment Status')
        await pimPage.clickOnAddButton()
        await pimPage.populateEmployeeDetails(employeeDetails.firstName, employeeDetails.middleName, employeeDetails.lastName, employeeDetails.id)
        await pimPage.clickOnSaveButton()
        await pimPage.verifyPopulatedData(employeeDetails.firstName, employeeDetails.middleName, employeeDetails.lastName, employeeDetails.id)
    })
})