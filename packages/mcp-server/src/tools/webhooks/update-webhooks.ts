// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asErrorResult, asTextContentResult } from 'sendblue-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import SendblueAPI from 'sendblue';

export const metadata: Metadata = {
  resource: 'webhooks',
  operation: 'write',
  tags: [],
  httpMethod: 'put',
  httpPath: '/api/v2/account/webhooks',
  operationId: 'replaceWebhooks',
};

export const tool: Tool = {
  name: 'update_webhooks',
  description:
    'Replace all webhooks for your account. This endpoint completely replaces the existing webhook configuration.',
  inputSchema: {
    type: 'object',
    properties: {
      webhooks: {
        $ref: '#/$defs/webhook_configuration',
      },
    },
    required: ['webhooks'],
    $defs: {
      webhook_configuration: {
        type: 'object',
        properties: {
          call_log: {
            type: 'array',
            description: 'Webhooks for call logs',
            items: {
              anyOf: [
                {
                  type: 'string',
                  description: 'Simple webhook URL (HTTPS only)',
                },
                {
                  type: 'object',
                  properties: {
                    url: {
                      type: 'string',
                      description: 'Webhook URL (HTTPS only)',
                    },
                    secret: {
                      type: 'string',
                      description: 'Secret for webhook verification',
                    },
                  },
                  required: ['url'],
                },
              ],
              description: 'Simple webhook URL (HTTPS only)',
            },
          },
          contact_created: {
            type: 'array',
            description: 'Webhooks for contact creation (URL strings only)',
            items: {
              type: 'string',
            },
          },
          globalSecret: {
            type: 'string',
            description: 'Global secret applied to all webhooks',
          },
          line_assigned: {
            type: 'array',
            description: 'Webhooks for line assignment',
            items: {
              anyOf: [
                {
                  type: 'string',
                  description: 'Simple webhook URL (HTTPS only)',
                },
                {
                  type: 'object',
                  properties: {
                    url: {
                      type: 'string',
                      description: 'Webhook URL (HTTPS only)',
                    },
                    secret: {
                      type: 'string',
                      description: 'Secret for webhook verification',
                    },
                  },
                  required: ['url'],
                },
              ],
              description: 'Simple webhook URL (HTTPS only)',
            },
          },
          line_blocked: {
            type: 'array',
            description: 'Webhooks for blocked lines',
            items: {
              anyOf: [
                {
                  type: 'string',
                  description: 'Simple webhook URL (HTTPS only)',
                },
                {
                  type: 'object',
                  properties: {
                    url: {
                      type: 'string',
                      description: 'Webhook URL (HTTPS only)',
                    },
                    secret: {
                      type: 'string',
                      description: 'Secret for webhook verification',
                    },
                  },
                  required: ['url'],
                },
              ],
              description: 'Simple webhook URL (HTTPS only)',
            },
          },
          outbound: {
            type: 'array',
            description: 'Webhooks for outbound messages',
            items: {
              anyOf: [
                {
                  type: 'string',
                  description: 'Simple webhook URL (HTTPS only)',
                },
                {
                  type: 'object',
                  properties: {
                    url: {
                      type: 'string',
                      description: 'Webhook URL (HTTPS only)',
                    },
                    secret: {
                      type: 'string',
                      description: 'Secret for webhook verification',
                    },
                  },
                  required: ['url'],
                },
              ],
              description: 'Simple webhook URL (HTTPS only)',
            },
          },
          receive: {
            type: 'array',
            description: 'Webhooks for inbound messages',
            items: {
              anyOf: [
                {
                  type: 'string',
                  description: 'Simple webhook URL (HTTPS only)',
                },
                {
                  type: 'object',
                  properties: {
                    url: {
                      type: 'string',
                      description: 'Webhook URL (HTTPS only)',
                    },
                    secret: {
                      type: 'string',
                      description: 'Secret for webhook verification',
                    },
                  },
                  required: ['url'],
                },
              ],
              description: 'Simple webhook URL (HTTPS only)',
            },
          },
          secret: {
            type: 'string',
            description: 'Legacy secret field',
          },
        },
      },
    },
  },
  annotations: {
    idempotentHint: true,
  },
};

export const handler = async (client: SendblueAPI, args: Record<string, unknown> | undefined) => {
  const body = args as any;
  try {
    return asTextContentResult(await client.webhooks.update(body));
  } catch (error) {
    if (error instanceof SendblueAPI.APIError) {
      return asErrorResult(error.message);
    }
    throw error;
  }
};

export default { metadata, tool, handler };
