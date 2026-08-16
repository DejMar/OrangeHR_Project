import { expect, type Locator, type Page } from '@playwright/test';

export class LeavePage {
    readonly page: Page;
    readonly leaveLink: Locator;
    readonly topbarMenu: Locator;
    readonly applyTab: Locator;
    readonly myLeaveTab: Locator;
    readonly entitlementsTab: Locator;
    readonly reportsTab: Locator;
    readonly configureTab: Locator;
    readonly leaveListTab: Locator;
    readonly assignLeaveTab: Locator;
    readonly helpButton: Locator;
    readonly pageTitle: Locator;
    readonly filterToggleButton: Locator;
    readonly fromDateInput: Locator;
    readonly toDateInput: Locator;
    readonly leaveStatusDropdown: Locator;
    readonly selectedLeaveStatusChips: Locator;
    readonly leaveTypeDropdown: Locator;
    readonly employeeNameInput: Locator;
    readonly subUnitDropdown: Locator;
    readonly includePastEmployeesSwitch: Locator;
    readonly requiredHint: Locator;
    readonly resetButton: Locator;
    readonly searchButton: Locator;
    readonly recordsFoundLabel: Locator;
    readonly selectAllCheckbox: Locator;
    readonly leaveTable: Locator;
    readonly tableRows: Locator;

    constructor(page: Page) {
        this.page = page;
        this.leaveLink = page.getByRole('link', { name: 'Leave' });
        this.topbarMenu = page.getByRole('navigation', { name: 'Topbar Menu' });
        this.applyTab = this.topbarMenu.getByRole('link', { name: 'Apply' });
        this.myLeaveTab = this.topbarMenu.getByRole('link', { name: 'My Leave' });
        this.entitlementsTab = this.topbarMenu.locator('.oxd-topbar-body-nav-tab-item').filter({ hasText: 'Entitlements' });
        this.reportsTab = this.topbarMenu.locator('.oxd-topbar-body-nav-tab-item').filter({ hasText: 'Reports' });
        this.configureTab = this.topbarMenu.locator('.oxd-topbar-body-nav-tab-item').filter({ hasText: 'Configure' });
        this.leaveListTab = this.topbarMenu.getByRole('link', { name: 'Leave List' });
        this.assignLeaveTab = this.topbarMenu.getByRole('link', { name: 'Assign Leave' });
        this.helpButton = this.topbarMenu.getByRole('button', { name: 'Help' });
        this.pageTitle = page.getByRole('heading', { name: 'Leave List' });
        this.filterToggleButton = page.locator('.oxd-table-filter-header-options .oxd-icon-button');
        this.fromDateInput = page.locator("//div[div[label[text()='From Date']]]//input");
        this.toDateInput = page.locator("//div[div[label[text()='To Date']]]//input");
        this.leaveStatusDropdown = page.locator("//div[div[label[contains(.,'Show Leave with Status')]]]//div[contains(@class,'oxd-select-text')]");
        this.selectedLeaveStatusChips = page.locator('.oxd-multiselect-chips-selected');
        this.leaveTypeDropdown = page.locator("//div[div[label[text()='Leave Type']]]//div[@class='oxd-select-wrapper']");
        this.employeeNameInput = page.getByPlaceholder('Type for hints...');
        this.subUnitDropdown = page.locator("//div[div[label[text()='Sub Unit']]]//div[@class='oxd-select-wrapper']");
        this.includePastEmployeesSwitch = page.locator('.orangehrm-leave-filter input[type="checkbox"]');
        this.requiredHint = page.getByText('* Required');
        this.resetButton = page.getByRole('button', { name: 'Reset' });
        this.searchButton = page.getByRole('button', { name: 'Search' });
        this.recordsFoundLabel = page.locator('.orangehrm-header-container .oxd-text--span');
        this.selectAllCheckbox = page.locator('.oxd-table-header input[type="checkbox"]');
        this.leaveTable = page.getByRole('table');
        this.tableRows = page.locator('.oxd-table-card');
    }

    async clickOnLeaveLink(): Promise<void> {
        await this.leaveLink.click();
        await expect(this.pageTitle).toBeVisible();
    }

    async clickApply(): Promise<void> {
        await this.applyTab.click();
    }

    async clickMyLeave(): Promise<void> {
        await this.myLeaveTab.click();
    }

    async clickLeaveList(): Promise<void> {
        await this.leaveListTab.click();
        await expect(this.pageTitle).toBeVisible();
    }

