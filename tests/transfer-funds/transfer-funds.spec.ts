import {test, expect} from '@playwright/test';
import { TransferFundsPage } from '../../pages/TransferFundsPage';
import { getFirstAccountId, getSecondAccountId } from '../../pages/getAccountId';

   test.use({
    launchOptions: {
        args: ['--disable-blink-features=AutomationControlled']
    }
    });

test.describe('Transfer Funds', () => {

    test.describe.configure({ mode: 'serial' });

   test('TC01 - Transferencia exitosa entre cuentas', async ({page, request}) => {
     const fromAccountId = await getFirstAccountId(request)
     const toAccountId = await getSecondAccountId(request)
     const transferFundsPage = new TransferFundsPage(page);
     await transferFundsPage.navigate();
     await transferFundsPage.transferFunds('100', fromAccountId, toAccountId);
     await expect(await transferFundsPage.getResultMessage()).toContainText('Transfer Complete!');
   })

   test.fail('TC02 - Transferencia no exitosa por saldo insuficiente', async ({page, request}) => {
     const fromAccountId = await getFirstAccountId(request)
     const toAccountId = await getSecondAccountId(request)
     const transferFundsPage = new TransferFundsPage(page);
     await transferFundsPage.navigate();
     await transferFundsPage.transferFunds('1000000', fromAccountId, toAccountId); // Monto mayor al saldo disponible
     await expect(await transferFundsPage.getResultMessage()).toContainText('Transfer Failed!');
    })

    test.fail('TC03 - Transferencia no exitosa por monto vacio o en 0', async ({page, request}) => {
     const fromAccountId = await getFirstAccountId(request)
     const toAccountId = await getSecondAccountId(request)
     const transferFundsPage = new TransferFundsPage(page);
     await transferFundsPage.navigate();
     await transferFundsPage.transferFunds('', fromAccountId, toAccountId); // Monto vacio
     await expect(await transferFundsPage.getResultMessage()).toContainText('Transfer Failed!');
    })

    test.fail('TC04 - Transferencia no exitosa hacia misma cuenta', async ({page, request}) => {
     const fromAccountId = await getFirstAccountId(request)
     const toAccountId = await getSecondAccountId(request)    
     const transferFundsPage = new TransferFundsPage(page);
     await transferFundsPage.navigate();
     await transferFundsPage.transferFunds('100', fromAccountId, fromAccountId);
     await expect(await transferFundsPage.getResultMessage()).toContainText('Transfer Failed!');
    })

    test.fail('TC05 - Transferencia no exitosa con caracteres invalidos', async ({page, request}) => {
      const fromAccountId = await getFirstAccountId(request)
     const toAccountId = await getSecondAccountId(request)
     const transferFundsPage = new TransferFundsPage(page);
     await transferFundsPage.navigate();
     await transferFundsPage.transferFunds('abc', fromAccountId, toAccountId); // Caracteres no validos
     await expect(await transferFundsPage.getResultMessage()).toContainText('Transfer Failed!');
    })
})