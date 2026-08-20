// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import SendblueAPI from 'sendblue';

const client = new SendblueAPI({
  apiKey: 'My API Key',
  apiSecret: 'My API Secret',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource verifications', () => {
  // Mock server tests are disabled
  test.skip('create: only required params', async () => {
    const responsePromise = client.v2.groups.verify.services.verifications.create(
      'SVE1CB97d8EBbDbaAae6d9B1ca0D1cFaAD',
      { to: '+14155551212' },
    );
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
    const response = await client.v2.groups.verify.services.verifications.create(
      'SVE1CB97d8EBbDbaAae6d9B1ca0D1cFaAD',
      {
        to: '+14155551212',
        hosted: {
          parent_origin: 'https://app.example.com',
          accent_color: '#008BFF',
          brand_name: 'Acme',
          theme: 'light',
        },
      },
    );
  });

  // Mock server tests are disabled
  test.skip('retrieve: only required params', async () => {
    const responsePromise = client.v2.groups.verify.services.verifications.retrieve(
      'VRE1CB97d8EBbDbaAae6d9B1ca0D1cFaAD',
      { service_sid: 'SVE1CB97d8EBbDbaAae6d9B1ca0D1cFaAD' },
    );
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('retrieve: required and optional params', async () => {
    const response = await client.v2.groups.verify.services.verifications.retrieve(
      'VRE1CB97d8EBbDbaAae6d9B1ca0D1cFaAD',
      { service_sid: 'SVE1CB97d8EBbDbaAae6d9B1ca0D1cFaAD' },
    );
  });
});
