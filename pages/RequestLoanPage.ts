import {Page} from '@playwright/test';

export class RequestLoanPage {
    constructor(public page: Page) {
    }


    async navigate() {
        await this.page.goto('https://parabank.parasoft.com/parabank/requestloan.htm');
    }

    async requestLoan(amount: string, downPayment: string, fromAccountId: string = '12567') {
        await this.page.fill('#amount', amount);
        await this.page.fill('#downPayment', downPayment);
        await this.page.selectOption('#fromAccountId', fromAccountId);
        await this.page.click('input[value="Apply Now"]');
    }

    async getResultMessage() {
        return this.page.locator('#loanStatus');
    }

    async getErrorMessage(fieldId: string) {
        return this.page.locator(`#${fieldId}`);
    }
}
