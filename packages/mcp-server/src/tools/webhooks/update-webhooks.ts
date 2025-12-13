// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { isJqError, maybeFilter } from 'sendblue-mcp/filtering';
import { Metadata, asErrorResult, asTextContentResult } from 'sendblue-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import SendblueAPI from 'sendblue';

export const metadata: Metadata = {
  resource: 'webhooks',
  operation: 'write',
  tags: [],
  httpMethod: 'put',
  httpPath: '/api/account/webhooks',
  operationId: 'replaceWebhooks',
};

export const tool: Tool = {
  name: 'update_webhooks',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nReplace all webhooks for the account. This overwrites existing webhooks.\n\n# Response Schema\n```json\n{\n  $ref: '#/$defs/webhook_update_response',\n  $defs: {\n    webhook_update_response: {\n      type: 'object',\n      properties: {\n        message: {\n          type: 'string'\n        },\n        status: {\n          type: 'string'\n        },\n        webhooks: {\n          type: 'object',\n          properties: {\n            call_log: {\n              type: 'array',\n              description: 'Webhooks for call log events',\n              items: {\n                anyOf: [                  {\n                    type: 'string'\n                  },\n                  {\n                    $ref: '#/$defs/webhook_configuration'\n                  }\n                ]\n              }\n            },\n            contact_created: {\n              type: 'array',\n              description: 'Webhooks for contact created events',\n              items: {\n                type: 'string'\n              }\n            },\n            globalSecret: {\n              type: 'string',\n              description: 'Global secret applied to all webhooks'\n            },\n            line_assigned: {\n              type: 'array',\n              description: 'Webhooks for line assigned events',\n              items: {\n                anyOf: [                  {\n                    type: 'string'\n                  },\n                  {\n                    $ref: '#/$defs/webhook_configuration'\n                  }\n                ]\n              }\n            },\n            line_blocked: {\n              type: 'array',\n              description: 'Webhooks for line blocked events',\n              items: {\n                anyOf: [                  {\n                    type: 'string'\n                  },\n                  {\n                    $ref: '#/$defs/webhook_configuration'\n                  }\n                ]\n              }\n            },\n            outbound: {\n              type: 'array',\n              description: 'Webhooks for outbound message events',\n              items: {\n                anyOf: [                  {\n                    type: 'string'\n                  },\n                  {\n                    $ref: '#/$defs/webhook_configuration'\n                  }\n                ]\n              }\n            },\n            receive: {\n              type: 'array',\n              description: 'Webhooks for inbound message events',\n              items: {\n                anyOf: [                  {\n                    type: 'string'\n                  },\n                  {\n                    $ref: '#/$defs/webhook_configuration'\n                  }\n                ]\n              }\n            }\n          }\n        }\n      }\n    },\n    webhook_configuration: {\n      type: 'object',\n      properties: {\n        url: {\n          type: 'string',\n          description: 'Webhook endpoint URL for receiving callbacks'\n        },\n        secret: {\n          type: 'string',\n          description: 'Secret for webhook signature verification'\n        }\n      },\n      required: [        'url'\n      ]\n    }\n  }\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      webhooks: {
        type: 'object',
        properties: {
          call_log: {
            type: 'array',
            description: 'Webhooks for call log events',
            items: {
              anyOf: [
                {
                  type: 'string',
                },
                {
                  $ref: '#/$defs/webhook_configuration',
                },
              ],
            },
          },
          contact_created: {
            type: 'array',
            description: 'Webhooks for contact created events',
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
            description: 'Webhooks for line assigned events',
            items: {
              anyOf: [
                {
                  type: 'string',
                },
                {
                  $ref: '#/$defs/webhook_configuration',
                },
              ],
            },
          },
          line_blocked: {
            type: 'array',
            description: 'Webhooks for line blocked events',
            items: {
              anyOf: [
                {
                  type: 'string',
                },
                {
                  $ref: '#/$defs/webhook_configuration',
                },
              ],
            },
          },
          outbound: {
            type: 'array',
            description: 'Webhooks for outbound message events',
            items: {
              anyOf: [
                {
                  type: 'string',
                },
                {
                  $ref: '#/$defs/webhook_configuration',
                },
              ],
            },
          },
          receive: {
            type: 'array',
            description: 'Webhooks for inbound message events',
            items: {
              anyOf: [
                {
                  type: 'string',
                },
                {
                  $ref: '#/$defs/webhook_configuration',
                },
              ],
            },
          },
        },
      },
      jq_filter: {
        type: 'string',
        title: 'jq Filter',
        description:
          'A jq filter to apply to the response to include certain fields. Consult the output schema in the tool description to see the fields that are available.\n\nFor example: to include only the `name` field in every object of a results array, you can provide ".results[].name".\n\nFor more information, see the [jq documentation](https://jqlang.org/manual/).',
      },
    },
    required: ['webhooks'],
    $defs: {
      webhook_configuration: {
        type: 'object',
        properties: {
          url: {
            type: 'string',
            description: 'Webhook endpoint URL for receiving callbacks',
          },
          secret: {
            type: 'string',
            description: 'Secret for webhook signature verification',
          },
        },
        required: ['url'],
      },
    },
  },
  annotations: {
    idempotentHint: true,
  },
};

export const handler = async (client: SendblueAPI, args: Record<string, unknown> | undefined) => {
  const { jq_filter, ...body } = args as any;
  try {
    return asTextContentResult(await maybeFilter(jq_filter, await client.webhooks.update(body)));
  } catch (error) {
    if (error instanceof SendblueAPI.APIError || isJqError(error)) {
      return asErrorResult(error.message);
    }
    throw error;
  }
};

export default { metadata, tool, handler };
