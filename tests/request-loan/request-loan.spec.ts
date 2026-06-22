import {test, expect} from '@playwright/test';
import {RequestLoanPage} from '../../pages/RequestLoanPage';
import { getFirstAccountId } from '../../pages/getAccountId';

test.use({
    launchOptions: {
        args: ['--disable-blink-features=AutomationControlled']
    }
    });

test.describe('Request Loan', () => {

     test.describe.configure({ mode: 'serial' });

      test('TC01 - Préstamo aprobado con datos válidos', async ({page, request}) => {
        const fromAccountId = await getFirstAccountId(request)
        const requestLoanPage = new RequestLoanPage(page);
        await requestLoanPage.navigate();
        await requestLoanPage.requestLoan('5000', '500', fromAccountId);
        await expect(await requestLoanPage.getResultMessage()).toContainText('Approved');
    })

    test.fail('TC02 - Préstamo no aprobado por caracteres inválidos en monto', async ({page, request}) => {
        const fromAccountId = await getFirstAccountId(request)
        const requestLoanPage = new RequestLoanPage(page);
        await requestLoanPage.navigate();
        await requestLoanPage.requestLoan('abc', '500', fromAccountId);
        await expect(await requestLoanPage.getErrorMessage('amount')).toContainText('Please enter a valid number');
    })

    test.fail('TC03 - Préstamo no aprobado por campos vacios', async ({page, request}) => {
        const fromAccountId = await getFirstAccountId(request)
        const requestLoanPage = new RequestLoanPage(page);
        await requestLoanPage.navigate();
        await requestLoanPage.requestLoan('', '', fromAccountId);
        await expect(await requestLoanPage.getErrorMessage('amount')).toContainText('Please enter a valid number');
    })

    test.fail('TC04 - Préstamo no aprobado por loan amount en 0', async ({page, request}) => {
        const fromAccountId = await getFirstAccountId(request)
        const requestLoanPage = new RequestLoanPage(page);
        await requestLoanPage.navigate();
        await requestLoanPage.requestLoan('0', '100', fromAccountId);
        await expect(await requestLoanPage.getResultMessage()).toContainText('Denied');
    })

    test.fail('TC05 - Préstamo no aprobado por down payment en 0', async ({page, request}) => {
        const fromAccountId = await getFirstAccountId(request)
        const requestLoanPage = new RequestLoanPage(page);
        await requestLoanPage.navigate();
        await requestLoanPage.requestLoan('5000', '0', fromAccountId);
        await expect(await requestLoanPage.getResultMessage()).toContainText('Denied');
    })

    test.fail('TC06 - Préstamo no aprobado por loan amount vacio', async ({page, request}) => {
        const fromAccountId = await getFirstAccountId(request)
        const requestLoanPage = new RequestLoanPage(page);
        await requestLoanPage.navigate();
        await requestLoanPage.requestLoan('', '100', fromAccountId);
        await expect(await requestLoanPage.getErrorMessage('amount')).toContainText('Please enter a valid number');
    })

    test.fail('TC07 - Préstamo no aprobado por down payment vacio', async ({page, request}) => {
        const fromAccountId = await getFirstAccountId(request)
        const requestLoanPage = new RequestLoanPage(page);
        await requestLoanPage.navigate();
        await requestLoanPage.requestLoan('5000', '', fromAccountId);
        await expect(await requestLoanPage.getErrorMessage('downPayment')).toContainText('Please enter a valid number');
    })

    test.fail('TC08 - Préstamo no aprobado por Múltiples solicitudes de préstamo sin restricción', async ({page, request}) => {
        const fromAccountId = await getFirstAccountId(request)
        const requestLoanPage = new RequestLoanPage(page);
        for (let i = 0; i < 5; i++) {
            await requestLoanPage.navigate();
            await requestLoanPage.requestLoan('5000', '500', fromAccountId);
            await expect(await requestLoanPage.getResultMessage()).toContainText('Approved');
        }
        await expect(await requestLoanPage.getResultMessage()).toContainText('Denied');
    })

})
