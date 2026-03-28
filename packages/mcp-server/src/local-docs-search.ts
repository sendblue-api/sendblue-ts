// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import MiniSearch from 'minisearch';
import * as fs from 'node:fs/promises';
import * as path from 'node:path';
import { getLogger } from './logger';

type MethodEntry = {
  name: string;
  endpoint: string;
  httpMethod: string;
  summary: string;
  description: string;
  stainlessPath: string;
  qualified: string;
  params?: string[];
  response?: string;
  markdown?: string;
};

type ProseChunk = {
  content: string;
  tag: string;
  sectionContext?: string;
  source?: string;
};

type MiniSearchDocument = {
  id: string;
  kind: 'http_method' | 'prose';
  name?: string;
  endpoint?: string;
  summary?: string;
  description?: string;
  qualified?: string;
  stainlessPath?: string;
  content?: string;
  sectionContext?: string;
  _original: Record<string, unknown>;
};

type SearchResult = {
  results: (string | Record<string, unknown>)[];
};

const EMBEDDED_METHODS: MethodEntry[] = [
  {
    name: 'retrieve',
    endpoint: '/api/v2/messages/{message_id}',
    httpMethod: 'get',
    summary: 'Get a specific message',
    description: 'Retrieve details of a specific message by its ID',
    stainlessPath: '(resource) messages > (method) retrieve',
    qualified: 'client.messages.retrieve',
    params: ['message_id: string;'],
    response:
      "{ data?: { accountEmail?: string; content?: string; date_sent?: string; date_updated?: string; error_code?: number; error_detail?: string; error_message?: string; error_reason?: string; from_number?: string; group_display_name?: string; group_id?: string; is_outbound?: boolean; media_url?: string; message_handle?: string; message_type?: 'message' | 'group'; number?: string; opted_out?: boolean; participants?: string[]; plan?: string; send_style?: string; sendblue_number?: string; service?: 'iMessage' | 'SMS' | 'RCS'; status?: string; to_number?: string; was_downgraded?: boolean; }; status?: string; }",
    markdown:
      "## retrieve\n\n`client.messages.retrieve(message_id: string): { data?: object; status?: string; }`\n\n**get** `/api/v2/messages/{message_id}`\n\nRetrieve details of a specific message by its ID\n\n### Parameters\n\n- `message_id: string`\n\n### Returns\n\n- `{ data?: { accountEmail?: string; content?: string; date_sent?: string; date_updated?: string; error_code?: number; error_detail?: string; error_message?: string; error_reason?: string; from_number?: string; group_display_name?: string; group_id?: string; is_outbound?: boolean; media_url?: string; message_handle?: string; message_type?: 'message' | 'group'; number?: string; opted_out?: boolean; participants?: string[]; plan?: string; send_style?: string; sendblue_number?: string; service?: 'iMessage' | 'SMS' | 'RCS'; status?: string; to_number?: string; was_downgraded?: boolean; }; status?: string; }`\n\n  - `data?: { accountEmail?: string; content?: string; date_sent?: string; date_updated?: string; error_code?: number; error_detail?: string; error_message?: string; error_reason?: string; from_number?: string; group_display_name?: string; group_id?: string; is_outbound?: boolean; media_url?: string; message_handle?: string; message_type?: 'message' | 'group'; number?: string; opted_out?: boolean; participants?: string[]; plan?: string; send_style?: string; sendblue_number?: string; service?: 'iMessage' | 'SMS' | 'RCS'; status?: string; to_number?: string; was_downgraded?: boolean; }`\n  - `status?: string`\n\n### Example\n\n```typescript\nimport SendblueAPI from 'sendblue';\n\nconst client = new SendblueAPI();\n\nconst message = await client.messages.retrieve('msg_abc123def456');\n\nconsole.log(message);\n```",
  },
  {
    name: 'list',
    endpoint: '/api/v2/messages',
    httpMethod: 'get',
    summary: 'Get messages',
    description:
      'Retrieve a list of messages for the authenticated account with comprehensive filtering capabilities.\nRate limited to 100 requests per 10 seconds per account.\n\n## Common Use Cases\n\n**Polling for inbound messages (no webhooks):**\n```\nGET /api/v2/messages?is_outbound=false&sendblue_number=+16292925296&order_by=createdAt&order_direction=desc&limit=50\n```\nTrack processed message IDs to avoid duplicates.\n\n**Get conversation with a specific contact:**\n```\nGET /api/v2/messages?number=+15551234567&order_by=createdAt&order_direction=desc\n```\n',
    stainlessPath: '(resource) messages > (method) list',
    qualified: 'client.messages.list',
    params: [
      'account_email?: string;',
      'created_at_gte?: string;',
      'created_at_lte?: string;',
      'from_number?: string;',
      'group_id?: string;',
      "is_outbound?: 'true' | 'false';",
      'limit?: number;',
      "message_type?: 'message' | 'group';",
      'number?: string;',
      'offset?: number;',
      "order_by?: 'createdAt' | 'updatedAt' | 'sentAt';",
      "order_direction?: 'asc' | 'desc';",
      'sendblue_number?: string;',
      'sent_at_gte?: string;',
      'sent_at_lte?: string;',
      "service?: 'iMessage' | 'SMS' | 'RCS';",
      'status?: string;',
      'to_number?: string;',
      'updated_at_gte?: string;',
      'updated_at_lte?: string;',
      'worker_id?: string;',
    ],
    response:
      "{ data?: { accountEmail?: string; content?: string; date_sent?: string; date_updated?: string; error_code?: number; error_detail?: string; error_message?: string; error_reason?: string; from_number?: string; group_display_name?: string; group_id?: string; is_outbound?: boolean; media_url?: string; message_handle?: string; message_type?: 'message' | 'group'; number?: string; opted_out?: boolean; participants?: string[]; plan?: string; send_style?: string; sendblue_number?: string; service?: 'iMessage' | 'SMS' | 'RCS'; status?: string; to_number?: string; was_downgraded?: boolean; }[]; pagination?: { hasMore?: boolean; limit?: number; offset?: number; total?: number; }; status?: string; }",
    markdown:
      "## list\n\n`client.messages.list(account_email?: string, created_at_gte?: string, created_at_lte?: string, from_number?: string, group_id?: string, is_outbound?: 'true' | 'false', limit?: number, message_type?: 'message' | 'group', number?: string, offset?: number, order_by?: 'createdAt' | 'updatedAt' | 'sentAt', order_direction?: 'asc' | 'desc', sendblue_number?: string, sent_at_gte?: string, sent_at_lte?: string, service?: 'iMessage' | 'SMS' | 'RCS', status?: string, to_number?: string, updated_at_gte?: string, updated_at_lte?: string, worker_id?: string): { data?: object[]; pagination?: object; status?: string; }`\n\n**get** `/api/v2/messages`\n\nRetrieve a list of messages for the authenticated account with comprehensive filtering capabilities.\nRate limited to 100 requests per 10 seconds per account.\n\n## Common Use Cases\n\n**Polling for inbound messages (no webhooks):**\n```\nGET /api/v2/messages?is_outbound=false&sendblue_number=+16292925296&order_by=createdAt&order_direction=desc&limit=50\n```\nTrack processed message IDs to avoid duplicates.\n\n**Get conversation with a specific contact:**\n```\nGET /api/v2/messages?number=+15551234567&order_by=createdAt&order_direction=desc\n```\n\n\n### Parameters\n\n- `account_email?: string`\n  Filter by account email\n\n- `created_at_gte?: string`\n  Filter messages created after this date (ISO 8601 format)\n\n- `created_at_lte?: string`\n  Filter messages created before this date (ISO 8601 format)\n\n- `from_number?: string`\n  Filter by sender phone number\n\n- `group_id?: string`\n  Filter by group ID\n\n- `is_outbound?: 'true' | 'false'`\n  Filter by message direction. Use `false` to get inbound messages (messages sent TO your Sendblue number).\n\n**To get inbound messages for polling:** Use `is_outbound=false` combined with `sendblue_number` or `to_number` set to your Sendblue phone number.\n\nNote: Do NOT use `message_type=inbound` - that parameter only accepts `message` or `group` values.\n\n- `limit?: number`\n  Maximum number of messages to return\n\n- `message_type?: 'message' | 'group'`\n  Filter by message type (1:1 vs group chat). Only accepts `message` or `group`.\n\n**Common mistake:** This is NOT for filtering inbound vs outbound messages. Use `is_outbound` parameter instead.\n\n- `number?: string`\n  Filter by any phone number (from or to)\n\n- `offset?: number`\n  Number of messages to skip\n\n- `order_by?: 'createdAt' | 'updatedAt' | 'sentAt'`\n  Field to order messages by\n\n- `order_direction?: 'asc' | 'desc'`\n  Sort order\n\n- `sendblue_number?: string`\n  Filter by Sendblue phone number\n\n- `sent_at_gte?: string`\n  Filter messages sent after this date (ISO 8601 format)\n\n- `sent_at_lte?: string`\n  Filter messages sent before this date (ISO 8601 format)\n\n- `service?: 'iMessage' | 'SMS' | 'RCS'`\n  Filter by service type\n\n- `status?: string`\n  Filter by message status\n\n- `to_number?: string`\n  Filter by recipient phone number\n\n- `updated_at_gte?: string`\n  Filter messages updated after this date (ISO 8601 format)\n\n- `updated_at_lte?: string`\n  Filter messages updated before this date (ISO 8601 format)\n\n- `worker_id?: string`\n  Filter by worker ID (Admin only)\n\n### Returns\n\n- `{ data?: { accountEmail?: string; content?: string; date_sent?: string; date_updated?: string; error_code?: number; error_detail?: string; error_message?: string; error_reason?: string; from_number?: string; group_display_name?: string; group_id?: string; is_outbound?: boolean; media_url?: string; message_handle?: string; message_type?: 'message' | 'group'; number?: string; opted_out?: boolean; participants?: string[]; plan?: string; send_style?: string; sendblue_number?: string; service?: 'iMessage' | 'SMS' | 'RCS'; status?: string; to_number?: string; was_downgraded?: boolean; }[]; pagination?: { hasMore?: boolean; limit?: number; offset?: number; total?: number; }; status?: string; }`\n\n  - `data?: { accountEmail?: string; content?: string; date_sent?: string; date_updated?: string; error_code?: number; error_detail?: string; error_message?: string; error_reason?: string; from_number?: string; group_display_name?: string; group_id?: string; is_outbound?: boolean; media_url?: string; message_handle?: string; message_type?: 'message' | 'group'; number?: string; opted_out?: boolean; participants?: string[]; plan?: string; send_style?: string; sendblue_number?: string; service?: 'iMessage' | 'SMS' | 'RCS'; status?: string; to_number?: string; was_downgraded?: boolean; }[]`\n  - `pagination?: { hasMore?: boolean; limit?: number; offset?: number; total?: number; }`\n  - `status?: string`\n\n### Example\n\n```typescript\nimport SendblueAPI from 'sendblue';\n\nconst client = new SendblueAPI();\n\nconst messages = await client.messages.list();\n\nconsole.log(messages);\n```",
  },
  {
    name: 'get_status',
    endpoint: '/api/status',
    httpMethod: 'get',
    summary: 'Get message status',
    description:
      'Retrieve the current status of a message using its message handle. Useful for resolving pending message statuses and avoiding duplicate messages.\n',
    stainlessPath: '(resource) messages > (method) get_status',
    qualified: 'client.messages.getStatus',
    params: ['handle: string;'],
    response:
      "{ account_email?: string; content?: string; date_created?: string; date_updated?: string; error_code?: number; error_message?: string; from_number?: string; is_outbound?: boolean; media_url?: string; message_handle?: string; number?: string; send_style?: string; status?: 'QUEUED' | 'SENT' | 'DELIVERED' | 'ERROR'; }",
    markdown:
      "## get_status\n\n`client.messages.getStatus(handle: string): { account_email?: string; content?: string; date_created?: string; date_updated?: string; error_code?: number; error_message?: string; from_number?: string; is_outbound?: boolean; media_url?: string; message_handle?: string; number?: string; send_style?: string; status?: 'QUEUED' | 'SENT' | 'DELIVERED' | 'ERROR'; }`\n\n**get** `/api/status`\n\nRetrieve the current status of a message using its message handle. Useful for resolving pending message statuses and avoiding duplicate messages.\n\n\n### Parameters\n\n- `handle: string`\n  The message handle of the message you want to check status for\n\n### Returns\n\n- `{ account_email?: string; content?: string; date_created?: string; date_updated?: string; error_code?: number; error_message?: string; from_number?: string; is_outbound?: boolean; media_url?: string; message_handle?: string; number?: string; send_style?: string; status?: 'QUEUED' | 'SENT' | 'DELIVERED' | 'ERROR'; }`\n\n  - `account_email?: string`\n  - `content?: string`\n  - `date_created?: string`\n  - `date_updated?: string`\n  - `error_code?: number`\n  - `error_message?: string`\n  - `from_number?: string`\n  - `is_outbound?: boolean`\n  - `media_url?: string`\n  - `message_handle?: string`\n  - `number?: string`\n  - `send_style?: string`\n  - `status?: 'QUEUED' | 'SENT' | 'DELIVERED' | 'ERROR'`\n\n### Example\n\n```typescript\nimport SendblueAPI from 'sendblue';\n\nconst client = new SendblueAPI();\n\nconst messageResponse = await client.messages.getStatus({ handle: 'msg_abc123def456' });\n\nconsole.log(messageResponse);\n```",
  },
  {
    name: 'send',
    endpoint: '/api/send-message',
    httpMethod: 'post',
    summary: 'Send a message',
    description: 'Send an iMessage, SMS, or MMS to a single recipient',
    stainlessPath: '(resource) messages > (method) send',
    qualified: 'client.messages.send',
    params: [
      'content: string;',
      'from_number: string;',
      'number: string;',
      'media_url?: string;',
      'send_style?: string;',
      'status_callback?: string;',
    ],
    response:
      "{ account_email?: string; content?: string; date_created?: string; date_updated?: string; error_code?: number; error_message?: string; from_number?: string; is_outbound?: boolean; media_url?: string; message_handle?: string; number?: string; send_style?: string; status?: 'QUEUED' | 'SENT' | 'DELIVERED' | 'ERROR'; }",
    markdown:
      "## send\n\n`client.messages.send(content: string, from_number: string, number: string, media_url?: string, send_style?: string, status_callback?: string): { account_email?: string; content?: string; date_created?: string; date_updated?: string; error_code?: number; error_message?: string; from_number?: string; is_outbound?: boolean; media_url?: string; message_handle?: string; number?: string; send_style?: string; status?: 'QUEUED' | 'SENT' | 'DELIVERED' | 'ERROR'; }`\n\n**post** `/api/send-message`\n\nSend an iMessage, SMS, or MMS to a single recipient\n\n### Parameters\n\n- `content: string`\n  Message text content\n\n- `from_number: string`\n  **REQUIRED** - The phone number to send from. Must be one of your registered Sendblue phone numbers in E.164 format.\nWithout this parameter, the message will fail to send.\n\n\n- `number: string`\n  Recipient phone number in E.164 format\n\n- `media_url?: string`\n  URL of media file to send (images, videos, etc.)\n\n- `send_style?: string`\n  The iMessage expressive message style\n\n- `status_callback?: string`\n  Webhook URL for message status updates\n\n### Returns\n\n- `{ account_email?: string; content?: string; date_created?: string; date_updated?: string; error_code?: number; error_message?: string; from_number?: string; is_outbound?: boolean; media_url?: string; message_handle?: string; number?: string; send_style?: string; status?: 'QUEUED' | 'SENT' | 'DELIVERED' | 'ERROR'; }`\n\n  - `account_email?: string`\n  - `content?: string`\n  - `date_created?: string`\n  - `date_updated?: string`\n  - `error_code?: number`\n  - `error_message?: string`\n  - `from_number?: string`\n  - `is_outbound?: boolean`\n  - `media_url?: string`\n  - `message_handle?: string`\n  - `number?: string`\n  - `send_style?: string`\n  - `status?: 'QUEUED' | 'SENT' | 'DELIVERED' | 'ERROR'`\n\n### Example\n\n```typescript\nimport SendblueAPI from 'sendblue';\n\nconst client = new SendblueAPI();\n\nconst messageResponse = await client.messages.send({\n  content: 'Hello, World!',\n  from_number: '+19998887777',\n  number: '+19998887777',\n});\n\nconsole.log(messageResponse);\n```",
  },
  {
    name: 'modify',
    endpoint: '/api/modify-group',
    httpMethod: 'post',
    summary: 'Modify a group',
    description: 'Add or manage participants in a group chat (beta feature)',
    stainlessPath: '(resource) groups > (method) modify',
    qualified: 'client.groups.modify',
    params: ['group_id: string;', "modify_type: 'add_recipient';", 'number: string;'],
    response: '{ message?: string; status?: string; }',
    markdown:
      "## modify\n\n`client.groups.modify(group_id: string, modify_type: 'add_recipient', number: string): { message?: string; status?: string; }`\n\n**post** `/api/modify-group`\n\nAdd or manage participants in a group chat (beta feature)\n\n### Parameters\n\n- `group_id: string`\n  Group identifier\n\n- `modify_type: 'add_recipient'`\n  Type of modification to perform\n\n- `number: string`\n  Phone number to add/modify in E.164 format\n\n### Returns\n\n- `{ message?: string; status?: string; }`\n\n  - `message?: string`\n  - `status?: string`\n\n### Example\n\n```typescript\nimport SendblueAPI from 'sendblue';\n\nconst client = new SendblueAPI();\n\nconst response = await client.groups.modify({\n  group_id: 'group_123456',\n  modify_type: 'add_recipient',\n  number: '+19998887777',\n});\n\nconsole.log(response);\n```",
  },
  {
    name: 'send_message',
    endpoint: '/api/send-group-message',
    httpMethod: 'post',
    summary: 'Send a group message',
    description: 'Send a message to a group of recipients (beta feature)',
    stainlessPath: '(resource) groups > (method) send_message',
    qualified: 'client.groups.sendMessage',
    params: [
      'content: string;',
      'from_number: string;',
      'group_id?: string;',
      'media_url?: string;',
      'numbers?: string[];',
    ],
    response:
      "{ account_email?: string; content?: string; date_created?: string; date_updated?: string; error_code?: number; error_message?: string; from_number?: string; is_outbound?: boolean; media_url?: string; message_handle?: string; number?: string; send_style?: string; status?: 'QUEUED' | 'SENT' | 'DELIVERED' | 'ERROR'; }",
    markdown:
      "## send_message\n\n`client.groups.sendMessage(content: string, from_number: string, group_id?: string, media_url?: string, numbers?: string[]): { account_email?: string; content?: string; date_created?: string; date_updated?: string; error_code?: number; error_message?: string; from_number?: string; is_outbound?: boolean; media_url?: string; message_handle?: string; number?: string; send_style?: string; status?: 'QUEUED' | 'SENT' | 'DELIVERED' | 'ERROR'; }`\n\n**post** `/api/send-group-message`\n\nSend a message to a group of recipients (beta feature)\n\n### Parameters\n\n- `content: string`\n  Message text content\n\n- `from_number: string`\n  **REQUIRED** - The phone number to send from. Must be one of your registered Sendblue phone numbers in E.164 format.\nWithout this parameter, the message will fail to send.\n\n\n- `group_id?: string`\n  Unique identifier for an existing group\n\n- `media_url?: string`\n  URL of media file to send\n\n- `numbers?: string[]`\n  Array of recipient phone numbers in E.164 format\n\n### Returns\n\n- `{ account_email?: string; content?: string; date_created?: string; date_updated?: string; error_code?: number; error_message?: string; from_number?: string; is_outbound?: boolean; media_url?: string; message_handle?: string; number?: string; send_style?: string; status?: 'QUEUED' | 'SENT' | 'DELIVERED' | 'ERROR'; }`\n\n  - `account_email?: string`\n  - `content?: string`\n  - `date_created?: string`\n  - `date_updated?: string`\n  - `error_code?: number`\n  - `error_message?: string`\n  - `from_number?: string`\n  - `is_outbound?: boolean`\n  - `media_url?: string`\n  - `message_handle?: string`\n  - `number?: string`\n  - `send_style?: string`\n  - `status?: 'QUEUED' | 'SENT' | 'DELIVERED' | 'ERROR'`\n\n### Example\n\n```typescript\nimport SendblueAPI from 'sendblue';\n\nconst client = new SendblueAPI();\n\nconst messageResponse = await client.groups.sendMessage({ content: 'Hello, everyone!', from_number: '+19998887777' });\n\nconsole.log(messageResponse);\n```",
  },
  {
    name: 'upload',
    endpoint: '/api/upload-media-object',
    httpMethod: 'post',
    summary: 'Upload a media object',
    description: "Upload a media file to Sendblue's CDN for use in messages",
    stainlessPath: '(resource) media_objects > (method) upload',
    qualified: 'client.mediaObjects.upload',
    params: ['media_url: string;'],
    response: '{ mediaObjectId?: string; message?: string; status?: string; }',
    markdown:
      "## upload\n\n`client.mediaObjects.upload(media_url: string): { mediaObjectId?: string; message?: string; status?: string; }`\n\n**post** `/api/upload-media-object`\n\nUpload a media file to Sendblue's CDN for use in messages\n\n### Parameters\n\n- `media_url: string`\n  URL of the media file to upload\n\n### Returns\n\n- `{ mediaObjectId?: string; message?: string; status?: string; }`\n\n  - `mediaObjectId?: string`\n  - `message?: string`\n  - `status?: string`\n\n### Example\n\n```typescript\nimport SendblueAPI from 'sendblue';\n\nconst client = new SendblueAPI();\n\nconst response = await client.mediaObjects.upload({ media_url: 'https://example.com/image.jpg' });\n\nconsole.log(response);\n```",
  },
  {
    name: 'lookup_number',
    endpoint: '/api/evaluate-service',
    httpMethod: 'get',
    summary: 'Lookup a phone number',
    description:
      'Determine if a phone number supports iMessage or SMS. Useful for checking if a number is an iPhone, if it is real, or which provider to use.\n',
    stainlessPath: '(resource) lookups > (method) lookup_number',
    qualified: 'client.lookups.lookupNumber',
    params: ['number: string;'],
    response: "{ number?: string; service?: 'iMessage' | 'SMS'; }",
    markdown:
      "## lookup_number\n\n`client.lookups.lookupNumber(number: string): { number?: string; service?: 'iMessage' | 'SMS'; }`\n\n**get** `/api/evaluate-service`\n\nDetermine if a phone number supports iMessage or SMS. Useful for checking if a number is an iPhone, if it is real, or which provider to use.\n\n\n### Parameters\n\n- `number: string`\n  The number you want to evaluate in E.164 format\n\n### Returns\n\n- `{ number?: string; service?: 'iMessage' | 'SMS'; }`\n\n  - `number?: string`\n  - `service?: 'iMessage' | 'SMS'`\n\n### Example\n\n```typescript\nimport SendblueAPI from 'sendblue';\n\nconst client = new SendblueAPI();\n\nconst response = await client.lookups.lookupNumber({ number: '+19999999999' });\n\nconsole.log(response);\n```",
  },
  {
    name: 'send',
    endpoint: '/api/send-typing-indicator',
    httpMethod: 'post',
    summary: 'Send a typing indicator',
    description:
      "Send an indication that you are typing to a user. This shows up as the animated three dots on the recipient's device. Not supported in group chats.\n",
    stainlessPath: '(resource) typing_indicators > (method) send',
    qualified: 'client.typingIndicators.send',
    params: ['from_number: string;', 'number: string;'],
    response: "{ error_message?: string; number?: string; status?: 'SENT' | 'ERROR'; }",
    markdown:
      "## send\n\n`client.typingIndicators.send(from_number: string, number: string): { error_message?: string; number?: string; status?: 'SENT' | 'ERROR'; }`\n\n**post** `/api/send-typing-indicator`\n\nSend an indication that you are typing to a user. This shows up as the animated three dots on the recipient's device. Not supported in group chats.\n\n\n### Parameters\n\n- `from_number: string`\n  The Sendblue phone number you want to send the typing indicator from (E.164 format). This should be the number you use to send messages.\n\n- `number: string`\n  The number you want to send a typing indicator to (E.164 format)\n\n### Returns\n\n- `{ error_message?: string; number?: string; status?: 'SENT' | 'ERROR'; }`\n\n  - `error_message?: string`\n  - `number?: string`\n  - `status?: 'SENT' | 'ERROR'`\n\n### Example\n\n```typescript\nimport SendblueAPI from 'sendblue';\n\nconst client = new SendblueAPI();\n\nconst response = await client.typingIndicators.send({ from_number: '+16292925296', number: '+19998887777' });\n\nconsole.log(response);\n```",
  },
  {
    name: 'create',
    endpoint: '/api/v2/contacts',
    httpMethod: 'post',
    summary: 'Create a contact',
    description: 'Create a new contact or update existing if update_if_exists is true',
    stainlessPath: '(resource) contacts > (method) create',
    qualified: 'client.contacts.create',
    params: [
      'number: string;',
      'assigned_to_email?: string;',
      'assignedToEmail?: string;',
      'custom_variables?: object;',
      'first_name?: string;',
      'firstName?: string;',
      'last_name?: string;',
      'lastName?: string;',
      'phone_number?: string;',
      'phoneNumber?: string;',
      'sendblue_number?: string;',
      'sendblueNumber?: string;',
      'tags?: string[];',
      'update_if_exists?: boolean;',
    ],
    response:
      '{ contact?: { assigned_to_email?: string; company_name?: string; created_at?: string; custom_variables?: object; first_name?: string; last_name?: string; opt_out?: boolean; phone?: string; sendblue_number?: string; tags?: string[]; verified?: boolean; }; status?: string; }',
    markdown:
      "## create\n\n`client.contacts.create(number: string, assigned_to_email?: string, assignedToEmail?: string, custom_variables?: object, first_name?: string, firstName?: string, last_name?: string, lastName?: string, phone_number?: string, phoneNumber?: string, sendblue_number?: string, sendblueNumber?: string, tags?: string[], update_if_exists?: boolean): { contact?: contact; status?: string; }`\n\n**post** `/api/v2/contacts`\n\nCreate a new contact or update existing if update_if_exists is true\n\n### Parameters\n\n- `number: string`\n  Contact's phone number in E.164 format (preferred)\n\n- `assigned_to_email?: string`\n  Email of assigned user (preferred)\n\n- `assignedToEmail?: string`\n  Email of assigned user (deprecated, use assigned_to_email)\n\n- `custom_variables?: object`\n  Custom key-value pairs. Keys are human-readable labels; new labels are auto-created.\n\n- `first_name?: string`\n  Contact's first name (preferred)\n\n- `firstName?: string`\n  Contact's first name (deprecated, use first_name)\n\n- `last_name?: string`\n  Contact's last name (preferred)\n\n- `lastName?: string`\n  Contact's last name (deprecated, use last_name)\n\n- `phone_number?: string`\n  Contact's phone number (deprecated, use number)\n\n- `phoneNumber?: string`\n  Contact's phone number (deprecated, use number)\n\n- `sendblue_number?: string`\n  Associated Sendblue phone number to send with (preferred)\n\n- `sendblueNumber?: string`\n  Associated Sendblue phone number (deprecated, use sendblue_number)\n\n- `tags?: string[]`\n  Tags for the contact\n\n- `update_if_exists?: boolean`\n  If true, updates the contact if it already exists\n\n### Returns\n\n- `{ contact?: { assigned_to_email?: string; company_name?: string; created_at?: string; custom_variables?: object; first_name?: string; last_name?: string; opt_out?: boolean; phone?: string; sendblue_number?: string; tags?: string[]; verified?: boolean; }; status?: string; }`\n\n  - `contact?: { assigned_to_email?: string; company_name?: string; created_at?: string; custom_variables?: object; first_name?: string; last_name?: string; opt_out?: boolean; phone?: string; sendblue_number?: string; tags?: string[]; verified?: boolean; }`\n  - `status?: string`\n\n### Example\n\n```typescript\nimport SendblueAPI from 'sendblue';\n\nconst client = new SendblueAPI();\n\nconst contact = await client.contacts.create({ number: 'number' });\n\nconsole.log(contact);\n```",
  },
  {
    name: 'retrieve',
    endpoint: '/api/v2/contacts/{phone_number}',
    httpMethod: 'get',
    summary: 'Get a contact',
    description: 'Retrieve a specific contact by phone number',
    stainlessPath: '(resource) contacts > (method) retrieve',
    qualified: 'client.contacts.retrieve',
    params: ['phone_number: string;'],
    response:
      '{ contact?: { assigned_to_email?: string; company_name?: string; created_at?: string; custom_variables?: object; first_name?: string; last_name?: string; opt_out?: boolean; phone?: string; sendblue_number?: string; tags?: string[]; verified?: boolean; }; status?: string; }',
    markdown:
      "## retrieve\n\n`client.contacts.retrieve(phone_number: string): { contact?: contact; status?: string; }`\n\n**get** `/api/v2/contacts/{phone_number}`\n\nRetrieve a specific contact by phone number\n\n### Parameters\n\n- `phone_number: string`\n\n### Returns\n\n- `{ contact?: { assigned_to_email?: string; company_name?: string; created_at?: string; custom_variables?: object; first_name?: string; last_name?: string; opt_out?: boolean; phone?: string; sendblue_number?: string; tags?: string[]; verified?: boolean; }; status?: string; }`\n\n  - `contact?: { assigned_to_email?: string; company_name?: string; created_at?: string; custom_variables?: object; first_name?: string; last_name?: string; opt_out?: boolean; phone?: string; sendblue_number?: string; tags?: string[]; verified?: boolean; }`\n  - `status?: string`\n\n### Example\n\n```typescript\nimport SendblueAPI from 'sendblue';\n\nconst client = new SendblueAPI();\n\nconst contact = await client.contacts.retrieve('+1234567890');\n\nconsole.log(contact);\n```",
  },
  {
    name: 'update',
    endpoint: '/api/v2/contacts/{phone_number}',
    httpMethod: 'put',
    summary: 'Update a contact',
    description:
      'Update an existing contact. You may set SMS opt-out with `opt_out` (boolean); it updates the same recipient record used for inbound keyword opt-outs.',
    stainlessPath: '(resource) contacts > (method) update',
    qualified: 'client.contacts.update',
    params: [
      'phone_number: string;',
      'assigned_to_email?: string;',
      'assignedToEmail?: string;',
      'company_name?: string;',
      'companyName?: string;',
      'custom_variables?: object;',
      'first_name?: string;',
      'firstName?: string;',
      'last_name?: string;',
      'lastName?: string;',
      'opt_out?: boolean;',
      'optOut?: boolean;',
      'sendblue_number?: string;',
      'sendblueNumber?: string;',
      'tags?: string[];',
    ],
    response:
      '{ contact?: { assigned_to_email?: string; company_name?: string; created_at?: string; custom_variables?: object; first_name?: string; last_name?: string; opt_out?: boolean; phone?: string; sendblue_number?: string; tags?: string[]; verified?: boolean; }; status?: string; }',
    markdown:
      "## update\n\n`client.contacts.update(phone_number: string, assigned_to_email?: string, assignedToEmail?: string, company_name?: string, companyName?: string, custom_variables?: object, first_name?: string, firstName?: string, last_name?: string, lastName?: string, opt_out?: boolean, optOut?: boolean, sendblue_number?: string, sendblueNumber?: string, tags?: string[]): { contact?: contact; status?: string; }`\n\n**put** `/api/v2/contacts/{phone_number}`\n\nUpdate an existing contact. You may set SMS opt-out with `opt_out` (boolean); it updates the same recipient record used for inbound keyword opt-outs.\n\n### Parameters\n\n- `phone_number: string`\n\n- `assigned_to_email?: string`\n  Email of assigned user (preferred)\n\n- `assignedToEmail?: string`\n  Deprecated, use assigned_to_email\n\n- `company_name?: string`\n  Company name (preferred)\n\n- `companyName?: string`\n  Deprecated, use company_name\n\n- `custom_variables?: object`\n  Custom key-value pairs. Merged with existing variables (not replaced).\n\n- `first_name?: string`\n  Contact's first name (preferred)\n\n- `firstName?: string`\n  Deprecated, use first_name\n\n- `last_name?: string`\n  Contact's last name (preferred)\n\n- `lastName?: string`\n  Deprecated, use last_name\n\n- `opt_out?: boolean`\n  Whether the contact has opted out of SMS (updates the same recipient record used for inbound keyword opt-outs)\n\n- `optOut?: boolean`\n  Deprecated, use opt_out\n\n- `sendblue_number?: string`\n  Associated Sendblue phone number (preferred)\n\n- `sendblueNumber?: string`\n  Deprecated, use sendblue_number\n\n- `tags?: string[]`\n\n### Returns\n\n- `{ contact?: { assigned_to_email?: string; company_name?: string; created_at?: string; custom_variables?: object; first_name?: string; last_name?: string; opt_out?: boolean; phone?: string; sendblue_number?: string; tags?: string[]; verified?: boolean; }; status?: string; }`\n\n  - `contact?: { assigned_to_email?: string; company_name?: string; created_at?: string; custom_variables?: object; first_name?: string; last_name?: string; opt_out?: boolean; phone?: string; sendblue_number?: string; tags?: string[]; verified?: boolean; }`\n  - `status?: string`\n\n### Example\n\n```typescript\nimport SendblueAPI from 'sendblue';\n\nconst client = new SendblueAPI();\n\nconst contact = await client.contacts.update('+1234567890');\n\nconsole.log(contact);\n```",
  },
  {
    name: 'list',
    endpoint: '/api/v2/contacts',
    httpMethod: 'get',
    summary: 'Get contacts',
    description: 'Retrieve a list of contacts for the authenticated account',
    stainlessPath: '(resource) contacts > (method) list',
    qualified: 'client.contacts.list',
    params: [
      'cid?: string;',
      'limit?: number;',
      'offset?: number;',
      'order_by?: string;',
      "order_direction?: 'asc' | 'desc';",
      'phone_number?: string;',
    ],
    response:
      '{ assigned_to_email?: string; company_name?: string; created_at?: string; custom_variables?: object; first_name?: string; last_name?: string; opt_out?: boolean; phone?: string; sendblue_number?: string; tags?: string[]; verified?: boolean; }[]',
    markdown:
      "## list\n\n`client.contacts.list(cid?: string, limit?: number, offset?: number, order_by?: string, order_direction?: 'asc' | 'desc', phone_number?: string): object[]`\n\n**get** `/api/v2/contacts`\n\nRetrieve a list of contacts for the authenticated account\n\n### Parameters\n\n- `cid?: string`\n  Filter by contact ID\n\n- `limit?: number`\n  Maximum number of contacts to return\n\n- `offset?: number`\n  Number of contacts to skip\n\n- `order_by?: string`\n  Field to sort by\n\n- `order_direction?: 'asc' | 'desc'`\n  Sort direction\n\n- `phone_number?: string`\n  Filter by phone number\n\n### Returns\n\n- `{ assigned_to_email?: string; company_name?: string; created_at?: string; custom_variables?: object; first_name?: string; last_name?: string; opt_out?: boolean; phone?: string; sendblue_number?: string; tags?: string[]; verified?: boolean; }[]`\n\n### Example\n\n```typescript\nimport SendblueAPI from 'sendblue';\n\nconst client = new SendblueAPI();\n\nconst contacts = await client.contacts.list();\n\nconsole.log(contacts);\n```",
  },
  {
    name: 'delete',
    endpoint: '/api/v2/contacts/{phone_number}',
    httpMethod: 'delete',
    summary: 'Delete a contact',
    description: 'Delete a specific contact',
    stainlessPath: '(resource) contacts > (method) delete',
    qualified: 'client.contacts.delete',
    params: ['phone_number: string;'],
    response: '{ status?: string; }',
    markdown:
      "## delete\n\n`client.contacts.delete(phone_number: string): { status?: string; }`\n\n**delete** `/api/v2/contacts/{phone_number}`\n\nDelete a specific contact\n\n### Parameters\n\n- `phone_number: string`\n\n### Returns\n\n- `{ status?: string; }`\n\n  - `status?: string`\n\n### Example\n\n```typescript\nimport SendblueAPI from 'sendblue';\n\nconst client = new SendblueAPI();\n\nconst contact = await client.contacts.delete('+1234567890');\n\nconsole.log(contact);\n```",
  },
  {
    name: 'count',
    endpoint: '/api/v2/contacts/count',
    httpMethod: 'get',
    summary: 'Get contact count',
    description: 'Get the total number of contacts',
    stainlessPath: '(resource) contacts > (method) count',
    qualified: 'client.contacts.count',
    response: '{ count?: number; }',
    markdown:
      "## count\n\n`client.contacts.count(): { count?: number; }`\n\n**get** `/api/v2/contacts/count`\n\nGet the total number of contacts\n\n### Returns\n\n- `{ count?: number; }`\n\n  - `count?: number`\n\n### Example\n\n```typescript\nimport SendblueAPI from 'sendblue';\n\nconst client = new SendblueAPI();\n\nconst response = await client.contacts.count();\n\nconsole.log(response);\n```",
  },
  {
    name: 'opt_out',
    endpoint: '/api/v2/contacts/opt-out',
    httpMethod: 'post',
    summary: 'Opt out a contact',
    description:
      'Opt a contact out (or back in) from receiving messages. When a recipient is opted out,\noutbound messages to that number will be blocked.\n\nPass `opted_out: false` to opt a contact back in.\n',
    stainlessPath: '(resource) contacts > (method) opt_out',
    qualified: 'client.contacts.optOut',
    params: ['number: string;', 'opted_out?: boolean;'],
    response: '{ number?: string; opted_out?: boolean; status?: string; }',
    markdown:
      "## opt_out\n\n`client.contacts.optOut(number: string, opted_out?: boolean): { number?: string; opted_out?: boolean; status?: string; }`\n\n**post** `/api/v2/contacts/opt-out`\n\nOpt a contact out (or back in) from receiving messages. When a recipient is opted out,\noutbound messages to that number will be blocked.\n\nPass `opted_out: false` to opt a contact back in.\n\n\n### Parameters\n\n- `number: string`\n  Phone number in E.164 format\n\n- `opted_out?: boolean`\n  Set to false to opt the contact back in (defaults to true)\n\n### Returns\n\n- `{ number?: string; opted_out?: boolean; status?: string; }`\n\n  - `number?: string`\n  - `opted_out?: boolean`\n  - `status?: string`\n\n### Example\n\n```typescript\nimport SendblueAPI from 'sendblue';\n\nconst client = new SendblueAPI();\n\nconst response = await client.contacts.optOut({ number: '+14155551234' });\n\nconsole.log(response);\n```",
  },
  {
    name: 'verify',
    endpoint: '/api/v2/contacts/verify',
    httpMethod: 'post',
    summary: 'Verify a contact',
    description: 'Send a verification message to a contact',
    stainlessPath: '(resource) contacts > (method) verify',
    qualified: 'client.contacts.verify',
    params: ['number: string;'],
    response: '{ status?: string; }',
    markdown:
      "## verify\n\n`client.contacts.verify(number: string): { status?: string; }`\n\n**post** `/api/v2/contacts/verify`\n\nSend a verification message to a contact\n\n### Parameters\n\n- `number: string`\n  Phone number to verify\n\n### Returns\n\n- `{ status?: string; }`\n\n  - `status?: string`\n\n### Example\n\n```typescript\nimport SendblueAPI from 'sendblue';\n\nconst client = new SendblueAPI();\n\nconst response = await client.contacts.verify({ number: 'number' });\n\nconsole.log(response);\n```",
  },
  {
    name: 'create',
    endpoint: '/api/v2/contacts/bulk',
    httpMethod: 'post',
    summary: 'Create multiple contacts',
    description: 'Create multiple contacts in bulk',
    stainlessPath: '(resource) contacts.bulk > (method) create',
    qualified: 'client.contacts.bulk.create',
    params: [
      'contacts: { phone: string; company_name?: string; custom_variables?: object; first_name?: string; last_name?: string; tags?: string[]; }[];',
    ],
    response:
      '{ contacts?: { assigned_to_email?: string; company_name?: string; created_at?: string; custom_variables?: object; first_name?: string; last_name?: string; opt_out?: boolean; phone?: string; sendblue_number?: string; tags?: string[]; verified?: boolean; }[]; status?: string; }',
    markdown:
      "## create\n\n`client.contacts.bulk.create(contacts: { phone: string; company_name?: string; custom_variables?: object; first_name?: string; last_name?: string; tags?: string[]; }[]): { contacts?: contact[]; status?: string; }`\n\n**post** `/api/v2/contacts/bulk`\n\nCreate multiple contacts in bulk\n\n### Parameters\n\n- `contacts: { phone: string; company_name?: string; custom_variables?: object; first_name?: string; last_name?: string; tags?: string[]; }[]`\n\n### Returns\n\n- `{ contacts?: { assigned_to_email?: string; company_name?: string; created_at?: string; custom_variables?: object; first_name?: string; last_name?: string; opt_out?: boolean; phone?: string; sendblue_number?: string; tags?: string[]; verified?: boolean; }[]; status?: string; }`\n\n  - `contacts?: { assigned_to_email?: string; company_name?: string; created_at?: string; custom_variables?: object; first_name?: string; last_name?: string; opt_out?: boolean; phone?: string; sendblue_number?: string; tags?: string[]; verified?: boolean; }[]`\n  - `status?: string`\n\n### Example\n\n```typescript\nimport SendblueAPI from 'sendblue';\n\nconst client = new SendblueAPI();\n\nconst bulk = await client.contacts.bulk.create({ contacts: [{ phone: 'phone' }] });\n\nconsole.log(bulk);\n```",
  },
  {
    name: 'delete',
    endpoint: '/api/v2/contacts',
    httpMethod: 'delete',
    summary: 'Delete multiple contacts',
    description: 'Delete multiple contacts by their IDs',
    stainlessPath: '(resource) contacts.bulk > (method) delete',
    qualified: 'client.contacts.bulk.delete',
    params: ['contact_ids: string[];'],
    response: '{ amount?: number; status?: string; }',
    markdown:
      "## delete\n\n`client.contacts.bulk.delete(contact_ids: string[]): { amount?: number; status?: string; }`\n\n**delete** `/api/v2/contacts`\n\nDelete multiple contacts by their IDs\n\n### Parameters\n\n- `contact_ids: string[]`\n  Array of phone numbers in E.164 format to delete\n\n### Returns\n\n- `{ amount?: number; status?: string; }`\n\n  - `amount?: number`\n  - `status?: string`\n\n### Example\n\n```typescript\nimport SendblueAPI from 'sendblue';\n\nconst client = new SendblueAPI();\n\nconst bulk = await client.contacts.bulk.delete({ contact_ids: ['+1234567890', '+0987654321'] });\n\nconsole.log(bulk);\n```",
  },
  {
    name: 'create',
    endpoint: '/api/account/webhooks',
    httpMethod: 'post',
    summary: 'Add webhooks',
    description: 'Add new webhooks to the account. Webhooks are appended to existing ones.',
    stainlessPath: '(resource) webhooks > (method) create',
    qualified: 'client.webhooks.create',
    params: [
      'webhooks: string | { url: string; secret?: string; }[];',
      'globalSecret?: string;',
      'type?: string;',
    ],
    response:
      '{ message?: string; status?: string; webhooks?: { call_log?: string | object[]; contact_created?: string[]; globalSecret?: string; line_assigned?: string | object[]; line_blocked?: string | object[]; outbound?: string | object[]; receive?: string | object[]; typing_indicator?: string | object[]; }; }',
    markdown:
      "## create\n\n`client.webhooks.create(webhooks: string | { url: string; secret?: string; }[], globalSecret?: string, type?: string): { message?: string; status?: string; webhooks?: object; }`\n\n**post** `/api/account/webhooks`\n\nAdd new webhooks to the account. Webhooks are appended to existing ones.\n\n### Parameters\n\n- `webhooks: string | { url: string; secret?: string; }[]`\n  Array of webhook URLs or webhook objects\n\n- `globalSecret?: string`\n  Global secret for webhook signature verification\n\n- `type?: string`\n  Type of webhook to add\n\n### Returns\n\n- `{ message?: string; status?: string; webhooks?: { call_log?: string | object[]; contact_created?: string[]; globalSecret?: string; line_assigned?: string | object[]; line_blocked?: string | object[]; outbound?: string | object[]; receive?: string | object[]; typing_indicator?: string | object[]; }; }`\n\n  - `message?: string`\n  - `status?: string`\n  - `webhooks?: { call_log?: string | { url: string; secret?: string; }[]; contact_created?: string[]; globalSecret?: string; line_assigned?: string | { url: string; secret?: string; }[]; line_blocked?: string | { url: string; secret?: string; }[]; outbound?: string | { url: string; secret?: string; }[]; receive?: string | { url: string; secret?: string; }[]; typing_indicator?: string | { url: string; secret?: string; }[]; }`\n\n### Example\n\n```typescript\nimport SendblueAPI from 'sendblue';\n\nconst client = new SendblueAPI();\n\nconst webhook = await client.webhooks.create({ webhooks: ['https://example.com'] });\n\nconsole.log(webhook);\n```",
  },
  {
    name: 'update',
    endpoint: '/api/account/webhooks',
    httpMethod: 'put',
    summary: 'Replace webhooks',
    description: 'Replace all webhooks for the account. This overwrites existing webhooks.',
    stainlessPath: '(resource) webhooks > (method) update',
    qualified: 'client.webhooks.update',
    params: [
      'webhooks: { call_log?: string | { url: string; secret?: string; }[]; contact_created?: string[]; globalSecret?: string; line_assigned?: string | { url: string; secret?: string; }[]; line_blocked?: string | { url: string; secret?: string; }[]; outbound?: string | { url: string; secret?: string; }[]; receive?: string | { url: string; secret?: string; }[]; typing_indicator?: string | { url: string; secret?: string; }[]; };',
    ],
    response:
      '{ message?: string; status?: string; webhooks?: { call_log?: string | object[]; contact_created?: string[]; globalSecret?: string; line_assigned?: string | object[]; line_blocked?: string | object[]; outbound?: string | object[]; receive?: string | object[]; typing_indicator?: string | object[]; }; }',
    markdown:
      "## update\n\n`client.webhooks.update(webhooks: { call_log?: string | object[]; contact_created?: string[]; globalSecret?: string; line_assigned?: string | object[]; line_blocked?: string | object[]; outbound?: string | object[]; receive?: string | object[]; typing_indicator?: string | object[]; }): { message?: string; status?: string; webhooks?: object; }`\n\n**put** `/api/account/webhooks`\n\nReplace all webhooks for the account. This overwrites existing webhooks.\n\n### Parameters\n\n- `webhooks: { call_log?: string | { url: string; secret?: string; }[]; contact_created?: string[]; globalSecret?: string; line_assigned?: string | { url: string; secret?: string; }[]; line_blocked?: string | { url: string; secret?: string; }[]; outbound?: string | { url: string; secret?: string; }[]; receive?: string | { url: string; secret?: string; }[]; typing_indicator?: string | { url: string; secret?: string; }[]; }`\n  - `call_log?: string | { url: string; secret?: string; }[]`\n    Webhooks for call log events\n  - `contact_created?: string[]`\n    Webhooks for contact created events (URL strings only)\n  - `globalSecret?: string`\n    Global secret applied to all webhooks\n  - `line_assigned?: string | { url: string; secret?: string; }[]`\n    Webhooks for line assigned events\n  - `line_blocked?: string | { url: string; secret?: string; }[]`\n    Webhooks for line blocked events\n  - `outbound?: string | { url: string; secret?: string; }[]`\n    Webhooks for outbound message status updates\n  - `receive?: string | { url: string; secret?: string; }[]`\n    Webhooks for inbound message events\n  - `typing_indicator?: string | { url: string; secret?: string; }[]`\n    Webhooks for typing indicator events\n\n### Returns\n\n- `{ message?: string; status?: string; webhooks?: { call_log?: string | object[]; contact_created?: string[]; globalSecret?: string; line_assigned?: string | object[]; line_blocked?: string | object[]; outbound?: string | object[]; receive?: string | object[]; typing_indicator?: string | object[]; }; }`\n\n  - `message?: string`\n  - `status?: string`\n  - `webhooks?: { call_log?: string | { url: string; secret?: string; }[]; contact_created?: string[]; globalSecret?: string; line_assigned?: string | { url: string; secret?: string; }[]; line_blocked?: string | { url: string; secret?: string; }[]; outbound?: string | { url: string; secret?: string; }[]; receive?: string | { url: string; secret?: string; }[]; typing_indicator?: string | { url: string; secret?: string; }[]; }`\n\n### Example\n\n```typescript\nimport SendblueAPI from 'sendblue';\n\nconst client = new SendblueAPI();\n\nconst webhook = await client.webhooks.update({ webhooks: {} });\n\nconsole.log(webhook);\n```",
  },
  {
    name: 'list',
    endpoint: '/api/account/webhooks',
    httpMethod: 'get',
    summary: 'Get webhooks',
    description: 'Get all webhooks configured for the authenticated account',
    stainlessPath: '(resource) webhooks > (method) list',
    qualified: 'client.webhooks.list',
    response:
      '{ status?: string; webhooks?: { call_log?: string | object[]; contact_created?: string[]; globalSecret?: string; line_assigned?: string | object[]; line_blocked?: string | object[]; outbound?: string | object[]; receive?: string | object[]; typing_indicator?: string | object[]; }; }',
    markdown:
      "## list\n\n`client.webhooks.list(): { status?: string; webhooks?: object; }`\n\n**get** `/api/account/webhooks`\n\nGet all webhooks configured for the authenticated account\n\n### Returns\n\n- `{ status?: string; webhooks?: { call_log?: string | object[]; contact_created?: string[]; globalSecret?: string; line_assigned?: string | object[]; line_blocked?: string | object[]; outbound?: string | object[]; receive?: string | object[]; typing_indicator?: string | object[]; }; }`\n\n  - `status?: string`\n  - `webhooks?: { call_log?: string | { url: string; secret?: string; }[]; contact_created?: string[]; globalSecret?: string; line_assigned?: string | { url: string; secret?: string; }[]; line_blocked?: string | { url: string; secret?: string; }[]; outbound?: string | { url: string; secret?: string; }[]; receive?: string | { url: string; secret?: string; }[]; typing_indicator?: string | { url: string; secret?: string; }[]; }`\n\n### Example\n\n```typescript\nimport SendblueAPI from 'sendblue';\n\nconst client = new SendblueAPI();\n\nconst webhooks = await client.webhooks.list();\n\nconsole.log(webhooks);\n```",
  },
  {
    name: 'delete',
    endpoint: '/api/account/webhooks',
    httpMethod: 'delete',
    summary: 'Delete webhooks',
    description: 'Delete specific webhooks from the account',
    stainlessPath: '(resource) webhooks > (method) delete',
    qualified: 'client.webhooks.delete',
    params: ['webhooks: string[];', 'type?: string;'],
    response: '{ message?: string; status?: string; }',
    markdown:
      "## delete\n\n`client.webhooks.delete(webhooks: string[], type?: string): { message?: string; status?: string; }`\n\n**delete** `/api/account/webhooks`\n\nDelete specific webhooks from the account\n\n### Parameters\n\n- `webhooks: string[]`\n  Array of webhook URLs to delete\n\n- `type?: string`\n  Type of webhook to delete from\n\n### Returns\n\n- `{ message?: string; status?: string; }`\n\n  - `message?: string`\n  - `status?: string`\n\n### Example\n\n```typescript\nimport SendblueAPI from 'sendblue';\n\nconst client = new SendblueAPI();\n\nconst webhook = await client.webhooks.delete({ webhooks: ['https://example.com'] });\n\nconsole.log(webhook);\n```",
  },
  {
    name: 'send',
    endpoint: '/api/send-carousel',
    httpMethod: 'post',
    summary: 'Send a carousel message',
    description:
      'Send a carousel of images to a single recipient. Requires a V2 (Mac Mini) line. The carousel must contain between 2 and 20 HTTPS image URLs. For sending a single image, use `/api/send-message` with `media_url` instead.\n',
    stainlessPath: '(resource) send_carousel > (method) send',
    qualified: 'client.sendCarousel.send',
    params: [
      'from_number: string;',
      'media_urls: string[];',
      'number: string;',
      'metadata?: object;',
      'send_style?: string;',
      'status_callback?: string;',
    ],
    response:
      '{ accountEmail?: string; from_number?: string; is_outbound?: boolean; media_url?: string; message_handle?: string; message_type?: string; number?: string; status?: string; }',
    markdown:
      "## send\n\n`client.sendCarousel.send(from_number: string, media_urls: string[], number: string, metadata?: object, send_style?: string, status_callback?: string): { accountEmail?: string; from_number?: string; is_outbound?: boolean; media_url?: string; message_handle?: string; message_type?: string; number?: string; status?: string; }`\n\n**post** `/api/send-carousel`\n\nSend a carousel of images to a single recipient. Requires a V2 (Mac Mini) line. The carousel must contain between 2 and 20 HTTPS image URLs. For sending a single image, use `/api/send-message` with `media_url` instead.\n\n\n### Parameters\n\n- `from_number: string`\n  Your Sendblue phone number in E.164 format (must be a V2/Mac Mini line)\n\n- `media_urls: string[]`\n  Array of HTTPS image URLs to send as a carousel (2-20 items)\n\n- `number: string`\n  Recipient phone number in E.164 format\n\n- `metadata?: object`\n  Additional metadata to attach to the message\n\n- `send_style?: string`\n  The iMessage expressive message style\n\n- `status_callback?: string`\n  Webhook URL for message status updates\n\n### Returns\n\n- `{ accountEmail?: string; from_number?: string; is_outbound?: boolean; media_url?: string; message_handle?: string; message_type?: string; number?: string; status?: string; }`\n\n  - `accountEmail?: string`\n  - `from_number?: string`\n  - `is_outbound?: boolean`\n  - `media_url?: string`\n  - `message_handle?: string`\n  - `message_type?: string`\n  - `number?: string`\n  - `status?: string`\n\n### Example\n\n```typescript\nimport SendblueAPI from 'sendblue';\n\nconst client = new SendblueAPI();\n\nconst response = await client.sendCarousel.send({\n  from_number: '+19998887777',\n  media_urls: ['https://example.com/image1.jpg', 'https://example.com/image2.jpg', 'https://example.com/image3.jpg'],\n  number: '+19998887777',\n});\n\nconsole.log(response);\n```",
  },
];

