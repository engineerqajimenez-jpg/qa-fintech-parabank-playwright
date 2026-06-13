import { Page } from '@playwright/test';

export class BillPayPage {
    constructor(public page: Page) {
    }

    async navigate() {
        await this.page.goto('https://parabank.parasoft.com/parabank/billpay.htm');
    }

    async payBill(payeeName: string, address: string, city: string, state: string, zipCode: string, phoneNumber: string, accountNumber: string, verifyAccount: string, amount: string, fromAccountId: string = '12567') {
        await this.page.fill('input[name="payee.name"]', payeeName);
        await this.page.fill('input[name="payee.address.street"]', address);
        await this.page.fill('input[name="payee.address.city"]', city);
        await this.page.fill('input[name="payee.address.state"]', state);
        await this.page.fill('input[name="payee.address.zipCode"]', zipCode);
        await this.page.fill('input[name="payee.phoneNumber"]', phoneNumber);
        await this.page.fill('input[name="payee.accountNumber"]', accountNumber);
        await this.page.fill('input[name="verifyAccount"]', verifyAccount);
        await this.page.fill('input[name="amount"]', amount);
        await this.page.selectOption('select[name="fromAccountId"]', fromAccountId);
        await this.page.click('input[value="Send Payment"]');
    }

    async getResultMessage() {
        return this.page.locator('#billpayResult h1.title');
    }

   async getErrorMessage(fieldId: string) {
        return this.page.locator(`#${fieldId}`);
    }
}