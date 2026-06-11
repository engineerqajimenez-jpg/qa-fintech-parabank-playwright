import {test, expect} from '@playwright/test';

   test.use({
    launchOptions: {
        args: ['--disable-blink-features=AutomationControlled']
    }
    });

test.describe('Transfer Funds', () => {

   test.beforeEach(async ({page}) => {
    await page.goto('https://parabank.parasoft.com/parabank/index.htm');
    await page.fill('input[name="username"]', 'john');
    await page.fill('input[name="password"]', 'demo');
    await page.click('input[value="Log In"]')
    await page.goto('https://parabank.parasoft.com/parabank/transfer.htm');
   });

   test('TC01 - Transferencia exitosa entre cuentas', async ({page}) => {
    await page.fill('#amount', '100');
    await page.selectOption('#fromAccountId', '12345'); // Cuenta de origen con saldo suficiente
    await page.selectOption('#toAccountId', '12900'); // Cuenta de destino
    await page.click('input[value="Transfer"]');
    await expect(page.locator('#showResult h1.title')).toContainText('Transfer Complete!');
   })


   test.fail('TC02 - Transferencia no exitosa por saldo insuficiente', async ({page}) => {
    await page.fill('#amount', '10000'); // Monto mayor al saldo disponible
    await page.selectOption('#fromAccountId', '12900'); // Cuenta de origen con saldo insuficiente
    await page.selectOption('#toAccountId', '12345');
    await page.click('input[value="Transfer"]');
    await expect(page.locator('#showResult h1.title')).toContainText('Transfer Failed!');
    })

    test.fail('TC03 - Transferencia no exitosa por monto vacio o en 0', async ({page}) => {
    await page.fill('#amount', ''); // Monto vacio
    await page.selectOption('#fromAccountId', '12345');
    await page.selectOption('#toAccountId', '12900');
    await page.click('input[value="Transfer"]');
    await expect(page.locator('#showResult h1.title')).toContainText('Transfer Failed!');
    })

    test.fail('TC04 - Transferencia no exitosa hacia misma cuenta', async ({page}) => {
    await page.fill('#amount', '100');
    await page.selectOption('#fromAccountId', '12345');
    await page.selectOption('#toAccountId', '12345');
    await page.click('input[value="Transfer"]');
    await expect(page.locator('#showResult h1.title')).toContainText('Transfer Failed!');
    })

    test.fail('TC05 - Transferencia no exitosa con caracteres invalidos', async ({page}) => {
    await page.fill('#amount', 'abc'); // Caracteres no validos
    await page.selectOption('#fromAccountId', '12345');
    await page.selectOption('#toAccountId', '12900');
    await page.click('input[value="Transfer"]');
    await expect(page.locator('#showResult h1.title')).toContainText('Transfer Failed!');
    })
})
