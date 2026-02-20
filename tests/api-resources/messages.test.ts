// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import SendblueAPI from 'sendblue';

const client = new SendblueAPI({
  apiKey: 'My API Key',
  apiSecret: 'My API Secret',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource messages', () => {
  // Mock server tests are disabled
  test.skip('retrieve', async () => {
    const responsePromise = client.messages.retrieve('msg_abc123def456');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('list', async () => {
    const responsePromise = client.messages.list();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('list: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.messages.list(
        {
          account_email: 'user@example.com',
          created_at_gte: '2024-01-01T00:00:00Z',
          created_at_lte: '2024-01-31T23:59:59Z',
          from_number: '+19998887777',
          group_id: 'group_123456',
          is_outbound: 'true',
          limit: 1,
          message_type: 'message',
          number: '+19998887777',
          offset: 0,
          order_by: 'createdAt',
          order_direction: 'asc',
          sendblue_number: '+19998887777',
          sent_at_gte: '2024-01-01T00:00:00Z',
          sent_at_lte: '2024-01-31T23:59:59Z',
          service: 'iMessage',
          status: 'REGISTERED',
          to_number: '+18887776666',
          updated_at_gte: '2024-01-01T00:00:00Z',
          updated_at_lte: '2024-01-31T23:59:59Z',
          worker_id: 'worker_123',
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(SendblueAPI.NotFoundError);
  });

  // Mock server tests are disabled
  test.skip('getStatus: only required params', async () => {
    const responsePromise = client.messages.getStatus({ handle: 'msg_abc123def456' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('getStatus: required and optional params', async () => {
    const response = await client.messages.getStatus({ handle: 'msg_abc123def456' });
  });

  // Mock server tests are disabled
  test.skip('send: only required params', async () => {
    const responsePromise = client.messages.send({
      content: 'Hello, World!',
      from_number: '+19998887777',
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
    const response = await client.messages.send({
      content: 'Hello, World!',
      from_number: '+19998887777',
      number: '+19998887777',
      media_url: 'https://example.com/image.jpg',
      send_style: 'celebration',
      status_callback: 'https://example.com/webhook',
    });
  });
});
