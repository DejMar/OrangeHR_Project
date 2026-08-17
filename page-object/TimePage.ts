import { expect, type Locator, type Page } from '@playwright/test';

export class TimePage {
    readonly page: Page;
    readonly timeLink: Locator;
    readonly topbarMenu: Locator;
    readonly timesheetsTab: Locator;
    readonly attendanceTab: Locator;
    readonly reportsTab: Locator;
    readonly projectInfoTab: Locator;
    readonly helpButton: Locator;
    readonly selectEmployeeTitle: Locator;
    readonly employeeNameInput: Locator;
    readonly requiredHint: Locator;
    readonly viewButton: Locator;
    readonly pendingTimesheetsTitle: Locator;
    readonly recordsFoundLabel: Locator;
    readonly pendingTimesheetsTable: Locator;
    readonly tableRows: Locator;

    constructor(page: Page) {
        this.page = page;
        this.timeLink = page.getByRole('link', { name: 'Time' });
        this.topbarMenu = page.getByRole('navigation', { name: 'Topbar Menu' });
        this.timesheetsTab = this.topbarMenu.locator('.oxd-topbar-body-nav-tab-item').filter({ hasText: 'Timesheets' });
        this.attendanceTab = this.topbarMenu.locator('.oxd-topbar-body-nav-tab-item').filter({ hasText: 'Attendance' });
        this.reportsTab = this.topbarMenu.locator('.oxd-topbar-body-nav-tab-item').filter({ hasText: 'Reports' });
        this.projectInfoTab = this.topbarMenu.locator('.oxd-topbar-body-nav-tab-item').filter({ hasText: 'Project Info' });
        this.helpButton = this.topbarMenu.getByRole('button', { name: 'Help' });
        this.selectEmployeeTitle = page.getByRole('heading', { name: 'Select Employee' });
        this.employeeNameInput = page.locator("//div[div[label[text()='Employee Name']]]//input");
        this.requiredHint = page.getByText('* Required');
        this.viewButton = page.locator('form').filter({ hasText: 'Employee Name' }).getByRole('button', { name: 'View' });
        this.pendingTimesheetsTitle = page.getByRole('heading', { name: 'Timesheets Pending Action' });
        this.recordsFoundLabel = page.locator('.orangehrm-horizontal-padding .oxd-text--span');
        this.pendingTimesheetsTable = page.locator('.orangehrm-paper-container').getByRole('table');
        this.tableRows = page.locator('.orangehrm-paper-container .oxd-table-card');
    }

    async clickOnTimeLink(): Promise<void> {
        await this.timeLink.click();
        await expect(this.selectEmployeeTitle).toBeVisible();
    }

    async openTimesheets(item: string): Promise<void> {
        await this.selectTopbarDropdown(this.timesheetsTab, item);
    }

    async openAttendance(item: string): Promise<void> {
        await this.selectTopbarDropdown(this.attendanceTab, item);
    }

    async openReports(item: string): Promise<void> {
        await this.selectTopbarDropdown(this.reportsTab, item);
    }

    async openProjectInfo(item: string): Promise<void> {
        await this.selectTopbarDropdown(this.projectInfoTab, item);
    }

    async clickHelp(): Promise<void> {
        await this.helpButton.click();
    }

    async fillEmployeeName(employeeName: string): Promise<void> {
        await this.employeeNameInput.fill(employeeName);
        await this.page.locator('.oxd-autocomplete-option').filter({ hasText: employeeName }).first().click();
    }

    async clickView(): Promise<void> {
        await this.viewButton.click();
    }

    async viewEmployeeTimesheet(employeeName: string): Promise<void> {
        await this.fillEmployeeName(employeeName);
        await this.clickView();
    }

    getTimesheetRow(employeeName: string, period?: string): Locator {
        const rows = this.tableRows.filter({ hasText: employeeName });
        return period ? rows.filter({ hasText: period }) : rows.first();
    }

    async clickViewTimesheet(employeeName: string, period?: string): Promise<void> {
        await this.getTimesheetRow(employeeName, period).getByRole('button', { name: 'View' }).click();
    }

    async verifyTimesheetInTable(employeeName: string, period: string): Promise<void> {
        const row = this.getTimesheetRow(employeeName, period);
        await expect(row).toBeVisible();
        await expect(row).toContainText(employeeName);
        await expect(row).toContainText(period);
    }

    async verifyPendingTimesheetsFound(): Promise<void> {
        await expect(this.pendingTimesheetsTitle).toBeVisible();
        await expect(this.recordsFoundLabel).toContainText('Records Found');
    }

    private async selectTopbarDropdown(tab: Locator, item: string): Promise<void> {
        await tab.click();
        await this.page.locator('.oxd-dropdown-menu a').filter({ hasText: item }).click();
    }
}
