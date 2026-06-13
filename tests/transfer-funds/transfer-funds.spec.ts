import {test, expect} from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { TransferFundsPage } from '../../pages/TransferFundsPage';

   test.use({
    launchOptions: {
        args: ['--disable-blink-features=AutomationControlled']
    }
    });

test.describe('Transfer Funds', () => {

   test.beforeEach(async ({page}) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    await loginPage.login('john', 'demo');
   })

   test('TC01 - Transferencia exitosa entre cuentas', async ({page}) => {
    const transferFundsPage = new TransferFundsPage(page);
    await transferFundsPage.navigate();
    await transferFundsPage.transferFunds('100', '12345', '12900');
    await expect(await transferFundsPage.getResultMessage()).toContainText('Transfer Complete!');
   })

   test.fail('TC02 - Transferencia no exitosa por saldo insuficiente', async ({page}) => {
    const transferFundsPage = new TransferFundsPage(page);
    await transferFundsPage.navigate();
    await transferFundsPage.transferFunds('1000000', '12345', '12900'); // Monto mayor al saldo disponible
    await expect(await transferFundsPage.getResultMessage()).toContainText('Transfer Failed!');
    })

    test.fail('TC03 - Transferencia no exitosa por monto vacio o en 0', async ({page}) => {
    const transferFundsPage = new TransferFundsPage(page);
    await transferFundsPage.navigate();
    await transferFundsPage.transferFunds('', '12345', '12900'); // Monto vacio
    await expect(await transferFundsPage.getResultMessage()).toContainText('Transfer Failed!');
    })

    test.fail('TC04 - Transferencia no exitosa hacia misma cuenta', async ({page}) => {
    const transferFundsPage = new TransferFundsPage(page);
    await transferFundsPage.navigate();
    await transferFundsPage.transferFunds('100', '12345', '12345');
    await expect(await transferFundsPage.getResultMessage()).toContainText('Transfer Failed!');
    })

    test.fail('TC05 - Transferencia no exitosa con caracteres invalidos', async ({page}) => {
    const transferFundsPage = new TransferFundsPage(page);
    await transferFundsPage.navigate();
    await transferFundsPage.transferFunds('abc', '12345', '12900'); // Caracteres no validos
    await expect(await transferFundsPage.getResultMessage()).toContainText('Transfer Failed!');
    })
})
