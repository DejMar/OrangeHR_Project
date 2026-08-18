import { expect, test } from '@playwright/test';
import { LoginPage } from '../page-object/LoginPage';
import { PIMPage } from '../page-object/PIMPage';
import { SharedSteps } from '../helper/SharedSteps';
import { getPimCase, getPimCaseTitle } from '../data/testData';

test.describe('Employee related tests', () => {
    let loginPage: LoginPage;
    let pimPage: PIMPage;
    let sharedSteps: SharedSteps;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        pimPage = new PIMPage(page);
        sharedSteps = new SharedSteps(page);
    });

    test.afterEach(async ({ page }, testInfo) => {
        await sharedSteps.takeScreenshotOnFailure(page, testInfo);
    });

    test(getPimCaseTitle('TC07'), async () => {
        const { login, filters, employee } = getPimCase('TC07');

        await loginPage.loginToPage(login.username, login.password);
        await pimPage.clickOnPIMLink();

        for (const filter of filters ?? []) {
            await sharedSteps.selectRandomOptionAndSave(filter);
        }

        await pimPage.clickOnAddButton();
        await pimPage.populateEmployeeDetails(employee.firstName, employee.middleName, employee.lastName, employee.id);
        await pimPage.clickOnSaveButton();
        await pimPage.verifyPopulatedData(employee.firstName, employee.middleName, employee.lastName, employee.id);
    });

    test(getPimCaseTitle('TC08'), async () => {
        const { login, employee } = getPimCase('TC08');

        await loginPage.loginToPage(login.username, login.password);
        await pimPage.clickOnPIMLink();
        await pimPage.clickAddEmployee();
        await pimPage.populateEmployeeDetails(employee.firstName, employee.middleName, employee.lastName, employee.id);
        await pimPage.clickOnSaveButton();
        await pimPage.verifyPopulatedData(employee.firstName, employee.middleName, employee.lastName, employee.id);
    });

    test(getPimCaseTitle('TC09'), async () => {
        const { login, employee } = getPimCase('TC09');

        await loginPage.loginToPage(login.username, login.password);
        await pimPage.clickOnPIMLink();
        await pimPage.clickAddEmployee();
        await pimPage.populateEmployeeDetails(employee.firstName, employee.middleName, employee.lastName, employee.id);
        await pimPage.clickOnSaveButton();
        await pimPage.clickEmployeeList();
        await pimPage.searchEmployees({ employeeId: employee.id });
        await pimPage.verifyEmployeeInTable(employee.id, employee.firstName, employee.lastName);
    });

    test(getPimCaseTitle('TC10'), async () => {
        const { login, employee } = getPimCase('TC10');

        await loginPage.loginToPage(login.username, login.password);
        await pimPage.clickOnPIMLink();
        await pimPage.clickOnAddButton();
        await pimPage.populateEmployeeDetails(employee.firstName, employee.middleName, employee.lastName, employee.id);
        await pimPage.clickOnCancelButton();
        await expect(pimPage.pageTitle).toBeVisible();
    });
});
