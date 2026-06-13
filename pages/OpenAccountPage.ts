import { Page } from '@playwright/test';

export class OpenAccountPage {
    constructor(public page: Page) {
    }

     async navigate() {
       await this.page.goto('https://parabank.parasoft.com/parabank/openaccount.htm');
    }

    async selectAccountType(type: string) {
        await this.page.selectOption('#type', type);
    }

    async selectFromAccount(accountId: string) {
        await this.page.selectOption('#fromAccountId', accountId);
    }

    async openNewAccount() {
        await this.page.click('input[value="Open New Account"]');
    }

    async getResultMessage() {
        return this.page.locator('#openAccountResult');
    }
}
