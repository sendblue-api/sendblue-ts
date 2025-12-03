// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { isJqError, maybeFilter } from 'sendblue-mcp/filtering';
import { Metadata, asErrorResult, asTextContentResult } from 'sendblue-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import SendblueAPI from 'sendblue';

export const metadata: Metadata = {
  resource: 'contacts.bulk',
  operation: 'write',
  tags: [],
  httpMethod: 'delete',
  httpPath: '/api/v2/contacts',
  operationId: 'deleteContacts',
};

export const tool: Tool = {
  name: 'delete_contacts_bulk',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nDelete multiple contacts by their IDs\n\n# Response Schema\n```json\n{\n  $ref: '#/$defs/bulk_delete_response',\n  $defs: {\n    bulk_delete_response: {\n      type: 'object',\n      properties: {\n        amount: {\n          type: 'integer',\n          description: 'Number of contacts deleted'\n        },\n        status: {\n          type: 'string'\n        }\n      }\n    }\n  }\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      contact_ids: {
        type: 'array',
        description: 'Array of phone numbers in E.164 format to delete',
        items: {
          type: 'string',
        },
      },
      jq_filter: {
        type: 'string',
        title: 'jq Filter',
        description:
          'A jq filter to apply to the response to include certain fields. Consult the output schema in the tool description to see the fields that are available.\n\nFor example: to include only the `name` field in every object of a results array, you can provide ".results[].name".\n\nFor more information, see the [jq documentation](https://jqlang.org/manual/).',
      },
    },
    required: ['contact_ids'],
  },
  annotations: {
    idempotentHint: true,
  },
};

export const handler = async (client: SendblueAPI, args: Record<string, unknown> | undefined) => {
  const { jq_filter, ...body } = args as any;
  try {
    return asTextContentResult(await maybeFilter(jq_filter, await client.contacts.bulk.delete(body)));
  } catch (error) {
    if (error instanceof SendblueAPI.APIError || isJqError(error)) {
      return asErrorResult(error.message);
    }
    throw error;
  }
};

export default { metadata, tool, handler };
