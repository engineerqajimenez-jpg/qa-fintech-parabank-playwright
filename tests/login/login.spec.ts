import {test, expect} from '@playwright/test';

test.describe('Login tests', () => {

    test('TC01 - Login exitoso', async ({page}) => {

        await page.goto('https://parabank.parasoft.com/parabank/index.htm?ConnType=JDBC');
        await page.fill('input[name="username"]', 'Joseito');
        await page.fill('input[name="password"]', '123456');
        await page.click('input[value="Log In"]');
        await expect(page.locator('p.smallText')).toContainText('Welcome');

    });

    test('TC02 - Login no exitoso con credenciales invalidas', async ({page}) => {

        await page.goto('https://parabank.parasoft.com/parabank/index.htm?ConnType=JDBC');
        await page.fill('input[name="username"]', 'usuariofalso');
        await page.fill('input[name="password"]', 'passwordfalso');
        await page.click('input[value="Log In"]');
        await expect(page.locator('.error')).toContainText('The username and password could not be verified');

    });

    test.skip('TC03 - Login no exitoso con usuario válido y contraseña vacía', async ({page}) => {
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