// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { isJqError, maybeFilter } from 'sendblue-mcp/filtering';
import { Metadata, asErrorResult, asTextContentResult } from 'sendblue-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import SendblueAPI from 'sendblue';

export const metadata: Metadata = {
  resource: 'contacts',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/api/v2/contacts',
  operationId: 'getContacts',
};

export const tool: Tool = {
  name: 'list_contacts',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nRetrieve a list of contacts for the authenticated account\n\n# Response Schema\n```json\n{\n  $ref: '#/$defs/contact_list_response',\n  $defs: {\n    contact_list_response: {\n      type: 'array',\n      items: {\n        $ref: '#/$defs/contact'\n      }\n    },\n    contact: {\n      type: 'object',\n      properties: {\n        assignedToEmail: {\n          type: 'string',\n          description: 'Email of assigned user'\n        },\n        companyName: {\n          type: 'string',\n          description: 'Company name'\n        },\n        created_at: {\n          type: 'string',\n          description: 'When the contact was created',\n          format: 'date-time'\n        },\n        firstName: {\n          type: 'string',\n          description: 'First name'\n        },\n        lastName: {\n          type: 'string',\n          description: 'Last name'\n        },\n        phone: {\n          type: 'string',\n          description: 'Phone number in E.164 format'\n        },\n        sendblueNumber: {\n          type: 'string',\n          description: 'Associated Sendblue phone number'\n        },\n        tags: {\n          type: 'array',\n          description: 'Tags associated with the contact',\n          items: {\n            type: 'string'\n          }\n        },\n        verified: {\n          type: 'boolean',\n          description: 'Whether the contact is verified'\n        }\n      }\n    }\n  }\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      jq_filter: {
        type: 'string',
        title: 'jq Filter',
        description:
          'A jq filter to apply to the response to include certain fields. Consult the output schema in the tool description to see the fields that are available.\n\nFor example: to include only the `name` field in every object of a results array, you can provide ".results[].name".\n\nFor more information, see the [jq documentation](https://jqlang.org/manual/).',
      },
    },
    required: [],
  },
  annotations: {
    readOnlyHint: true,
  },
};

export const handler = async (client: SendblueAPI, args: Record<string, unknown> | undefined) => {
  const { jq_filter } = args as any;
  try {
    return asTextContentResult(await maybeFilter(jq_filter, await client.contacts.list()));
  } catch (error) {
    if (isJqError(error)) {
      return asErrorResult(error.message);
    }
    throw error;
  }
};

export default { metadata, tool, handler };
