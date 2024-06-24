import { expect } from "@playwright/test"
import { warningMessages } from "../data/messages.js"

export class LoginPage {
    //#region Locators
    constructor(page) {
        this.page = page
        this.usernameField = page.getByRole('textbox', { name: 'username' })
        this.passwordField = page.getByRole('textbox', { name: 'password' })
        this.loginButton = page.getByRole('button', { type: 'submit' })
        this.invalidCredentialsMessage = page.getByText('Invalid credentials')
        this.requiredUserNameFieldMessage = page.getByText('Required').first()
        this.requiredPasswordFieldMessage = page.getByText('Required').nth(1)
        this.logourButton = page.getByRole('link', { name: 'Logout' })
    }
    //#endregion
    //#region Methods
    loginToPage = async (email, password) => {
        await this.page.goto("/")
        await this.usernameField.fill(email)
        await this.passwordField.fill(password)
        await this.loginButton.click()
    }
    verifyInvalidLoginMessage = async () => {
        await expect(this.invalidCredentialsMessage).toHaveText(warningMessages.invalidCredentials)
    }
    verifyRequiredUsernameMessage = async () => {
        await expect(this.requiredUserNameFieldMessage).toHaveText(warningMessages.required)
    }
    verifyRequiredPasswordMessage = async () => {
        await expect(this.requiredUserNameFieldMessage).toHaveText(warningMessages.required)
    }
    logoutFromPage = async () => {
        await this.logourButton.click()
    }
    //#endregion
}