    async clickAssignLeave(): Promise<void> {
        await this.assignLeaveTab.click();
    }

    async clickHelp(): Promise<void> {
        await this.helpButton.click();
    }

    async openEntitlements(item: string): Promise<void> {
        await this.selectTopbarDropdown(this.entitlementsTab, item);
    }

    async openReports(item: string): Promise<void> {
        await this.selectTopbarDropdown(this.reportsTab, item);
    }

    async openConfigure(item: string): Promise<void> {
        await this.selectTopbarDropdown(this.configureTab, item);
    }

    async clickFilterToggle(): Promise<void> {
        await this.filterToggleButton.click();
    }

    async fillFromDate(fromDate: string): Promise<void> {
        await this.fromDateInput.fill(fromDate);
    }

    async fillToDate(toDate: string): Promise<void> {
        await this.toDateInput.fill(toDate);
    }

    async selectLeaveStatus(status: string): Promise<void> {
        await this.leaveStatusDropdown.click();
        await this.page.waitForSelector('.oxd-select-option span', { state: 'visible' });
        await this.page.locator('.oxd-select-option span').filter({ hasText: status }).click();
    }

    async clearLeaveStatus(status: string): Promise<void> {
        await this.selectedLeaveStatusChips.filter({ hasText: status }).locator('.--clear').click();
    }

    async selectLeaveType(leaveType: string): Promise<void> {
        await this.selectDropdownOption(this.leaveTypeDropdown, leaveType);
    }

    async fillEmployeeName(employeeName: string): Promise<void> {
        await this.employeeNameInput.fill(employeeName);
        await this.page.locator('.oxd-autocomplete-option').filter({ hasText: employeeName }).first().click();
    }

    async selectSubUnit(subUnit: string): Promise<void> {
        await this.selectDropdownOption(this.subUnitDropdown, subUnit);
    }

    async toggleIncludePastEmployees(): Promise<void> {
        await this.includePastEmployeesSwitch.click();
    }

    async clickSearch(): Promise<void> {
        await this.searchButton.click();
    }

    async clickReset(): Promise<void> {
        await this.resetButton.click();
    }

    async searchLeaveList(filters: {
        fromDate?: string;
        toDate?: string;
        leaveStatus?: string;
        leaveType?: string;
        employeeName?: string;
        subUnit?: string;
        includePastEmployees?: boolean;
    }): Promise<void> {
        if (filters.fromDate) {
            await this.fillFromDate(filters.fromDate);
        }
        if (filters.toDate) {
            await this.fillToDate(filters.toDate);
        }
        if (filters.leaveStatus) {
            await this.selectLeaveStatus(filters.leaveStatus);
        }
        if (filters.leaveType) {
            await this.selectLeaveType(filters.leaveType);
        }
        if (filters.employeeName) {
            await this.fillEmployeeName(filters.employeeName);
        }
        if (filters.subUnit) {
            await this.selectSubUnit(filters.subUnit);
        }
        if (filters.includePastEmployees) {
            await this.toggleIncludePastEmployees();
        }
        await this.clickSearch();
    }

    getLeaveRow(employeeName: string): Locator {
        return this.tableRows.filter({ hasText: employeeName });
    }

    async selectLeaveRow(employeeName: string): Promise<void> {
        await this.getLeaveRow(employeeName).locator('input[type="checkbox"]').check();
    }

    async clickSelectAll(): Promise<void> {
        await this.selectAllCheckbox.check();
    }

    async verifyLeaveInTable(employeeName: string, leaveType: string, status: string): Promise<void> {
        const row = this.getLeaveRow(employeeName);
        await expect(row).toBeVisible();
        await expect(row).toContainText(leaveType);
        await expect(row).toContainText(status);
    }

    async verifyNoRecordsFound(): Promise<void> {
        await expect(this.recordsFoundLabel).toHaveText('No Records Found');
    }

    async verifyRecordsFound(): Promise<void> {
        await expect(this.recordsFoundLabel).toContainText('Records Found');
    }

    private async selectTopbarDropdown(tab: Locator, item: string): Promise<void> {
        await tab.click();
        await this.page.locator('.oxd-dropdown-menu a').filter({ hasText: item }).click();
    }

    private async selectDropdownOption(dropdown: Locator, option: string): Promise<void> {
        await dropdown.click();
        await this.page.waitForSelector('.oxd-select-option span', { state: 'visible' });
        await this.page.locator('.oxd-select-option span').filter({ hasText: option }).click();
    }
}
