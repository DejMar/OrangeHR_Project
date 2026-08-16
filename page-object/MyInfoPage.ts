import { expect, type Locator, type Page } from '@playwright/test';

export class MyInfoPage {
    readonly page: Page;
    readonly myInfoLink: Locator;
    readonly employeeNameHeading: Locator;
    readonly profilePicture: Locator;
    readonly personalDetailsTab: Locator;
    readonly contactDetailsTab: Locator;
    readonly emergencyContactsTab: Locator;
    readonly dependentsTab: Locator;
    readonly immigrationTab: Locator;
    readonly jobTab: Locator;
    readonly salaryTab: Locator;
    readonly reportToTab: Locator;
    readonly qualificationsTab: Locator;
    readonly membershipsTab: Locator;
    readonly personalDetailsTitle: Locator;
    readonly firstNameInput: Locator;
    readonly middleNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly employeeIdInput: Locator;
    readonly otherIdInput: Locator;
    readonly driversLicenseNumberInput: Locator;
    readonly licenseExpiryDateInput: Locator;
    readonly nationalityDropdown: Locator;
    readonly maritalStatusDropdown: Locator;
    readonly dateOfBirthInput: Locator;
    readonly maleRadio: Locator;
    readonly femaleRadio: Locator;
    readonly requiredHint: Locator;
    readonly personalDetailsSaveButton: Locator;
    readonly customFieldsTitle: Locator;
    readonly bloodTypeDropdown: Locator;
    readonly testFieldInput: Locator;
    readonly customFieldsSaveButton: Locator;
    readonly attachmentsTitle: Locator;
    readonly addAttachmentButton: Locator;
    readonly attachmentsRecordsFoundLabel: Locator;
    readonly selectAllAttachmentsCheckbox: Locator;
    readonly attachmentsTable: Locator;
    readonly attachmentRows: Locator;
    readonly editAttachmentButtons: Locator;
    readonly deleteAttachmentButtons: Locator;
    readonly downloadAttachmentButtons: Locator;

    constructor(page: Page) {
        this.page = page;
        this.myInfoLink = page.getByRole('link', { name: 'My Info' });
        this.employeeNameHeading = page.locator('.orangehrm-edit-employee-name h6');
        this.profilePicture = page.getByAltText('profile picture');
        this.personalDetailsTab = page.getByRole('link', { name: 'Personal Details' });
        this.contactDetailsTab = page.getByRole('link', { name: 'Contact Details' });
        this.emergencyContactsTab = page.getByRole('link', { name: 'Emergency Contacts' });
        this.dependentsTab = page.getByRole('link', { name: 'Dependents' });
        this.immigrationTab = page.getByRole('link', { name: 'Immigration' });
        this.jobTab = page.getByRole('link', { name: 'Job' });
        this.salaryTab = page.getByRole('link', { name: 'Salary' });
        this.reportToTab = page.getByRole('link', { name: 'Report-to' });
        this.qualificationsTab = page.getByRole('link', { name: 'Qualifications' });
        this.membershipsTab = page.getByRole('link', { name: 'Memberships' });
        this.personalDetailsTitle = page.getByRole('heading', { name: 'Personal Details' });
        this.firstNameInput = page.getByPlaceholder('First Name');
        this.middleNameInput = page.getByPlaceholder('Middle Name');
        this.lastNameInput = page.getByPlaceholder('Last Name');
        this.employeeIdInput = page.locator("//div[div[label[text()='Employee Id']]]//input");
        this.otherIdInput = page.locator("//div[div[label[text()='Other Id']]]//input");
        this.driversLicenseNumberInput = page.locator("//div[div[label[text()=\"Driver's License Number\"]]]//input");
        this.licenseExpiryDateInput = page.locator("//div[div[label[text()='License Expiry Date']]]//input");
        this.nationalityDropdown = page.locator("//div[div[label[text()='Nationality']]]//div[@class='oxd-select-wrapper']");
        this.maritalStatusDropdown = page.locator("//div[div[label[text()='Marital Status']]]//div[@class='oxd-select-wrapper']");
        this.dateOfBirthInput = page.locator("//div[div[label[text()='Date of Birth']]]//input");
        this.maleRadio = page.getByRole('radio', { name: 'Male' });
        this.femaleRadio = page.getByRole('radio', { name: 'Female' });
        this.requiredHint = page.getByText('* Required');
        this.personalDetailsSaveButton = page.locator('form').filter({ hasText: 'Employee Full Name' }).getByRole('button', { name: 'Save' });
        this.customFieldsTitle = page.getByRole('heading', { name: 'Custom Fields' });
        this.bloodTypeDropdown = page.locator("//div[div[label[text()='Blood Type']]]//div[@class='oxd-select-wrapper']");
        this.testFieldInput = page.locator("//div[div[label[text()='Test_Field']]]//input");
        this.customFieldsSaveButton = page.locator('.orangehrm-custom-fields').getByRole('button', { name: 'Save' });
        this.attachmentsTitle = page.getByRole('heading', { name: 'Attachments' });
        this.addAttachmentButton = page.locator('.orangehrm-attachment').getByRole('button', { name: 'Add' });
        this.attachmentsRecordsFoundLabel = page.locator('.orangehrm-attachment .oxd-text--span');
        this.selectAllAttachmentsCheckbox = page.locator('.orangehrm-attachment .oxd-table-header input[type="checkbox"]');
        this.attachmentsTable = page.locator('.orangehrm-attachment').getByRole('table');
        this.attachmentRows = page.locator('.orangehrm-attachment .oxd-table-card');
        this.editAttachmentButtons = page.locator('.orangehrm-attachment .oxd-table-cell-actions .bi-pencil-fill');
        this.deleteAttachmentButtons = page.locator('.orangehrm-attachment .oxd-table-cell-actions .bi-trash');
        this.downloadAttachmentButtons = page.locator('.orangehrm-attachment .oxd-table-cell-actions .bi-download');
    }

