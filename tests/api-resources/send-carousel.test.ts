// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import SendblueAPI from 'sendblue';

const client = new SendblueAPI({
  apiKey: 'My API Key',
  apiSecret: 'My API Secret',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource sendCarousel', () => {
  // Mock server tests are disabled
  test.skip('send: only required params', async () => {
    const responsePromise = client.sendCarousel.send({
      from_number: '+19998887777',
      media_urls: [
        'https://example.com/image1.jpg',
        'https://example.com/image2.jpg',
        'https://example.com/image3.jpg',
      ],
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

  // Mock server tests are disabled
  test.skip('send: required and optional params', async () => {
    const response = await client.sendCarousel.send({
      from_number: '+19998887777',
      media_urls: [
        'https://example.com/image1.jpg',
        'https://example.com/image2.jpg',
        'https://example.com/image3.jpg',
      ],
      number: '+19998887777',
      metadata: {},
      send_style: 'celebration',
      status_callback: 'https://example.com/webhook',
    });
  });
});
