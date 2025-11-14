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
  httpPath: '/api/modify-group',
  operationId: 'modifyGroup',
};

export const tool: Tool = {
  name: 'modify_groups',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nAdd or manage participants in a group chat (beta feature)\n\n# Response Schema\n```json\n{\n  $ref: '#/$defs/group_modify_response',\n  $defs: {\n    group_modify_response: {\n      type: 'object',\n      properties: {\n        message: {\n          type: 'string'\n        },\n        status: {\n          type: 'string'\n        }\n      }\n    }\n  }\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      group_id: {
        type: 'string',
        description: 'Group identifier',
      },
      modify_type: {
        type: 'string',
        description: 'Type of modification to perform',
        enum: ['add_recipient'],
      },
      number: {
        type: 'string',
        description: 'Phone number to add/modify in E.164 format',
      },
      jq_filter: {
        type: 'string',
        title: 'jq Filter',
        description:
          'A jq filter to apply to the response to include certain fields. Consult the output schema in the tool description to see the fields that are available.\n\nFor example: to include only the `name` field in every object of a results array, you can provide ".results[].name".\n\nFor more information, see the [jq documentation](https://jqlang.org/manual/).',
      },
    },
    required: ['group_id', 'modify_type', 'number'],
  },
  annotations: {},
};

export const handler = async (client: SendblueAPI, args: Record<string, unknown> | undefined) => {
  const { jq_filter, ...body } = args as any;
  try {
    return asTextContentResult(await maybeFilter(jq_filter, await client.groups.modify(body)));
  } catch (error) {
    if (isJqError(error)) {
      return asErrorResult(error.message);
    }
    throw error;
  }
};

export default { metadata, tool, handler };
