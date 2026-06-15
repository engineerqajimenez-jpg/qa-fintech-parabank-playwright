import { test, expect } from '@playwright/test';

let customerId: number;

test.beforeAll(async ({ request }) => {
  const response = await request.get(
    'http://parabank.parasoft.com/parabank/services/bank/login/john/demo',
    { headers: { Accept: 'application/json' } }
  );
  const body = await response.json();
  customerId = body.id;
});



test('Login exitoso con john/demo', async ({ request }) => {
 const response = await request.get(
  'http://parabank.parasoft.com/parabank/services/bank/login/john/demo',
  { headers: { Accept: 'application/json' } }
 );
  const body = await response.json();
  
  expect(body.firstName).toBe('John');
  expect(body.lastName).toBe('Smith');
  expect(body.id).toBe(customerId);

  expect(response.status()).toBe(200);

});

test('Login devuelve datos del customer', async ({ request }) => {
  const response = await request.get(
    'http://parabank.parasoft.com/parabank/services/bank/login/john/demo',
    { headers: { Accept: 'application/json' } }
  );
  const body = await response.json();

  expect(body.firstName).toBe('John');
  expect(body.lastName).toBe('Smith');
  expect(body.id).toBe(customerId);
});
