import { Page } from '@playwright/test';

export class TransferFundsPage {
    constructor(public page: Page) {
    }

        async navigate() {
        await this.page.goto('https://parabank.parasoft.com/parabank/transfer.htm');
    }

    async transferFunds(amount: string, fromAccountId: string, toAccountId: string) {
        await this.page.fill('#amount', amount);
        await this.page.selectOption('#fromAccountId', fromAccountId);
        await this.page.selectOption('#toAccountId', toAccountId);
        await this.page.click('input[value="Transfer"]');
    }
    
    async getResultMessage() {
        return this.page.locator('#showResult h1.title');
    }
}