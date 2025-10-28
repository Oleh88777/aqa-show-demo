import { test, expect} from '@playwright/test';
import { HomePage } from '../pages/homePage';
import { Consent } from '../pages/consent';
import { MainNavigation } from '../pages/mainNavigationPage';
import { LoginSignuUp } from '../pages/loginSignUpPage';
import { faker, Faker } from '@faker-js/faker';
import { Products } from '../pages/productPage';

test.describe('Search and add product to the card', () => {
  test.beforeEach(async ({ page }) => {
  
    const homepage = new HomePage(page);
    const consent = new Consent(page);
    const mainnav = new MainNavigation(page);
    await homepage.gotoMainPage();
    await consent.clickButtonConsent();
    await mainnav.buttonProducts();
  });


//Search Product, add to Card
  test('Search Product, add to Card', async ({page}) => {
    const products = new Products(page);
    await products.serachProduct();
    await expect(products.searchProductLocator).toHaveValue('Jeans');

    const buttonSearchProduct = page.locator('#submit_search');
    await expect(buttonSearchProduct).toBeVisible();
    await buttonSearchProduct.hover();
    await buttonSearchProduct.click();

    const titleSearchedProduct = page.locator('h2:has-text("searched Products")');
    await expect(titleSearchedProduct).toBeVisible();

    const listofItems = page.locator('.productinfo.text-centero p');
    const names = await listofItems.count();

    for (let i = 0; i < names; i++) {
      await expect(listofItems.nth(i)).toBeVisible();
    }

    //Add Product to the card go to Card
     const buttonAddtoCArt = page.locator('a[data-product-id="35"]').first();
       await expect(buttonAddtoCArt).toBeVisible();
       await buttonAddtoCArt.click();

     const buttonViewCart = page.locator('[href="/view_cart"]')
;     await buttonViewCart.nth(1).click();
       await page.close();
  });
});
