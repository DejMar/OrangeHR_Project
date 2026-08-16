import type { Page, TestInfo } from '@playwright/test';

export class SharedSteps {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async selectRandomOptionAndSave(dropdownName: string): Promise<string> {
        await this.page.waitForSelector('.oxd-select-text-input', { state: 'visible' });
        await this.page.click(`//div[div[label[text()='${dropdownName}']]]//div[@class='oxd-select-wrapper']`);
        await this.page.waitForSelector('.oxd-select-option span', { state: 'visible' });
        const options = await this.page.$$eval('.oxd-select-option span', (spans) =>
            spans.map((span) => span.textContent?.trim() ?? '')
        );
        const randomOption = options[Math.floor(Math.random() * options.length)];
        await this.page.click(`text=${randomOption}`);
        console.log(`Selected option: ${randomOption}`);
        return randomOption;
    }

    async takeScreenshotOnFailure(page: Page, testInfo: TestInfo): Promise<void> {
        if (testInfo.status !== 'passed') {
            const screenshotPath = `screenshots/${testInfo.title.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.png`;
            await page.screenshot({ path: screenshotPath, fullPage: true });
            console.log(`Screenshot saved: ${screenshotPath}`);
        }
    }
}