    async clickOnMyInfoLink(): Promise<void> {
        await this.myInfoLink.click();
        await expect(this.personalDetailsTitle).toBeVisible();
    }

    async openTab(tab: Locator): Promise<void> {
        await tab.click();
    }

    async fillEmployeeFullName(firstName: string, middleName: string, lastName: string): Promise<void> {
        await this.firstNameInput.fill(firstName);
        await this.middleNameInput.fill(middleName);
        await this.lastNameInput.fill(lastName);
    }

    async fillEmployeeId(employeeId: string): Promise<void> {
        await this.employeeIdInput.fill(employeeId);
    }

    async fillOtherId(otherId: string): Promise<void> {
        await this.otherIdInput.fill(otherId);
    }

    async fillDriversLicense(licenseNumber: string, expiryDate: string): Promise<void> {
        await this.driversLicenseNumberInput.fill(licenseNumber);
        await this.licenseExpiryDateInput.fill(expiryDate);
    }

    async selectNationality(nationality: string): Promise<void> {
        await this.selectDropdownOption(this.nationalityDropdown, nationality);
    }

    async selectMaritalStatus(status: string): Promise<void> {
        await this.selectDropdownOption(this.maritalStatusDropdown, status);
    }

    async fillDateOfBirth(dateOfBirth: string): Promise<void> {
        await this.dateOfBirthInput.fill(dateOfBirth);
    }

    async selectGender(gender: 'Male' | 'Female'): Promise<void> {
        await (gender === 'Male' ? this.maleRadio : this.femaleRadio).check();
    }

    async savePersonalDetails(): Promise<void> {
        await this.personalDetailsSaveButton.click();
    }

    async updatePersonalDetails(details: {
        firstName?: string;
        middleName?: string;
        lastName?: string;
        employeeId?: string;
        otherId?: string;
        licenseNumber?: string;
        licenseExpiryDate?: string;
        nationality?: string;
        maritalStatus?: string;
        dateOfBirth?: string;
        gender?: 'Male' | 'Female';
    }): Promise<void> {
        if (details.firstName) {
            await this.firstNameInput.fill(details.firstName);
        }
        if (details.middleName) {
            await this.middleNameInput.fill(details.middleName);
        }
        if (details.lastName) {
            await this.lastNameInput.fill(details.lastName);
        }
        if (details.employeeId) {
            await this.fillEmployeeId(details.employeeId);
        }
        if (details.otherId) {
            await this.fillOtherId(details.otherId);
        }
        if (details.licenseNumber) {
            await this.driversLicenseNumberInput.fill(details.licenseNumber);
        }
        if (details.licenseExpiryDate) {
            await this.licenseExpiryDateInput.fill(details.licenseExpiryDate);
        }
        if (details.nationality) {
            await this.selectNationality(details.nationality);
        }
        if (details.maritalStatus) {
            await this.selectMaritalStatus(details.maritalStatus);
        }
        if (details.dateOfBirth) {
            await this.fillDateOfBirth(details.dateOfBirth);
        }
        if (details.gender) {
            await this.selectGender(details.gender);
        }
        await this.savePersonalDetails();
    }

    async selectBloodType(bloodType: string): Promise<void> {
        await this.selectDropdownOption(this.bloodTypeDropdown, bloodType);
    }

    async fillTestField(value: string): Promise<void> {
        await this.testFieldInput.fill(value);
    }

    async saveCustomFields(): Promise<void> {
        await this.customFieldsSaveButton.click();
    }

    async clickAddAttachment(): Promise<void> {
        await this.addAttachmentButton.click();
    }

    getAttachmentRow(fileName: string): Locator {
        return this.attachmentRows.filter({ hasText: fileName });
    }

    async selectAttachment(fileName: string): Promise<void> {
        await this.getAttachmentRow(fileName).locator('input[type="checkbox"]').check();
    }

    async clickSelectAllAttachments(): Promise<void> {
        await this.selectAllAttachmentsCheckbox.check();
    }

    async clickEditAttachment(fileName: string): Promise<void> {
        await this.getAttachmentRow(fileName).locator('.bi-pencil-fill').click();
    }

    async clickDeleteAttachment(fileName: string): Promise<void> {
        await this.getAttachmentRow(fileName).locator('.bi-trash').click();
    }

    async clickDownloadAttachment(fileName: string): Promise<void> {
        await this.getAttachmentRow(fileName).locator('.bi-download').click();
    }

    async verifyEmployeeName(firstName: string, lastName: string): Promise<void> {
        await expect(this.employeeNameHeading).toContainText(`${firstName} ${lastName}`);
    }

    async verifyPersonalDetails(firstName: string, middleName: string, lastName: string): Promise<void> {
        await expect(this.firstNameInput).toHaveValue(firstName);
        await expect(this.middleNameInput).toHaveValue(middleName);
        await expect(this.lastNameInput).toHaveValue(lastName);
    }

    async verifyAttachmentInTable(fileName: string, description: string): Promise<void> {
        const row = this.getAttachmentRow(fileName);
        await expect(row).toBeVisible();
        await expect(row).toContainText(description);
    }

    async verifyAttachmentRecordsFound(): Promise<void> {
        await expect(this.attachmentsRecordsFoundLabel).toContainText('Record Found');
    }

    private async selectDropdownOption(dropdown: Locator, option: string): Promise<void> {
        await dropdown.click();
        await this.page.waitForSelector('.oxd-select-option span', { state: 'visible' });
        await this.page.locator('.oxd-select-option span').filter({ hasText: option }).click();
    }
}
