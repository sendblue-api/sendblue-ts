// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { isJqError, maybeFilter } from 'sendblue-mcp/filtering';
import { Metadata, asErrorResult, asTextContentResult } from 'sendblue-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import SendblueAPI from 'sendblue';

export const metadata: Metadata = {
  resource: 'webhooks',
  operation: 'write',
  tags: [],
  httpMethod: 'delete',
  httpPath: '/api/v2/account/webhooks',
  operationId: 'deleteWebhooks',
};

export const tool: Tool = {
  name: 'delete_webhooks',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nDelete specific webhooks from your account.\n\n# Response Schema\n```json\n{\n  $ref: '#/$defs/webhook_delete_response',\n  $defs: {\n    webhook_delete_response: {\n      type: 'object',\n      properties: {\n        status: {\n          type: 'string',\n          enum: [            'OK',\n            'ERROR'\n          ]\n        },\n        message: {\n          type: 'string'\n        }\n      },\n      required: [        'status'\n      ]\n    }\n  }\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      webhooks: {
        type: 'array',
        description: 'Array of webhook URLs to delete',
        items: {
          type: 'string',
        },
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
  annotations: {
    idempotentHint: true,
  },
};

export const handler = async (client: SendblueAPI, args: Record<string, unknown> | undefined) => {
  const { jq_filter, ...body } = args as any;
  try {
    return asTextContentResult(await maybeFilter(jq_filter, await client.webhooks.delete(body)));
  } catch (error) {
    if (error instanceof SendblueAPI.APIError || isJqError(error)) {
      return asErrorResult(error.message);
    }
    throw error;
  }
};

export default { metadata, tool, handler };
