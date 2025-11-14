// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { isJqError, maybeFilter } from 'sendblue-mcp/filtering';
import { Metadata, asErrorResult, asTextContentResult } from 'sendblue-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import SendblueAPI from 'sendblue';

export const metadata: Metadata = {
  resource: 'groups',
  operation: 'write',
  tags: [],
  httpMethod: 'post',
  httpPath: '/api/send-group-message',
  operationId: 'sendGroupMessage',
};

export const tool: Tool = {
  name: 'send_message_groups',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nSend a message to a group of recipients (beta feature)\n\n# Response Schema\n```json\n{\n  $ref: '#/$defs/message_response',\n  $defs: {\n    message_response: {\n      type: 'object',\n      properties: {\n        account_email: {\n          type: 'string',\n          description: 'Email of the account that sent the message'\n        },\n        content: {\n          type: 'string',\n          description: 'Message content'\n        },\n        date_created: {\n          type: 'string',\n          description: 'When the message was created',\n          format: 'date-time'\n        },\n        date_updated: {\n          type: 'string',\n          description: 'When the message was last updated',\n          format: 'date-time'\n        },\n        error_code: {\n          type: 'integer',\n          description: 'Numeric error code if message failed'\n        },\n        error_message: {\n          type: 'string',\n          description: 'Error message if message failed'\n        },\n        from_number: {\n          type: 'string',\n          description: 'Sending phone number'\n        },\n        is_outbound: {\n          type: 'boolean',\n          description: 'Whether this is an outbound message'\n        },\n        media_url: {\n          type: 'string',\n          description: 'URL of attached media'\n        },\n        message_handle: {\n          type: 'string',\n          description: 'Unique identifier for tracking the message'\n        },\n        number: {\n          type: 'string',\n          description: 'Recipient phone number'\n        },\n        send_style: {\n          type: 'string',\n          description: 'The iMessage expressive message style',\n          enum: [            'celebration',\n            'shooting_star',\n            'fireworks',\n            'lasers',\n            'love',\n            'confetti',\n            'balloons',\n            'spotlight',\n            'echo',\n            'invisible',\n            'gentle',\n            'loud',\n            'slam'\n          ]\n        },\n        status: {\n          type: 'string',\n          enum: [            'QUEUED',\n            'SENT',\n            'DELIVERED',\n            'READ',\n            'ERROR'\n          ]\n        }\n      }\n    }\n  }\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      content: {
        type: 'string',
        description: 'Message text content',
      },
      from_number: {
        type: 'string',
        description:
          '**REQUIRED** - The phone number to send from. Must be one of your registered Sendblue phone numbers in E.164 format.\nWithout this parameter, the message will fail to send.\n',
      },
      group_id: {
        type: 'string',
        description: 'Unique identifier for an existing group',
      },
      media_url: {
        type: 'string',
        description: 'URL of media file to send',
      },
      numbers: {
        type: 'array',
        description: 'Array of recipient phone numbers in E.164 format',
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
    required: ['content', 'from_number'],
  },
  annotations: {},
};

export const handler = async (client: SendblueAPI, args: Record<string, unknown> | undefined) => {
  const { jq_filter, ...body } = args as any;
  try {
    return asTextContentResult(await maybeFilter(jq_filter, await client.groups.sendMessage(body)));
  } catch (error) {
    if (isJqError(error)) {
      return asErrorResult(error.message);
    }
    throw error;
  }
};

export default { metadata, tool, handler };
