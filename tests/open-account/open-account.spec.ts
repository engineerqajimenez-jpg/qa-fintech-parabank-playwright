import {test, expect} from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { OpenAccountPage } from '../../pages/OpenAccountPage';

test.use({
    launchOptions: {
        args: ['--disable-blink-features=AutomationControlled']
    }
    });

test.describe('Open Account', () => {

    test.beforeEach(async ({page}) => {
        const loginPage = new LoginPage(page);
        await loginPage.navigate();
        await loginPage.login('john', 'demo');
    });

    test ('TC01 - Apertura de cuenta checking exitosa', async ({page}) => {
        const openAccountPage = new OpenAccountPage(page);
        await openAccountPage.navigate();
        await openAccountPage.selectAccountType('CHECKING');
        await openAccountPage.selectFromAccount('12345'); // Selecciona una cuenta con saldo suficiente
        await openAccountPage.openNewAccount();
        await expect(await openAccountPage.getResultMessage()).toContainText('Congratulations, your account is now open.');
    })

    test ('TC02 - Apertura de cuenta savings exitosa', async ({page}) => {
        const openAccountPage = new OpenAccountPage(page);
        await openAccountPage.navigate();
        await openAccountPage.selectAccountType('SAVINGS');
        await openAccountPage.openNewAccount();
        await expect(await openAccountPage.getResultMessage()).toContainText('Congratulations, your account is now open.');
    })

    test.fail ('TC03 - Apertura no exitosa de cuenta con saldo insuficiente', async ({page}) => {
        const openAccountPage = new OpenAccountPage(page);
        await openAccountPage.navigate();
        await openAccountPage.selectAccountType('CHECKING');
        await openAccountPage.selectFromAccount('12345'); // Selecciona una cuenta con saldo insuficiente
        await openAccountPage.openNewAccount();
        await expect(await openAccountPage.getResultMessage()).toContainText('Insufficient funds to open account.'); 
    })

    test.fail ('TC04 - Apertura no exitosa de multiples cuentas por tipo', async ({page}) => {
        let openAccountPage: OpenAccountPage = new OpenAccountPage(page);
        for (let i = 0; i < 5; i++) {
            await openAccountPage.navigate();
            await openAccountPage.selectAccountType('CHECKING');
            await openAccountPage.selectFromAccount('12345'); // Selecciona una cuenta con saldo suficiente
            await openAccountPage.openNewAccount();
        }
        await expect(await openAccountPage.getResultMessage()).toContainText('Many accounts of the same type are not allowed.'); 
    })
})