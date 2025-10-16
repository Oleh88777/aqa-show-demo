import {expect, type Locator, type Page} from '@playwright/test';

export class Consent {
    readonly page: Page;
    readonly buttonConsent: Locator;

    constructor(page: Page) {
        this.page = page;
        this.buttonConsent = page.getByRole('button', {name: 'Consent'});
    }

    async clickButtonConsent() {
        await this.buttonConsent.click();
    }

}