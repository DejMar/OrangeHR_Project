export class SharedSteps {
    constructor(page) {
        this.page = page;
    }

    selectRandomOptionAndSave = async (DropdownName) => {
        await this.page.waitForSelector('.oxd-select-text-input', { state: 'visible' });
        await this.page.click(`//div[div[label[text()='${DropdownName}']]]//div[@class='oxd-select-wrapper']`); // Click to open the dropdown
        await this.page.waitForSelector('.oxd-select-option span', { state: 'visible' });
        const options = await this.page.$$eval('.oxd-select-option span', spans => spans.map(span => span.textContent.trim()));
        const randomOption = options[Math.floor(Math.random() * options.length)];
        await this.page.click(`text=${randomOption}`);
        console.log(`Selected option: ${randomOption}`);
        return randomOption; // Save the randomly selected option
    }
    
    async takeScreenshotOnFailure(page, testInfo) {
        if (testInfo.status !== 'passed') {
          const screenshotPath = `screenshots/${testInfo.title.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.png`;
          await page.screenshot({ path: screenshotPath, fullPage: true });
          console.log(`Screenshot saved: ${screenshotPath}`);
        }
      }
}