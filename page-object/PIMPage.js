import { expect } from '@playwright/test'

export class PIMPage {
    //#region Locators
    constructor(page) {
        this.page = page
        this.PIMLink = page.getByRole('link', { name: 'PIM' })
        this.addEmployee = page.getByRole('button', { name: ' Add' })
        this.employeeName = page.locator('div').filter({ hasText: /^Employee Name$/ }).nth(2)
        this.employeeFirstName = page.getByPlaceholder('First Name')
        this.employeeMiddleName = page.getByPlaceholder('Middle Name')
        this.employeeLastName = page.getByPlaceholder('Last Name')
        this.employeeID = page.locator('form').getByRole('textbox').nth(4)
        this.employeeSaveButton = page.getByRole('button', { name: 'Save' })
        this.employeeCancelButton = page.getByRole('button', { name: 'Cancel' })
        this.jobTitleRoleDropdown = page.locator("//div[div[label[text()='Job Title']]]//div[@class='oxd-select-wrapper']")
        //this.dropdownValueNew = page.locator('form').filter({ hasText: 'Employee Full NameEmployee' }).locator('i').nth(2)
        this.employmentStatusDropdown = page.locator('form i').first()
        this.includeDropdown = page.locator("//div[div[label[text()='Job Title']]]//div[@class='oxd-select-wrapper']")
        this.subUnitDropDown = page.locator("//div[div[label[text()='Sub Unit']]]//div[@class='oxd-select-wrapper']")
    }
    //#endregion
    //#region Methods
    clickOnAddButton = async () => {
        await this.addEmployee.click()
    }
    clickOnPIMLink = async () => {
        await this.PIMLink.click()
    }
    populateEmployeeDetails = async (firstName, middleName, lastName, employeeID) => {
        await this.employeeFirstName.fill(firstName)
        await this.employeeMiddleName.fill(middleName)
        await this.employeeLastName.fill(lastName)
        await this.employeeID.fill(employeeID)
        //await this.page.pause()
    }
    clickOnSaveButton = async () => {
        await this.employeeSaveButton.click()
    }
    verifyPopulatedData = async (firstName, middleName, lastName, employeeID) => {
        expect(await this.employeeFirstName.inputValue()).toEqual(firstName)
        expect(await this.employeeMiddleName.inputValue()).toEqual(middleName)
        expect(await this.employeeLastName.inputValue()).toEqual(lastName)
        expect(await this.employeeID.inputValue()).toEqual(employeeID)
    }
    
    selectRandomOptionAndSave = async (DropdownName) => {
        await this.page.waitForSelector('.oxd-select-text-input', { state: 'visible' });
        await this.page.click(`//div[div[label[text()='${DropdownName}']]]//div[@class='oxd-select-wrapper']`); // Click to open the dropdown
        await this.page.waitForSelector('.oxd-select-option span', { state: 'visible' });
        const options = await this.page.$$eval('.oxd-select-option span', spans => spans.map(span => span.textContent.trim()));
        const randomOption = options[Math.floor(Math.random() * options.length)];
        await this.page.click(`text=${randomOption}`);
        console.log(`Selected Job Title: ${randomOption}`);
        return randomOption; // Save the randomly selected option
    }

    //#endregion
}