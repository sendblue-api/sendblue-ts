// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import SendblueAPI from 'sendblue';

const client = new SendblueAPI({
  apiKey: 'My API Key',
  apiSecret: 'My API Secret',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource lines', () => {
  // Mock server tests are disabled
  test.skip('getContactStatus: only required params', async () => {
    const responsePromise = client.lines.getContactStatus({
      number: 'number',
      sendblue_number: 'sendblue_number',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('getContactStatus: required and optional params', async () => {
    const response = await client.lines.getContactStatus({
      number: 'number',
      sendblue_number: 'sendblue_number',
    });
  });

  // Mock server tests are disabled
  test.skip('getUsage', async () => {
    const responsePromise = client.lines.getUsage();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('getState', async () => {
    const responsePromise = client.lines.getState();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });
});
