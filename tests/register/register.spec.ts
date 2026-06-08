import {test, expect} from '@playwright/test';

    test.use({
    launchOptions: {
        args: ['--disable-blink-features=AutomationControlled']
    }
    });

test.describe('Register tests',() => {


    test('TC01 - Registro exitoso', async ({page}) => {
        const username = `Alexander${Date.now()}`;
        await page.goto('https://parabank.parasoft.com/parabank/register.htm')
        await page.fill ('input[name="customer.firstName"]', 'Alexander')
        await page.fill ('input[name="customer.lastName"]', 'Perez')
        await page.fill ('input[name="customer.address.street"]', 'Calle 123')
        await page.fill ('input[name="customer.address.city"]', 'Buenos Aires')
        await page.fill ('input[name="customer.address.state"]', 'BA')
        await page.fill ('input[name="customer.address.zipCode"]', '1000')
        await page.fill ('input[name="customer.phoneNumber"]', '1234567890')
        await page.fill ('input[name="customer.ssn"]', '123456')
        await page.fill ('input[name="customer.username"]', username)
        await page.fill ('input[name="customer.password"]', '123456')
        await page.fill ('input[name="repeatedPassword"]', '123456')
        await page.waitForTimeout(2000);
        await page.click('input[value="Register"]');
        await expect(page.locator('p.smallText')).toContainText('Welcome Alexander Perez');
    });

    test('TC02 - Registro no exitoso con campos vacíos', async ({page}) => {
        await page.goto('https://parabank.parasoft.com/parabank/register.htm')
        await page.click('input[value="Register"]');
        await expect(page.locator('.error').first()).toContainText('First name is required.');
    });

    test('TC03 - Registro no exitoso con username existente', async ({page}) => {
        await page.goto('https://parabank.parasoft.com/parabank/register.htm')
        await page.fill ('input[name="customer.firstName"]', 'Alexander')
        await page.fill ('input[name="customer.lastName"]', 'Perez')
        await page.fill ('input[name="customer.address.street"]', 'Calle 123')
        await page.fill ('input[name="customer.address.city"]', 'Buenos Aires')
        await page.fill ('input[name="customer.address.state"]', 'BA')
        await page.fill ('input[name="customer.address.zipCode"]', '1000')
        await page.fill ('input[name="customer.phoneNumber"]', '1234567890')
        await page.fill ('input[name="customer.ssn"]', '123456')
        await page.fill ('input[name="customer.username"]', 'Joseito')
        await page.fill ('input[name="customer.password"]', '123456')
        await page.fill ('input[name="repeatedPassword"]', '123456')
        await page.click('input[value="Register"]');
        await expect(page.locator('.error').first()).toContainText('This username already exists.');
    
    });

    test ('TC04 - Registro no exitoso con password y confirmación de password diferentes', async ({page}) => {
        const username = `Alexander${Date.now()}`;
        await page.goto('https://parabank.parasoft.com/parabank/register.htm')
        await page.fill ('input[name="customer.firstName"]', 'Alexander')
        await page.fill ('input[name="customer.lastName"]', 'Perez')
        await page.fill ('input[name="customer.address.street"]', 'Calle 123')
        await page.fill ('input[name="customer.address.city"]', 'Buenos Aires')
        await page.fill ('input[name="customer.address.state"]', 'BA')
        await page.fill ('input[name="customer.address.zipCode"]', '1000')
        await page.fill ('input[name="customer.phoneNumber"]', '1234567890')
        await page.fill ('input[name="customer.ssn"]', '123456')
        await page.fill ('input[name="customer.username"]', username)
        await page.fill ('input[name="customer.password"]', '123456')
        await page.fill ('input[name="repeatedPassword"]', '654321')
        await page.click('input[value="Register"]');
        await expect(page.locator('.error').first()).toContainText('Passwords did not match.');
    });

    test ('TC05 - Registro no exitoso con passwword vacio', async ({page}) => {
        const username = `Alexander${Date.now()}`;
        await page.goto('https://parabank.parasoft.com/parabank/register.htm')
        await page.fill ('input[name="customer.firstName"]', 'Alexander')
        await page.fill ('input[name="customer.lastName"]', 'Perez')
        await page.fill ('input[name="customer.address.street"]', 'Calle 123')
        await page.fill ('input[name="customer.address.city"]', 'Buenos Aires')
        await page.fill ('input[name="customer.address.state"]', 'BA')
        await page.fill ('input[name="customer.address.zipCode"]', '1000')
        await page.fill ('input[name="customer.phoneNumber"]', '1234567890')
        await page.fill ('input[name="customer.ssn"]', '123456')
        await page.fill ('input[name="customer.username"]', username)
        await page.fill ('input[name="customer.password"]', '')
        await page.fill ('input[name="repeatedPassword"]', '123456')
        await page.click('input[value="Register"]');
        await expect(page.locator('.error').first()).toContainText('Password is required.');
    });
    
    test ('TC06 - Registro no exitoso con username vacío', async ({page}) => {
        const username = `Alexander${Date.now()}`;
        await page.goto('https://parabank.parasoft.com/parabank/register.htm')
        await page.fill ('input[name="customer.firstName"]', 'Alexander')
        await page.fill ('input[name="customer.lastName"]', 'Perez')
        await page.fill ('input[name="customer.address.street"]', 'Calle 123')
        await page.fill ('input[name="customer.address.city"]', 'Buenos Aires')
        await page.fill ('input[name="customer.address.state"]', 'BA')
        await page.fill ('input[name="customer.address.zipCode"]', '1000')
        await page.fill ('input[name="customer.phoneNumber"]', '1234567890')
        await page.fill ('input[name="customer.ssn"]', '123456')
        await page.fill ('input[name="customer.username"]', '')
        await page.fill ('input[name="customer.password"]', '123456')
        await page.fill ('input[name="repeatedPassword"]', '123456')
        await page.click('input[value="Register"]');
        await expect(page.locator('.error').first()).toContainText('Username is required.');
    });

    test ('TC07 - Registro no exitoso con campo SSN vacío', async ({page}) => {
        const username = `Alexander${Date.now()}`;
        await page.goto('https://parabank.parasoft.com/parabank/register.htm')
        await page.fill ('input[name="customer.firstName"]', 'Alexander')
        await page.fill ('input[name="customer.lastName"]', 'Perez')
        await page.fill ('input[name="customer.address.street"]', 'Calle 123')
        await page.fill ('input[name="customer.address.city"]', 'Buenos Aires')
        await page.fill ('input[name="customer.address.state"]', 'BA')
        await page.fill ('input[name="customer.address.zipCode"]', '1000')
        await page.fill ('input[name="customer.phoneNumber"]', '1234567890')
        await page.fill ('input[name="customer.ssn"]', '')
        await page.fill ('input[name="customer.username"]', username)
        await page.fill ('input[name="customer.password"]', '123456')
        await page.fill ('input[name="repeatedPassword"]', '123456')
        await page.click('input[value="Register"]');
        await expect(page.locator('.error').first()).toContainText('Social Security Number is required.');
    });

    test ('TC08 - Registro no exitoso con numeros en First Name y Last Name', async ({page}) => {
        const username = `Alexander${Date.now()}`;
        await page.goto('https://parabank.parasoft.com/parabank/register.htm')
        await page.fill ('input[name="customer.firstName"]', 'Alexander123')
        await page.fill ('input[name="customer.lastName"]', 'Perez456')
        await page.fill ('input[name="customer.address.street"]', 'Calle 123')
        await page.fill ('input[name="customer.address.city"]', 'Buenos Aires')
        await page.fill ('input[name="customer.address.state"]', 'BA')
        await page.fill ('input[name="customer.address.zipCode"]', '1000')
        await page.fill ('input[name="customer.phoneNumber"]', '1234567890')
        await page.fill ('input[name="customer.ssn"]', '123456')
        await page.fill ('input[name="customer.username"]', username)
        await page.fill ('input[name="customer.password"]', '123456')
        await page.fill ('input[name="repeatedPassword"]', '123456')
        await page.click('input[value="Register"]');
        await expect(page.locator('.error').first()).toContainText('First name may not contain numbers.');
    });

    test ('TC09 - Registro no exitoso con letras en campo SSN', async ({page}) => {
        const username = `Alexander${Date.now()}`;
        await page.goto('https://parabank.parasoft.com/parabank/register.htm')
        await page.fill ('input[name="customer.firstName"]', 'Alexander')
        await page.fill ('input[name="customer.lastName"]', 'Perez')
        await page.fill ('input[name="customer.address.street"]', 'Calle 123')
        await page.fill ('input[name="customer.address.city"]', 'Buenos Aires')
        await page.fill ('input[name="customer.address.state"]', 'BA')
        await page.fill ('input[name="customer.address.zipCode"]', '1000')
        await page.fill ('input[name="customer.phoneNumber"]', '1234567890')
        await page.fill ('input[name="customer.ssn"]', 'ABC123')
        await page.fill ('input[name="customer.username"]', username)
        await page.fill ('input[name="customer.password"]', '123456')
        await page.fill ('input[name="repeatedPassword"]', '123456')
        await page.click('input[value="Register"]');
        await expect(page.locator('.error').first()).toContainText('Social Security Number may not contain letters.');
    });
})