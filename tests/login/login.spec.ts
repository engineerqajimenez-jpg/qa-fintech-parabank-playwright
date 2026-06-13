import {test, expect} from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';

test.describe('Login tests', () => {

    test('TC01 - Login exitoso', async ({page}) => {
        const loginPage = new LoginPage(page);
        await loginPage.navigate();
        await loginPage.login('john', 'demo');
        await expect(await loginPage.getWelcomeMessage()).toContainText('Welcome');
    });

    test('TC02 - Login no exitoso con credenciales invalidas', async ({page}) => {
        const loginPage = new LoginPage(page);
        await loginPage.navigate();
        await loginPage.login('usuariofalso', 'passwordfalso');
        await expect(await loginPage.getErrorMessage()).toContainText('The username and password could not be verified');
    });

    test.skip('TC03 - Login no exitoso con usuario válido y contraseña vacía (BUG-2)', async ({page}) => {
    // test bloqueado por BUG-2
    });
    test.skip('TC04 - Login no exitoso con usuario invalido y contraseña valida', async ({page}) => {
    // test bloqueado por BUG-2
    });

    test.skip('TC05 - Login no exitoso con usuario vacio y contraseña valida  ', async ({page}) => {
    // test bloqueado por BUG-2
    });

    test.skip('TC06 - Login no exitoso con usuario valido y contraseña vacia  ', async ({page}) => {
    // test bloqueado por BUG-2
    });

    test.skip('TC07 - Login no exitoso con usuario vacío y contraseña inválida  ', async ({page}) => {
    // test bloqueado por BUG-2
    });

    test.skip('TC08 - Login no exitoso con usuario inválido y contraseña vacía  ', async ({page}) => {
    // test bloqueado por BUG-2
    });
 
    test.skip('TC09 - Login no exitoso con campos vacios  ', async ({page}) => {
    // test bloqueado por BUG-2
    });

});