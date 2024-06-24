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

    test.only('Verify Added Employee', async ({}) => {
        await loginPage.loginToPage(adminDetails.username, adminDetails.password)
        await pimPage.clickOnPIMLink()
        await pimPage.clickOnAddButton()
        await pimPage.populateEmployeeDetails(employeeDetails.firstName, employeeDetails.middleName, employeeDetails.lastName, employeeDetails.id)
        await pimPage.clickOnSaveButton()
        await pimPage.verifyPopulatedData(employeeDetails.firstName, employeeDetails.middleName, employeeDetails.lastName, employeeDetails.id)
    })
    test('Verify dropdown', async ({ page }) => {
        await loginPage.loginToPage(adminDetails.username, adminDetails.password)
        await pimPage.clickOnPIMLink()

        await page.locator("(//div[@class='oxd-select-text--after']//i)[3]").click()
        await page.waitForTimeout(3000)
        const options = await page.$$("//div[@role='listbox']//span")
        for (let option of options) {
            const jobTitle = await option.textContent()
            console.log(jobTitle)
            if (jobTitle == 'HR manager') {
                await option.click()
                break
            }
        }
    })
    test("Bootstrap dropdown", async ({ page }) => {
        await page.goto("https://www.lambdatest.com/selenium-playground/jQuery-dropdown-search-demo");
        await selectCountry("India");
        await selectCountry("Denmark");
        await selectCountry("South Africa");
        // await page.waitForTimeout(3000)
     
        async function selectCountry(countryName) {
            await page.click("#country+span");
            await page.locator("ul#select2-country-results")
                .locator("li", {
                    hasText: countryName
                }).click();
        }
    })
})