// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import SendblueAPI from 'sendblue';

const client = new SendblueAPI({
  apiKey: 'My API Key',
  apiSecret: 'My API Secret',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource mediaObjects', () => {
  // Mock server tests are disabled
  test.skip('upload: only required params', async () => {
    const responsePromise = client.mediaObjects.upload({ media_url: 'https://example.com/image.jpg' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('upload: required and optional params', async () => {
    const response = await client.mediaObjects.upload({ media_url: 'https://example.com/image.jpg' });
  });
});
