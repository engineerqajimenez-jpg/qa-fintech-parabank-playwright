import {test, expect} from '@playwright/test';

let customerId: number;

test.beforeAll(async ({ request }) => {
  const response = await request.get(
    'http://parabank.parasoft.com/parabank/services/bank/login/john/demo',
    { headers: { Accept: 'application/json' } }
  );
  const body = await response.json();
  customerId = body.id;
});

test('Obtener cuenta de john', async ({ request }) => {
    const response = await request.get(
      `http://parabank.parasoft.com/parabank/services/bank/customers/${customerId}/accounts`,
      { headers: { Accept: 'application/json' } }
    );
    const body = await response.json();

    expect(body.length).toBeGreaterThan(0);
    expect(body[0].customerId).toBe(customerId);
    expect(body[0].type).toBe('CHECKING');
    expect(response.status()).toBe(200);
    
});