import { test, expect } from '../fixtures/baseTest';
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

    test(getPimCaseTitle('TC07'), async ({ logger }) => {
        const { login, filters, employee } = getPimCase('TC07');

        await logger.step('Login as admin', async () => {
            await loginPage.loginToPage(login.username, login.password);
        });
        await logger.step('Open PIM page', async () => {
            await pimPage.clickOnPIMLink();
        });
        for (const filter of filters ?? []) {
            await logger.step(`Select random ${filter} filter`, async () => {
                await sharedSteps.selectRandomOptionAndSave(filter);
            });
        }
        await logger.step('Click Add employee', async () => {
            await pimPage.clickOnAddButton();
        });
        await logger.step('Populate employee details', async () => {
            await pimPage.populateEmployeeDetails(employee.firstName, employee.middleName, employee.lastName, employee.id);
        });
        await logger.step('Save employee', async () => {
            await pimPage.clickOnSaveButton();
        });
        await logger.step('Verify populated employee data', async () => {
            await pimPage.verifyPopulatedData(employee.firstName, employee.middleName, employee.lastName, employee.id);
        });
    });

    test(getPimCaseTitle('TC08'), async ({ logger }) => {
        const { login, employee } = getPimCase('TC08');

        await logger.step('Login as admin', async () => {
            await loginPage.loginToPage(login.username, login.password);
        });
        await logger.step('Open PIM page', async () => {
            await pimPage.clickOnPIMLink();
        });
        await logger.step('Open Add Employee from topbar', async () => {
            await pimPage.clickAddEmployee();
        });
        await logger.step('Populate employee details', async () => {
            await pimPage.populateEmployeeDetails(employee.firstName, employee.middleName, employee.lastName, employee.id);
        });
        await logger.step('Save employee', async () => {
            await pimPage.clickOnSaveButton();
        });
        await logger.step('Verify populated employee data', async () => {
            await pimPage.verifyPopulatedData(employee.firstName, employee.middleName, employee.lastName, employee.id);
        });
    });

    test(getPimCaseTitle('TC09'), async ({ logger }) => {
        const { login, employee } = getPimCase('TC09');

        await logger.step('Login as admin', async () => {
            await loginPage.loginToPage(login.username, login.password);
        });
        await logger.step('Open PIM page', async () => {
            await pimPage.clickOnPIMLink();
        });
        await logger.step('Open Add Employee from topbar', async () => {
            await pimPage.clickAddEmployee();
        });
        await logger.step('Populate employee details', async () => {
            await pimPage.populateEmployeeDetails(employee.firstName, employee.middleName, employee.lastName, employee.id);
        });
        await logger.step('Save employee', async () => {
            await pimPage.clickOnSaveButton();
        });
        await logger.step('Open Employee List', async () => {
            await pimPage.clickEmployeeList();
        });
        await logger.step(`Search employee by ID ${employee.id}`, async () => {
            await pimPage.searchEmployees({ employeeId: employee.id });
        });
        await logger.step('Verify employee is shown in the table', async () => {
            await pimPage.verifyEmployeeInTable(employee.id, employee.firstName, employee.lastName);
        });
    });

    test(getPimCaseTitle('TC10'), async ({ logger }) => {
        const { login, employee } = getPimCase('TC10');

        await logger.step('Login as admin', async () => {
            await loginPage.loginToPage(login.username, login.password);
        });
        await logger.step('Open PIM page', async () => {
            await pimPage.clickOnPIMLink();
        });
        await logger.step('Click Add employee', async () => {
            await pimPage.clickOnAddButton();
        });
        await logger.step('Populate employee details', async () => {
            await pimPage.populateEmployeeDetails(employee.firstName, employee.middleName, employee.lastName, employee.id);
        });
        await logger.step('Cancel adding employee', async () => {
            await pimPage.clickOnCancelButton();
        });
        await logger.step('Verify Employee Information page is shown', async () => {
            await expect(pimPage.pageTitle).toBeVisible();
        });
    });
});
