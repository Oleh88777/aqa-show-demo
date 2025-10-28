import {expect, type Page} from '@playwright/test';

export class HomePage {
    readonly page: Page;
  
    constructor(page: Page) {
      this.page = page;
}

  async gotoMainPage() {
    await this.page.goto('https://automationexercise.com/'); 
    await this.page.waitForLoadState('networkidle');
}
}

