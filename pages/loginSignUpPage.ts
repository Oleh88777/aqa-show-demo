import { af_ZA } from '@faker-js/faker';
import {expect, Locator, type Page} from '@playwright/test';

export class LoginSignuUp {
    readonly page: Page;
    readonly signUpName: Locator;
    readonly signUpEmailAddress: Locator;
    readonly signUpClick: Locator;

    constructor(page: Page) {
        this.page = page;
        this.signUpName = page.getByRole('textbox', {name: 'Name'});
        this.signUpEmailAddress = page.getByRole('textbox', {name: 'Email Address'});
        this.signUpClick = page.getByRole('button', {name: 'Signup'});
    }

    //Sign up Login
    async fillNameandEmailAddress(name: string, email: string) {
     await this.signUpName.fill(name);
     await this.signUpEmailAddress.nth(1).fill(email);
    }

    async buttonSignUp() {
      await this.signUpClick.click();
    } 

    //Account Inforamtion

    //Chose and verefui radio button
    async buttonRadiCheck() {
     const radioButtonMr = this.page.getByRole('radio', {name: 'Mr.'})
     await radioButtonMr.check();
     await expect(radioButtonMr).toBeChecked();
    }

    //Enter a pssword
    async enterAccountPassword(password: string) {
     const accountPassword = this.page.getByRole('textbox', {name: 'password'});
     await accountPassword.fill(password);
    }

   //Select day of Birth Month Year
   async selectBrDay() {
    const slelectBirthDay = this.page.locator('#days');
    await slelectBirthDay.click();
    await slelectBirthDay.selectOption('31');
   }

   async selectMonth () {
    const selectBrMonth = this.page.locator('#months');
    await selectBrMonth.click();
    await selectBrMonth.selectOption('3');
   }

   async selectYear() {
    const selectBrYaer = this.page.locator('#years')
    await selectBrYaer.click();
    await selectBrYaer.selectOption('1994');
   }

   //Select Sign up chekbox and Special offers.
   async selectCheckBoxeNewsletter() {
    const checkBoxNewsletter = this.page.getByRole('checkbox').first();
    await checkBoxNewsletter.check();
    await expect(checkBoxNewsletter).toBeChecked();
   }

   async selectCheckBoxOffers() {
    const checkBoxOffers = this.page.getByRole('checkbox');
    await checkBoxOffers.nth(1).check();
    await expect(checkBoxOffers.nth(1)).toBeChecked();
   }

   // fill address inforamtion
   async fillAddressInfoNameLastNameCompany(name: string, lastname: string, company: string ) {
    const addressName = this.page.getByLabel('First name ');
    await addressName.fill(name);
    
    const addressLastName = this.page.getByLabel('Last name ');
    await addressLastName.fill(lastname);

    const addrwssCompany = this.page.getByLabel('Company').first();
    await addrwssCompany.fill(company);
   }

   // fill Address address info
   async fillAddressOneAndTwo(address1: string, address2: string) {
    const filladdress1 = this.page.getByLabel('Address ').first();
    await filladdress1.fill(address1);

    const filladdress2 = this.page.getByLabel('Address 2');
    await filladdress2.fill(address2);
   }
}
