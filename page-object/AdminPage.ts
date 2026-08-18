import { expect, type Locator, type Page } from '@playwright/test';

export class AdminPage {
    readonly page: Page;
    readonly adminLink: Locator;
    readonly topbarMenu: Locator;
    readonly userManagementTab: Locator;
    readonly jobTab: Locator;
    readonly organizationTab: Locator;
    readonly qualificationsTab: Locator;
    readonly nationalitiesTab: Locator;
    readonly moreTab: Locator;
    readonly helpButton: Locator;
    readonly pageTitle: Locator;
    readonly filterToggleButton: Locator;
    readonly usernameInput: Locator;
    readonly userRoleDropdown: Locator;
    readonly employeeNameInput: Locator;
    readonly statusDropdown: Locator;
    readonly resetButton: Locator;
    readonly searchButton: Locator;
    readonly addButton: Locator;
    readonly recordsFoundLabel: Locator;
    readonly selectAllCheckbox: Locator;
    readonly usersTable: Locator;
    readonly tableRows: Locator;
    readonly usernameSortButton: Locator;
    readonly userRoleSortButton: Locator;
    readonly employeeNameSortButton: Locator;
    readonly statusSortButton: Locator;
    readonly sortAscendingOption: Locator;
    readonly sortDescendingOption: Locator;
    readonly deleteButtons: Locator;
    readonly editButtons: Locator;

    constructor(page: Page) {
        this.page = page;
        this.adminLink = page.getByRole('link', { name: 'Admin' });
        this.topbarMenu = page.getByRole('navigation', { name: 'Topbar Menu' });
        this.userManagementTab = this.topbarMenu.locator('.oxd-topbar-body-nav-tab-item').filter({ hasText: 'User Management' });
        this.jobTab = this.topbarMenu.locator('.oxd-topbar-body-nav-tab-item').filter({ hasText: 'Job' });
        this.organizationTab = this.topbarMenu.locator('.oxd-topbar-body-nav-tab-item').filter({ hasText: 'Organization' });
        this.qualificationsTab = this.topbarMenu.locator('.oxd-topbar-body-nav-tab-item').filter({ hasText: 'Qualifications' });
        this.nationalitiesTab = this.topbarMenu.getByRole('link', { name: 'Nationalities' });
        this.moreTab = this.topbarMenu.locator('.oxd-topbar-body-nav-tab-item').filter({ hasText: 'More' });
        this.helpButton = this.topbarMenu.getByRole('button', { name: 'Help' });
        this.pageTitle = page.getByRole('heading', { name: 'System Users' });
        this.filterToggleButton = page.locator('.oxd-table-filter-header-options .oxd-icon-button');
        this.usernameInput = page.locator("//div[div[label[text()='Username']]]//input");
        this.userRoleDropdown = page.locator("//div[div[label[text()='User Role']]]//div[@class='oxd-select-wrapper']");
        this.employeeNameInput = page.getByPlaceholder('Type for hints...');
        this.statusDropdown = page.locator("//div[div[label[text()='Status']]]//div[@class='oxd-select-wrapper']");
        this.resetButton = page.getByRole('button', { name: 'Reset' });
        this.searchButton = page.getByRole('button', { name: 'Search' });
        this.addButton = page.getByRole('button', { name: 'Add' });
        this.recordsFoundLabel = page.locator('.orangehrm-horizontal-padding .oxd-text--span');
        this.selectAllCheckbox = page.locator('.oxd-table-header input[type="checkbox"]');
        this.usersTable = page.getByRole('table');
        this.tableRows = page.locator('.oxd-table-card');
        this.usernameSortButton = this.columnSortButton('Username');
        this.userRoleSortButton = this.columnSortButton('User Role');
        this.employeeNameSortButton = this.columnSortButton('Employee Name');
        this.statusSortButton = this.columnSortButton('Status');
        this.sortAscendingOption = page.locator('.oxd-table-header-sort-dropdown-item').filter({ hasText: 'Ascending' });
        this.sortDescendingOption = page.locator('.oxd-table-header-sort-dropdown-item').filter({ hasText: 'Descending' });
        this.deleteButtons = page.locator('.oxd-table-cell-actions .bi-trash');
        this.editButtons = page.locator('.oxd-table-cell-actions .bi-pencil-fill');
    }

