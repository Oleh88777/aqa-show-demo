import { test, expect} from '@playwright/test';
import { HomePage } from '../pages/homePage';
import { Consent } from '../pages/consent';
import { MainNavigation } from '../pages/mainNavigationPage';
import { LoginSignuUp } from '../pages/loginSignUpPage';
import { faker, Faker } from '@faker-js/faker';
import { request } from 'http';


test.describe('Create a new user', () => {
  test.beforeEach(async ({ page }) => {
  
    const homepage = new HomePage(page);
    const consent = new Consent(page);
    await homepage.gotoMainPage();
    await page.waitForLoadState('networkidle');
    const button = consent.buttonConsent;
      if (await button.isVisible()) {
      await button.click();
    }
  });

  test('New user Signup!', async ({ page }) => {
    const mainnav = new MainNavigation(page);
    const loginsignup = new LoginSignuUp(page);

    //go to signup page, fill name & email
    await mainnav.clickSignUpLogin();
    await loginsignup.fillNameandEmailAddress(process.env.STATIC_USER_NAME!, process.env.STATIC_USER_EMAIL!);
    await loginsignup.buttonSignUp();

    //Chose and verefi radiobutton & password
    await loginsignup.buttonRadiCheck();
    await loginsignup.enterAccountPassword(process.env.STATIC_USER_PASSWORD!);

    //select Date of Birth Month Year
    await loginsignup.selectBrDay();
    await loginsignup.selectMonth();
    await loginsignup.selectYear();

    //select check box Newsletter and Offers
    await loginsignup.selectCheckBoxeNewsletter();
    await loginsignup.selectCheckBoxOffers();

    //fill in Adress information via faker
    const firstName = faker.person.firstName("male")
    const lastName = faker.person.lastName('male')
    const companyName = faker.company.name()

    await loginsignup.fillAddressInfoNameLastNameCompany(firstName, lastName, companyName);

    const address1 = faker.location.street();
    const address2 = faker.location.street();

    await loginsignup.fillAddressOneAndTwo(address1, address2);

    //fill State, City, Zipcode, Mobile Number
    const state = faker.location.state();
    const city = faker.location.city();
    const zipCode = faker.location.zipCode();
    const mobileNUmber = faker.phone.number({ style: 'international' });

    await loginsignup.fillStateCityZipCOdeMobileNumber(state, city, zipCode, mobileNUmber);

    //click button Create Account
    await loginsignup.buttonCreateAccount();

    // Click button Home, Log out;
    await mainnav.buttonHome();
    await mainnav.buttonLogOut();
  });

//Register existing user
  test.skip('Register existing user', async ({ page }) =>  {
    const mainnav = new MainNavigation(page);
    const loginsignup = new LoginSignuUp(page);

    await mainnav.clickSignUpLogin();
    await loginsignup.fillNameandEmailAddress(process.env.STATIC_USER_NAME!, process.env.STATIC_USER_EMAIL!);
    await loginsignup.buttonSignUp();

    const errorExistingUser = page.locator('text=Email Address already exist');
    await errorExistingUser.waitFor({ state: 'visible', timeout: 10000 });
    await expect(errorExistingUser).toBeVisible();
});

// login existing user via UI
test.skip('login existing user via UI', async ({ page }) => {
  const loginsignup = new LoginSignuUp(page);
  const mainnav = new MainNavigation(page);

  await mainnav.clickSignUpLogin();
  await loginsignup.buttonLoginEmailAndPassword(process.env.STATIC_USER_EMAIL!, process.env.STATIC_USER_PASSWORD!);
  await loginsignup.buttonLogin();
  await page.waitForLoadState('networkidle');
});

//Delete user via API
test('Delete existing user via GET', async ({ page }) => {
  // 1️⃣ Логін користувача
  const mainnav = new MainNavigation(page);
  const loginsignup = new LoginSignuUp(page);

  await page.goto('https://automationexercise.com');
  await mainnav.clickSignUpLogin();
  await loginsignup.buttonLoginEmailAndPassword(
    process.env.STATIC_USER_EMAIL!,
    process.env.STATIC_USER_PASSWORD!
  );
  await loginsignup.buttonLogin();

  await page.goto('https://automationexercise.com/delete_account');

 
  await mainnav.clickSignUpLogin();
  await loginsignup.buttonLoginEmailAndPassword(
    process.env.STATIC_USER_EMAIL!,
    process.env.STATIC_USER_PASSWORD!
  );
  await loginsignup.buttonLogin();

  const loginError = page.locator('p:has-text("Your email or password is incorrect!")');
  await expect(loginError).toBeVisible();

  await page.context().clearCookies();
  page.close();
});

    });