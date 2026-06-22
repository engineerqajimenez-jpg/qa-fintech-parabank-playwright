import { APIRequestContext } from '@playwright/test';

export async function getFirstAccountId(request: APIRequestContext): Promise<string> {
  const loginResponse = await request.get(
    'http://parabank.parasoft.com/parabank/services/bank/login/john/demo',
    { headers: { Accept: 'application/json' } }
  );
  const loginBody = await loginResponse.json();
  const customerId = loginBody.id;

  const accountsResponse = await request.get(
    `http://parabank.parasoft.com/parabank/services/bank/customers/${customerId}/accounts`,
    { headers: { Accept: 'application/json' } }
  );
  const accounts = await accountsResponse.json();

  return accounts[0].id.toString();
}

export async function getSecondAccountId(request: APIRequestContext): Promise<string> {
  const loginResponse = await request.get(
    'http://parabank.parasoft.com/parabank/services/bank/login/john/demo',
    { headers: { Accept: 'application/json' } }
  );
  const loginBody = await loginResponse.json();
  const customerId = loginBody.id;

  const accountsResponse = await request.get(
    `http://parabank.parasoft.com/parabank/services/bank/customers/${customerId}/accounts`,
    { headers: { Accept: 'application/json' } }
  );
  const accounts = await accountsResponse.json();

  return accounts[1].id.toString();
}