import { test, expect} from '@playwright/test';
import { HomePage } from '../pages/homePage';
import { Consent } from '../pages/consent';
import { MainNavigation } from '../pages/mainNavigationPage';
import { LoginSignuUp } from '../pages/loginSignUpPage';


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
    await loginsignup.fillNameandEmailAddress('Oleh', 'mykhayliv88777@gmail.com');
    await loginsignup.buttonSignUp();
  });
});