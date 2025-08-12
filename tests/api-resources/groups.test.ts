// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import SendblueAPI from 'sendblue';

const client = new SendblueAPI({
  apiKey: 'My API Key',
  apiSecret: 'My API Secret',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource groups', () => {
  // Prism tests are disabled
  test.skip('modify: only required params', async () => {
    const responsePromise = client.groups.modify({
      group_id: 'group_123456',
      modify_type: 'add_recipient',
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
  test.skip('modify: required and optional params', async () => {
    const response = await client.groups.modify({
      group_id: 'group_123456',
      modify_type: 'add_recipient',
      number: '+19998887777',
    });
  });

  // Prism tests are disabled
  test.skip('sendMessage: only required params', async () => {
    const responsePromise = client.groups.sendMessage({
      content: 'Hello, everyone!',
      from_number: '+19998887777',
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
  test.skip('sendMessage: required and optional params', async () => {
    const response = await client.groups.sendMessage({
      content: 'Hello, everyone!',
      from_number: '+19998887777',
      group_id: 'group_123456',
      media_url: 'https://example.com/image.jpg',
      numbers: ['+19998887777', '+18887776666'],
    });
  });
});
