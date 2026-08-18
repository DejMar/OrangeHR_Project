import { expect, type Locator, type Page } from '@playwright/test';

export class PIMPage {
    readonly page: Page;
    readonly PIMLink: Locator;
    readonly topbarMenu: Locator;
    readonly configurationTab: Locator;
    readonly employeeListTab: Locator;
    readonly addEmployeeTab: Locator;
    readonly reportsTab: Locator;
    readonly helpButton: Locator;
    readonly pageTitle: Locator;
    readonly filterToggleButton: Locator;
    readonly searchEmployeeNameInput: Locator;
    readonly searchEmployeeIdInput: Locator;
    readonly employmentStatusDropdown: Locator;
    readonly includeDropdown: Locator;
    readonly supervisorNameInput: Locator;
    readonly jobTitleRoleDropdown: Locator;
    readonly subUnitDropDown: Locator;
    readonly resetButton: Locator;
    readonly searchButton: Locator;
    readonly addEmployee: Locator;
    readonly recordsFoundLabel: Locator;
    readonly selectAllCheckbox: Locator;
    readonly employeesTable: Locator;
    readonly tableRows: Locator;
    readonly idSortButton: Locator;
    readonly firstNameSortButton: Locator;
    readonly lastNameSortButton: Locator;
    readonly jobTitleSortButton: Locator;
    readonly employmentStatusSortButton: Locator;
    readonly subUnitSortButton: Locator;
    readonly supervisorSortButton: Locator;
    readonly pagination: Locator;
    readonly nextPageButton: Locator;
    readonly employeeFirstName: Locator;
    readonly employeeMiddleName: Locator;
    readonly employeeLastName: Locator;
    readonly employeeID: Locator;
    readonly employeeSaveButton: Locator;
    readonly employeeCancelButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.PIMLink = page.getByRole('link', { name: 'PIM' });
        this.topbarMenu = page.getByRole('navigation', { name: 'Topbar Menu' });
        this.configurationTab = this.topbarMenu.locator('.oxd-topbar-body-nav-tab-item').filter({ hasText: 'Configuration' });
        this.employeeListTab = this.topbarMenu.getByRole('link', { name: 'Employee List' });
        this.addEmployeeTab = this.topbarMenu.getByRole('link', { name: 'Add Employee' });
        this.reportsTab = this.topbarMenu.getByRole('link', { name: 'Reports' });
        this.helpButton = this.topbarMenu.getByRole('button', { name: 'Help' });
        this.pageTitle = page.getByRole('heading', { name: 'Employee Information' });
        this.filterToggleButton = page.locator('.oxd-table-filter-header-options .oxd-icon-button');
        this.searchEmployeeNameInput = page.locator("//div[div[label[text()='Employee Name']]]//input");
        this.searchEmployeeIdInput = page.locator("//div[div[label[text()='Employee Id']]]//input");
        this.employmentStatusDropdown = page.locator("//div[div[label[text()='Employment Status']]]//div[@class='oxd-select-wrapper']");
        this.includeDropdown = page.locator("//div[div[label[text()='Include']]]//div[@class='oxd-select-wrapper']");
        this.supervisorNameInput = page.locator("//div[div[label[text()='Supervisor Name']]]//input");
        this.jobTitleRoleDropdown = page.locator("//div[div[label[text()='Job Title']]]//div[@class='oxd-select-wrapper']");
        this.subUnitDropDown = page.locator("//div[div[label[text()='Sub Unit']]]//div[@class='oxd-select-wrapper']");
        this.resetButton = page.getByRole('button', { name: 'Reset' });
        this.searchButton = page.getByRole('button', { name: 'Search' });
        this.addEmployee = page.getByRole('button', { name: 'Add' });
        this.recordsFoundLabel = page.locator('.orangehrm-horizontal-padding .oxd-text--span');
        this.selectAllCheckbox = page.locator('.oxd-table-header input[type="checkbox"]');
        this.employeesTable = page.locator('.orangehrm-employee-list');
        this.tableRows = page.locator('.orangehrm-employee-list .oxd-table-card');
        this.idSortButton = this.columnSortButton('Id');
        this.firstNameSortButton = this.columnSortButton('First (& Middle) Name');
        this.lastNameSortButton = this.columnSortButton('Last Name');
        this.jobTitleSortButton = this.columnSortButton('Job Title');
        this.employmentStatusSortButton = this.columnSortButton('Employment Status');
        this.subUnitSortButton = this.columnSortButton('Sub Unit');
        this.supervisorSortButton = this.columnSortButton('Supervisor');
        this.pagination = page.getByRole('navigation', { name: 'Pagination Navigation' });
        this.nextPageButton = this.pagination.locator('.oxd-pagination-page-item--previous-next');
        this.employeeFirstName = page.getByPlaceholder('First Name');
        this.employeeMiddleName = page.getByPlaceholder('Middle Name');
        this.employeeLastName = page.getByPlaceholder('Last Name');
        this.employeeID = page.locator('form').filter({ has: page.getByPlaceholder('First Name') }).locator("//div[div[label[text()='Employee Id']]]//input");
        this.employeeSaveButton = page.getByRole('button', { name: 'Save' });
        this.employeeCancelButton = page.getByRole('button', { name: 'Cancel' });
    }

    async clickOnPIMLink(): Promise<void> {
        await this.PIMLink.click();
        await expect(this.pageTitle).toBeVisible();
    }

    async clickEmployeeList(): Promise<void> {
        await this.employeeListTab.click();
        await expect(this.pageTitle).toBeVisible();
    }

    async clickAddEmployee(): Promise<void> {
        await this.addEmployeeTab.click();
    }

    async clickReports(): Promise<void> {
        await this.reportsTab.click();
    }

    async clickHelp(): Promise<void> {
        await this.helpButton.click();
    }

    async openConfiguration(item: string): Promise<void> {
        await this.selectTopbarDropdown(this.configurationTab, item);
    }

    async clickFilterToggle(): Promise<void> {
        await this.filterToggleButton.click();
    }

    async fillSearchEmployeeName(employeeName: string): Promise<void> {
        await this.searchEmployeeNameInput.fill(employeeName);
        await this.page.locator('.oxd-autocomplete-option').filter({ hasText: employeeName }).first().click();
    }

    async fillSearchEmployeeId(employeeId: string): Promise<void> {
        await this.searchEmployeeIdInput.fill(employeeId);
    }

    async selectEmploymentStatus(status: string): Promise<void> {
        await this.selectDropdownOption(this.employmentStatusDropdown, status);
    }

    async selectInclude(include: string): Promise<void> {
        await this.selectDropdownOption(this.includeDropdown, include);
    }

    async fillSupervisorName(supervisorName: string): Promise<void> {
        await this.supervisorNameInput.fill(supervisorName);
        await this.page.locator('.oxd-autocomplete-option').filter({ hasText: supervisorName }).first().click();
    }

    async selectJobTitle(jobTitle: string): Promise<void> {
        await this.selectDropdownOption(this.jobTitleRoleDropdown, jobTitle);
    }

    async selectSubUnit(subUnit: string): Promise<void> {
        await this.selectDropdownOption(this.subUnitDropDown, subUnit);
    }

    async clickSearch(): Promise<void> {
        await this.searchButton.click();
    }

    async clickReset(): Promise<void> {
        await this.resetButton.click();
    }

    async searchEmployees(filters: {
        employeeName?: string;
        employeeId?: string;
        employmentStatus?: string;
        include?: string;
        supervisorName?: string;
        jobTitle?: string;
        subUnit?: string;
    }): Promise<void> {
        if (filters.employeeName) {
            await this.fillSearchEmployeeName(filters.employeeName);
        }
        if (filters.employeeId) {
            await this.fillSearchEmployeeId(filters.employeeId);
        }
        if (filters.employmentStatus) {
            await this.selectEmploymentStatus(filters.employmentStatus);
        }
        if (filters.include) {
            await this.selectInclude(filters.include);
        }
        if (filters.supervisorName) {
            await this.fillSupervisorName(filters.supervisorName);
        }
        if (filters.jobTitle) {
            await this.selectJobTitle(filters.jobTitle);
        }
        if (filters.subUnit) {
            await this.selectSubUnit(filters.subUnit);
        }
        await this.clickSearch();
    }

    async clickOnAddButton(): Promise<void> {
        await this.addEmployee.click();
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

    async clickOnCancelButton(): Promise<void> {
        await this.employeeCancelButton.click();
    }

    async verifyPopulatedData(firstName: string, middleName: string, lastName: string, employeeID: string): Promise<void> {
        await expect(this.employeeFirstName).toHaveValue(firstName);
        await expect(this.employeeMiddleName).toHaveValue(middleName);
        await expect(this.employeeLastName).toHaveValue(lastName);
        await expect(this.employeeID).toHaveValue(employeeID);
    }

    getEmployeeRow(identifier: string): Locator {
        return this.tableRows.filter({ hasText: identifier });
    }

    async selectEmployeeRow(identifier: string): Promise<void> {
        await this.getEmployeeRow(identifier).locator('input[type="checkbox"]').check();
    }

    async clickSelectAll(): Promise<void> {
        await this.selectAllCheckbox.check();
    }

    async clickEditEmployee(identifier: string): Promise<void> {
        await this.getEmployeeRow(identifier).locator('.bi-pencil-fill').click();
    }

    async clickDeleteEmployee(identifier: string): Promise<void> {
        await this.getEmployeeRow(identifier).locator('.bi-trash').click();
    }

    async sortBy(
        column: 'Id' | 'First (& Middle) Name' | 'Last Name' | 'Job Title' | 'Employment Status' | 'Sub Unit' | 'Supervisor',
        direction: 'Ascending' | 'Descending'
    ): Promise<void> {
        await this.columnSortButton(column).click();
        await this.page.locator('.oxd-table-header-sort-dropdown-item').filter({ hasText: direction }).click();
    }

    async goToPage(pageNumber: number): Promise<void> {
        await this.pagination.getByRole('button', { name: String(pageNumber), exact: true }).click();
    }

    async goToNextPage(): Promise<void> {
        await this.nextPageButton.click();
    }

    async verifyEmployeeInTable(identifier: string, firstName: string, lastName: string): Promise<void> {
        const row = this.getEmployeeRow(identifier);
        await expect(row).toBeVisible();
        await expect(row).toContainText(firstName);
        await expect(row).toContainText(lastName);
    }

    async verifyRecordsFound(): Promise<void> {
        await expect(this.recordsFoundLabel).toContainText('Records Found');
    }

    async selectRandomOptionAndSave(dropdownName: string): Promise<string> {
        const dropdown = this.page.locator(`//div[div[label[text()='${dropdownName}']]]//div[@class='oxd-select-wrapper']`);
        await dropdown.click();
        const options = this.page.locator('.oxd-select-option span');
        await options.first().waitFor({ state: 'visible' });
        const optionTexts = (await options.allTextContents()).map((text) => text.trim()).filter(Boolean);
        const randomOption = optionTexts[Math.floor(Math.random() * optionTexts.length)];
        await options.filter({ hasText: randomOption }).click();
        return randomOption;
    }

    private async selectTopbarDropdown(tab: Locator, item: string): Promise<void> {
        await tab.click();
        await this.page.locator('.oxd-dropdown-menu a').filter({ hasText: item }).click();
    }

    private columnSortButton(column: string): Locator {
        return this.page.getByRole('columnheader', { name: column }).locator('.oxd-table-header-sort-icon');
    }

    private async selectDropdownOption(dropdown: Locator, option: string): Promise<void> {
        await dropdown.click();
        await this.page.waitForSelector('.oxd-select-option span', { state: 'visible' });
        await this.page.locator('.oxd-select-option span').filter({ hasText: option }).click();
    }
}