const INDEX_OPTIONS = {
  fields: [
    'name',
    'endpoint',
    'summary',
    'description',
    'qualified',
    'stainlessPath',
    'content',
    'sectionContext',
  ],
  storeFields: ['kind', '_original'],
  searchOptions: {
    prefix: true,
    fuzzy: 0.2,
    boost: {
      name: 3,
      endpoint: 2,
      summary: 2,
      qualified: 2,
      content: 1,
    } as Record<string, number>,
  },
};

/**
 * Self-contained local search engine backed by MiniSearch.
 * Method data is embedded at SDK build time; prose documents
 * can be loaded from an optional docs directory at runtime.
 */
export class LocalDocsSearch {
  private methodIndex: MiniSearch<MiniSearchDocument>;
  private proseIndex: MiniSearch<MiniSearchDocument>;

  private constructor() {
    this.methodIndex = new MiniSearch<MiniSearchDocument>(INDEX_OPTIONS);
    this.proseIndex = new MiniSearch<MiniSearchDocument>(INDEX_OPTIONS);
  }

  static async create(opts?: { docsDir?: string }): Promise<LocalDocsSearch> {
    const instance = new LocalDocsSearch();
    instance.indexMethods(EMBEDDED_METHODS);
    if (opts?.docsDir) {
      await instance.loadDocsDirectory(opts.docsDir);
    }
    return instance;
  }

