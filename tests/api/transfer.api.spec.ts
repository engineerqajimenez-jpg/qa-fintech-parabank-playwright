import {test, expect} from '@playwright/test';

  let customerId: number;
  let toAccountId: number;
  let fromAccountId: number;
  let cookies: string;

test.beforeAll(async ({ request }) => { 
  const loginResponse = await request.get(
    'http://parabank.parasoft.com/parabank/services/bank/login/john/demo',
      { headers: { Accept: 'application/json' } }
     );
       const loginBody = await loginResponse.json();
       customerId = loginBody.id;
  
       const headers = loginResponse.headers();
       cookies = headers['set-cookie'];     
    
       const accountsResponse = await request.get(
     `http://parabank.parasoft.com/parabank/services/bank/customers/${customerId}/accounts`,
     { headers: { Accept: 'application/json', } }
     );
      const accounts = await accountsResponse.json();
     fromAccountId = accounts[0].id;
     toAccountId = accounts[1].id;
   });
   
test.skip('Transferir fondos entre cuentas - requiere sesión browser activa', async ({ request }) => {
    // Login dentro del test
    await request.get(
      'http://parabank.parasoft.com/parabank/services/bank/login/john/demo',
      { headers: { Accept: 'application/xml' } }
    );

    // Transfer
    const response = await request.post(
      `http://parabank.parasoft.com/parabank/services/bank/transfer?fromAccountId=${fromAccountId}&toAccountId=${toAccountId}&amount=100`,
      { headers: { Accept: 'application/xml' } }
    );

    console.log('Status:', response.status());
    expect(response.status()).toBe(200);
});