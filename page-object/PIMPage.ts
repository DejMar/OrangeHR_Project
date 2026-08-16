import { expect, type Locator, type Page } from '@playwright/test';

export class PIMPage {
    readonly page: Page;
    readonly PIMLink: Locator;
    readonly addEmployee: Locator;
    readonly employeeName: Locator;
    readonly employeeFirstName: Locator;
    readonly employeeMiddleName: Locator;
    readonly employeeLastName: Locator;
    readonly employeeID: Locator;
    readonly employeeSaveButton: Locator;
    readonly employeeCancelButton: Locator;
    readonly jobTitleRoleDropdown: Locator;
    readonly employmentStatusDropdown: Locator;
    readonly includeDropdown: Locator;
    readonly subUnitDropDown: Locator;

    constructor(page: Page) {
        this.page = page;
        this.PIMLink = page.getByRole('link', { name: 'PIM' });
        this.addEmployee = page.getByRole('button', { name: ' Add' });
        this.employeeName = page.locator('div').filter({ hasText: /^Employee Name$/ }).nth(2);
        this.employeeFirstName = page.getByPlaceholder('First Name');
        this.employeeMiddleName = page.getByPlaceholder('Middle Name');
        this.employeeLastName = page.getByPlaceholder('Last Name');
        this.employeeID = page.locator('form').getByRole('textbox').nth(4);
        this.employeeSaveButton = page.getByRole('button', { name: 'Save' });
        this.employeeCancelButton = page.getByRole('button', { name: 'Cancel' });
        this.jobTitleRoleDropdown = page.locator("//div[div[label[text()='Job Title']]]//div[@class='oxd-select-wrapper']");
        this.employmentStatusDropdown = page.locator('form i').first();
        this.includeDropdown = page.locator("//div[div[label[text()='Job Title']]]//div[@class='oxd-select-wrapper']");
        this.subUnitDropDown = page.locator("//div[div[label[text()='Sub Unit']]]//div[@class='oxd-select-wrapper']");
    }

    async clickOnAddButton(): Promise<void> {
        await this.addEmployee.click();
    }

    async clickOnPIMLink(): Promise<void> {
        await this.PIMLink.click();
    }

    async populateEmployeeDetails(firstName: string, middleName: string, lastName: string, employeeID: string): Promise<void> {
        await this.employeeFirstName.fill(firstName);
        await this.employeeMiddleName.fill(middleName);
        await this.employeeLastName.fill(lastName);
        await this.employeeID.fill(employeeID);
    }

    async clickOnSaveButton(): Promise<void> {
        await this.employeeSaveButton.click();
    }

    async verifyPopulatedData(firstName: string, middleName: string, lastName: string, employeeID: string): Promise<void> {
        expect(await this.employeeFirstName.inputValue()).toEqual(firstName);
        expect(await this.employeeMiddleName.inputValue()).toEqual(middleName);
        expect(await this.employeeLastName.inputValue()).toEqual(lastName);
        expect(await this.employeeID.inputValue()).toEqual(employeeID);
    }

    async selectRandomOptionAndSave(dropdownName: string): Promise<string> {
        await this.page.waitForSelector('.oxd-select-text-input', { state: 'visible' });
        await this.page.click(`//div[div[label[text()='${dropdownName}']]]//div[@class='oxd-select-wrapper']`);
        await this.page.waitForSelector('.oxd-select-option span', { state: 'visible' });
        const options = await this.page.$$eval('.oxd-select-option span', (spans) =>
            spans.map((span) => span.textContent?.trim() ?? '')
        );
        const randomOption = options[Math.floor(Math.random() * options.length)];
        await this.page.click(`text=${randomOption}`);
        console.log(`Selected Job Title: ${randomOption}`);
        return randomOption;
    }
}
