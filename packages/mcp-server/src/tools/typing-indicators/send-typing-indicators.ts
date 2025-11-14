// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { isJqError, maybeFilter } from 'sendblue-mcp/filtering';
import { Metadata, asErrorResult, asTextContentResult } from 'sendblue-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import SendblueAPI from 'sendblue';

export const metadata: Metadata = {
  resource: 'typing_indicators',
  operation: 'write',
  tags: [],
  httpMethod: 'post',
  httpPath: '/api/send-typing-indicator',
  operationId: 'sendTypingIndicator',
};

export const tool: Tool = {
  name: 'send_typing_indicators',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nSend an indication that you are typing to a user. This shows up as the animated three dots on the recipient's device. Only available for existing chats and not supported in group chats.\n\n\n# Response Schema\n```json\n{\n  $ref: '#/$defs/typing_indicator_send_response',\n  $defs: {\n    typing_indicator_send_response: {\n      type: 'object',\n      properties: {\n        error_message: {\n          type: 'string',\n          description: 'The error message if the status is ERROR'\n        },\n        number: {\n          type: 'string',\n          description: 'The number you evaluated in E.164 format'\n        },\n        status: {\n          type: 'string',\n          description: 'The status of the typing indicator you tried to send',\n          enum: [            'SENT',\n            'ERROR'\n          ]\n        }\n      }\n    }\n  }\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      number: {
        type: 'string',
        description: 'The number you want to send a typing indicator to (E.164 format)',
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
    return asTextContentResult(await maybeFilter(jq_filter, await client.typingIndicators.send(body)));
  } catch (error) {
    if (isJqError(error)) {
      return asErrorResult(error.message);
    }
    throw error;
  }
};

export default { metadata, tool, handler };