  // Note: Language is accepted for interface consistency with remote search, but currently has no
  // effect since this local search only supports TypeScript docs.
  search(props: {
    query: string;
    language?: string;
    detail?: string;
    maxResults?: number;
    maxLength?: number;
  }): SearchResult {
    const { query, detail = 'default', maxResults = 5, maxLength = 100_000 } = props;

    const useMarkdown = detail === 'verbose' || detail === 'high';

    // Search both indices and merge results by score
    const methodHits = this.methodIndex
      .search(query)
      .map((hit) => ({ ...hit, _kind: 'http_method' as const }));
    const proseHits = this.proseIndex.search(query).map((hit) => ({ ...hit, _kind: 'prose' as const }));
    const merged = [...methodHits, ...proseHits].sort((a, b) => b.score - a.score);
    const top = merged.slice(0, maxResults);

    const fullResults: (string | Record<string, unknown>)[] = [];

    for (const hit of top) {
      const original = (hit as Record<string, unknown>)['_original'];
      if (hit._kind === 'http_method') {
        const m = original as MethodEntry;
        if (useMarkdown && m.markdown) {
          fullResults.push(m.markdown);
        } else {
          fullResults.push({
            method: m.qualified,
            summary: m.summary,
            description: m.description,
            endpoint: `${m.httpMethod.toUpperCase()} ${m.endpoint}`,
            ...(m.params ? { params: m.params } : {}),
            ...(m.response ? { response: m.response } : {}),
          });
        }
      } else {
        const c = original as ProseChunk;
        fullResults.push({
          content: c.content,
          ...(c.source ? { source: c.source } : {}),
        });
      }
    }

    let totalLength = 0;
    const results: (string | Record<string, unknown>)[] = [];
    for (const result of fullResults) {
      const len = typeof result === 'string' ? result.length : JSON.stringify(result).length;
      totalLength += len;
      if (totalLength > maxLength) break;
      results.push(result);
    }

    if (results.length < fullResults.length) {
      results.unshift(`Truncated; showing ${results.length} of ${fullResults.length} results.`);
    }

    return { results };
  }

