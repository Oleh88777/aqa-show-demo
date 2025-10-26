import { test, expect} from '@playwright/test';
import { HomePage } from '../pages/homePage';
import { Consent } from '../pages/consent';
import { MainNavigation } from '../pages/mainNavigationPage';
import { LoginSignuUp } from '../pages/loginSignUpPage';
import { faker, Faker } from '@faker-js/faker';
import { request } from 'http';
import { Products } from '../pages/productPage';

test.describe('Create a new user', () => {
  
    test.beforeEach(async ({ page }) => {
  
    const homepage = new HomePage(page);
    const consent = new Consent(page);
    const loginSignUpPage = new LoginSignuUp(page);
    const mainnav = new MainNavigation(page);
    await homepage.gotoMainPage();
    await consent.clickButtonConsent();
    await mainnav.clickSignUpLogin();
    await loginSignUpPage.buttonLoginEmailAndPassword('mykhayliv88777@gmail.com', 'Europe2025$');
    await mainnav.buttonProducts();
});


test('Set up a dependency defore a checkout page', async ({page}) => {
    const products = new Products(page);
    await products.serachProduct();
    const buttonSearchProduct = page.locator('#submit_search');
    await buttonSearchProduct.click();

    const buttonAddtoCArt = page.locator('a[data-product-id="35"]').first();
    await buttonAddtoCArt.click();

    const buttonViewCart = page.locator('[href="/view_cart"]')
;   await buttonViewCart.nth(1).click();

    const buttonProccedToCheckout = page.locator('.check_out').filter({ hasText: 'Proceed To Checkout' });
    await buttonProccedToCheckout.click();

    const textArea = page.locator('textarea[name="message"]');
    await textArea.fill('Test message for checkout');

    const placeOrderTextarea = page.locator('[href="/payment"]');
    await placeOrderTextarea.click();
});

})