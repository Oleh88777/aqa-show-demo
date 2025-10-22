import { test, expect} from '@playwright/test';
import { HomePage } from '../pages/homePage';
import { Consent } from '../pages/consent';
import { MainNavigation } from '../pages/mainNavigationPage';
import { LoginSignuUp } from '../pages/loginSignUpPage';
import { faker, Faker } from '@faker-js/faker';


test.describe('Create a new user', () => {
  test.beforeEach(async ({ page }) => {
  
    const homepage = new HomePage(page);
    const consent = new Consent(page);
    await homepage.gotoMainPage();
    await consent.clickButtonConsent();
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

  test('Register existing user', async ({ page, request }) =>  {
    const mainnav = new MainNavigation(page);
    const loginsignup = new LoginSignuUp(page);

    await mainnav.clickSignUpLogin();
    await loginsignup.fillNameandEmailAddress(process.env.STATIC_USER_NAME!, process.env.STATIC_USER_EMAIL!);
    await loginsignup.buttonSignUp();

    const errorExistingUser = page.getByText('Email Address already exist!');
    await expect(errorExistingUser).toBeVisible();
    await expect(errorExistingUser).toHaveText('Email Address already exist!');

    // Delete existing user via API
    const formData = new FormData();
    formData.append('email', process.env.STATIC_USER_EMAIL!);
    formData.append('password', process.env.STATIC_USER_PASSWORD!);

    const deletMethod = await request.delete('https://automationexercise.com/api/deleteAccount', {
       
        multipart: formData,
    });

      await expect(deletMethod).toBeOK();
      
      const result = await deletMethod.json();
      console.log(result);
      expect(result.responseCode).toBe(200);

      await page.close();
  })
});