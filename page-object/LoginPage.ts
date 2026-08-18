import { expect, type Locator, type Page } from '@playwright/test';
import { messages } from '../data/testData';

export class LoginPage {
    readonly page: Page;
    readonly usernameField: Locator;
    readonly passwordField: Locator;
    readonly loginButton: Locator;
    readonly invalidCredentialsMessage: Locator;
    readonly requiredUserNameFieldMessage: Locator;
    readonly requiredPasswordFieldMessage: Locator;
    readonly logourButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.usernameField = page.getByRole('textbox', { name: 'username' });
        this.passwordField = page.getByRole('textbox', { name: 'password' });
        this.loginButton = page.locator('button[type="submit"]');
        this.invalidCredentialsMessage = page.getByText('Invalid credentials');
        this.requiredUserNameFieldMessage = page.getByText('Required').first();
        this.requiredPasswordFieldMessage = page.getByText('Required').nth(1);
        this.logourButton = page.getByRole('link', { name: 'Logout' });
    }

    async loginToPage(email: string, password: string): Promise<void> {
        await this.page.goto('/');
        await this.usernameField.fill(email);
        await this.passwordField.fill(password);
        await this.loginButton.click();
    }

    async verifyInvalidLoginMessage(): Promise<void> {
        await expect(this.invalidCredentialsMessage).toHaveText(messages.invalidCredentials);
    }

    async verifyRequiredUsernameMessage(): Promise<void> {
        await expect(this.requiredUserNameFieldMessage).toHaveText(messages.required);
    }

    async verifyRequiredPasswordMessage(): Promise<void> {
        await expect(this.requiredUserNameFieldMessage).toHaveText(messages.required);
    }

    async logoutFromPage(): Promise<void> {
        await this.logourButton.click();
    }
}
