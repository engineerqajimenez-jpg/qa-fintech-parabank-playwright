import { test, expect } from '@playwright/test'

let customerId: number;
let fromAccountId: number;

test.beforeAll(async ({ request }) => {
  const response = await request.get(
    'http://parabank.parasoft.com/parabank/services/bank/login/john/demo',
    { headers: { Accept: 'application/json' } }
  );
  const body = await response.json();
  customerId = body.id;

   const accountsResponse = await request.get(
    `http://parabank.parasoft.com/parabank/services/bank/customers/${customerId}/accounts`,
    { headers: { Accept: 'application/json' } }
  );
  const accounts = await accountsResponse.json();
  fromAccountId = accounts[0].id;
});

test.skip('deposito exitoso', async ({ request }) =>{
  const response = await request.post(
    `http://parabank.parasoft.com/parabank/services/bank/deposit?accountId=${fromAccountId}&amount=200`,
    {headers: { Accept: 'application/json'}}
  );
  const body = await response.text()
  console.log(body);
  expect(response.status()).toBe(200);
})

test('Obtener transacciones de la cuenta', async ({ request}) =>{
  const response = await request.get(
    `http://parabank.parasoft.com/parabank/services/bank/accounts/${fromAccountId}/transactions`,
    { headers: { Accept: 'application/json'} }
  );
   const body = await response.json()
   console.log(body)

   expect(response.status()).toBe(200);
  expect(Array.isArray(body)).toBe(true);
  expect(body.length).toBeGreaterThan(0) ;
  expect(body[0].accountId).toBe(fromAccountId); 
});
