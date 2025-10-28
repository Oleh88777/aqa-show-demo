import {expect, type Locator, type Page} from '@playwright/test';

export class Consent {
    readonly page: Page;
    readonly buttonConsent: Locator;

    constructor(page: Page) {
        this.page = page;
        this.buttonConsent = page.getByRole('button', {name: 'Consent'});
    }

    async clickButtonConsent() {
    await this.page.waitForLoadState('networkidle');
    await expect.soft(this.buttonConsent).toBeVisible({ timeout: 10000 });

    if (await this.buttonConsent.isVisible()) {
    await this.buttonConsent.click();
  }

}
}