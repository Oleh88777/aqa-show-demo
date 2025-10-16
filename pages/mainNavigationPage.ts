import {expect, Locator, type Page} from '@playwright/test';

export class MainNavigation {
    readonly page: Page;
    readonly buttonSignUpLogin: Locator;

    constructor(page: Page) {
        this.page = page;
        this.buttonSignUpLogin = page.locator('[href="/login"]');
    }

    async clickSignUpLogin() {
      await expect(this.buttonSignUpLogin).toBeVisible;
      await this.buttonSignUpLogin.click();
      await expect(this.page).toHaveURL('https://automationexercise.com/login');
    }


}