    async clickOnAdminLink(): Promise<void> {
        await this.adminLink.click();
        await expect(this.pageTitle).toBeVisible();
    }

    async clickNationalities(): Promise<void> {
        await this.nationalitiesTab.click();
    }

    async clickHelp(): Promise<void> {
        await this.helpButton.click();
    }

    async openUserManagement(item: string): Promise<void> {
        await this.selectTopbarDropdown(this.userManagementTab, item);
    }

    async openJob(item: string): Promise<void> {
        await this.selectTopbarDropdown(this.jobTab, item);
    }

    async openOrganization(item: string): Promise<void> {
        await this.selectTopbarDropdown(this.organizationTab, item);
    }

    async openQualifications(item: string): Promise<void> {
        await this.selectTopbarDropdown(this.qualificationsTab, item);
    }

    async openMore(item: string): Promise<void> {
        await this.selectTopbarDropdown(this.moreTab, item);
    }

    async clickFilterToggle(): Promise<void> {
        await this.filterToggleButton.click();
    }

    async fillUsername(username: string): Promise<void> {
        await this.usernameInput.fill(username);
    }

    async selectUserRole(role: string): Promise<void> {
        await this.selectDropdownOption(this.userRoleDropdown, role);
    }

    async fillEmployeeName(employeeName: string): Promise<void> {
        await this.employeeNameInput.fill(employeeName);
        await this.page.locator('.oxd-autocomplete-option').filter({ hasText: employeeName }).first().click();
    }

    async selectStatus(status: string): Promise<void> {
        await this.selectDropdownOption(this.statusDropdown, status);
    }

    async clickSearch(): Promise<void> {
        await this.searchButton.click();
    }

    async clickReset(): Promise<void> {
        await this.resetButton.click();
    }

    async clickAdd(): Promise<void> {
        await this.addButton.click();
    }

    async searchSystemUsers(filters: {
        username?: string;
        userRole?: string;
        employeeName?: string;
        status?: string;
    }): Promise<void> {
        if (filters.username) {
            await this.fillUsername(filters.username);
        }
        if (filters.userRole) {
            await this.selectUserRole(filters.userRole);
        }
        if (filters.employeeName) {
            await this.fillEmployeeName(filters.employeeName);
        }
        if (filters.status) {
            await this.selectStatus(filters.status);
        }
        await this.clickSearch();
    }

    getUserRow(username: string): Locator {
        return this.tableRows.filter({ hasText: username });
    }

    async selectUserRow(username: string): Promise<void> {
        await this.getUserRow(username).locator('input[type="checkbox"]').check();
    }

    async clickSelectAll(): Promise<void> {
        await this.selectAllCheckbox.check();
    }

    async clickEditUser(username: string): Promise<void> {
        await this.getUserRow(username).locator('.bi-pencil-fill').click();
    }

    async clickDeleteUser(username: string): Promise<void> {
        await this.getUserRow(username).locator('.bi-trash').click();
    }

    async sortBy(column: 'Username' | 'User Role' | 'Employee Name' | 'Status', direction: 'Ascending' | 'Descending'): Promise<void> {
        await this.columnSortButton(column).click();
        await this.page.locator('.oxd-table-header-sort-dropdown-item').filter({ hasText: direction }).click();
    }

    async verifyUserInTable(username: string, userRole: string, employeeName: string, status: string): Promise<void> {
        const row = this.getUserRow(username);
        await expect(row).toBeVisible();
        await expect(row).toContainText(userRole);
        await expect(row).toContainText(employeeName);
        await expect(row).toContainText(status);
    }

    async verifyRecordsFound(): Promise<void> {
        await expect(this.recordsFoundLabel).toContainText('Records Found');
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
