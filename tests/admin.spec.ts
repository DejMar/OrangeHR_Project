import { test, expect } from '../fixtures/baseTest';
import { LoginPage } from '../page-object/LoginPage';
import { AdminPage } from '../page-object/AdminPage';
import { SharedSteps } from '../helper/SharedSteps';
import { getAdminCase, getAdminCaseTitle } from '../data/testData';

test.describe('Admin tests', () => {
    let loginPage: LoginPage;
    let adminPage: AdminPage;
    let sharedSteps: SharedSteps;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        adminPage = new AdminPage(page);
        sharedSteps = new SharedSteps(page);
    });

    test.afterEach(async ({ page }, testInfo) => {
        await sharedSteps.takeScreenshotOnFailure(page, testInfo);
    });

    test(getAdminCaseTitle('TC11'), async ({ logger }) => {
        const { login, search, expected } = getAdminCase('TC11');

        await logger.step('Login as admin', async () => {
            await loginPage.loginToPage(login.username, login.password);
        });
        await logger.step('Open Admin page', async () => {
            await adminPage.clickOnAdminLink();
        });
        await logger.step(`Search system users by username ${search?.username}`, async () => {
            await adminPage.searchSystemUsers({ username: search?.username });
        });
        await logger.step('Verify Admin user is visible in the table', async () => {
            await adminPage.verifyUserVisible(expected!.username, {
                userRole: expected?.userRole,
                status: expected?.status,
            });
        });
        await logger.step('Verify records found', async () => {
            await adminPage.verifyRecordsFound();
        });
    });

    test(getAdminCaseTitle('TC12'), async ({ logger }) => {
        const { login, search, expected } = getAdminCase('TC12');

        await logger.step('Login as admin', async () => {
            await loginPage.loginToPage(login.username, login.password);
        });
        await logger.step('Open Admin page', async () => {
            await adminPage.clickOnAdminLink();
        });
        await logger.step(`Search system users by role ${search?.userRole}`, async () => {
            await adminPage.searchSystemUsers({ userRole: search?.userRole });
        });
        await logger.step('Verify Admin user is visible in the table', async () => {
            await adminPage.verifyUserVisible(expected!.username, { userRole: expected?.userRole });
        });
        await logger.step('Verify records found', async () => {
            await adminPage.verifyRecordsFound();
        });
    });

    test(getAdminCaseTitle('TC13'), async ({ logger }) => {
        const { login, search, expected } = getAdminCase('TC13');

        await logger.step('Login as admin', async () => {
            await loginPage.loginToPage(login.username, login.password);
        });
        await logger.step('Open Admin page', async () => {
            await adminPage.clickOnAdminLink();
        });
        await logger.step(`Search system users by status ${search?.status}`, async () => {
            await adminPage.searchSystemUsers({ status: search?.status });
        });
        await logger.step('Verify Admin user is visible in the table', async () => {
            await adminPage.verifyUserVisible(expected!.username, { status: expected?.status });
        });
        await logger.step('Verify records found', async () => {
            await adminPage.verifyRecordsFound();
        });
    });

    test(getAdminCaseTitle('TC14'), async ({ logger }) => {
        const { login, search } = getAdminCase('TC14');

        await logger.step('Login as admin', async () => {
            await loginPage.loginToPage(login.username, login.password);
        });
        await logger.step('Open Admin page', async () => {
            await adminPage.clickOnAdminLink();
        });
        await logger.step(`Fill username filter with ${search!.username}`, async () => {
            await adminPage.fillUsername(search!.username!);
        });
        await logger.step('Reset search filters', async () => {
            await adminPage.clickReset();
        });
        await logger.step('Verify username filter is cleared', async () => {
            await expect(adminPage.usernameInput).toHaveValue('');
        });
    });

    test(getAdminCaseTitle('TC15'), async ({ logger }) => {
        const { login, navigation } = getAdminCase('TC15');

        await logger.step('Login as admin', async () => {
            await loginPage.loginToPage(login.username, login.password);
        });
        await logger.step('Open Admin page', async () => {
            await adminPage.clickOnAdminLink();
        });
        await logger.step(`Open Job menu item ${navigation!.jobItem}`, async () => {
            await adminPage.openJob(navigation!.jobItem!);
            await expect(adminPage.page.getByRole('heading', { name: navigation!.jobItem })).toBeVisible();
        });
        await logger.step('Open Nationalities', async () => {
            await adminPage.clickNationalities();
            await expect(adminPage.page.getByRole('heading', { name: 'Nationalities' })).toBeVisible();
        });
        await logger.step(`Open User Management item ${navigation!.userManagementItem}`, async () => {
            await adminPage.openUserManagement(navigation!.userManagementItem!);
            await expect(adminPage.pageTitle).toBeVisible();
        });
        await logger.step('Open Add User form', async () => {
            await adminPage.clickAdd();
            await expect(adminPage.page.getByRole('heading', { name: 'Add User' })).toBeVisible();
        });
    });
});
