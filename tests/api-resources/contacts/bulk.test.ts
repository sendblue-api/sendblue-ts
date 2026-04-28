// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import SendblueAPI from 'sendblue';

const client = new SendblueAPI({
  apiKey: 'My API Key',
  apiSecret: 'My API Secret',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource bulk', () => {
  // Mock server tests are disabled
  test.skip('create: only required params', async () => {
    const responsePromise = client.contacts.bulk.create({ contacts: [{ phone: 'phone' }] });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('create: required and optional params', async () => {
    const response = await client.contacts.bulk.create({
      contacts: [
        {
          phone: 'phone',
          company_name: 'company_name',
          custom_variables: { 'Lead Source': 'Website' },
          first_name: 'first_name',
          last_name: 'last_name',
          tags: ['string'],
        },
      ],
    });
  });

  // Mock server tests are disabled
  test.skip('delete: only required params', async () => {
    const responsePromise = client.contacts.bulk.delete({ contact_ids: ['+1234567890', '+0987654321'] });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('delete: required and optional params', async () => {
    const response = await client.contacts.bulk.delete({ contact_ids: ['+1234567890', '+0987654321'] });
  });
});
