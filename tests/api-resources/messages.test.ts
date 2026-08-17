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
    const responsePromise = client.messages.send({ from_number: '+19998887777', number: '+19998887777' });
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
      from_number: '+19998887777',
      number: '+19998887777',
      app_card: {
        appName: 'My App',
        extensionBundleId: 'com.example.myapp.MessagesExtension',
        layout: {
          caption: 'Check this out',
          imageSubtitle: 'imageSubtitle',
          imageTitle: 'imageTitle',
          imageUrl: 'https://example.com',
          subcaption: 'Tap to open',
          summary: 'summary',
          trailingCaption: 'trailingCaption',
          trailingSubcaption: 'trailingSubcaption',
        },
        teamId: 'ABCDE12345',
        url: 'https://example.com/deep-link',
        appStoreId: 1234567890,
        fallbackText: 'fallbackText',
        interactive: true,
        sessionIdentifier: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
      },
      content: 'Hello, World!',
      media_url: 'https://example.com/image.jpg',
      reply_to: { message_handle: 'msg_parent123', part_index: 0 },
      seat_id: '550e8400-e29b-41d4-a716-446655440000',
      send_style: 'celebration',
      status_callback: 'https://example.com/webhook',
    });
  });

  // Mock server tests are disabled
  test.skip('updateAppCard', async () => {
    const responsePromise = client.messages.updateAppCard('message_handle', {});
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });
});
