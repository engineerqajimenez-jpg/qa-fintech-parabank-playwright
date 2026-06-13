import { Page } from '@playwright/test';

export class LoginPage {
    constructor(public page: Page) {
    }

    async navigate() {
        await this.page.goto('https://parabank.parasoft.com/parabank/index.htm');
    }

    async login(username: string, password: string) {
        await this.page.fill('input[name="username"]', username);
        await this.page.fill('input[name="password"]', password);
        await this.page.click('input[value="Log In"]');
    }

    async getWelcomeMessage() {
    return this.page.locator('p.smallText');
    }

    async getErrorMessage() {
    return this.page.locator('.error');
}
}