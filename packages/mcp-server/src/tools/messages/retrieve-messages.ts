// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { maybeFilter } from 'sendblue-api-mcp/filtering';
import { Metadata, asTextContentResult } from 'sendblue-api-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import SendblueAPI from 'sendblue';

export const metadata: Metadata = {
  resource: 'messages',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/api/v2/messages/{message_id}',
  operationId: 'getMessageV2',
};

export const tool: Tool = {
  name: 'retrieve_messages',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nRetrieve details of a specific message by its ID\n\n# Response Schema\n```json\n{\n  type: 'object',\n  properties: {\n    data: {\n      type: 'object',\n      properties: {\n        accountEmail: {\n          type: 'string',\n          description: 'Email of the account'\n        },\n        content: {\n          type: 'string',\n          description: 'Message content'\n        },\n        date_sent: {\n          type: 'string',\n          description: 'When the message was sent',\n          format: 'date-time'\n        },\n        date_updated: {\n          type: 'string',\n          description: 'When the message was last updated',\n          format: 'date-time'\n        },\n        error_code: {\n          type: 'integer',\n          description: 'Numeric error code if message failed'\n        },\n        error_detail: {\n          type: 'string',\n          description: 'Detailed error information'\n        },\n        error_message: {\n          type: 'string',\n          description: 'Error message if message failed'\n        },\n        error_reason: {\n          type: 'string',\n          description: 'Error reason if message failed'\n        },\n        from_number: {\n          type: 'string',\n          description: 'Sender phone number'\n        },\n        group_display_name: {\n          type: 'string',\n          description: 'Display name for group messages'\n        },\n        group_id: {\n          type: 'string',\n          description: 'Group ID for group messages'\n        },\n        is_outbound: {\n          type: 'boolean',\n          description: 'Whether this is an outbound message'\n        },\n        media_url: {\n          type: 'string',\n          description: 'URL of attached media'\n        },\n        message_handle: {\n          type: 'string',\n          description: 'Unique message identifier'\n        },\n        message_type: {\n          type: 'string',\n          enum: [            'message',\n            'group'\n          ]\n        },\n        number: {\n          type: 'string',\n          description: 'Primary phone number (to_number for outbound, from_number for inbound)'\n        },\n        opted_out: {\n          type: 'boolean',\n          description: 'Whether the recipient has opted out'\n        },\n        participants: {\n          type: 'array',\n          description: 'List of participants for group messages',\n          items: {\n            type: 'string'\n          }\n        },\n        plan: {\n          type: 'string',\n          description: 'Account plan used for this message'\n        },\n        send_style: {\n          type: 'string',\n          description: 'The iMessage expressive message style',\n          enum: [            'celebration',\n            'shooting_star',\n            'fireworks',\n            'lasers',\n            'love',\n            'confetti',\n            'balloons',\n            'spotlight',\n            'echo',\n            'invisible',\n            'gentle',\n            'loud',\n            'slam'\n          ]\n        },\n        sendblue_number: {\n          type: 'string',\n          description: 'Sendblue phone number used'\n        },\n        service: {\n          type: 'string',\n          enum: [            'iMessage',\n            'SMS'\n          ]\n        },\n        status: {\n          type: 'string',\n          enum: [            'REGISTERED',\n            'PENDING',\n            'SENT',\n            'DELIVERED',\n            'RECEIVED',\n            'QUEUED',\n            'ERROR',\n            'DECLINED',\n            'ACCEPTED',\n            'SUCCESS'\n          ]\n        },\n        to_number: {\n          type: 'string',\n          description: 'Recipient phone number'\n        },\n        was_downgraded: {\n          type: 'boolean',\n          description: 'Whether the message was downgraded from iMessage to SMS'\n        }\n      }\n    },\n    status: {\n      type: 'string'\n    }\n  }\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      message_id: {
        type: 'string',
      },
      jq_filter: {
        type: 'string',
        title: 'jq Filter',
        description:
          'A jq filter to apply to the response to include certain fields. Consult the output schema in the tool description to see the fields that are available.\n\nFor example: to include only the `name` field in every object of a results array, you can provide ".results[].name".\n\nFor more information, see the [jq documentation](https://jqlang.org/manual/).',
      },
    },
    required: ['message_id'],
  },
  annotations: {
    readOnlyHint: true,
  },
};

export const handler = async (client: SendblueAPI, args: Record<string, unknown> | undefined) => {
  const { message_id, jq_filter, ...body } = args as any;
  return asTextContentResult(await maybeFilter(jq_filter, await client.messages.retrieve(message_id)));
};

export default { metadata, tool, handler };
