// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { maybeFilter } from 'sendblue-mcp/filtering';
import { Metadata, asTextContentResult } from 'sendblue-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import SendblueAPI from 'sendblue';

export const metadata: Metadata = {
  resource: 'lookups',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/api/evaluate-service',
  operationId: 'evaluateService',
};

export const tool: Tool = {
  name: 'lookup_number_lookups',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nDetermine if a phone number supports iMessage or SMS. Useful for checking if a number is an iPhone, if it is real, or which provider to use.\n\n\n# Response Schema\n```json\n{\n  type: 'object',\n  properties: {\n    number: {\n      type: 'string',\n      description: 'The number you evaluated in E.164 format'\n    },\n    service: {\n      type: 'string',\n      description: 'The service the number supports',\n      enum: [        'iMessage',\n        'SMS'\n      ]\n    }\n  }\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      number: {
        type: 'string',
        description: 'The number you want to evaluate in E.164 format',
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
  annotations: {
    readOnlyHint: true,
  },
};

export const handler = async (client: SendblueAPI, args: Record<string, unknown> | undefined) => {
  const { jq_filter, ...body } = args as any;
  return asTextContentResult(await maybeFilter(jq_filter, await client.lookups.lookupNumber(body)));
};

export default { metadata, tool, handler };
