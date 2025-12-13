// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { isJqError, maybeFilter } from 'sendblue-mcp/filtering';
import { Metadata, asErrorResult, asTextContentResult } from 'sendblue-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import SendblueAPI from 'sendblue';

export const metadata: Metadata = {
  resource: 'contacts',
  operation: 'write',
  tags: [],
  httpMethod: 'post',
  httpPath: '/api/v2/contacts',
  operationId: 'createContact',
};

export const tool: Tool = {
  name: 'create_contacts',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nCreate a new contact or update existing if update_if_exists is true\n\n# Response Schema\n```json\n{\n  $ref: '#/$defs/contact_create_response',\n  $defs: {\n    contact_create_response: {\n      type: 'object',\n      properties: {\n        contact: {\n          $ref: '#/$defs/contact'\n        },\n        status: {\n          type: 'string'\n        }\n      }\n    },\n    contact: {\n      type: 'object',\n      properties: {\n        assigned_to_email: {\n          type: 'string',\n          description: 'Email of assigned user'\n        },\n        company_name: {\n          type: 'string',\n          description: 'Company name'\n        },\n        created_at: {\n          type: 'string',\n          description: 'When the contact was created',\n          format: 'date-time'\n        },\n        first_name: {\n          type: 'string',\n          description: 'First name'\n        },\n        last_name: {\n          type: 'string',\n          description: 'Last name'\n        },\n        phone: {\n          type: 'string',\n          description: 'Phone number in E.164 format'\n        },\n        sendblue_number: {\n          type: 'string',\n          description: 'Associated Sendblue phone number'\n        },\n        tags: {\n          type: 'array',\n          description: 'Tags associated with the contact',\n          items: {\n            type: 'string'\n          }\n        },\n        verified: {\n          type: 'boolean',\n          description: 'Whether the contact is verified'\n        }\n      }\n    }\n  }\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      number: {
        type: 'string',
        description: "Contact's phone number in E.164 format (preferred)",
      },
      assigned_to_email: {
        type: 'string',
        description: 'Email of assigned user (preferred)',
      },
      assignedToEmail: {
        type: 'string',
        description: 'Email of assigned user (deprecated, use assigned_to_email)',
      },
      first_name: {
        type: 'string',
        description: "Contact's first name (preferred)",
      },
      firstName: {
        type: 'string',
        description: "Contact's first name (deprecated, use first_name)",
      },
      last_name: {
        type: 'string',
        description: "Contact's last name (preferred)",
      },
      lastName: {
        type: 'string',
        description: "Contact's last name (deprecated, use last_name)",
      },
      phone_number: {
        type: 'string',
        description: "Contact's phone number (deprecated, use number)",
      },
      phoneNumber: {
        type: 'string',
        description: "Contact's phone number (deprecated, use number)",
      },
      sendblue_number: {
        type: 'string',
        description: 'Associated Sendblue phone number to send with (preferred)',
      },
      sendblueNumber: {
        type: 'string',
        description: 'Associated Sendblue phone number (deprecated, use sendblue_number)',
      },
      tags: {
        type: 'array',
        description: 'Tags for the contact',
        items: {
          type: 'string',
        },
      },
      update_if_exists: {
        type: 'boolean',
        description: 'If true, updates the contact if it already exists',
      },
      jq_filter: {
        type: 'string',
        title: 'jq Filter',
        description:
          'A jq filter to apply to the response to include certain fields. Consult the output schema in the tool description to see the fields that are available.\n\nFor example: to include only the `name` field in every object of a results array, you can provide ".results[].name".\n\nFor more information, see the [jq documentation](https://jqlang.org/manual/).',
      },
    },
    required: ['number'],
  },
  annotations: {},
};

export const handler = async (client: SendblueAPI, args: Record<string, unknown> | undefined) => {
  const { jq_filter, ...body } = args as any;
  try {
    return asTextContentResult(await maybeFilter(jq_filter, await client.contacts.create(body)));
  } catch (error) {
    if (error instanceof SendblueAPI.APIError || isJqError(error)) {
      return asErrorResult(error.message);
    }
    throw error;
  }
};

export default { metadata, tool, handler };
