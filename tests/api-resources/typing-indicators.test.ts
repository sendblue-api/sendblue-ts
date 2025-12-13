// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import SendblueAPI from 'sendblue';

const client = new SendblueAPI({
  apiKey: 'My API Key',
  apiSecret: 'My API Secret',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource typingIndicators', () => {
  // Prism tests are disabled
  test.skip('send: only required params', async () => {
    const responsePromise = client.typingIndicators.send({
      from_number: '+16292925296',
      number: '+19998887777',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('send: required and optional params', async () => {
    const response = await client.typingIndicators.send({
      from_number: '+16292925296',
      number: '+19998887777',
    });
  });
});