  private indexMethods(methods: MethodEntry[]): void {
    const docs: MiniSearchDocument[] = methods.map((m, i) => ({
      id: `method-${i}`,
      kind: 'http_method' as const,
      name: m.name,
      endpoint: m.endpoint,
      summary: m.summary,
      description: m.description,
      qualified: m.qualified,
      stainlessPath: m.stainlessPath,
      _original: m as unknown as Record<string, unknown>,
    }));
    if (docs.length > 0) {
      this.methodIndex.addAll(docs);
    }
  }

  private async loadDocsDirectory(docsDir: string): Promise<void> {
    let entries;
    try {
      entries = await fs.readdir(docsDir, { withFileTypes: true });
    } catch (err) {
      getLogger().warn({ err, docsDir }, 'Could not read docs directory');
      return;
    }

    const files = entries
      .filter((e) => e.isFile())
      .filter((e) => e.name.endsWith('.md') || e.name.endsWith('.markdown') || e.name.endsWith('.json'));

    for (const file of files) {
      try {
        const filePath = path.join(docsDir, file.name);
        const content = await fs.readFile(filePath, 'utf-8');

        if (file.name.endsWith('.json')) {
          const texts = extractTexts(JSON.parse(content));
          if (texts.length > 0) {
            this.indexProse(texts.join('\n\n'), file.name);
          }
        } else {
          this.indexProse(content, file.name);
        }
      } catch (err) {
        getLogger().warn({ err, file: file.name }, 'Failed to index docs file');
      }
    }
  }

