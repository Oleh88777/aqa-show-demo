import {expect, Locator, type Page} from '@playwright/test';

export class Products {
    readonly page: Page;
    readonly searchProductLocator: Locator;
  
    constructor(page: Page) {
      this.page = page;
      this.searchProductLocator = page.locator('#search_product');


}

  async serachProduct() {
    await this.searchProductLocator.click();
    await this.searchProductLocator.fill('Jeans');
}
}

