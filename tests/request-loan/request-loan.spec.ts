import {test, expect} from '@playwright/test';
test.use({
    launchOptions: {
        args: ['--disable-blink-features=AutomationControlled']
    }
    });

test.describe('Request Loan', () => {

   test.beforeEach(async ({page}) => {
    await page.goto('https://parabank.parasoft.com/parabank/index.htm');
    await page.fill('input[name="username"]', 'john');
    await page.fill('input[name="password"]', 'demo');
    await page.click('input[value="Log In"]')
    await page.goto('https://parabank.parasoft.com/parabank/requestloan.htm');
   });

      test('TC01 - Préstamo aprobado con datos válidos', async ({page}) => {
        await page.fill('#amount', '5000');
        await page.fill('#downPayment', '500');
        await page.selectOption('#fromAccountId', '12345');
        await page.click('input[value="Apply Now"]');
        await expect(page.locator('#loanStatus')).toContainText('Approved');
    })

    test.fail('TC02 - Préstamo no aprobado por caracteres inválidos en monto', async ({page}) => {
        await page.fill('#amount', 'abc');
        await page.fill('#downPayment', '500');
        await page.selectOption('#fromAccountId', '12345');
        await page.click('input[value="Apply Now"]');
        await expect(page.locator('#loanStatus')).toContainText('Denied');
    })

    test.fail('TC03 - Préstamo no aprobado por campos vacios', async ({page}) => {
        await page.fill('#amount', '');
        await page.fill('#downPayment', '');
        await page.selectOption('#fromAccountId', '12345');
        await page.click('input[value="Apply Now"]');
        await expect(page.locator('#loanStatus')).toContainText('Denied');
    })

    test.fail('TC04 - Préstamo no aprobado por loan amount en 0', async ({page}) => {
        await page.fill('#amount', '0');
        await page.fill('#downPayment', '100');
        await page.selectOption('#fromAccountId', '12345');
        await page.click('input[value="Apply Now"]');
        await expect(page.locator('#loanStatus')).toContainText('Denied');
    })

    test.fail('TC05 - Préstamo no aprobado por down payment en 0', async ({page}) => {
        await page.fill('#amount', '5000');
        await page.fill('#downPayment', '0');
        await page.selectOption('#fromAccountId', '12345');
        await page.click('input[value="Apply Now"]');
        await expect(page.locator('#loanStatus')).toContainText('Denied');
    })

    test.fail('TC06 - Préstamo no aprobado por loan amount vacio', async ({page}) => {
        await page.fill('#amount', '');
        await page.fill('#downPayment', '100');
        await page.selectOption('#fromAccountId', '12345');
        await page.click('input[value="Apply Now"]');
        await expect(page.locator('#loanStatus')).toContainText('Denied');
    })

    test.fail('TC07 - Préstamo no aprobado por down payment vacio', async ({page}) => {
        await page.fill('#amount', '5000');
        await page.fill('#downPayment', '');
        await page.selectOption('#fromAccountId', '12345');
        await page.click('input[value="Apply Now"]');
        await expect(page.locator('#loanStatus')).toContainText('Denied');  
    })

    test.fail('TC08 - Préstamo no aprobado por Múltiples solicitudes de préstamo sin restricción', async ({page}) => {
    for (let i = 0; i < 5; i++) {
        await page.goto('https://parabank.parasoft.com/parabank/requestloan.htm');
        await page.fill('#amount', '5000');
        await page.fill('#downPayment', '500');
        await page.selectOption('#fromAccountId', '12345');
        await page.click('input[value="Apply Now"]');
        await expect(page.locator('#loanStatus')).toContainText('Approved');
    }
       await expect(page.locator('#loanStatus')).toContainText('Denied');
    })

})
