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

    async fillNameandEmailAddress(name: string, email: string) {
     await this.signUpName.fill(name);
     await this.signUpEmailAddress.nth(1).fill(email);
    }

    async buttonSignUp() {
      await this.signUpClick.click();
    } 

    
}