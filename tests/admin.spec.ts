import { expect, test } from '@playwright/test';
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

    test(getAdminCaseTitle('TC11'), async () => {
        const { login, search, expected } = getAdminCase('TC11');

        await loginPage.loginToPage(login.username, login.password);
        await adminPage.clickOnAdminLink();
        await adminPage.searchSystemUsers({ username: search?.username });
        await adminPage.verifyUserVisible(expected!.username, {
            userRole: expected?.userRole,
            status: expected?.status,
        });
        await adminPage.verifyRecordsFound();
    });

    test(getAdminCaseTitle('TC12'), async () => {
        const { login, search, expected } = getAdminCase('TC12');

        await loginPage.loginToPage(login.username, login.password);
        await adminPage.clickOnAdminLink();
        await adminPage.searchSystemUsers({ userRole: search?.userRole });
        await adminPage.verifyUserVisible(expected!.username, { userRole: expected?.userRole });
        await adminPage.verifyRecordsFound();
    });

    test(getAdminCaseTitle('TC13'), async () => {
        const { login, search, expected } = getAdminCase('TC13');

        await loginPage.loginToPage(login.username, login.password);
        await adminPage.clickOnAdminLink();
        await adminPage.searchSystemUsers({ status: search?.status });
        await adminPage.verifyUserVisible(expected!.username, { status: expected?.status });
        await adminPage.verifyRecordsFound();
    });

    test(getAdminCaseTitle('TC14'), async () => {
        const { login, search } = getAdminCase('TC14');

        await loginPage.loginToPage(login.username, login.password);
        await adminPage.clickOnAdminLink();
        await adminPage.fillUsername(search!.username!);
        await adminPage.clickReset();
        await expect(adminPage.usernameInput).toHaveValue('');
    });

    test(getAdminCaseTitle('TC15'), async () => {
        const { login, navigation } = getAdminCase('TC15');

        await loginPage.loginToPage(login.username, login.password);
        await adminPage.clickOnAdminLink();
        await adminPage.openJob(navigation!.jobItem!);
        await expect(adminPage.page.getByRole('heading', { name: navigation!.jobItem })).toBeVisible();
        await adminPage.clickNationalities();
        await expect(adminPage.page.getByRole('heading', { name: 'Nationalities' })).toBeVisible();
        await adminPage.openUserManagement(navigation!.userManagementItem!);
        await expect(adminPage.pageTitle).toBeVisible();
        await adminPage.clickAdd();
        await expect(adminPage.page.getByRole('heading', { name: 'Add User' })).toBeVisible();
    });
});
