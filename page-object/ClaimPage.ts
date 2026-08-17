import { expect, type Locator, type Page } from '@playwright/test';

export class ClaimPage {
    readonly page: Page;
    readonly claimLink: Locator;
    readonly topbarMenu: Locator;
    readonly configurationTab: Locator;
    readonly submitClaimTab: Locator;
    readonly myClaimsTab: Locator;
    readonly employeeClaimsTab: Locator;
    readonly assignClaimTab: Locator;
    readonly helpButton: Locator;
    readonly pageTitle: Locator;
    readonly filterToggleButton: Locator;
    readonly employeeNameInput: Locator;
    readonly referenceIdInput: Locator;
    readonly eventNameDropdown: Locator;
    readonly statusDropdown: Locator;
    readonly fromDateInput: Locator;
    readonly toDateInput: Locator;
    readonly includeDropdown: Locator;
    readonly resetButton: Locator;
    readonly searchButton: Locator;
    readonly assignClaimButton: Locator;
    readonly recordsFoundLabel: Locator;
    readonly claimsTable: Locator;
    readonly tableRows: Locator;
    readonly referenceIdSortButton: Locator;
    readonly employeeNameSortButton: Locator;
    readonly eventNameSortButton: Locator;
    readonly submittedDateSortButton: Locator;
    readonly statusSortButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.claimLink = page.getByRole('link', { name: 'Claim' });
        this.topbarMenu = page.getByRole('navigation', { name: 'Topbar Menu' });
        this.configurationTab = this.topbarMenu.locator('.oxd-topbar-body-nav-tab-item').filter({ hasText: 'Configuration' });
        this.submitClaimTab = this.topbarMenu.getByRole('link', { name: 'Submit Claim' });
        this.myClaimsTab = this.topbarMenu.getByRole('link', { name: 'My Claims' });
        this.employeeClaimsTab = this.topbarMenu.getByRole('link', { name: 'Employee Claims' });
        this.assignClaimTab = this.topbarMenu.getByRole('link', { name: 'Assign Claim' });
        this.helpButton = this.topbarMenu.getByRole('button', { name: 'Help' });
        this.pageTitle = page.getByRole('heading', { name: 'Employee Claims' });
        this.filterToggleButton = page.locator('.oxd-table-filter-header-options .oxd-icon-button');
        this.employeeNameInput = page.locator("//div[div[label[text()='Employee Name']]]//input");
        this.referenceIdInput = page.locator("//div[div[label[text()='Reference Id']]]//input");
        this.eventNameDropdown = page.locator("//div[div[label[text()='Event Name']]]//div[@class='oxd-select-wrapper']");
        this.statusDropdown = page.locator("//div[div[label[text()='Status']]]//div[@class='oxd-select-wrapper']");
        this.fromDateInput = page.locator("//div[div[label[text()='From Date']]]//input");
        this.toDateInput = page.locator("//div[div[label[text()='To Date']]]//input");
        this.includeDropdown = page.locator("//div[div[label[text()='Include']]]//div[@class='oxd-select-wrapper']");
        this.resetButton = page.getByRole('button', { name: 'Reset' });
        this.searchButton = page.getByRole('button', { name: 'Search' });
        this.assignClaimButton = page.getByRole('button', { name: 'Assign Claim' });
        this.recordsFoundLabel = page.locator('.orangehrm-horizontal-padding .oxd-text--span');
        this.claimsTable = page.getByRole('table');
        this.tableRows = page.locator('.oxd-table-card');
        this.referenceIdSortButton = this.columnSortButton('Reference Id');
        this.employeeNameSortButton = this.columnSortButton('Employee Name');
        this.eventNameSortButton = this.columnSortButton('Event Name');
        this.submittedDateSortButton = this.columnSortButton('Submitted Date');
        this.statusSortButton = this.columnSortButton('Status');
    }

    async clickOnClaimLink(): Promise<void> {
        await this.claimLink.click();
        await expect(this.pageTitle).toBeVisible();
    }

    async clickSubmitClaim(): Promise<void> {
        await this.submitClaimTab.click();
    }

    async clickMyClaims(): Promise<void> {
        await this.myClaimsTab.click();
    }

    async clickEmployeeClaims(): Promise<void> {
        await this.employeeClaimsTab.click();
        await expect(this.pageTitle).toBeVisible();
    }

    async clickAssignClaimTab(): Promise<void> {
        await this.assignClaimTab.click();
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

    async fillEmployeeName(employeeName: string): Promise<void> {
        await this.fillAutocomplete(this.employeeNameInput, employeeName);
    }

    async fillReferenceId(referenceId: string): Promise<void> {
        await this.fillAutocomplete(this.referenceIdInput, referenceId);
    }

    async selectEventName(eventName: string): Promise<void> {
        await this.selectDropdownOption(this.eventNameDropdown, eventName);
    }

    async selectStatus(status: string): Promise<void> {
        await this.selectDropdownOption(this.statusDropdown, status);
    }

    async fillFromDate(fromDate: string): Promise<void> {
        await this.fromDateInput.fill(fromDate);
    }

    async fillToDate(toDate: string): Promise<void> {
        await this.toDateInput.fill(toDate);
    }

    async selectInclude(include: string): Promise<void> {
        await this.selectDropdownOption(this.includeDropdown, include);
    }

    async clickSearch(): Promise<void> {
        await this.searchButton.click();
    }

    async clickReset(): Promise<void> {
        await this.resetButton.click();
    }

    async clickAssignClaim(): Promise<void> {
        await this.assignClaimButton.click();
    }

    async searchEmployeeClaims(filters: {
        employeeName?: string;
        referenceId?: string;
        eventName?: string;
        status?: string;
        fromDate?: string;
        toDate?: string;
        include?: string;
    }): Promise<void> {
        if (filters.employeeName) {
            await this.fillEmployeeName(filters.employeeName);
        }
        if (filters.referenceId) {
            await this.fillReferenceId(filters.referenceId);
        }
        if (filters.eventName) {
            await this.selectEventName(filters.eventName);
        }
        if (filters.status) {
            await this.selectStatus(filters.status);
        }
        if (filters.fromDate) {
            await this.fillFromDate(filters.fromDate);
        }
        if (filters.toDate) {
            await this.fillToDate(filters.toDate);
        }
        if (filters.include) {
            await this.selectInclude(filters.include);
        }
        await this.clickSearch();
    }

    getClaimRow(referenceId: string): Locator {
        return this.tableRows.filter({ hasText: referenceId });
    }

    async clickViewDetails(referenceId: string): Promise<void> {
        await this.getClaimRow(referenceId).getByRole('button', { name: 'View Details' }).click();
    }

    async sortBy(
        column: 'Reference Id' | 'Employee Name' | 'Event Name' | 'Submitted Date' | 'Status',
        direction: 'Ascending' | 'Descending'
    ): Promise<void> {
        await this.columnSortButton(column).click();
        await this.page.locator('.oxd-table-header-sort-dropdown-item').filter({ hasText: direction }).click();
    }

    async verifyClaimInTable(referenceId: string, employeeName: string, eventName: string, status: string): Promise<void> {
        const row = this.getClaimRow(referenceId);
        await expect(row).toBeVisible();
        await expect(row).toContainText(employeeName);
        await expect(row).toContainText(eventName);
        await expect(row).toContainText(status);
    }

    async verifyRecordsFound(): Promise<void> {
        await expect(this.recordsFoundLabel).toContainText('Records Found');
    }

    private async selectTopbarDropdown(tab: Locator, item: string): Promise<void> {
        await tab.click();
        await this.page.locator('.oxd-dropdown-menu a').filter({ hasText: item }).click();
    }

    private async fillAutocomplete(input: Locator, value: string): Promise<void> {
        await input.fill(value);
        await this.page.locator('.oxd-autocomplete-option').filter({ hasText: value }).first().click();
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
