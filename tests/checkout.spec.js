import { test, expect} from '@playwright/test';
import { HomePage } from '../pages/homePage';
import { Consent } from '../pages/consent';
import { MainNavigation } from '../pages/mainNavigationPage';
import { LoginSignuUp } from '../pages/loginSignUpPage';
import { faker, Faker } from '@faker-js/faker';
import { request } from 'http';
import { Products } from '../pages/productPage';
import { log } from 'console';

test.describe('Create a new user', () => {
  
    test.beforeEach(async ({ page }) => {
  
    const homepage = new HomePage(page);
    const consent = new Consent(page);
    const mainnav = new MainNavigation(page);
    await homepage.gotoMainPage();
    await consent.clickButtonConsent();
    await mainnav.clickSignUpLogin();
});


test('Set up a dependency defore a checkout page', async ({page}) => {
    const login = new LoginSignuUp(page);
    const products = new Products(page);
    const mainnav = new MainNavigation(page);
    await login.buttonLoginEmailAndPassword(process.env.STATIC_USER_EMAIL, process.env.STATIC_USER_PASSWORD);
    
    await login.buttonLogin();
    await mainnav.buttonProducts();

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

   //Fill card details 
    const cardName = page.getByRole('textbox').first();
    await expect(cardName).toBeVisible();
    await cardName.fill('Test User');

    const cardNumber = page.locator('[data-qa="card-number"]');
    await expect(cardNumber).toBeVisible();
    await cardNumber.fill('5555555555554444');

    const cvcField = page.getByRole('textbox', {name: "ex. 311"});
    await expect(cvcField).toBeVisible();
    await cvcField.fill('222');

    const mMfiled = page.locator('[data-qa="expiry-month"]');
    await mMfiled.fill('03');

    const YYYY = page.getByRole('textbox', {name: 'YYYY'});
    await expect(YYYY).toBeVisible();
    await YYYY.fill('2027');

    const payAndConfirm = page.getByRole('button', {name: "Pay and Confirm Order"});
    await payAndConfirm.click();
    page.close();

});


})