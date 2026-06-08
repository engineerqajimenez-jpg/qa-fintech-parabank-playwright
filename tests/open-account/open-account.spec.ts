import {test, expect} from '@playwright/test';

test.use({
    launchOptions: {
        args: ['--disable-blink-features=AutomationControlled']
    }
    });

test.describe('Open Account', () => {

    test.beforeEach(async ({page}) => {
    await page.goto('https://parabank.parasoft.com/parabank/index.htm')
    await page.fill('input[name="username"]', 'john')
    await page.fill('input[name="password"]', 'demo')
    await page.click('input[value="Log In"]')
    
    });

    test ('TC01 - Apertura de cuenta checking exitosa', async ({page}) => {
        await page.goto ('https://parabank.parasoft.com/parabank/openaccount.htm')
        await page.selectOption('#type', 'CHECKING')
        await page.click('input[value="Open New Account"]')
        await expect(page.locator('#openAccountResult')).toContainText('Congratulations, your account is now open.');
    })

    test ('TC02 - Apertura de cuenta savings exitosa', async ({page}) => {
        await page.goto ('https://parabank.parasoft.com/parabank/openaccount.htm')
        await page.selectOption('#type', 'SAVINGS')
        await page.click('input[value="Open New Account"]')
        await expect(page.locator('#openAccountResult')).toContainText('Congratulations, your account is now open.'); 
    })

    test.fail ('TC03 - Apertura no exitosa de cuenta con saldo insuficiente', async ({page}) => {
        await page.goto ('https://parabank.parasoft.com/parabank/openaccount.htm')
        await page.selectOption('#type', 'CHECKING')
        await page.selectOption('#fromAccountId', '12345') // Selecciona una cuenta con saldo insuficiente
        await page.click('input[value="Open New Account"]')
        await expect(page.locator('#openAccountResult')).toContainText('Insufficient funds to open account.'); 
    })

    test.fail ('TC04 - Apertura no exitosa de multiples cuentas por tipo', async ({page}) => {
    for (let i = 0; i < 5; i++) {
        await page.goto ('https://parabank.parasoft.com/parabank/openaccount.htm')
        await page.selectOption('#type', 'CHECKING')
        await page.selectOption('#fromAccountId', '12345') 
        await page.click('input[value="Open New Account"]')
    }
        await expect(page.locator('#openAccountResult')).toContainText('Many accounts of the same type are not allowed.'); 
    })
})