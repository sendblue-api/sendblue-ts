// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { isJqError, maybeFilter } from 'sendblue-mcp/filtering';
import { Metadata, asErrorResult, asTextContentResult } from 'sendblue-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import SendblueAPI from 'sendblue';

export const metadata: Metadata = {
  resource: 'webhooks',
  operation: 'write',
  tags: [],
  httpMethod: 'post',
  httpPath: '/api/v2/account/webhooks',
  operationId: 'addWebhooks',
};

export const tool: Tool = {
  name: 'create_webhooks',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nAdd new webhooks to your account. This endpoint appends webhooks to the existing list.\n\n# Response Schema\n```json\n{\n  $ref: '#/$defs/webhook_create_response',\n  $defs: {\n    webhook_create_response: {\n      type: 'object',\n      properties: {\n        status: {\n          type: 'string',\n          enum: [            'OK',\n            'ERROR'\n          ]\n        },\n        message: {\n          type: 'string'\n        },\n        webhooks: {\n          $ref: '#/$defs/webhook_configuration'\n        }\n      },\n      required: [        'status'\n      ]\n    },\n    webhook_configuration: {\n      type: 'object',\n      properties: {\n        call_log: {\n          type: 'array',\n          description: 'Webhooks for call logs',\n          items: {\n            anyOf: [              {\n                type: 'string',\n                description: 'Simple webhook URL (HTTPS only)'\n              },\n              {\n                type: 'object',\n                properties: {\n                  url: {\n                    type: 'string',\n                    description: 'Webhook URL (HTTPS only)'\n                  },\n                  secret: {\n                    type: 'string',\n                    description: 'Secret for webhook verification'\n                  }\n                },\n                required: [                  'url'\n                ]\n              }\n            ],\n            description: 'Simple webhook URL (HTTPS only)'\n          }\n        },\n        contact_created: {\n          type: 'array',\n          description: 'Webhooks for contact creation (URL strings only)',\n          items: {\n            type: 'string'\n          }\n        },\n        globalSecret: {\n          type: 'string',\n          description: 'Global secret applied to all webhooks'\n        },\n        line_assigned: {\n          type: 'array',\n          description: 'Webhooks for line assignment',\n          items: {\n            anyOf: [              {\n                type: 'string',\n                description: 'Simple webhook URL (HTTPS only)'\n              },\n              {\n                type: 'object',\n                properties: {\n                  url: {\n                    type: 'string',\n                    description: 'Webhook URL (HTTPS only)'\n                  },\n                  secret: {\n                    type: 'string',\n                    description: 'Secret for webhook verification'\n                  }\n                },\n                required: [                  'url'\n                ]\n              }\n            ],\n            description: 'Simple webhook URL (HTTPS only)'\n          }\n        },\n        line_blocked: {\n          type: 'array',\n          description: 'Webhooks for blocked lines',\n          items: {\n            anyOf: [              {\n                type: 'string',\n                description: 'Simple webhook URL (HTTPS only)'\n              },\n              {\n                type: 'object',\n                properties: {\n                  url: {\n                    type: 'string',\n                    description: 'Webhook URL (HTTPS only)'\n                  },\n                  secret: {\n                    type: 'string',\n                    description: 'Secret for webhook verification'\n                  }\n                },\n                required: [                  'url'\n                ]\n              }\n            ],\n            description: 'Simple webhook URL (HTTPS only)'\n          }\n        },\n        outbound: {\n          type: 'array',\n          description: 'Webhooks for outbound messages',\n          items: {\n            anyOf: [              {\n                type: 'string',\n                description: 'Simple webhook URL (HTTPS only)'\n              },\n              {\n                type: 'object',\n                properties: {\n                  url: {\n                    type: 'string',\n                    description: 'Webhook URL (HTTPS only)'\n                  },\n                  secret: {\n                    type: 'string',\n                    description: 'Secret for webhook verification'\n                  }\n                },\n                required: [                  'url'\n                ]\n              }\n            ],\n            description: 'Simple webhook URL (HTTPS only)'\n          }\n        },\n        receive: {\n          type: 'array',\n          description: 'Webhooks for inbound messages',\n          items: {\n            anyOf: [              {\n                type: 'string',\n                description: 'Simple webhook URL (HTTPS only)'\n              },\n              {\n                type: 'object',\n                properties: {\n                  url: {\n                    type: 'string',\n                    description: 'Webhook URL (HTTPS only)'\n                  },\n                  secret: {\n                    type: 'string',\n                    description: 'Secret for webhook verification'\n                  }\n                },\n                required: [                  'url'\n                ]\n              }\n            ],\n            description: 'Simple webhook URL (HTTPS only)'\n          }\n        },\n        secret: {\n          type: 'string',\n          description: 'Legacy secret field'\n        }\n      }\n    }\n  }\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      webhooks: {
        type: 'array',
        description: 'Array of webhook URLs or webhook objects to add',
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
      globalSecret: {
        type: 'string',
        description: 'Optional global secret to apply to all webhooks',
      },
      type: {
        type: 'string',
        description: "Webhook type (default to 'receive')",
        enum: ['receive', 'call_log', 'line_blocked', 'line_assigned', 'outbound', 'contact_created'],
      },
      jq_filter: {
        type: 'string',
        title: 'jq Filter',
        description:
          'A jq filter to apply to the response to include certain fields. Consult the output schema in the tool description to see the fields that are available.\n\nFor example: to include only the `name` field in every object of a results array, you can provide ".results[].name".\n\nFor more information, see the [jq documentation](https://jqlang.org/manual/).',
      },
    },
    required: ['webhooks'],
  },
  annotations: {},
};

export const handler = async (client: SendblueAPI, args: Record<string, unknown> | undefined) => {
  const { jq_filter, ...body } = args as any;
  try {
    return asTextContentResult(await maybeFilter(jq_filter, await client.webhooks.create(body)));
  } catch (error) {
    if (error instanceof SendblueAPI.APIError || isJqError(error)) {
      return asErrorResult(error.message);
    }
    throw error;
  }
};

export default { metadata, tool, handler };
