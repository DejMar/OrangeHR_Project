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

        //this.dropdownSelector = page.locator("('form i').nth(2)")
        //this.dropdownOptions = page.locator("//div[@class='oxd-select-dropdown --positon-bottom']")
        //this.dropdownList = page.locator$("//div[@role='listbox']//span") 
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
    dropdownvalue = async () => {
        await this.dropdownOptions.click();
        const options = await this.dropdownList;
        const randomIndex = Math.floor(Math.random() * options.length);
        const randomOption = options[randomIndex];
        const jobTitle = await randomOption.textContent();
        console.log(jobTitle);
        return jobTitle;
    }
    selectFromDropdown = async () => {
       
        
    }
    //#endregion
}