// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { maybeFilter } from 'sendblue-api-mcp/filtering';
import { Metadata, asTextContentResult } from 'sendblue-api-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import SendblueAPI from 'sendblue-api';

export const metadata: Metadata = {
  resource: 'media_objects',
  operation: 'write',
  tags: [],
  httpMethod: 'post',
  httpPath: '/api/upload-media-object',
  operationId: 'uploadMediaObject',
};

export const tool: Tool = {
  name: 'upload_media_objects',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nUpload a media file to Sendblue's CDN for use in messages\n\n# Response Schema\n```json\n{\n  type: 'object',\n  properties: {\n    mediaObjectId: {\n      type: 'string'\n    },\n    message: {\n      type: 'string'\n    },\n    status: {\n      type: 'string'\n    }\n  }\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      media_url: {
        type: 'string',
        description: 'URL of the media file to upload',
      },
      jq_filter: {
        type: 'string',
        title: 'jq Filter',
        description:
          'A jq filter to apply to the response to include certain fields. Consult the output schema in the tool description to see the fields that are available.\n\nFor example: to include only the `name` field in every object of a results array, you can provide ".results[].name".\n\nFor more information, see the [jq documentation](https://jqlang.org/manual/).',
      },
    },
    required: ['media_url'],
  },
  annotations: {},
};

export const handler = async (client: SendblueAPI, args: Record<string, unknown> | undefined) => {
  const body = args as any;
  return asTextContentResult(await maybeFilter(args, await client.mediaObjects.upload(body)));
};

export default { metadata, tool, handler };
