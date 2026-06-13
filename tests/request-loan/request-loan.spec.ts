import {test, expect} from '@playwright/test';
import {RequestLoanPage} from '../../pages/RequestLoanPage';
import {LoginPage} from '../../pages/LoginPage';

test.use({
    launchOptions: {
        args: ['--disable-blink-features=AutomationControlled']
    }
    });

test.describe('Request Loan', () => {

   test.beforeEach(async ({page}) => {
        const loginPage = new LoginPage(page);
        await loginPage.navigate();
        await loginPage.login('john', 'demo');
   });

      test('TC01 - Préstamo aprobado con datos válidos', async ({page}) => {
        const requestLoanPage = new RequestLoanPage(page);
        await requestLoanPage.navigate();
        await requestLoanPage.requestLoan('5000', '500', '12345');
        await expect(await requestLoanPage.getResultMessage()).toContainText('Approved');
    })

    test.fail('TC02 - Préstamo no aprobado por caracteres inválidos en monto', async ({page}) => {
        const requestLoanPage = new RequestLoanPage(page);
        await requestLoanPage.navigate();
        await requestLoanPage.requestLoan('abc', '500', '12345');
        await expect(await requestLoanPage.getErrorMessage('amount')).toContainText('Please enter a valid number');
    })

    test.fail('TC03 - Préstamo no aprobado por campos vacios', async ({page}) => {
        const requestLoanPage = new RequestLoanPage(page);
        await requestLoanPage.navigate();
        await requestLoanPage.requestLoan('', '', '12345');
        await expect(await requestLoanPage.getErrorMessage('amount')).toContainText('Please enter a valid number');
    })

    test.fail('TC04 - Préstamo no aprobado por loan amount en 0', async ({page}) => {
        const requestLoanPage = new RequestLoanPage(page);
        await requestLoanPage.navigate();
        await requestLoanPage.requestLoan('0', '100', '12345');
        await expect(await requestLoanPage.getResultMessage()).toContainText('Denied');
    })

    test.fail('TC05 - Préstamo no aprobado por down payment en 0', async ({page}) => {
        const requestLoanPage = new RequestLoanPage(page);
        await requestLoanPage.navigate();
        await requestLoanPage.requestLoan('5000', '0', '12345');
        await expect(await requestLoanPage.getResultMessage()).toContainText('Denied');
    })

    test.fail('TC06 - Préstamo no aprobado por loan amount vacio', async ({page}) => {
        const requestLoanPage = new RequestLoanPage(page);
        await requestLoanPage.navigate();
        await requestLoanPage.requestLoan('', '100', '12345');
        await expect(await requestLoanPage.getErrorMessage('amount')).toContainText('Please enter a valid number');
    })

    test.fail('TC07 - Préstamo no aprobado por down payment vacio', async ({page}) => {
        const requestLoanPage = new RequestLoanPage(page);
        await requestLoanPage.navigate();
        await requestLoanPage.requestLoan('5000', '', '12345');
        await expect(await requestLoanPage.getErrorMessage('downPayment')).toContainText('Please enter a valid number');
    })

    test.fail('TC08 - Préstamo no aprobado por Múltiples solicitudes de préstamo sin restricción', async ({page}) => {
        const requestLoanPage = new RequestLoanPage(page);
        for (let i = 0; i < 5; i++) {
            await requestLoanPage.navigate();
            await requestLoanPage.requestLoan('5000', '500', '12345');
            await expect(await requestLoanPage.getResultMessage()).toContainText('Approved');
        }
        await expect(await requestLoanPage.getResultMessage()).toContainText('Denied');
    })

})
