import { test } from "@playwright/test"
import { adminDetails } from '../data/userDetails';
import { LoginPage } from '../page-object/loginPage';
import { PIMPage } from '../page-object/PIMPage';
import { employeeDetails } from '../data/userDetails';

test.describe('Employee related tests', () => {
    let loginPage
    let pimPage
    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page)
        pimPage = new PIMPage(page)
    })

    test.only('Verify Added Employee test', async ({page}) => {
        await loginPage.loginToPage(adminDetails.username, adminDetails.password)
        await pimPage.clickOnPIMLink()
        await pimPage.selectRandomJobTitleAndSave('Job Title')
        await pimPage.selectRandomJobTitleAndSave('Include')
        await pimPage.selectRandomJobTitleAndSave('Sub Unit')
        await pimPage.selectRandomJobTitleAndSave('Employment Status')
        await pimPage.clickOnAddButton()
        await pimPage.populateEmployeeDetails(employeeDetails.firstName, employeeDetails.middleName, employeeDetails.lastName, employeeDetails.id)
        await pimPage.clickOnSaveButton()
        await pimPage.verifyPopulatedData(employeeDetails.firstName, employeeDetails.middleName, employeeDetails.lastName, employeeDetails.id)
    })
})