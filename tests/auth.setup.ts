import { test as setup, expect} from '@playwright/test'
import {LoginPage } from '../pages/LoginPage'

const authFile = 'playwright/.auth/user.json';

setup('authenticate', async ({ page }) => {
   const loginPage = new LoginPage(page);
   await loginPage.navigate();
   await loginPage.login('john', 'demo');
   await expect(await loginPage.getWelcomeMessage()).toContainText('Welcome');

   await page.context().storageState({ path: authFile });
});