  private indexProse(markdown: string, source: string): void {
    const chunks = chunkMarkdown(markdown);
    const baseId = this.proseIndex.documentCount;

    const docs: MiniSearchDocument[] = chunks.map((chunk, i) => ({
      id: `prose-${baseId + i}`,
      kind: 'prose' as const,
      content: chunk.content,
      ...(chunk.sectionContext != null ? { sectionContext: chunk.sectionContext } : {}),
      _original: { ...chunk, source } as unknown as Record<string, unknown>,
    }));

    if (docs.length > 0) {
      this.proseIndex.addAll(docs);
    }
  }
}

/** Lightweight markdown chunker — splits on headers, chunks by word count. */
function chunkMarkdown(markdown: string): { content: string; tag: string; sectionContext?: string }[] {
  // Strip YAML frontmatter
  const stripped = markdown.replace(/^---\n[\s\S]*?\n---\n?/, '');
  const lines = stripped.split('\n');

  const chunks: { content: string; tag: string; sectionContext?: string }[] = [];
  const headers: string[] = [];
  let current: string[] = [];

  const flush = () => {
    const text = current.join('\n').trim();
    if (!text) return;
    const sectionContext = headers.length > 0 ? headers.join(' > ') : undefined;
    // Split into ~200-word chunks
    const words = text.split(/\s+/);
    for (let i = 0; i < words.length; i += 200) {
      const slice = words.slice(i, i + 200).join(' ');
      if (slice) {
        chunks.push({ content: slice, tag: 'p', ...(sectionContext != null ? { sectionContext } : {}) });
      }
    }
    current = [];
  };

  for (const line of lines) {
    const headerMatch = line.match(/^(#{1,6})\s+(.+)/);
    if (headerMatch) {
      flush();
      const level = headerMatch[1]!.length;
      const text = headerMatch[2]!.trim();
      while (headers.length >= level) headers.pop();
      headers.push(text);
    } else {
      current.push(line);
    }
  }
  flush();

  return chunks;
}

/** Recursively extracts string values from a JSON structure. */
function extractTexts(data: unknown, depth = 0): string[] {
  if (depth > 10) return [];
  if (typeof data === 'string') return data.trim() ? [data] : [];
  if (Array.isArray(data)) return data.flatMap((item) => extractTexts(item, depth + 1));
  if (typeof data === 'object' && data !== null) {
    return Object.values(data).flatMap((v) => extractTexts(v, depth + 1));
  }
  return [];
}
