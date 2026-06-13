import {test, expect} from '@playwright/test';
import { BillPayPage } from '../../pages/BillPayPage';
import {LoginPage} from '../../pages/LoginPage';

test.use({
    launchOptions: {
        args: ['--disable-blink-features=AutomationControlled']
    }
    });

test.describe('Bill Pay', () => {

   test.beforeEach(async ({page}) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    await loginPage.login('john', 'demo');
   });

   test('TC01 - Pago de factura exitoso', async ({page}) => {
   const billPayPage = new BillPayPage(page);
    await billPayPage.navigate();
    await billPayPage.payBill('Electric Company', '123 Main St', 'Anytown', 'CA', '12345', '555-1234', '123456789', '123456789', '100', '12567');
    await expect(await billPayPage.getResultMessage()).toContainText('Bill Payment Complete');

   }) 

   test('TC02 - Pago de factura no exitoso por campos vacios', async ({page}) => {
    const billPayPage = new BillPayPage(page);
    await billPayPage.navigate();
    await billPayPage.payBill('', '', '', '', '', '', '', '', '', '12567');
    await expect(await billPayPage.getErrorMessage('validationModel-name')).toContainText('Payee name is required.');
   })

   test('TC03 - Pago de factura no exitoso por account distinta a verify account', async ({page}) => {
    const billPayPage = new BillPayPage(page);
    await billPayPage.navigate();
    await billPayPage.payBill('Electric Company', '123 Main St', 'Anytown', 'CA', '12345', '555-1234', '123456789', '987654321', '100', '12567');
    await expect(await billPayPage.getErrorMessage('validationModel-verifyAccount-mismatch')).toContainText('The account numbers do not match.');
   })

   test('TC04 - Pago de factura no exitoso por monto con caracteres invalidos', async ({page}) => {
    const billPayPage = new BillPayPage(page);
    await billPayPage.navigate();
    await billPayPage.payBill('Electric Company', '123 Main St', 'Anytown', 'CA', '12345', '555-1234', '123456789', '123456789', 'abc', '12567');
    await expect(await billPayPage.getErrorMessage('validationModel-amount-invalid')).toContainText('Please enter a valid amount.');
   })

   test.fail('TC05 - Pago de factura no exitoso por monto en 0', async ({page}) => {
    const billPayPage = new BillPayPage(page);
    await billPayPage.navigate();
    await billPayPage.payBill('Electric Company', '123 Main St', 'Anytown', 'CA', '12345', '555-1234', '123456789', '123456789', '0', '12567');
    await expect(await billPayPage.getErrorMessage('validationModel-amount-zero')).toContainText('Amount must be a positive number.');
   })

   test('TC06 - Pago de factura no exitoso por verify account vacio', async ({page}) => {
    const billPayPage = new BillPayPage(page);
    await billPayPage.navigate();
    await billPayPage.payBill('Electric Company', '123 Main St', 'Anytown', 'CA', '12345', '555-1234', '123456789', '', '100', '12567');
    await expect(await billPayPage.getErrorMessage('validationModel-verifyAccount-empty')).toContainText('Account number is required.');
   })

   test('TC07 - Pago de factura no exitoso por account vacio y verify account lleno', async ({page}) => {
    const billPayPage = new BillPayPage(page);
    await billPayPage.navigate();
    await billPayPage.payBill('Electric Company', '123 Main St', 'Anytown', 'CA', '12345', '555-1234', '', '123456789', '100', '12567');
    await expect(await billPayPage.getErrorMessage('validationModel-account-empty')).toContainText('Account number is required.');
   })
})
