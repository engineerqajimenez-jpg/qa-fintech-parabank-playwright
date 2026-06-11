import {test, expect} from '@playwright/test';
test.use({
    launchOptions: {
        args: ['--disable-blink-features=AutomationControlled']
    }
    });

test.describe('Bill Pay', () => {

   test.beforeEach(async ({page}) => {
    await page.goto('https://parabank.parasoft.com/parabank/index.htm');
    await page.fill('input[name="username"]', 'john');
    await page.fill('input[name="password"]', 'demo');
    await page.click('input[value="Log In"]')
    await page.goto('https://parabank.parasoft.com/parabank/billpay.htm');
   });

   test('TC01 - Pago de factura exitoso', async ({page}) => {
     await page.fill('input[name="payee.name"]', 'Electric Company');
     await page.fill('input[name="payee.address.street"]', '123 Main St');
     await page.fill('input[name="payee.address.city"]', 'Anytown');
     await page.fill('input[name="payee.address.state"]', 'CA');
     await page.fill('input[name="payee.address.zipCode"]', '12345');
     await page.fill('input[name="payee.phoneNumber"]', '555-1234');
     await page.fill('input[name="payee.accountNumber"]', '123456789');
     await page.fill('input[name="verifyAccount"]', '123456789');
     await page.fill('input[name="amount"]', '100');
     await page.selectOption('select[name="fromAccountId"]', '12567');
     await page.click('input[value="Send Payment"]');
     await expect(page.locator('#billpayResult h1.title')).toContainText('Bill Payment Complete');
   }) 

   test('TC02 - Pago de factura no exitoso por campos vacios', async ({page}) => {
    await page.fill('input[name="payee.name"]', '');
    await page.fill('input[name="payee.address.street"]', '');
    await page.fill('input[name="payee.address.city"]', '');
    await page.fill('input[name="payee.address.state"]', '');
    await page.fill('input[name="payee.address.zipCode"]', '');
    await page.fill('input[name="payee.phoneNumber"]', '');
    await page.fill('input[name="amount"]', '');
    await page.selectOption('select[name="fromAccountId"]', '12567');
    await page.click('input[value="Send Payment"]');
    await expect(page.locator('.error').first()).toContainText('Payee name is required.');
   })

   test('TC03 - Pago de factura no exitoso por account distinta a verify account', async ({page}) => {
    await page.fill('input[name="payee.name"]', 'Electric Company');
    await page.fill('input[name="payee.address.street"]', '123 Main St');
    await page.fill('input[name="payee.address.city"]', 'Anytown');
    await page.fill('input[name="payee.address.state"]', 'CA');
    await page.fill('input[name="payee.address.zipCode"]', '12345');
    await page.fill('input[name="payee.phoneNumber"]', '555-1234');
    await page.fill('input[name="payee.accountNumber"]', '123456789');
    await page.fill('input[name="verifyAccount"]', '987654321');
    await page.fill('input[name="amount"]', '100');
    await page.selectOption('select[name="fromAccountId"]', '12567');
    await page.click('input[value="Send Payment"]');
    await expect(page.locator('#validationModel-verifyAccount-mismatch')).toContainText('The account numbers do not match.');
   })

   test('TC04 - Pago de factura no exitoso por monto con caracteres invalidos', async ({page}) => {
    await page.fill('input[name="payee.name"]', 'Electric Company');
    await page.fill('input[name="payee.address.street"]', '123 Main St');
    await page.fill('input[name="payee.address.city"]', 'Anytown');
    await page.fill('input[name="payee.address.state"]', 'CA');
    await page.fill('input[name="payee.address.zipCode"]', '12345');
    await page.fill('input[name="payee.phoneNumber"]', '555-1234');
    await page.fill('input[name="payee.accountNumber"]', '123456789');
    await page.fill('input[name="verifyAccount"]', '123456789');
    await page.fill('input[name="amount"]', 'abc');
    await page.selectOption('select[name="fromAccountId"]', '12567');
    await page.click('input[value="Send Payment"]');
    await expect(page.locator('#validationModel-amount-invalid')).toContainText('Please enter a valid amount.');
   })

   test.fail('TC05 - Pago de factura no exitoso por monto en 0', async ({page}) => {
    await page.fill('input[name="payee.name"]', 'Electric Company');
    await page.fill('input[name="payee.address.street"]', '123 Main St');
    await page.fill('input[name="payee.address.city"]', 'Anytown');
    await page.fill('input[name="payee.address.state"]', 'CA');
    await page.fill('input[name="payee.address.zipCode"]', '12345');
    await page.fill('input[name="payee.phoneNumber"]', '555-1234');
    await page.fill('input[name="payee.accountNumber"]', '123456789');
    await page.fill('input[name="verifyAccount"]', '123456789');
    await page.fill('input[name="amount"]', '0');
    await page.selectOption('select[name="fromAccountId"]', '12567');
    await page.click('input[value="Send Payment"]');
    await expect(page.locator('#validationModel-amount-invalid')).toContainText('Amount must be greater than zero.');
   })

   test('TC06 - Pago de factura no exitoso por verify account vacio', async ({page}) => {
    await page.fill('input[name="payee.name"]', 'Electric Company');
    await page.fill('input[name="payee.address.street"]', '123 Main St');
    await page.fill('input[name="payee.address.city"]', 'Anytown');
    await page.fill('input[name="payee.address.state"]', 'CA');
    await page.fill('input[name="payee.address.zipCode"]', '12345');
    await page.fill('input[name="payee.phoneNumber"]', '555-1234');
    await page.fill('input[name="payee.accountNumber"]', '123456789');
    await page.fill('input[name="verifyAccount"]', '');
    await page.fill('input[name="amount"]', '100');
    await page.selectOption('select[name="fromAccountId"]', '12567');
    await page.click('input[value="Send Payment"]');
    await expect(page.locator('#validationModel-verifyAccount-empty')).toContainText('Account number is required.');
   })

   test('TC07 - Pago de factura no exitoso por account vacio y verify account lleno', async ({page}) => {
    await page.fill('input[name="payee.name"]', 'Electric Company');
    await page.fill('input[name="payee.address.street"]', '123 Main St');
    await page.fill('input[name="payee.address.city"]', 'Anytown');
    await page.fill('input[name="payee.address.state"]', 'CA');
    await page.fill('input[name="payee.address.zipCode"]', '12345');
    await page.fill('input[name="payee.phoneNumber"]', '555-1234');
    await page.fill('input[name="payee.accountNumber"]', '');
    await page.fill('input[name="verifyAccount"]', '123456789');
    await page.fill('input[name="amount"]', '100');
    await page.selectOption('select[name="fromAccountId"]', '12567');
    await page.click('input[value="Send Payment"]');
    await expect(page.locator('#validationModel-account-empty')).toContainText('Account number is required.');
   })
})
