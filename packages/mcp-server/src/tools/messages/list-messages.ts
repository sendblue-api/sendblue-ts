// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { maybeFilter } from 'sendblue-api-mcp/filtering';
import { Metadata, asTextContentResult } from 'sendblue-api-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import SendblueAPI from 'sendblue-api';

export const metadata: Metadata = {
  resource: 'messages',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/api/v2/messages',
  operationId: 'getMessagesV2',
};

export const tool: Tool = {
  name: 'list_messages',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nRetrieve a list of messages for the authenticated account with comprehensive filtering capabilities.\nRate limited to 100 requests per 10 seconds per account.\n\n\n# Response Schema\n```json\n{\n  type: 'object',\n  properties: {\n    data: {\n      type: 'array',\n      items: {\n        type: 'object',\n        properties: {\n          accountEmail: {\n            type: 'string',\n            description: 'Email of the account'\n          },\n          content: {\n            type: 'string',\n            description: 'Message content'\n          },\n          date_sent: {\n            type: 'string',\n            description: 'When the message was sent',\n            format: 'date-time'\n          },\n          date_updated: {\n            type: 'string',\n            description: 'When the message was last updated',\n            format: 'date-time'\n          },\n          error_code: {\n            type: 'integer',\n            description: 'Numeric error code if message failed'\n          },\n          error_detail: {\n            type: 'string',\n            description: 'Detailed error information'\n          },\n          error_message: {\n            type: 'string',\n            description: 'Error message if message failed'\n          },\n          error_reason: {\n            type: 'string',\n            description: 'Error reason if message failed'\n          },\n          from_number: {\n            type: 'string',\n            description: 'Sender phone number'\n          },\n          group_display_name: {\n            type: 'string',\n            description: 'Display name for group messages'\n          },\n          group_id: {\n            type: 'string',\n            description: 'Group ID for group messages'\n          },\n          is_outbound: {\n            type: 'boolean',\n            description: 'Whether this is an outbound message'\n          },\n          media_url: {\n            type: 'string',\n            description: 'URL of attached media'\n          },\n          message_handle: {\n            type: 'string',\n            description: 'Unique message identifier'\n          },\n          message_type: {\n            type: 'string',\n            enum: [              'message',\n              'group'\n            ]\n          },\n          number: {\n            type: 'string',\n            description: 'Primary phone number (to_number for outbound, from_number for inbound)'\n          },\n          opted_out: {\n            type: 'boolean',\n            description: 'Whether the recipient has opted out'\n          },\n          participants: {\n            type: 'array',\n            description: 'List of participants for group messages',\n            items: {\n              type: 'string'\n            }\n          },\n          plan: {\n            type: 'string',\n            description: 'Account plan used for this message'\n          },\n          send_style: {\n            type: 'string',\n            description: 'The iMessage expressive message style',\n            enum: [              'celebration',\n              'shooting_star',\n              'fireworks',\n              'lasers',\n              'love',\n              'confetti',\n              'balloons',\n              'spotlight',\n              'echo',\n              'invisible',\n              'gentle',\n              'loud',\n              'slam'\n            ]\n          },\n          sendblue_number: {\n            type: 'string',\n            description: 'Sendblue phone number used'\n          },\n          service: {\n            type: 'string',\n            enum: [              'iMessage',\n              'SMS'\n            ]\n          },\n          status: {\n            type: 'string',\n            enum: [              'REGISTERED',\n              'PENDING',\n              'SENT',\n              'DELIVERED',\n              'RECEIVED',\n              'QUEUED',\n              'ERROR',\n              'DECLINED',\n              'ACCEPTED',\n              'SUCCESS'\n            ]\n          },\n          to_number: {\n            type: 'string',\n            description: 'Recipient phone number'\n          },\n          was_downgraded: {\n            type: 'boolean',\n            description: 'Whether the message was downgraded from iMessage to SMS'\n          }\n        }\n      }\n    },\n    pagination: {\n      type: 'object',\n      properties: {\n        hasMore: {\n          type: 'boolean',\n          description: 'Whether there are more messages available'\n        },\n        limit: {\n          type: 'integer',\n          description: 'Number of messages returned in this request'\n        },\n        offset: {\n          type: 'integer',\n          description: 'Number of messages skipped'\n        },\n        total: {\n          type: 'integer',\n          description: 'Total number of messages matching the filters'\n        }\n      }\n    },\n    status: {\n      type: 'string'\n    }\n  }\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      account_email: {
        type: 'string',
        description: 'Filter by account email',
      },
      created_at_gte: {
        type: 'string',
        description: 'Filter messages created after this date (ISO 8601 format)',
        format: 'date-time',
      },
      created_at_lte: {
        type: 'string',
        description: 'Filter messages created before this date (ISO 8601 format)',
        format: 'date-time',
      },
      from_number: {
        type: 'string',
        description: 'Filter by sender phone number',
      },
      group_id: {
        type: 'string',
        description: 'Filter by group ID',
      },
      is_outbound: {
        type: 'string',
        description: 'Filter by message direction',
        enum: ['true', 'false'],
      },
      limit: {
        type: 'integer',
        description: 'Maximum number of messages to return',
      },
      message_type: {
        type: 'string',
        description: 'Filter by message type',
        enum: ['message', 'group'],
      },
      number: {
        type: 'string',
        description: 'Filter by any phone number (from or to)',
      },
      offset: {
        type: 'integer',
        description: 'Number of messages to skip',
      },
      order_by: {
        type: 'string',
        description: 'Field to order messages by',
        enum: ['createdAt', 'updatedAt', 'sentAt'],
      },
      order_direction: {
        type: 'string',
        description: 'Sort order',
        enum: ['asc', 'desc'],
      },
      sendblue_number: {
        type: 'string',
        description: 'Filter by Sendblue phone number',
      },
      sent_at_gte: {
        type: 'string',
        description: 'Filter messages sent after this date (ISO 8601 format)',
        format: 'date-time',
      },
      sent_at_lte: {
        type: 'string',
        description: 'Filter messages sent before this date (ISO 8601 format)',
        format: 'date-time',
      },
      service: {
        type: 'string',
        description: 'Filter by service type',
        enum: ['iMessage', 'SMS'],
      },
      status: {
        type: 'string',
        description: 'Filter by message status',
        enum: [
          'REGISTERED',
          'PENDING',
          'SENT',
          'DELIVERED',
          'RECEIVED',
          'QUEUED',
          'ERROR',
          'DECLINED',
          'ACCEPTED',
          'SUCCESS',
        ],
      },
      to_number: {
        type: 'string',
        description: 'Filter by recipient phone number',
      },
      updated_at_gte: {
        type: 'string',
        description: 'Filter messages updated after this date (ISO 8601 format)',
        format: 'date-time',
      },
      updated_at_lte: {
        type: 'string',
        description: 'Filter messages updated before this date (ISO 8601 format)',
        format: 'date-time',
      },
      worker_id: {
        type: 'string',
        description: 'Filter by worker ID (Admin only)',
      },
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
  const { jq_filter, ...body } = args as any;
  return asTextContentResult(await maybeFilter(jq_filter, await client.messages.list(body)));
};

export default { metadata, tool, handler };
