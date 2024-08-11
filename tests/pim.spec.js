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
        await sharedSteps.takeScreenshotOnFailure(page, testInfo);
      });

    test('TC07 - Verify Added Employee test', async ({page}) => {
        await loginPage.loginToPage(adminDetails.username, adminDetails.password)
        await pimPage.clickOnPIMLink()
        const jobTitle = await sharedSteps.selectRandomOptionAndSave('Job Title')
        console.log('Job Title', jobTitle)
        await sharedSteps.selectRandomOptionAndSave('Include')
        await sharedSteps.selectRandomOptionAndSave('Sub Unit')
        await sharedSteps.selectRandomOptionAndSave('Employment Status')
        await pimPage.clickOnAddButton()
        await pimPage.populateEmployeeDetails(employeeDetails.firstName, employeeDetails.middleName, employeeDetails.lastName, employeeDetails.id)
        await pimPage.clickOnSaveButton()
        await pimPage.verifyPopulatedData(employeeDetails.firstName, employeeDetails.middleName, employeeDetails.lastName, employeeDetails.id)
    })
})