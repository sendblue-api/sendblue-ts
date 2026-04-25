// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import MiniSearch from 'minisearch';
import * as fs from 'node:fs/promises';
import * as path from 'node:path';
import { getLogger } from './logger';

type PerLanguageData = {
  method?: string;
  example?: string;
};

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
  perLanguage?: Record<string, PerLanguageData>;
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
    "name": "list",
    "endpoint": "/api/v2/messages",
    "httpMethod": "get",
    "summary": "Get messages",
    "description": "Retrieve a list of messages for the authenticated account with comprehensive filtering capabilities.\nRate limited to 100 requests per 10 seconds per account.\n\n## Common Use Cases\n\n**Polling for inbound messages (no webhooks):**\n```\nGET /api/v2/messages?is_outbound=false&sendblue_number=+16292925296&order_by=createdAt&order_direction=desc&limit=50\n```\nTrack processed message IDs to avoid duplicates.\n\n**Get conversation with a specific contact:**\n```\nGET /api/v2/messages?number=+15551234567&order_by=createdAt&order_direction=desc\n```\n",
    "stainlessPath": "(resource) messages > (method) list",
    "qualified": "client.messages.list",
    "params": [
      "account_email?: string;",
      "created_at_gte?: string;",
      "created_at_lte?: string;",
      "from_number?: string;",
      "group_id?: string;",
      "is_outbound?: 'true' | 'false';",
      "limit?: number;",
      "message_type?: 'message' | 'group';",
      "number?: string;",
      "offset?: number;",
      "order_by?: 'createdAt' | 'updatedAt' | 'sentAt';",
      "order_direction?: 'asc' | 'desc';",
      "sendblue_number?: string;",
      "sent_at_gte?: string;",
      "sent_at_lte?: string;",
      "service?: 'iMessage' | 'SMS' | 'RCS';",
      "status?: string;",
      "to_number?: string;",
      "updated_at_gte?: string;",
      "updated_at_lte?: string;",
      "worker_id?: string;"
    ],
    "response": "{ data?: { accountEmail?: string; content?: string; date_sent?: string; date_updated?: string; error_code?: number; error_detail?: string; error_message?: string; error_reason?: string; from_number?: string; group_display_name?: string; group_id?: string; is_outbound?: boolean; media_url?: string; message_handle?: string; message_type?: 'message' | 'group'; number?: string; opted_out?: boolean; participants?: string[]; plan?: string; send_style?: string; sendblue_number?: string; service?: 'iMessage' | 'SMS' | 'RCS'; status?: string; to_number?: string; was_downgraded?: boolean; }[]; pagination?: { hasMore?: boolean; limit?: number; offset?: number; total?: number; }; status?: string; }",
    "markdown": "## list\n\n`client.messages.list(account_email?: string, created_at_gte?: string, created_at_lte?: string, from_number?: string, group_id?: string, is_outbound?: 'true' | 'false', limit?: number, message_type?: 'message' | 'group', number?: string, offset?: number, order_by?: 'createdAt' | 'updatedAt' | 'sentAt', order_direction?: 'asc' | 'desc', sendblue_number?: string, sent_at_gte?: string, sent_at_lte?: string, service?: 'iMessage' | 'SMS' | 'RCS', status?: string, to_number?: string, updated_at_gte?: string, updated_at_lte?: string, worker_id?: string): { data?: object[]; pagination?: object; status?: string; }`\n\n**get** `/api/v2/messages`\n\nRetrieve a list of messages for the authenticated account with comprehensive filtering capabilities.\nRate limited to 100 requests per 10 seconds per account.\n\n## Common Use Cases\n\n**Polling for inbound messages (no webhooks):**\n```\nGET /api/v2/messages?is_outbound=false&sendblue_number=+16292925296&order_by=createdAt&order_direction=desc&limit=50\n```\nTrack processed message IDs to avoid duplicates.\n\n**Get conversation with a specific contact:**\n```\nGET /api/v2/messages?number=+15551234567&order_by=createdAt&order_direction=desc\n```\n\n\n### Parameters\n\n- `account_email?: string`\n  Filter by account email\n\n- `created_at_gte?: string`\n  Filter messages created after this date (ISO 8601 format)\n\n- `created_at_lte?: string`\n  Filter messages created before this date (ISO 8601 format)\n\n- `from_number?: string`\n  Filter by sender phone number\n\n- `group_id?: string`\n  Filter by group ID\n\n- `is_outbound?: 'true' | 'false'`\n  Filter by message direction. Use `false` to get inbound messages (messages sent TO your Sendblue number).\n\n**To get inbound messages for polling:** Use `is_outbound=false` combined with `sendblue_number` or `to_number` set to your Sendblue phone number.\n\nNote: Do NOT use `message_type=inbound` - that parameter only accepts `message` or `group` values.\n\n- `limit?: number`\n  Maximum number of messages to return\n\n- `message_type?: 'message' | 'group'`\n  Filter by message type (1:1 vs group chat). Only accepts `message` or `group`.\n\n**Common mistake:** This is NOT for filtering inbound vs outbound messages. Use `is_outbound` parameter instead.\n\n- `number?: string`\n  Filter by any phone number (from or to)\n\n- `offset?: number`\n  Number of messages to skip\n\n- `order_by?: 'createdAt' | 'updatedAt' | 'sentAt'`\n  Field to order messages by\n\n- `order_direction?: 'asc' | 'desc'`\n  Sort order\n\n- `sendblue_number?: string`\n  Filter by Sendblue phone number\n\n- `sent_at_gte?: string`\n  Filter messages sent after this date (ISO 8601 format)\n\n- `sent_at_lte?: string`\n  Filter messages sent before this date (ISO 8601 format)\n\n- `service?: 'iMessage' | 'SMS' | 'RCS'`\n  Filter by service type\n\n- `status?: string`\n  Filter by message status\n\n- `to_number?: string`\n  Filter by recipient phone number\n\n- `updated_at_gte?: string`\n  Filter messages updated after this date (ISO 8601 format)\n\n- `updated_at_lte?: string`\n  Filter messages updated before this date (ISO 8601 format)\n\n- `worker_id?: string`\n  Filter by worker ID (Admin only)\n\n### Returns\n\n- `{ data?: { accountEmail?: string; content?: string; date_sent?: string; date_updated?: string; error_code?: number; error_detail?: string; error_message?: string; error_reason?: string; from_number?: string; group_display_name?: string; group_id?: string; is_outbound?: boolean; media_url?: string; message_handle?: string; message_type?: 'message' | 'group'; number?: string; opted_out?: boolean; participants?: string[]; plan?: string; send_style?: string; sendblue_number?: string; service?: 'iMessage' | 'SMS' | 'RCS'; status?: string; to_number?: string; was_downgraded?: boolean; }[]; pagination?: { hasMore?: boolean; limit?: number; offset?: number; total?: number; }; status?: string; }`\n\n  - `data?: { accountEmail?: string; content?: string; date_sent?: string; date_updated?: string; error_code?: number; error_detail?: string; error_message?: string; error_reason?: string; from_number?: string; group_display_name?: string; group_id?: string; is_outbound?: boolean; media_url?: string; message_handle?: string; message_type?: 'message' | 'group'; number?: string; opted_out?: boolean; participants?: string[]; plan?: string; send_style?: string; sendblue_number?: string; service?: 'iMessage' | 'SMS' | 'RCS'; status?: string; to_number?: string; was_downgraded?: boolean; }[]`\n  - `pagination?: { hasMore?: boolean; limit?: number; offset?: number; total?: number; }`\n  - `status?: string`\n\n### Example\n\n```typescript\nimport SendblueAPI from 'sendblue';\n\nconst client = new SendblueAPI();\n\nconst messages = await client.messages.list();\n\nconsole.log(messages);\n```",
    "perLanguage": {
      "typescript": {
        "method": "client.messages.list",
        "example": "import SendblueAPI from 'sendblue';\n\nconst client = new SendblueAPI({\n  apiKey: process.env['SENDBLUE_API_API_KEY'], // This is the default and can be omitted\n  apiSecret: process.env['SENDBLUE_API_API_SECRET'], // This is the default and can be omitted\n});\n\nconst messages = await client.messages.list();\n\nconsole.log(messages.data);"
      },
      "python": {
        "method": "messages.list",
        "example": "import os\nfrom sendblue_api import SendblueAPI\n\nclient = SendblueAPI(\n    api_key=os.environ.get(\"SENDBLUE_API_API_KEY\"),  # This is the default and can be omitted\n    api_secret=os.environ.get(\"SENDBLUE_API_API_SECRET\"),  # This is the default and can be omitted\n)\nmessages = client.messages.list()\nprint(messages.data)"
      },
      "http": {
        "example": "curl https://api.sendblue.co/api/v2/messages \\\n    -H \"sb-api-key-id: $SENDBLUE_API_API_KEY\" \\\n    -H \"sb-api-secret-key: $SENDBLUE_API_API_SECRET\""
      }
    }
  },
  {
    "name": "retrieve",
    "endpoint": "/api/v2/messages/{message_id}",
    "httpMethod": "get",
    "summary": "Get a specific message",
    "description": "Retrieve details of a specific message by its ID",
    "stainlessPath": "(resource) messages > (method) retrieve",
    "qualified": "client.messages.retrieve",
    "params": [
      "message_id: string;"
    ],
    "response": "{ data?: { accountEmail?: string; content?: string; date_sent?: string; date_updated?: string; error_code?: number; error_detail?: string; error_message?: string; error_reason?: string; from_number?: string; group_display_name?: string; group_id?: string; is_outbound?: boolean; media_url?: string; message_handle?: string; message_type?: 'message' | 'group'; number?: string; opted_out?: boolean; participants?: string[]; plan?: string; send_style?: string; sendblue_number?: string; service?: 'iMessage' | 'SMS' | 'RCS'; status?: string; to_number?: string; was_downgraded?: boolean; }; status?: string; }",
    "markdown": "## retrieve\n\n`client.messages.retrieve(message_id: string): { data?: object; status?: string; }`\n\n**get** `/api/v2/messages/{message_id}`\n\nRetrieve details of a specific message by its ID\n\n### Parameters\n\n- `message_id: string`\n\n### Returns\n\n- `{ data?: { accountEmail?: string; content?: string; date_sent?: string; date_updated?: string; error_code?: number; error_detail?: string; error_message?: string; error_reason?: string; from_number?: string; group_display_name?: string; group_id?: string; is_outbound?: boolean; media_url?: string; message_handle?: string; message_type?: 'message' | 'group'; number?: string; opted_out?: boolean; participants?: string[]; plan?: string; send_style?: string; sendblue_number?: string; service?: 'iMessage' | 'SMS' | 'RCS'; status?: string; to_number?: string; was_downgraded?: boolean; }; status?: string; }`\n\n  - `data?: { accountEmail?: string; content?: string; date_sent?: string; date_updated?: string; error_code?: number; error_detail?: string; error_message?: string; error_reason?: string; from_number?: string; group_display_name?: string; group_id?: string; is_outbound?: boolean; media_url?: string; message_handle?: string; message_type?: 'message' | 'group'; number?: string; opted_out?: boolean; participants?: string[]; plan?: string; send_style?: string; sendblue_number?: string; service?: 'iMessage' | 'SMS' | 'RCS'; status?: string; to_number?: string; was_downgraded?: boolean; }`\n  - `status?: string`\n\n### Example\n\n```typescript\nimport SendblueAPI from 'sendblue';\n\nconst client = new SendblueAPI();\n\nconst message = await client.messages.retrieve('msg_abc123def456');\n\nconsole.log(message);\n```",
    "perLanguage": {
      "typescript": {
        "method": "client.messages.retrieve",
        "example": "import SendblueAPI from 'sendblue';\n\nconst client = new SendblueAPI({\n  apiKey: process.env['SENDBLUE_API_API_KEY'], // This is the default and can be omitted\n  apiSecret: process.env['SENDBLUE_API_API_SECRET'], // This is the default and can be omitted\n});\n\nconst message = await client.messages.retrieve('msg_abc123def456');\n\nconsole.log(message.data);"
      },
      "python": {
        "method": "messages.retrieve",
        "example": "import os\nfrom sendblue_api import SendblueAPI\n\nclient = SendblueAPI(\n    api_key=os.environ.get(\"SENDBLUE_API_API_KEY\"),  # This is the default and can be omitted\n    api_secret=os.environ.get(\"SENDBLUE_API_API_SECRET\"),  # This is the default and can be omitted\n)\nmessage = client.messages.retrieve(\n    \"msg_abc123def456\",\n)\nprint(message.data)"
      },
      "http": {
        "example": "curl https://api.sendblue.co/api/v2/messages/$MESSAGE_ID \\\n    -H \"sb-api-key-id: $SENDBLUE_API_API_KEY\" \\\n    -H \"sb-api-secret-key: $SENDBLUE_API_API_SECRET\""
      }
    }
  },
  {
    "name": "send",
    "endpoint": "/api/send-message",
    "httpMethod": "post",
    "summary": "Send a message",
    "description": "Send an iMessage, SMS, or MMS to a single recipient",
    "stainlessPath": "(resource) messages > (method) send",
    "qualified": "client.messages.send",
    "params": [
      "content: string;",
      "from_number: string;",
      "number: string;",
      "media_url?: string;",
      "send_style?: string;",
      "status_callback?: string;"
    ],
    "response": "{ account_email?: string; content?: string; date_created?: string; date_updated?: string; error_code?: number; error_message?: string; from_number?: string; is_outbound?: boolean; media_url?: string; message_handle?: string; number?: string; send_style?: string; status?: 'QUEUED' | 'SENT' | 'DELIVERED' | 'ERROR'; }",
    "markdown": "## send\n\n`client.messages.send(content: string, from_number: string, number: string, media_url?: string, send_style?: string, status_callback?: string): { account_email?: string; content?: string; date_created?: string; date_updated?: string; error_code?: number; error_message?: string; from_number?: string; is_outbound?: boolean; media_url?: string; message_handle?: string; number?: string; send_style?: string; status?: 'QUEUED' | 'SENT' | 'DELIVERED' | 'ERROR'; }`\n\n**post** `/api/send-message`\n\nSend an iMessage, SMS, or MMS to a single recipient\n\n### Parameters\n\n- `content: string`\n  Message text content\n\n- `from_number: string`\n  **REQUIRED** - The phone number to send from. Must be one of your registered Sendblue phone numbers in E.164 format.\nWithout this parameter, the message will fail to send.\n\n\n- `number: string`\n  Recipient phone number in E.164 format\n\n- `media_url?: string`\n  URL of media file to send (images, videos, etc.)\n\n- `send_style?: string`\n  The iMessage expressive message style\n\n- `status_callback?: string`\n  Webhook URL for message status updates\n\n### Returns\n\n- `{ account_email?: string; content?: string; date_created?: string; date_updated?: string; error_code?: number; error_message?: string; from_number?: string; is_outbound?: boolean; media_url?: string; message_handle?: string; number?: string; send_style?: string; status?: 'QUEUED' | 'SENT' | 'DELIVERED' | 'ERROR'; }`\n\n  - `account_email?: string`\n  - `content?: string`\n  - `date_created?: string`\n  - `date_updated?: string`\n  - `error_code?: number`\n  - `error_message?: string`\n  - `from_number?: string`\n  - `is_outbound?: boolean`\n  - `media_url?: string`\n  - `message_handle?: string`\n  - `number?: string`\n  - `send_style?: string`\n  - `status?: 'QUEUED' | 'SENT' | 'DELIVERED' | 'ERROR'`\n\n### Example\n\n```typescript\nimport SendblueAPI from 'sendblue';\n\nconst client = new SendblueAPI();\n\nconst messageResponse = await client.messages.send({\n  content: 'Hello, World!',\n  from_number: '+19998887777',\n  number: '+19998887777',\n});\n\nconsole.log(messageResponse);\n```",
    "perLanguage": {
      "typescript": {
        "method": "client.messages.send",
        "example": "import SendblueAPI from 'sendblue';\n\nconst client = new SendblueAPI({\n  apiKey: process.env['SENDBLUE_API_API_KEY'], // This is the default and can be omitted\n  apiSecret: process.env['SENDBLUE_API_API_SECRET'], // This is the default and can be omitted\n});\n\nconst messageResponse = await client.messages.send({\n  content: 'Hello, World!',\n  from_number: '+19998887777',\n  number: '+19998887777',\n});\n\nconsole.log(messageResponse.account_email);"
      },
      "python": {
        "method": "messages.send",
        "example": "import os\nfrom sendblue_api import SendblueAPI\n\nclient = SendblueAPI(\n    api_key=os.environ.get(\"SENDBLUE_API_API_KEY\"),  # This is the default and can be omitted\n    api_secret=os.environ.get(\"SENDBLUE_API_API_SECRET\"),  # This is the default and can be omitted\n)\nmessage_response = client.messages.send(\n    content=\"Hello, World!\",\n    from_number=\"+19998887777\",\n    number=\"+19998887777\",\n)\nprint(message_response.account_email)"
      },
      "http": {
        "example": "curl https://api.sendblue.co/api/send-message \\\n    -H 'Content-Type: application/json' \\\n    -H \"sb-api-key-id: $SENDBLUE_API_API_KEY\" \\\n    -H \"sb-api-secret-key: $SENDBLUE_API_API_SECRET\" \\\n    -d '{\n          \"content\": \"Hello, World!\",\n          \"from_number\": \"+19998887777\",\n          \"number\": \"+19998887777\",\n          \"media_url\": \"https://example.com/image.jpg\",\n          \"send_style\": \"celebration\",\n          \"status_callback\": \"https://example.com/webhook\"\n        }'"
      }
    }
  },
  {
    "name": "get_status",
    "endpoint": "/api/status",
    "httpMethod": "get",
    "summary": "Get message status",
    "description": "Retrieve the current status of a message using its message handle. Useful for resolving pending message statuses and avoiding duplicate messages.\n",
    "stainlessPath": "(resource) messages > (method) get_status",
    "qualified": "client.messages.getStatus",
    "params": [
      "handle: string;"
    ],
    "response": "{ account_email?: string; content?: string; date_created?: string; date_updated?: string; error_code?: number; error_message?: string; from_number?: string; is_outbound?: boolean; media_url?: string; message_handle?: string; number?: string; send_style?: string; status?: 'QUEUED' | 'SENT' | 'DELIVERED' | 'ERROR'; }",
    "markdown": "## get_status\n\n`client.messages.getStatus(handle: string): { account_email?: string; content?: string; date_created?: string; date_updated?: string; error_code?: number; error_message?: string; from_number?: string; is_outbound?: boolean; media_url?: string; message_handle?: string; number?: string; send_style?: string; status?: 'QUEUED' | 'SENT' | 'DELIVERED' | 'ERROR'; }`\n\n**get** `/api/status`\n\nRetrieve the current status of a message using its message handle. Useful for resolving pending message statuses and avoiding duplicate messages.\n\n\n### Parameters\n\n- `handle: string`\n  The message handle of the message you want to check status for\n\n### Returns\n\n- `{ account_email?: string; content?: string; date_created?: string; date_updated?: string; error_code?: number; error_message?: string; from_number?: string; is_outbound?: boolean; media_url?: string; message_handle?: string; number?: string; send_style?: string; status?: 'QUEUED' | 'SENT' | 'DELIVERED' | 'ERROR'; }`\n\n  - `account_email?: string`\n  - `content?: string`\n  - `date_created?: string`\n  - `date_updated?: string`\n  - `error_code?: number`\n  - `error_message?: string`\n  - `from_number?: string`\n  - `is_outbound?: boolean`\n  - `media_url?: string`\n  - `message_handle?: string`\n  - `number?: string`\n  - `send_style?: string`\n  - `status?: 'QUEUED' | 'SENT' | 'DELIVERED' | 'ERROR'`\n\n### Example\n\n```typescript\nimport SendblueAPI from 'sendblue';\n\nconst client = new SendblueAPI();\n\nconst messageResponse = await client.messages.getStatus({ handle: 'msg_abc123def456' });\n\nconsole.log(messageResponse);\n```",
    "perLanguage": {
      "typescript": {
        "method": "client.messages.getStatus",
        "example": "import SendblueAPI from 'sendblue';\n\nconst client = new SendblueAPI({\n  apiKey: process.env['SENDBLUE_API_API_KEY'], // This is the default and can be omitted\n  apiSecret: process.env['SENDBLUE_API_API_SECRET'], // This is the default and can be omitted\n});\n\nconst messageResponse = await client.messages.getStatus({ handle: 'msg_abc123def456' });\n\nconsole.log(messageResponse.account_email);"
      },
      "python": {
        "method": "messages.get_status",
        "example": "import os\nfrom sendblue_api import SendblueAPI\n\nclient = SendblueAPI(\n    api_key=os.environ.get(\"SENDBLUE_API_API_KEY\"),  # This is the default and can be omitted\n    api_secret=os.environ.get(\"SENDBLUE_API_API_SECRET\"),  # This is the default and can be omitted\n)\nmessage_response = client.messages.get_status(\n    handle=\"msg_abc123def456\",\n)\nprint(message_response.account_email)"
      },
      "http": {
        "example": "curl https://api.sendblue.co/api/status \\\n    -H \"sb-api-key-id: $SENDBLUE_API_API_KEY\" \\\n    -H \"sb-api-secret-key: $SENDBLUE_API_API_SECRET\""
      }
    }
  },
  {
    "name": "send_message",
    "endpoint": "/api/send-group-message",
    "httpMethod": "post",
    "summary": "Send a group message",
    "description": "Send a message to a group of recipients (beta feature)",
    "stainlessPath": "(resource) groups > (method) send_message",
    "qualified": "client.groups.sendMessage",
    "params": [
      "content: string;",
      "from_number: string;",
      "group_id?: string;",
      "media_url?: string;",
      "numbers?: string[];"
    ],
    "response": "{ account_email?: string; content?: string; date_created?: string; date_updated?: string; error_code?: number; error_message?: string; from_number?: string; is_outbound?: boolean; media_url?: string; message_handle?: string; number?: string; send_style?: string; status?: 'QUEUED' | 'SENT' | 'DELIVERED' | 'ERROR'; }",
    "markdown": "## send_message\n\n`client.groups.sendMessage(content: string, from_number: string, group_id?: string, media_url?: string, numbers?: string[]): { account_email?: string; content?: string; date_created?: string; date_updated?: string; error_code?: number; error_message?: string; from_number?: string; is_outbound?: boolean; media_url?: string; message_handle?: string; number?: string; send_style?: string; status?: 'QUEUED' | 'SENT' | 'DELIVERED' | 'ERROR'; }`\n\n**post** `/api/send-group-message`\n\nSend a message to a group of recipients (beta feature)\n\n### Parameters\n\n- `content: string`\n  Message text content\n\n- `from_number: string`\n  **REQUIRED** - The phone number to send from. Must be one of your registered Sendblue phone numbers in E.164 format.\nWithout this parameter, the message will fail to send.\n\n\n- `group_id?: string`\n  Unique identifier for an existing group\n\n- `media_url?: string`\n  URL of media file to send\n\n- `numbers?: string[]`\n  Array of recipient phone numbers in E.164 format\n\n### Returns\n\n- `{ account_email?: string; content?: string; date_created?: string; date_updated?: string; error_code?: number; error_message?: string; from_number?: string; is_outbound?: boolean; media_url?: string; message_handle?: string; number?: string; send_style?: string; status?: 'QUEUED' | 'SENT' | 'DELIVERED' | 'ERROR'; }`\n\n  - `account_email?: string`\n  - `content?: string`\n  - `date_created?: string`\n  - `date_updated?: string`\n  - `error_code?: number`\n  - `error_message?: string`\n  - `from_number?: string`\n  - `is_outbound?: boolean`\n  - `media_url?: string`\n  - `message_handle?: string`\n  - `number?: string`\n  - `send_style?: string`\n  - `status?: 'QUEUED' | 'SENT' | 'DELIVERED' | 'ERROR'`\n\n### Example\n\n```typescript\nimport SendblueAPI from 'sendblue';\n\nconst client = new SendblueAPI();\n\nconst messageResponse = await client.groups.sendMessage({ content: 'Hello, everyone!', from_number: '+19998887777' });\n\nconsole.log(messageResponse);\n```",
    "perLanguage": {
      "typescript": {
        "method": "client.groups.sendMessage",
        "example": "import SendblueAPI from 'sendblue';\n\nconst client = new SendblueAPI({\n  apiKey: process.env['SENDBLUE_API_API_KEY'], // This is the default and can be omitted\n  apiSecret: process.env['SENDBLUE_API_API_SECRET'], // This is the default and can be omitted\n});\n\nconst messageResponse = await client.groups.sendMessage({\n  content: 'Hello, everyone!',\n  from_number: '+19998887777',\n});\n\nconsole.log(messageResponse.account_email);"
      },
      "python": {
        "method": "groups.send_message",
        "example": "import os\nfrom sendblue_api import SendblueAPI\n\nclient = SendblueAPI(\n    api_key=os.environ.get(\"SENDBLUE_API_API_KEY\"),  # This is the default and can be omitted\n    api_secret=os.environ.get(\"SENDBLUE_API_API_SECRET\"),  # This is the default and can be omitted\n)\nmessage_response = client.groups.send_message(\n    content=\"Hello, everyone!\",\n    from_number=\"+19998887777\",\n)\nprint(message_response.account_email)"
      },
      "http": {
        "example": "curl https://api.sendblue.co/api/send-group-message \\\n    -H 'Content-Type: application/json' \\\n    -H \"sb-api-key-id: $SENDBLUE_API_API_KEY\" \\\n    -H \"sb-api-secret-key: $SENDBLUE_API_API_SECRET\" \\\n    -d '{\n          \"content\": \"Hello, everyone!\",\n          \"from_number\": \"+19998887777\",\n          \"group_id\": \"group_123456\",\n          \"media_url\": \"https://example.com/image.jpg\",\n          \"numbers\": [\n            \"+19998887777\",\n            \"+18887776666\"\n          ]\n        }'"
      }
    }
  },
  {
    "name": "modify",
    "endpoint": "/api/modify-group",
    "httpMethod": "post",
    "summary": "Modify a group",
    "description": "Add or manage participants in a group chat (beta feature)",
    "stainlessPath": "(resource) groups > (method) modify",
    "qualified": "client.groups.modify",
    "params": [
      "group_id: string;",
      "modify_type: 'add_recipient';",
      "number: string;"
    ],
    "response": "{ message?: string; status?: string; }",
    "markdown": "## modify\n\n`client.groups.modify(group_id: string, modify_type: 'add_recipient', number: string): { message?: string; status?: string; }`\n\n**post** `/api/modify-group`\n\nAdd or manage participants in a group chat (beta feature)\n\n### Parameters\n\n- `group_id: string`\n  Group identifier\n\n- `modify_type: 'add_recipient'`\n  Type of modification to perform\n\n- `number: string`\n  Phone number to add/modify in E.164 format\n\n### Returns\n\n- `{ message?: string; status?: string; }`\n\n  - `message?: string`\n  - `status?: string`\n\n### Example\n\n```typescript\nimport SendblueAPI from 'sendblue';\n\nconst client = new SendblueAPI();\n\nconst response = await client.groups.modify({\n  group_id: 'group_123456',\n  modify_type: 'add_recipient',\n  number: '+19998887777',\n});\n\nconsole.log(response);\n```",
    "perLanguage": {
      "typescript": {
        "method": "client.groups.modify",
        "example": "import SendblueAPI from 'sendblue';\n\nconst client = new SendblueAPI({\n  apiKey: process.env['SENDBLUE_API_API_KEY'], // This is the default and can be omitted\n  apiSecret: process.env['SENDBLUE_API_API_SECRET'], // This is the default and can be omitted\n});\n\nconst response = await client.groups.modify({\n  group_id: 'group_123456',\n  modify_type: 'add_recipient',\n  number: '+19998887777',\n});\n\nconsole.log(response.message);"
      },
      "python": {
        "method": "groups.modify",
        "example": "import os\nfrom sendblue_api import SendblueAPI\n\nclient = SendblueAPI(\n    api_key=os.environ.get(\"SENDBLUE_API_API_KEY\"),  # This is the default and can be omitted\n    api_secret=os.environ.get(\"SENDBLUE_API_API_SECRET\"),  # This is the default and can be omitted\n)\nresponse = client.groups.modify(\n    group_id=\"group_123456\",\n    modify_type=\"add_recipient\",\n    number=\"+19998887777\",\n)\nprint(response.message)"
      },
      "http": {
        "example": "curl https://api.sendblue.co/api/modify-group \\\n    -H 'Content-Type: application/json' \\\n    -H \"sb-api-key-id: $SENDBLUE_API_API_KEY\" \\\n    -H \"sb-api-secret-key: $SENDBLUE_API_API_SECRET\" \\\n    -d '{\n          \"group_id\": \"group_123456\",\n          \"modify_type\": \"add_recipient\",\n          \"number\": \"+19998887777\"\n        }'"
      }
    }
  },
  {
    "name": "upload",
    "endpoint": "/api/upload-media-object",
    "httpMethod": "post",
    "summary": "Upload a media object",
    "description": "Upload a media file to Sendblue's CDN for use in messages",
    "stainlessPath": "(resource) media_objects > (method) upload",
    "qualified": "client.mediaObjects.upload",
    "params": [
      "media_url: string;"
    ],
    "response": "{ mediaObjectId?: string; message?: string; status?: string; }",
    "markdown": "## upload\n\n`client.mediaObjects.upload(media_url: string): { mediaObjectId?: string; message?: string; status?: string; }`\n\n**post** `/api/upload-media-object`\n\nUpload a media file to Sendblue's CDN for use in messages\n\n### Parameters\n\n- `media_url: string`\n  URL of the media file to upload\n\n### Returns\n\n- `{ mediaObjectId?: string; message?: string; status?: string; }`\n\n  - `mediaObjectId?: string`\n  - `message?: string`\n  - `status?: string`\n\n### Example\n\n```typescript\nimport SendblueAPI from 'sendblue';\n\nconst client = new SendblueAPI();\n\nconst response = await client.mediaObjects.upload({ media_url: 'https://example.com/image.jpg' });\n\nconsole.log(response);\n```",
    "perLanguage": {
      "typescript": {
        "method": "client.mediaObjects.upload",
        "example": "import SendblueAPI from 'sendblue';\n\nconst client = new SendblueAPI({\n  apiKey: process.env['SENDBLUE_API_API_KEY'], // This is the default and can be omitted\n  apiSecret: process.env['SENDBLUE_API_API_SECRET'], // This is the default and can be omitted\n});\n\nconst response = await client.mediaObjects.upload({ media_url: 'https://example.com/image.jpg' });\n\nconsole.log(response.mediaObjectId);"
      },
      "python": {
        "method": "media_objects.upload",
        "example": "import os\nfrom sendblue_api import SendblueAPI\n\nclient = SendblueAPI(\n    api_key=os.environ.get(\"SENDBLUE_API_API_KEY\"),  # This is the default and can be omitted\n    api_secret=os.environ.get(\"SENDBLUE_API_API_SECRET\"),  # This is the default and can be omitted\n)\nresponse = client.media_objects.upload(\n    media_url=\"https://example.com/image.jpg\",\n)\nprint(response.media_object_id)"
      },
      "http": {
        "example": "curl https://api.sendblue.co/api/upload-media-object \\\n    -H 'Content-Type: application/json' \\\n    -H \"sb-api-key-id: $SENDBLUE_API_API_KEY\" \\\n    -H \"sb-api-secret-key: $SENDBLUE_API_API_SECRET\" \\\n    -d '{\n          \"media_url\": \"https://example.com/image.jpg\"\n        }'"
      }
    }
  },
  {
    "name": "lookup_number",
    "endpoint": "/api/evaluate-service",
    "httpMethod": "get",
    "summary": "Lookup a phone number",
    "description": "Determine if a phone number supports iMessage or SMS. Useful for checking if a number is an iPhone, if it is real, or which provider to use.\n",
    "stainlessPath": "(resource) lookups > (method) lookup_number",
    "qualified": "client.lookups.lookupNumber",
    "params": [
      "number: string;"
    ],
    "response": "{ number?: string; service?: 'iMessage' | 'SMS'; }",
    "markdown": "## lookup_number\n\n`client.lookups.lookupNumber(number: string): { number?: string; service?: 'iMessage' | 'SMS'; }`\n\n**get** `/api/evaluate-service`\n\nDetermine if a phone number supports iMessage or SMS. Useful for checking if a number is an iPhone, if it is real, or which provider to use.\n\n\n### Parameters\n\n- `number: string`\n  The number you want to evaluate in E.164 format\n\n### Returns\n\n- `{ number?: string; service?: 'iMessage' | 'SMS'; }`\n\n  - `number?: string`\n  - `service?: 'iMessage' | 'SMS'`\n\n### Example\n\n```typescript\nimport SendblueAPI from 'sendblue';\n\nconst client = new SendblueAPI();\n\nconst response = await client.lookups.lookupNumber({ number: '+19999999999' });\n\nconsole.log(response);\n```",
    "perLanguage": {
      "typescript": {
        "method": "client.lookups.lookupNumber",
        "example": "import SendblueAPI from 'sendblue';\n\nconst client = new SendblueAPI({\n  apiKey: process.env['SENDBLUE_API_API_KEY'], // This is the default and can be omitted\n  apiSecret: process.env['SENDBLUE_API_API_SECRET'], // This is the default and can be omitted\n});\n\nconst response = await client.lookups.lookupNumber({ number: '+19999999999' });\n\nconsole.log(response.number);"
      },
      "python": {
        "method": "lookups.lookup_number",
        "example": "import os\nfrom sendblue_api import SendblueAPI\n\nclient = SendblueAPI(\n    api_key=os.environ.get(\"SENDBLUE_API_API_KEY\"),  # This is the default and can be omitted\n    api_secret=os.environ.get(\"SENDBLUE_API_API_SECRET\"),  # This is the default and can be omitted\n)\nresponse = client.lookups.lookup_number(\n    number=\"+19999999999\",\n)\nprint(response.number)"
      },
      "http": {
        "example": "curl https://api.sendblue.co/api/evaluate-service \\\n    -H \"sb-api-key-id: $SENDBLUE_API_API_KEY\" \\\n    -H \"sb-api-secret-key: $SENDBLUE_API_API_SECRET\""
      }
    }
  },
  {
    "name": "send",
    "endpoint": "/api/send-typing-indicator",
    "httpMethod": "post",
    "summary": "Send a typing indicator",
    "description": "Send an indication that you are typing to a user. This shows up as the animated three dots on the recipient's device. Not supported in group chats.\n",
    "stainlessPath": "(resource) typing_indicators > (method) send",
    "qualified": "client.typingIndicators.send",
    "params": [
      "from_number: string;",
      "number: string;"
    ],
    "response": "{ error_message?: string; number?: string; status?: 'SENT' | 'ERROR'; }",
    "markdown": "## send\n\n`client.typingIndicators.send(from_number: string, number: string): { error_message?: string; number?: string; status?: 'SENT' | 'ERROR'; }`\n\n**post** `/api/send-typing-indicator`\n\nSend an indication that you are typing to a user. This shows up as the animated three dots on the recipient's device. Not supported in group chats.\n\n\n### Parameters\n\n- `from_number: string`\n  The Sendblue phone number you want to send the typing indicator from (E.164 format). This should be the number you use to send messages.\n\n- `number: string`\n  The number you want to send a typing indicator to (E.164 format)\n\n### Returns\n\n- `{ error_message?: string; number?: string; status?: 'SENT' | 'ERROR'; }`\n\n  - `error_message?: string`\n  - `number?: string`\n  - `status?: 'SENT' | 'ERROR'`\n\n### Example\n\n```typescript\nimport SendblueAPI from 'sendblue';\n\nconst client = new SendblueAPI();\n\nconst response = await client.typingIndicators.send({ from_number: '+16292925296', number: '+19998887777' });\n\nconsole.log(response);\n```",
    "perLanguage": {
      "typescript": {
        "method": "client.typingIndicators.send",
        "example": "import SendblueAPI from 'sendblue';\n\nconst client = new SendblueAPI({\n  apiKey: process.env['SENDBLUE_API_API_KEY'], // This is the default and can be omitted\n  apiSecret: process.env['SENDBLUE_API_API_SECRET'], // This is the default and can be omitted\n});\n\nconst response = await client.typingIndicators.send({\n  from_number: '+16292925296',\n  number: '+19998887777',\n});\n\nconsole.log(response.error_message);"
      },
      "python": {
        "method": "typing_indicators.send",
        "example": "import os\nfrom sendblue_api import SendblueAPI\n\nclient = SendblueAPI(\n    api_key=os.environ.get(\"SENDBLUE_API_API_KEY\"),  # This is the default and can be omitted\n    api_secret=os.environ.get(\"SENDBLUE_API_API_SECRET\"),  # This is the default and can be omitted\n)\nresponse = client.typing_indicators.send(\n    from_number=\"+16292925296\",\n    number=\"+19998887777\",\n)\nprint(response.error_message)"
      },
      "http": {
        "example": "curl https://api.sendblue.co/api/send-typing-indicator \\\n    -H 'Content-Type: application/json' \\\n    -H \"sb-api-key-id: $SENDBLUE_API_API_KEY\" \\\n    -H \"sb-api-secret-key: $SENDBLUE_API_API_SECRET\" \\\n    -d '{\n          \"from_number\": \"+16292925296\",\n          \"number\": \"+19998887777\"\n        }'"
      }
    }
  },
  {
    "name": "list",
    "endpoint": "/api/v2/contacts",
    "httpMethod": "get",
    "summary": "Get contacts",
    "description": "Retrieve a list of contacts for the authenticated account",
    "stainlessPath": "(resource) contacts > (method) list",
    "qualified": "client.contacts.list",
    "params": [
      "cid?: string;",
      "limit?: number;",
      "offset?: number;",
      "order_by?: string;",
      "order_direction?: 'asc' | 'desc';",
      "phone_number?: string;"
    ],
    "response": "{ assigned_to_email?: string; company_name?: string; created_at?: string; custom_variables?: object; first_name?: string; last_name?: string; opt_out?: boolean; phone?: string; sendblue_number?: string; tags?: string[]; verified?: boolean; }[]",
    "markdown": "## list\n\n`client.contacts.list(cid?: string, limit?: number, offset?: number, order_by?: string, order_direction?: 'asc' | 'desc', phone_number?: string): object[]`\n\n**get** `/api/v2/contacts`\n\nRetrieve a list of contacts for the authenticated account\n\n### Parameters\n\n- `cid?: string`\n  Filter by contact ID\n\n- `limit?: number`\n  Maximum number of contacts to return\n\n- `offset?: number`\n  Number of contacts to skip\n\n- `order_by?: string`\n  Field to sort by\n\n- `order_direction?: 'asc' | 'desc'`\n  Sort direction\n\n- `phone_number?: string`\n  Filter by phone number\n\n### Returns\n\n- `{ assigned_to_email?: string; company_name?: string; created_at?: string; custom_variables?: object; first_name?: string; last_name?: string; opt_out?: boolean; phone?: string; sendblue_number?: string; tags?: string[]; verified?: boolean; }[]`\n\n### Example\n\n```typescript\nimport SendblueAPI from 'sendblue';\n\nconst client = new SendblueAPI();\n\nconst contacts = await client.contacts.list();\n\nconsole.log(contacts);\n```",
    "perLanguage": {
      "typescript": {
        "method": "client.contacts.list",
        "example": "import SendblueAPI from 'sendblue';\n\nconst client = new SendblueAPI({\n  apiKey: process.env['SENDBLUE_API_API_KEY'], // This is the default and can be omitted\n  apiSecret: process.env['SENDBLUE_API_API_SECRET'], // This is the default and can be omitted\n});\n\nconst contacts = await client.contacts.list();\n\nconsole.log(contacts);"
      },
      "python": {
        "method": "contacts.list",
        "example": "import os\nfrom sendblue_api import SendblueAPI\n\nclient = SendblueAPI(\n    api_key=os.environ.get(\"SENDBLUE_API_API_KEY\"),  # This is the default and can be omitted\n    api_secret=os.environ.get(\"SENDBLUE_API_API_SECRET\"),  # This is the default and can be omitted\n)\ncontacts = client.contacts.list()\nprint(contacts)"
      },
      "http": {
        "example": "curl https://api.sendblue.co/api/v2/contacts \\\n    -H \"sb-api-key-id: $SENDBLUE_API_API_KEY\" \\\n    -H \"sb-api-secret-key: $SENDBLUE_API_API_SECRET\""
      }
    }
  },
  {
    "name": "create",
    "endpoint": "/api/v2/contacts",
    "httpMethod": "post",
    "summary": "Create a contact",
    "description": "Create a new contact or update existing if update_if_exists is true",
    "stainlessPath": "(resource) contacts > (method) create",
    "qualified": "client.contacts.create",
    "params": [
      "number: string;",
      "assigned_to_email?: string;",
      "assignedToEmail?: string;",
      "custom_variables?: object;",
      "first_name?: string;",
      "firstName?: string;",
      "last_name?: string;",
      "lastName?: string;",
      "phone_number?: string;",
      "phoneNumber?: string;",
      "sendblue_number?: string;",
      "sendblueNumber?: string;",
      "tags?: string[];",
      "update_if_exists?: boolean;"
    ],
    "response": "{ contact?: { assigned_to_email?: string; company_name?: string; created_at?: string; custom_variables?: object; first_name?: string; last_name?: string; opt_out?: boolean; phone?: string; sendblue_number?: string; tags?: string[]; verified?: boolean; }; status?: string; }",
    "markdown": "## create\n\n`client.contacts.create(number: string, assigned_to_email?: string, assignedToEmail?: string, custom_variables?: object, first_name?: string, firstName?: string, last_name?: string, lastName?: string, phone_number?: string, phoneNumber?: string, sendblue_number?: string, sendblueNumber?: string, tags?: string[], update_if_exists?: boolean): { contact?: contact; status?: string; }`\n\n**post** `/api/v2/contacts`\n\nCreate a new contact or update existing if update_if_exists is true\n\n### Parameters\n\n- `number: string`\n  Contact's phone number in E.164 format (preferred)\n\n- `assigned_to_email?: string`\n  Email of assigned user (preferred)\n\n- `assignedToEmail?: string`\n  Email of assigned user (deprecated, use assigned_to_email)\n\n- `custom_variables?: object`\n  Custom key-value pairs. Keys are human-readable labels; new labels are auto-created.\n\n- `first_name?: string`\n  Contact's first name (preferred)\n\n- `firstName?: string`\n  Contact's first name (deprecated, use first_name)\n\n- `last_name?: string`\n  Contact's last name (preferred)\n\n- `lastName?: string`\n  Contact's last name (deprecated, use last_name)\n\n- `phone_number?: string`\n  Contact's phone number (deprecated, use number)\n\n- `phoneNumber?: string`\n  Contact's phone number (deprecated, use number)\n\n- `sendblue_number?: string`\n  Associated Sendblue phone number to send with (preferred)\n\n- `sendblueNumber?: string`\n  Associated Sendblue phone number (deprecated, use sendblue_number)\n\n- `tags?: string[]`\n  Tags for the contact\n\n- `update_if_exists?: boolean`\n  If true, updates the contact if it already exists\n\n### Returns\n\n- `{ contact?: { assigned_to_email?: string; company_name?: string; created_at?: string; custom_variables?: object; first_name?: string; last_name?: string; opt_out?: boolean; phone?: string; sendblue_number?: string; tags?: string[]; verified?: boolean; }; status?: string; }`\n\n  - `contact?: { assigned_to_email?: string; company_name?: string; created_at?: string; custom_variables?: object; first_name?: string; last_name?: string; opt_out?: boolean; phone?: string; sendblue_number?: string; tags?: string[]; verified?: boolean; }`\n  - `status?: string`\n\n### Example\n\n```typescript\nimport SendblueAPI from 'sendblue';\n\nconst client = new SendblueAPI();\n\nconst contact = await client.contacts.create({ number: 'number' });\n\nconsole.log(contact);\n```",
    "perLanguage": {
      "typescript": {
        "method": "client.contacts.create",
        "example": "import SendblueAPI from 'sendblue';\n\nconst client = new SendblueAPI({\n  apiKey: process.env['SENDBLUE_API_API_KEY'], // This is the default and can be omitted\n  apiSecret: process.env['SENDBLUE_API_API_SECRET'], // This is the default and can be omitted\n});\n\nconst contact = await client.contacts.create({ number: 'number' });\n\nconsole.log(contact.contact);"
      },
      "python": {
        "method": "contacts.create",
        "example": "import os\nfrom sendblue_api import SendblueAPI\n\nclient = SendblueAPI(\n    api_key=os.environ.get(\"SENDBLUE_API_API_KEY\"),  # This is the default and can be omitted\n    api_secret=os.environ.get(\"SENDBLUE_API_API_SECRET\"),  # This is the default and can be omitted\n)\ncontact = client.contacts.create(\n    number=\"number\",\n)\nprint(contact.contact)"
      },
      "http": {
        "example": "curl https://api.sendblue.co/api/v2/contacts \\\n    -H 'Content-Type: application/json' \\\n    -H \"sb-api-key-id: $SENDBLUE_API_API_KEY\" \\\n    -H \"sb-api-secret-key: $SENDBLUE_API_API_SECRET\" \\\n    -d '{\n          \"number\": \"number\",\n          \"custom_variables\": {\n            \"Lead Source\": \"Website\"\n          }\n        }'"
      }
    }
  },
  {
    "name": "count",
    "endpoint": "/api/v2/contacts/count",
    "httpMethod": "get",
    "summary": "Get contact count",
    "description": "Get the total number of contacts",
    "stainlessPath": "(resource) contacts > (method) count",
    "qualified": "client.contacts.count",
    "response": "{ count?: number; }",
    "markdown": "## count\n\n`client.contacts.count(): { count?: number; }`\n\n**get** `/api/v2/contacts/count`\n\nGet the total number of contacts\n\n### Returns\n\n- `{ count?: number; }`\n\n  - `count?: number`\n\n### Example\n\n```typescript\nimport SendblueAPI from 'sendblue';\n\nconst client = new SendblueAPI();\n\nconst response = await client.contacts.count();\n\nconsole.log(response);\n```",
    "perLanguage": {
      "typescript": {
        "method": "client.contacts.count",
        "example": "import SendblueAPI from 'sendblue';\n\nconst client = new SendblueAPI({\n  apiKey: process.env['SENDBLUE_API_API_KEY'], // This is the default and can be omitted\n  apiSecret: process.env['SENDBLUE_API_API_SECRET'], // This is the default and can be omitted\n});\n\nconst response = await client.contacts.count();\n\nconsole.log(response.count);"
      },
      "python": {
        "method": "contacts.count",
        "example": "import os\nfrom sendblue_api import SendblueAPI\n\nclient = SendblueAPI(\n    api_key=os.environ.get(\"SENDBLUE_API_API_KEY\"),  # This is the default and can be omitted\n    api_secret=os.environ.get(\"SENDBLUE_API_API_SECRET\"),  # This is the default and can be omitted\n)\nresponse = client.contacts.count()\nprint(response.count)"
      },
      "http": {
        "example": "curl https://api.sendblue.co/api/v2/contacts/count \\\n    -H \"sb-api-key-id: $SENDBLUE_API_API_KEY\" \\\n    -H \"sb-api-secret-key: $SENDBLUE_API_API_SECRET\""
      }
    }
  },
  {
    "name": "verify",
    "endpoint": "/api/v2/contacts/verify",
    "httpMethod": "post",
    "summary": "Verify a contact",
    "description": "Send a verification message to a contact",
    "stainlessPath": "(resource) contacts > (method) verify",
    "qualified": "client.contacts.verify",
    "params": [
      "number: string;"
    ],
    "response": "{ status?: string; }",
    "markdown": "## verify\n\n`client.contacts.verify(number: string): { status?: string; }`\n\n**post** `/api/v2/contacts/verify`\n\nSend a verification message to a contact\n\n### Parameters\n\n- `number: string`\n  Phone number to verify\n\n### Returns\n\n- `{ status?: string; }`\n\n  - `status?: string`\n\n### Example\n\n```typescript\nimport SendblueAPI from 'sendblue';\n\nconst client = new SendblueAPI();\n\nconst response = await client.contacts.verify({ number: 'number' });\n\nconsole.log(response);\n```",
    "perLanguage": {
      "typescript": {
        "method": "client.contacts.verify",
        "example": "import SendblueAPI from 'sendblue';\n\nconst client = new SendblueAPI({\n  apiKey: process.env['SENDBLUE_API_API_KEY'], // This is the default and can be omitted\n  apiSecret: process.env['SENDBLUE_API_API_SECRET'], // This is the default and can be omitted\n});\n\nconst response = await client.contacts.verify({ number: 'number' });\n\nconsole.log(response.status);"
      },
      "python": {
        "method": "contacts.verify",
        "example": "import os\nfrom sendblue_api import SendblueAPI\n\nclient = SendblueAPI(\n    api_key=os.environ.get(\"SENDBLUE_API_API_KEY\"),  # This is the default and can be omitted\n    api_secret=os.environ.get(\"SENDBLUE_API_API_SECRET\"),  # This is the default and can be omitted\n)\nresponse = client.contacts.verify(\n    number=\"number\",\n)\nprint(response.status)"
      },
      "http": {
        "example": "curl https://api.sendblue.co/api/v2/contacts/verify \\\n    -H 'Content-Type: application/json' \\\n    -H \"sb-api-key-id: $SENDBLUE_API_API_KEY\" \\\n    -H \"sb-api-secret-key: $SENDBLUE_API_API_SECRET\" \\\n    -d '{\n          \"number\": \"number\"\n        }'"
      }
    }
  },
  {
    "name": "retrieve",
    "endpoint": "/api/v2/contacts/{phone_number}",
    "httpMethod": "get",
    "summary": "Get a contact",
    "description": "Retrieve a specific contact by phone number",
    "stainlessPath": "(resource) contacts > (method) retrieve",
    "qualified": "client.contacts.retrieve",
    "params": [
      "phone_number: string;"
    ],
    "response": "{ contact?: { assigned_to_email?: string; company_name?: string; created_at?: string; custom_variables?: object; first_name?: string; last_name?: string; opt_out?: boolean; phone?: string; sendblue_number?: string; tags?: string[]; verified?: boolean; }; status?: string; }",
    "markdown": "## retrieve\n\n`client.contacts.retrieve(phone_number: string): { contact?: contact; status?: string; }`\n\n**get** `/api/v2/contacts/{phone_number}`\n\nRetrieve a specific contact by phone number\n\n### Parameters\n\n- `phone_number: string`\n\n### Returns\n\n- `{ contact?: { assigned_to_email?: string; company_name?: string; created_at?: string; custom_variables?: object; first_name?: string; last_name?: string; opt_out?: boolean; phone?: string; sendblue_number?: string; tags?: string[]; verified?: boolean; }; status?: string; }`\n\n  - `contact?: { assigned_to_email?: string; company_name?: string; created_at?: string; custom_variables?: object; first_name?: string; last_name?: string; opt_out?: boolean; phone?: string; sendblue_number?: string; tags?: string[]; verified?: boolean; }`\n  - `status?: string`\n\n### Example\n\n```typescript\nimport SendblueAPI from 'sendblue';\n\nconst client = new SendblueAPI();\n\nconst contact = await client.contacts.retrieve('+1234567890');\n\nconsole.log(contact);\n```",
    "perLanguage": {
      "typescript": {
        "method": "client.contacts.retrieve",
        "example": "import SendblueAPI from 'sendblue';\n\nconst client = new SendblueAPI({\n  apiKey: process.env['SENDBLUE_API_API_KEY'], // This is the default and can be omitted\n  apiSecret: process.env['SENDBLUE_API_API_SECRET'], // This is the default and can be omitted\n});\n\nconst contact = await client.contacts.retrieve('+1234567890');\n\nconsole.log(contact.contact);"
      },
      "python": {
        "method": "contacts.retrieve",
        "example": "import os\nfrom sendblue_api import SendblueAPI\n\nclient = SendblueAPI(\n    api_key=os.environ.get(\"SENDBLUE_API_API_KEY\"),  # This is the default and can be omitted\n    api_secret=os.environ.get(\"SENDBLUE_API_API_SECRET\"),  # This is the default and can be omitted\n)\ncontact = client.contacts.retrieve(\n    \"+1234567890\",\n)\nprint(contact.contact)"
      },
      "http": {
        "example": "curl https://api.sendblue.co/api/v2/contacts/$PHONE_NUMBER \\\n    -H \"sb-api-key-id: $SENDBLUE_API_API_KEY\" \\\n    -H \"sb-api-secret-key: $SENDBLUE_API_API_SECRET\""
      }
    }
  },
  {
    "name": "update",
    "endpoint": "/api/v2/contacts/{phone_number}",
    "httpMethod": "put",
    "summary": "Update a contact",
    "description": "Update an existing contact. You may set SMS opt-out with `opt_out` (boolean); it updates the same recipient record used for inbound keyword opt-outs.",
    "stainlessPath": "(resource) contacts > (method) update",
    "qualified": "client.contacts.update",
    "params": [
      "phone_number: string;",
      "assigned_to_email?: string;",
      "assignedToEmail?: string;",
      "company_name?: string;",
      "companyName?: string;",
      "custom_variables?: object;",
      "first_name?: string;",
      "firstName?: string;",
      "last_name?: string;",
      "lastName?: string;",
      "opt_out?: boolean;",
      "optOut?: boolean;",
      "sendblue_number?: string;",
      "sendblueNumber?: string;",
      "tags?: string[];"
    ],
    "response": "{ contact?: { assigned_to_email?: string; company_name?: string; created_at?: string; custom_variables?: object; first_name?: string; last_name?: string; opt_out?: boolean; phone?: string; sendblue_number?: string; tags?: string[]; verified?: boolean; }; status?: string; }",
    "markdown": "## update\n\n`client.contacts.update(phone_number: string, assigned_to_email?: string, assignedToEmail?: string, company_name?: string, companyName?: string, custom_variables?: object, first_name?: string, firstName?: string, last_name?: string, lastName?: string, opt_out?: boolean, optOut?: boolean, sendblue_number?: string, sendblueNumber?: string, tags?: string[]): { contact?: contact; status?: string; }`\n\n**put** `/api/v2/contacts/{phone_number}`\n\nUpdate an existing contact. You may set SMS opt-out with `opt_out` (boolean); it updates the same recipient record used for inbound keyword opt-outs.\n\n### Parameters\n\n- `phone_number: string`\n\n- `assigned_to_email?: string`\n  Email of assigned user (preferred)\n\n- `assignedToEmail?: string`\n  Deprecated, use assigned_to_email\n\n- `company_name?: string`\n  Company name (preferred)\n\n- `companyName?: string`\n  Deprecated, use company_name\n\n- `custom_variables?: object`\n  Custom key-value pairs. Merged with existing variables (not replaced).\n\n- `first_name?: string`\n  Contact's first name (preferred)\n\n- `firstName?: string`\n  Deprecated, use first_name\n\n- `last_name?: string`\n  Contact's last name (preferred)\n\n- `lastName?: string`\n  Deprecated, use last_name\n\n- `opt_out?: boolean`\n  Whether the contact has opted out of SMS (updates the same recipient record used for inbound keyword opt-outs)\n\n- `optOut?: boolean`\n  Deprecated, use opt_out\n\n- `sendblue_number?: string`\n  Associated Sendblue phone number (preferred)\n\n- `sendblueNumber?: string`\n  Deprecated, use sendblue_number\n\n- `tags?: string[]`\n\n### Returns\n\n- `{ contact?: { assigned_to_email?: string; company_name?: string; created_at?: string; custom_variables?: object; first_name?: string; last_name?: string; opt_out?: boolean; phone?: string; sendblue_number?: string; tags?: string[]; verified?: boolean; }; status?: string; }`\n\n  - `contact?: { assigned_to_email?: string; company_name?: string; created_at?: string; custom_variables?: object; first_name?: string; last_name?: string; opt_out?: boolean; phone?: string; sendblue_number?: string; tags?: string[]; verified?: boolean; }`\n  - `status?: string`\n\n### Example\n\n```typescript\nimport SendblueAPI from 'sendblue';\n\nconst client = new SendblueAPI();\n\nconst contact = await client.contacts.update('+1234567890');\n\nconsole.log(contact);\n```",
    "perLanguage": {
      "typescript": {
        "method": "client.contacts.update",
        "example": "import SendblueAPI from 'sendblue';\n\nconst client = new SendblueAPI({\n  apiKey: process.env['SENDBLUE_API_API_KEY'], // This is the default and can be omitted\n  apiSecret: process.env['SENDBLUE_API_API_SECRET'], // This is the default and can be omitted\n});\n\nconst contact = await client.contacts.update('+1234567890');\n\nconsole.log(contact.contact);"
      },
      "python": {
        "method": "contacts.update",
        "example": "import os\nfrom sendblue_api import SendblueAPI\n\nclient = SendblueAPI(\n    api_key=os.environ.get(\"SENDBLUE_API_API_KEY\"),  # This is the default and can be omitted\n    api_secret=os.environ.get(\"SENDBLUE_API_API_SECRET\"),  # This is the default and can be omitted\n)\ncontact = client.contacts.update(\n    phone_number=\"+1234567890\",\n)\nprint(contact.contact)"
      },
      "http": {
        "example": "curl https://api.sendblue.co/api/v2/contacts/$PHONE_NUMBER \\\n    -X PUT \\\n    -H 'Content-Type: application/json' \\\n    -H \"sb-api-key-id: $SENDBLUE_API_API_KEY\" \\\n    -H \"sb-api-secret-key: $SENDBLUE_API_API_SECRET\" \\\n    -d '{\n          \"custom_variables\": {\n            \"Plan\": \"Premium\"\n          }\n        }'"
      }
    }
  },
  {
    "name": "delete",
    "endpoint": "/api/v2/contacts/{phone_number}",
    "httpMethod": "delete",
    "summary": "Delete a contact",
    "description": "Delete a specific contact",
    "stainlessPath": "(resource) contacts > (method) delete",
    "qualified": "client.contacts.delete",
    "params": [
      "phone_number: string;"
    ],
    "response": "{ status?: string; }",
    "markdown": "## delete\n\n`client.contacts.delete(phone_number: string): { status?: string; }`\n\n**delete** `/api/v2/contacts/{phone_number}`\n\nDelete a specific contact\n\n### Parameters\n\n- `phone_number: string`\n\n### Returns\n\n- `{ status?: string; }`\n\n  - `status?: string`\n\n### Example\n\n```typescript\nimport SendblueAPI from 'sendblue';\n\nconst client = new SendblueAPI();\n\nconst contact = await client.contacts.delete('+1234567890');\n\nconsole.log(contact);\n```",
    "perLanguage": {
      "typescript": {
        "method": "client.contacts.delete",
        "example": "import SendblueAPI from 'sendblue';\n\nconst client = new SendblueAPI({\n  apiKey: process.env['SENDBLUE_API_API_KEY'], // This is the default and can be omitted\n  apiSecret: process.env['SENDBLUE_API_API_SECRET'], // This is the default and can be omitted\n});\n\nconst contact = await client.contacts.delete('+1234567890');\n\nconsole.log(contact.status);"
      },
      "python": {
        "method": "contacts.delete",
        "example": "import os\nfrom sendblue_api import SendblueAPI\n\nclient = SendblueAPI(\n    api_key=os.environ.get(\"SENDBLUE_API_API_KEY\"),  # This is the default and can be omitted\n    api_secret=os.environ.get(\"SENDBLUE_API_API_SECRET\"),  # This is the default and can be omitted\n)\ncontact = client.contacts.delete(\n    \"+1234567890\",\n)\nprint(contact.status)"
      },
      "http": {
        "example": "curl https://api.sendblue.co/api/v2/contacts/$PHONE_NUMBER \\\n    -X DELETE \\\n    -H \"sb-api-key-id: $SENDBLUE_API_API_KEY\" \\\n    -H \"sb-api-secret-key: $SENDBLUE_API_API_SECRET\""
      }
    }
  },
  {
    "name": "opt_out",
    "endpoint": "/api/v2/contacts/opt-out",
    "httpMethod": "post",
    "summary": "Opt out a contact",
    "description": "Opt a contact out (or back in) from receiving messages. When a recipient is opted out,\noutbound messages to that number will be blocked.\n\nPass `opted_out: false` to opt a contact back in.\n",
    "stainlessPath": "(resource) contacts > (method) opt_out",
    "qualified": "client.contacts.optOut",
    "params": [
      "number: string;",
      "opted_out?: boolean;"
    ],
    "response": "{ number?: string; opted_out?: boolean; status?: string; }",
    "markdown": "## opt_out\n\n`client.contacts.optOut(number: string, opted_out?: boolean): { number?: string; opted_out?: boolean; status?: string; }`\n\n**post** `/api/v2/contacts/opt-out`\n\nOpt a contact out (or back in) from receiving messages. When a recipient is opted out,\noutbound messages to that number will be blocked.\n\nPass `opted_out: false` to opt a contact back in.\n\n\n### Parameters\n\n- `number: string`\n  Phone number in E.164 format\n\n- `opted_out?: boolean`\n  Set to false to opt the contact back in (defaults to true)\n\n### Returns\n\n- `{ number?: string; opted_out?: boolean; status?: string; }`\n\n  - `number?: string`\n  - `opted_out?: boolean`\n  - `status?: string`\n\n### Example\n\n```typescript\nimport SendblueAPI from 'sendblue';\n\nconst client = new SendblueAPI();\n\nconst response = await client.contacts.optOut({ number: '+14155551234' });\n\nconsole.log(response);\n```",
    "perLanguage": {
      "typescript": {
        "method": "client.contacts.optOut",
        "example": "import SendblueAPI from 'sendblue';\n\nconst client = new SendblueAPI({\n  apiKey: process.env['SENDBLUE_API_API_KEY'], // This is the default and can be omitted\n  apiSecret: process.env['SENDBLUE_API_API_SECRET'], // This is the default and can be omitted\n});\n\nconst response = await client.contacts.optOut({ number: '+14155551234' });\n\nconsole.log(response.number);"
      },
      "python": {
        "method": "contacts.opt_out",
        "example": "import os\nfrom sendblue_api import SendblueAPI\n\nclient = SendblueAPI(\n    api_key=os.environ.get(\"SENDBLUE_API_API_KEY\"),  # This is the default and can be omitted\n    api_secret=os.environ.get(\"SENDBLUE_API_API_SECRET\"),  # This is the default and can be omitted\n)\nresponse = client.contacts.opt_out(\n    number=\"+14155551234\",\n)\nprint(response.number)"
      },
      "http": {
        "example": "curl https://api.sendblue.co/api/v2/contacts/opt-out \\\n    -H 'Content-Type: application/json' \\\n    -H \"sb-api-key-id: $SENDBLUE_API_API_KEY\" \\\n    -H \"sb-api-secret-key: $SENDBLUE_API_API_SECRET\" \\\n    -d '{\n          \"number\": \"+14155551234\"\n        }'"
      }
    }
  },
  {
    "name": "delete",
    "endpoint": "/api/v2/contacts",
    "httpMethod": "delete",
    "summary": "Delete multiple contacts",
    "description": "Delete multiple contacts by their IDs",
    "stainlessPath": "(resource) contacts.bulk > (method) delete",
    "qualified": "client.contacts.bulk.delete",
    "params": [
      "contact_ids: string[];"
    ],
    "response": "{ amount?: number; status?: string; }",
    "markdown": "## delete\n\n`client.contacts.bulk.delete(contact_ids: string[]): { amount?: number; status?: string; }`\n\n**delete** `/api/v2/contacts`\n\nDelete multiple contacts by their IDs\n\n### Parameters\n\n- `contact_ids: string[]`\n  Array of phone numbers in E.164 format to delete\n\n### Returns\n\n- `{ amount?: number; status?: string; }`\n\n  - `amount?: number`\n  - `status?: string`\n\n### Example\n\n```typescript\nimport SendblueAPI from 'sendblue';\n\nconst client = new SendblueAPI();\n\nconst bulk = await client.contacts.bulk.delete({ contact_ids: ['+1234567890', '+0987654321'] });\n\nconsole.log(bulk);\n```",
    "perLanguage": {
      "typescript": {
        "method": "client.contacts.bulk.delete",
        "example": "import SendblueAPI from 'sendblue';\n\nconst client = new SendblueAPI({\n  apiKey: process.env['SENDBLUE_API_API_KEY'], // This is the default and can be omitted\n  apiSecret: process.env['SENDBLUE_API_API_SECRET'], // This is the default and can be omitted\n});\n\nconst bulk = await client.contacts.bulk.delete({ contact_ids: ['+1234567890', '+0987654321'] });\n\nconsole.log(bulk.amount);"
      },
      "python": {
        "method": "contacts.bulk.delete",
        "example": "import os\nfrom sendblue_api import SendblueAPI\n\nclient = SendblueAPI(\n    api_key=os.environ.get(\"SENDBLUE_API_API_KEY\"),  # This is the default and can be omitted\n    api_secret=os.environ.get(\"SENDBLUE_API_API_SECRET\"),  # This is the default and can be omitted\n)\nbulk = client.contacts.bulk.delete(\n    contact_ids=[\"+1234567890\", \"+0987654321\"],\n)\nprint(bulk.amount)"
      },
      "http": {
        "example": "curl https://api.sendblue.co/api/v2/contacts \\\n    -X DELETE \\\n    -H \"sb-api-key-id: $SENDBLUE_API_API_KEY\" \\\n    -H \"sb-api-secret-key: $SENDBLUE_API_API_SECRET\""
      }
    }
  },
  {
    "name": "create",
    "endpoint": "/api/v2/contacts/bulk",
    "httpMethod": "post",
    "summary": "Create multiple contacts",
    "description": "Create multiple contacts in bulk",
    "stainlessPath": "(resource) contacts.bulk > (method) create",
    "qualified": "client.contacts.bulk.create",
    "params": [
      "contacts: { phone: string; company_name?: string; custom_variables?: object; first_name?: string; last_name?: string; tags?: string[]; }[];"
    ],
    "response": "{ contacts?: { assigned_to_email?: string; company_name?: string; created_at?: string; custom_variables?: object; first_name?: string; last_name?: string; opt_out?: boolean; phone?: string; sendblue_number?: string; tags?: string[]; verified?: boolean; }[]; status?: string; }",
    "markdown": "## create\n\n`client.contacts.bulk.create(contacts: { phone: string; company_name?: string; custom_variables?: object; first_name?: string; last_name?: string; tags?: string[]; }[]): { contacts?: contact[]; status?: string; }`\n\n**post** `/api/v2/contacts/bulk`\n\nCreate multiple contacts in bulk\n\n### Parameters\n\n- `contacts: { phone: string; company_name?: string; custom_variables?: object; first_name?: string; last_name?: string; tags?: string[]; }[]`\n\n### Returns\n\n- `{ contacts?: { assigned_to_email?: string; company_name?: string; created_at?: string; custom_variables?: object; first_name?: string; last_name?: string; opt_out?: boolean; phone?: string; sendblue_number?: string; tags?: string[]; verified?: boolean; }[]; status?: string; }`\n\n  - `contacts?: { assigned_to_email?: string; company_name?: string; created_at?: string; custom_variables?: object; first_name?: string; last_name?: string; opt_out?: boolean; phone?: string; sendblue_number?: string; tags?: string[]; verified?: boolean; }[]`\n  - `status?: string`\n\n### Example\n\n```typescript\nimport SendblueAPI from 'sendblue';\n\nconst client = new SendblueAPI();\n\nconst bulk = await client.contacts.bulk.create({ contacts: [{ phone: 'phone' }] });\n\nconsole.log(bulk);\n```",
    "perLanguage": {
      "typescript": {
        "method": "client.contacts.bulk.create",
        "example": "import SendblueAPI from 'sendblue';\n\nconst client = new SendblueAPI({\n  apiKey: process.env['SENDBLUE_API_API_KEY'], // This is the default and can be omitted\n  apiSecret: process.env['SENDBLUE_API_API_SECRET'], // This is the default and can be omitted\n});\n\nconst bulk = await client.contacts.bulk.create({ contacts: [{ phone: 'phone' }] });\n\nconsole.log(bulk.contacts);"
      },
      "python": {
        "method": "contacts.bulk.create",
        "example": "import os\nfrom sendblue_api import SendblueAPI\n\nclient = SendblueAPI(\n    api_key=os.environ.get(\"SENDBLUE_API_API_KEY\"),  # This is the default and can be omitted\n    api_secret=os.environ.get(\"SENDBLUE_API_API_SECRET\"),  # This is the default and can be omitted\n)\nbulk = client.contacts.bulk.create(\n    contacts=[{\n        \"phone\": \"phone\"\n    }],\n)\nprint(bulk.contacts)"
      },
      "http": {
        "example": "curl https://api.sendblue.co/api/v2/contacts/bulk \\\n    -H 'Content-Type: application/json' \\\n    -H \"sb-api-key-id: $SENDBLUE_API_API_KEY\" \\\n    -H \"sb-api-secret-key: $SENDBLUE_API_API_SECRET\" \\\n    -d '{\n          \"contacts\": [\n            {\n              \"phone\": \"phone\"\n            }\n          ]\n        }'"
      }
    }
  },
  {
    "name": "list",
    "endpoint": "/api/account/webhooks",
    "httpMethod": "get",
    "summary": "Get webhooks",
    "description": "Get all webhooks configured for the authenticated account",
    "stainlessPath": "(resource) webhooks > (method) list",
    "qualified": "client.webhooks.list",
    "response": "{ status?: string; webhooks?: { call_log?: string | object[]; contact_created?: string[]; globalSecret?: string; line_assigned?: string | object[]; line_blocked?: string | object[]; outbound?: string | object[]; receive?: string | object[]; typing_indicator?: string | object[]; }; }",
    "markdown": "## list\n\n`client.webhooks.list(): { status?: string; webhooks?: object; }`\n\n**get** `/api/account/webhooks`\n\nGet all webhooks configured for the authenticated account\n\n### Returns\n\n- `{ status?: string; webhooks?: { call_log?: string | object[]; contact_created?: string[]; globalSecret?: string; line_assigned?: string | object[]; line_blocked?: string | object[]; outbound?: string | object[]; receive?: string | object[]; typing_indicator?: string | object[]; }; }`\n\n  - `status?: string`\n  - `webhooks?: { call_log?: string | { url: string; secret?: string; }[]; contact_created?: string[]; globalSecret?: string; line_assigned?: string | { url: string; secret?: string; }[]; line_blocked?: string | { url: string; secret?: string; }[]; outbound?: string | { url: string; secret?: string; }[]; receive?: string | { url: string; secret?: string; }[]; typing_indicator?: string | { url: string; secret?: string; }[]; }`\n\n### Example\n\n```typescript\nimport SendblueAPI from 'sendblue';\n\nconst client = new SendblueAPI();\n\nconst webhooks = await client.webhooks.list();\n\nconsole.log(webhooks);\n```",
    "perLanguage": {
      "typescript": {
        "method": "client.webhooks.list",
        "example": "import SendblueAPI from 'sendblue';\n\nconst client = new SendblueAPI({\n  apiKey: process.env['SENDBLUE_API_API_KEY'], // This is the default and can be omitted\n  apiSecret: process.env['SENDBLUE_API_API_SECRET'], // This is the default and can be omitted\n});\n\nconst webhooks = await client.webhooks.list();\n\nconsole.log(webhooks.status);"
      },
      "python": {
        "method": "webhooks.list",
        "example": "import os\nfrom sendblue_api import SendblueAPI\n\nclient = SendblueAPI(\n    api_key=os.environ.get(\"SENDBLUE_API_API_KEY\"),  # This is the default and can be omitted\n    api_secret=os.environ.get(\"SENDBLUE_API_API_SECRET\"),  # This is the default and can be omitted\n)\nwebhooks = client.webhooks.list()\nprint(webhooks.status)"
      },
      "http": {
        "example": "curl https://api.sendblue.co/api/account/webhooks \\\n    -H \"sb-api-key-id: $SENDBLUE_API_API_KEY\" \\\n    -H \"sb-api-secret-key: $SENDBLUE_API_API_SECRET\""
      }
    }
  },
  {
    "name": "create",
    "endpoint": "/api/account/webhooks",
    "httpMethod": "post",
    "summary": "Add webhooks",
    "description": "Add new webhooks to the account. Webhooks are appended to existing ones.",
    "stainlessPath": "(resource) webhooks > (method) create",
    "qualified": "client.webhooks.create",
    "params": [
      "webhooks: string | { url: string; secret?: string; }[];",
      "globalSecret?: string;",
      "type?: string;"
    ],
    "response": "{ message?: string; status?: string; webhooks?: { call_log?: string | object[]; contact_created?: string[]; globalSecret?: string; line_assigned?: string | object[]; line_blocked?: string | object[]; outbound?: string | object[]; receive?: string | object[]; typing_indicator?: string | object[]; }; }",
    "markdown": "## create\n\n`client.webhooks.create(webhooks: string | { url: string; secret?: string; }[], globalSecret?: string, type?: string): { message?: string; status?: string; webhooks?: object; }`\n\n**post** `/api/account/webhooks`\n\nAdd new webhooks to the account. Webhooks are appended to existing ones.\n\n### Parameters\n\n- `webhooks: string | { url: string; secret?: string; }[]`\n  Array of webhook URLs or webhook objects\n\n- `globalSecret?: string`\n  Global secret for webhook signature verification\n\n- `type?: string`\n  Type of webhook to add\n\n### Returns\n\n- `{ message?: string; status?: string; webhooks?: { call_log?: string | object[]; contact_created?: string[]; globalSecret?: string; line_assigned?: string | object[]; line_blocked?: string | object[]; outbound?: string | object[]; receive?: string | object[]; typing_indicator?: string | object[]; }; }`\n\n  - `message?: string`\n  - `status?: string`\n  - `webhooks?: { call_log?: string | { url: string; secret?: string; }[]; contact_created?: string[]; globalSecret?: string; line_assigned?: string | { url: string; secret?: string; }[]; line_blocked?: string | { url: string; secret?: string; }[]; outbound?: string | { url: string; secret?: string; }[]; receive?: string | { url: string; secret?: string; }[]; typing_indicator?: string | { url: string; secret?: string; }[]; }`\n\n### Example\n\n```typescript\nimport SendblueAPI from 'sendblue';\n\nconst client = new SendblueAPI();\n\nconst webhook = await client.webhooks.create({ webhooks: ['https://example.com'] });\n\nconsole.log(webhook);\n```",
    "perLanguage": {
      "typescript": {
        "method": "client.webhooks.create",
        "example": "import SendblueAPI from 'sendblue';\n\nconst client = new SendblueAPI({\n  apiKey: process.env['SENDBLUE_API_API_KEY'], // This is the default and can be omitted\n  apiSecret: process.env['SENDBLUE_API_API_SECRET'], // This is the default and can be omitted\n});\n\nconst webhook = await client.webhooks.create({ webhooks: ['https://example.com'] });\n\nconsole.log(webhook.message);"
      },
      "python": {
        "method": "webhooks.create",
        "example": "import os\nfrom sendblue_api import SendblueAPI\n\nclient = SendblueAPI(\n    api_key=os.environ.get(\"SENDBLUE_API_API_KEY\"),  # This is the default and can be omitted\n    api_secret=os.environ.get(\"SENDBLUE_API_API_SECRET\"),  # This is the default and can be omitted\n)\nwebhook = client.webhooks.create(\n    webhooks=[\"https://example.com\"],\n)\nprint(webhook.message)"
      },
      "http": {
        "example": "curl https://api.sendblue.co/api/account/webhooks \\\n    -H 'Content-Type: application/json' \\\n    -H \"sb-api-key-id: $SENDBLUE_API_API_KEY\" \\\n    -H \"sb-api-secret-key: $SENDBLUE_API_API_SECRET\" \\\n    -d '{\n          \"webhooks\": [\n            \"https://example.com\"\n          ]\n        }'"
      }
    }
  },
  {
    "name": "update",
    "endpoint": "/api/account/webhooks",
    "httpMethod": "put",
    "summary": "Replace webhooks",
    "description": "Replace all webhooks for the account. This overwrites existing webhooks.",
    "stainlessPath": "(resource) webhooks > (method) update",
    "qualified": "client.webhooks.update",
    "params": [
      "webhooks: { call_log?: string | { url: string; secret?: string; }[]; contact_created?: string[]; globalSecret?: string; line_assigned?: string | { url: string; secret?: string; }[]; line_blocked?: string | { url: string; secret?: string; }[]; outbound?: string | { url: string; secret?: string; }[]; receive?: string | { url: string; secret?: string; }[]; typing_indicator?: string | { url: string; secret?: string; }[]; };"
    ],
    "response": "{ message?: string; status?: string; webhooks?: { call_log?: string | object[]; contact_created?: string[]; globalSecret?: string; line_assigned?: string | object[]; line_blocked?: string | object[]; outbound?: string | object[]; receive?: string | object[]; typing_indicator?: string | object[]; }; }",
    "markdown": "## update\n\n`client.webhooks.update(webhooks: { call_log?: string | object[]; contact_created?: string[]; globalSecret?: string; line_assigned?: string | object[]; line_blocked?: string | object[]; outbound?: string | object[]; receive?: string | object[]; typing_indicator?: string | object[]; }): { message?: string; status?: string; webhooks?: object; }`\n\n**put** `/api/account/webhooks`\n\nReplace all webhooks for the account. This overwrites existing webhooks.\n\n### Parameters\n\n- `webhooks: { call_log?: string | { url: string; secret?: string; }[]; contact_created?: string[]; globalSecret?: string; line_assigned?: string | { url: string; secret?: string; }[]; line_blocked?: string | { url: string; secret?: string; }[]; outbound?: string | { url: string; secret?: string; }[]; receive?: string | { url: string; secret?: string; }[]; typing_indicator?: string | { url: string; secret?: string; }[]; }`\n  - `call_log?: string | { url: string; secret?: string; }[]`\n    Webhooks for call log events\n  - `contact_created?: string[]`\n    Webhooks for contact created events (URL strings only)\n  - `globalSecret?: string`\n    Global secret applied to all webhooks\n  - `line_assigned?: string | { url: string; secret?: string; }[]`\n    Webhooks for line assigned events\n  - `line_blocked?: string | { url: string; secret?: string; }[]`\n    Webhooks for line blocked events\n  - `outbound?: string | { url: string; secret?: string; }[]`\n    Webhooks for outbound message status updates\n  - `receive?: string | { url: string; secret?: string; }[]`\n    Webhooks for inbound message events\n  - `typing_indicator?: string | { url: string; secret?: string; }[]`\n    Webhooks for typing indicator events\n\n### Returns\n\n- `{ message?: string; status?: string; webhooks?: { call_log?: string | object[]; contact_created?: string[]; globalSecret?: string; line_assigned?: string | object[]; line_blocked?: string | object[]; outbound?: string | object[]; receive?: string | object[]; typing_indicator?: string | object[]; }; }`\n\n  - `message?: string`\n  - `status?: string`\n  - `webhooks?: { call_log?: string | { url: string; secret?: string; }[]; contact_created?: string[]; globalSecret?: string; line_assigned?: string | { url: string; secret?: string; }[]; line_blocked?: string | { url: string; secret?: string; }[]; outbound?: string | { url: string; secret?: string; }[]; receive?: string | { url: string; secret?: string; }[]; typing_indicator?: string | { url: string; secret?: string; }[]; }`\n\n### Example\n\n```typescript\nimport SendblueAPI from 'sendblue';\n\nconst client = new SendblueAPI();\n\nconst webhook = await client.webhooks.update({ webhooks: {} });\n\nconsole.log(webhook);\n```",
    "perLanguage": {
      "typescript": {
        "method": "client.webhooks.update",
        "example": "import SendblueAPI from 'sendblue';\n\nconst client = new SendblueAPI({\n  apiKey: process.env['SENDBLUE_API_API_KEY'], // This is the default and can be omitted\n  apiSecret: process.env['SENDBLUE_API_API_SECRET'], // This is the default and can be omitted\n});\n\nconst webhook = await client.webhooks.update({ webhooks: {} });\n\nconsole.log(webhook.message);"
      },
      "python": {
        "method": "webhooks.update",
        "example": "import os\nfrom sendblue_api import SendblueAPI\n\nclient = SendblueAPI(\n    api_key=os.environ.get(\"SENDBLUE_API_API_KEY\"),  # This is the default and can be omitted\n    api_secret=os.environ.get(\"SENDBLUE_API_API_SECRET\"),  # This is the default and can be omitted\n)\nwebhook = client.webhooks.update(\n    webhooks={},\n)\nprint(webhook.message)"
      },
      "http": {
        "example": "curl https://api.sendblue.co/api/account/webhooks \\\n    -X PUT \\\n    -H 'Content-Type: application/json' \\\n    -H \"sb-api-key-id: $SENDBLUE_API_API_KEY\" \\\n    -H \"sb-api-secret-key: $SENDBLUE_API_API_SECRET\" \\\n    -d '{\n          \"webhooks\": {}\n        }'"
      }
    }
  },
  {
    "name": "delete",
    "endpoint": "/api/account/webhooks",
    "httpMethod": "delete",
    "summary": "Delete webhooks",
    "description": "Delete specific webhooks from the account",
    "stainlessPath": "(resource) webhooks > (method) delete",
    "qualified": "client.webhooks.delete",
    "params": [
      "webhooks: string[];",
      "type?: string;"
    ],
    "response": "{ message?: string; status?: string; }",
    "markdown": "## delete\n\n`client.webhooks.delete(webhooks: string[], type?: string): { message?: string; status?: string; }`\n\n**delete** `/api/account/webhooks`\n\nDelete specific webhooks from the account\n\n### Parameters\n\n- `webhooks: string[]`\n  Array of webhook URLs to delete\n\n- `type?: string`\n  Type of webhook to delete from\n\n### Returns\n\n- `{ message?: string; status?: string; }`\n\n  - `message?: string`\n  - `status?: string`\n\n### Example\n\n```typescript\nimport SendblueAPI from 'sendblue';\n\nconst client = new SendblueAPI();\n\nconst webhook = await client.webhooks.delete({ webhooks: ['https://example.com'] });\n\nconsole.log(webhook);\n```",
    "perLanguage": {
      "typescript": {
        "method": "client.webhooks.delete",
        "example": "import SendblueAPI from 'sendblue';\n\nconst client = new SendblueAPI({\n  apiKey: process.env['SENDBLUE_API_API_KEY'], // This is the default and can be omitted\n  apiSecret: process.env['SENDBLUE_API_API_SECRET'], // This is the default and can be omitted\n});\n\nconst webhook = await client.webhooks.delete({ webhooks: ['https://example.com'] });\n\nconsole.log(webhook.message);"
      },
      "python": {
        "method": "webhooks.delete",
        "example": "import os\nfrom sendblue_api import SendblueAPI\n\nclient = SendblueAPI(\n    api_key=os.environ.get(\"SENDBLUE_API_API_KEY\"),  # This is the default and can be omitted\n    api_secret=os.environ.get(\"SENDBLUE_API_API_SECRET\"),  # This is the default and can be omitted\n)\nwebhook = client.webhooks.delete(\n    webhooks=[\"https://example.com\"],\n)\nprint(webhook.message)"
      },
      "http": {
        "example": "curl https://api.sendblue.co/api/account/webhooks \\\n    -X DELETE \\\n    -H \"sb-api-key-id: $SENDBLUE_API_API_KEY\" \\\n    -H \"sb-api-secret-key: $SENDBLUE_API_API_SECRET\""
      }
    }
  },
  {
    "name": "send",
    "endpoint": "/api/send-carousel",
    "httpMethod": "post",
    "summary": "Send a carousel message",
    "description": "Send a carousel of images to a single recipient. Requires a V2 (Mac Mini) line. The carousel must contain between 2 and 20 HTTPS image URLs. For sending a single image, use `/api/send-message` with `media_url` instead.\n",
    "stainlessPath": "(resource) send_carousel > (method) send",
    "qualified": "client.sendCarousel.send",
    "params": [
      "from_number: string;",
      "media_urls: string[];",
      "number: string;",
      "metadata?: object;",
      "send_style?: string;",
      "status_callback?: string;"
    ],
    "response": "{ accountEmail?: string; from_number?: string; is_outbound?: boolean; media_url?: string; message_handle?: string; message_type?: string; number?: string; status?: string; }",
    "markdown": "## send\n\n`client.sendCarousel.send(from_number: string, media_urls: string[], number: string, metadata?: object, send_style?: string, status_callback?: string): { accountEmail?: string; from_number?: string; is_outbound?: boolean; media_url?: string; message_handle?: string; message_type?: string; number?: string; status?: string; }`\n\n**post** `/api/send-carousel`\n\nSend a carousel of images to a single recipient. Requires a V2 (Mac Mini) line. The carousel must contain between 2 and 20 HTTPS image URLs. For sending a single image, use `/api/send-message` with `media_url` instead.\n\n\n### Parameters\n\n- `from_number: string`\n  Your Sendblue phone number in E.164 format (must be a V2/Mac Mini line)\n\n- `media_urls: string[]`\n  Array of HTTPS image URLs to send as a carousel (2-20 items)\n\n- `number: string`\n  Recipient phone number in E.164 format\n\n- `metadata?: object`\n  Additional metadata to attach to the message\n\n- `send_style?: string`\n  The iMessage expressive message style\n\n- `status_callback?: string`\n  Webhook URL for message status updates\n\n### Returns\n\n- `{ accountEmail?: string; from_number?: string; is_outbound?: boolean; media_url?: string; message_handle?: string; message_type?: string; number?: string; status?: string; }`\n\n  - `accountEmail?: string`\n  - `from_number?: string`\n  - `is_outbound?: boolean`\n  - `media_url?: string`\n  - `message_handle?: string`\n  - `message_type?: string`\n  - `number?: string`\n  - `status?: string`\n\n### Example\n\n```typescript\nimport SendblueAPI from 'sendblue';\n\nconst client = new SendblueAPI();\n\nconst response = await client.sendCarousel.send({\n  from_number: '+19998887777',\n  media_urls: ['https://example.com/image1.jpg', 'https://example.com/image2.jpg', 'https://example.com/image3.jpg'],\n  number: '+19998887777',\n});\n\nconsole.log(response);\n```",
    "perLanguage": {
      "typescript": {
        "method": "client.sendCarousel.send",
        "example": "import SendblueAPI from 'sendblue';\n\nconst client = new SendblueAPI({\n  apiKey: process.env['SENDBLUE_API_API_KEY'], // This is the default and can be omitted\n  apiSecret: process.env['SENDBLUE_API_API_SECRET'], // This is the default and can be omitted\n});\n\nconst response = await client.sendCarousel.send({\n  from_number: '+19998887777',\n  media_urls: [\n    'https://example.com/image1.jpg',\n    'https://example.com/image2.jpg',\n    'https://example.com/image3.jpg',\n  ],\n  number: '+19998887777',\n});\n\nconsole.log(response.accountEmail);"
      },
      "python": {
        "method": "send_carousel.send",
        "example": "import os\nfrom sendblue_api import SendblueAPI\n\nclient = SendblueAPI(\n    api_key=os.environ.get(\"SENDBLUE_API_API_KEY\"),  # This is the default and can be omitted\n    api_secret=os.environ.get(\"SENDBLUE_API_API_SECRET\"),  # This is the default and can be omitted\n)\nresponse = client.send_carousel.send(\n    from_number=\"+19998887777\",\n    media_urls=[\"https://example.com/image1.jpg\", \"https://example.com/image2.jpg\", \"https://example.com/image3.jpg\"],\n    number=\"+19998887777\",\n)\nprint(response.account_email)"
      },
      "http": {
        "example": "curl https://api.sendblue.co/api/send-carousel \\\n    -H 'Content-Type: application/json' \\\n    -H \"sb-api-key-id: $SENDBLUE_API_API_KEY\" \\\n    -H \"sb-api-secret-key: $SENDBLUE_API_API_SECRET\" \\\n    -d '{\n          \"from_number\": \"+19998887777\",\n          \"media_urls\": [\n            \"https://example.com/image1.jpg\",\n            \"https://example.com/image2.jpg\",\n            \"https://example.com/image3.jpg\"\n          ],\n          \"number\": \"+19998887777\",\n          \"send_style\": \"celebration\",\n          \"status_callback\": \"https://example.com/webhook\"\n        }'"
      }
    }
  },
  {
    "name": "get_code",
    "endpoint": "/api/v2/totp/code/{secret_id}",
    "httpMethod": "get",
    "summary": "Get current TOTP code",
    "description": "Generate the current 6- or 8-digit TOTP code for a stored secret, along with how many seconds remain until it rotates.",
    "stainlessPath": "(resource) v2.totp > (method) get_code",
    "qualified": "client.v2.totp.getCode",
    "params": [
      "secret_id: string;"
    ],
    "response": "{ code?: string; expires_in?: number; status?: string; }",
    "markdown": "## get_code\n\n`client.v2.totp.getCode(secret_id: string): { code?: string; expires_in?: number; status?: string; }`\n\n**get** `/api/v2/totp/code/{secret_id}`\n\nGenerate the current 6- or 8-digit TOTP code for a stored secret, along with how many seconds remain until it rotates.\n\n### Parameters\n\n- `secret_id: string`\n\n### Returns\n\n- `{ code?: string; expires_in?: number; status?: string; }`\n\n  - `code?: string`\n  - `expires_in?: number`\n  - `status?: string`\n\n### Example\n\n```typescript\nimport SendblueAPI from 'sendblue';\n\nconst client = new SendblueAPI();\n\nconst response = await client.v2.totp.getCode('550e8400-e29b-41d4-a716-446655440000');\n\nconsole.log(response);\n```",
    "perLanguage": {
      "typescript": {
        "method": "client.v2.totp.getCode",
        "example": "import SendblueAPI from 'sendblue';\n\nconst client = new SendblueAPI({\n  apiKey: process.env['SENDBLUE_API_API_KEY'], // This is the default and can be omitted\n  apiSecret: process.env['SENDBLUE_API_API_SECRET'], // This is the default and can be omitted\n});\n\nconst response = await client.v2.totp.getCode('550e8400-e29b-41d4-a716-446655440000');\n\nconsole.log(response.code);"
      },
      "python": {
        "method": "v2.totp.get_code",
        "example": "import os\nfrom sendblue_api import SendblueAPI\n\nclient = SendblueAPI(\n    api_key=os.environ.get(\"SENDBLUE_API_API_KEY\"),  # This is the default and can be omitted\n    api_secret=os.environ.get(\"SENDBLUE_API_API_SECRET\"),  # This is the default and can be omitted\n)\nresponse = client.v2.totp.get_code(\n    \"550e8400-e29b-41d4-a716-446655440000\",\n)\nprint(response.code)"
      },
      "http": {
        "example": "curl https://api.sendblue.co/api/v2/totp/code/$SECRET_ID \\\n    -H \"sb-api-key-id: $SENDBLUE_API_API_KEY\" \\\n    -H \"sb-api-secret-key: $SENDBLUE_API_API_SECRET\""
      }
    }
  },
  {
    "name": "create",
    "endpoint": "/api/v2/totp/secrets",
    "httpMethod": "post",
    "summary": "Register a TOTP secret",
    "description": "Store an encrypted TOTP secret for your account. Agents can use this instead of a phone-based authenticator app.\n\nProvide either:\n- A `uri` (the `otpauth://` URI from a QR code scan), which auto-populates all fields\n- A base32 `secret` with optional `label`, `issuer`, `algorithm`, `digits`, and `period`\n",
    "stainlessPath": "(resource) v2.totp.secrets > (method) create",
    "qualified": "client.v2.totp.secrets.create",
    "params": [
      "algorithm?: 'SHA1' | 'SHA256' | 'SHA512';",
      "digits?: 6 | 8;",
      "issuer?: string;",
      "label?: string;",
      "period?: number;",
      "secret?: string;",
      "uri?: string;"
    ],
    "response": "{ status?: string; totp_secret?: { id?: string; algorithm?: 'SHA1' | 'SHA256' | 'SHA512'; created_at?: string; digits?: number; issuer?: string; label?: string; period?: number; secret?: string; }; }",
    "markdown": "## create\n\n`client.v2.totp.secrets.create(algorithm?: 'SHA1' | 'SHA256' | 'SHA512', digits?: 6 | 8, issuer?: string, label?: string, period?: number, secret?: string, uri?: string): { status?: string; totp_secret?: object; }`\n\n**post** `/api/v2/totp/secrets`\n\nStore an encrypted TOTP secret for your account. Agents can use this instead of a phone-based authenticator app.\n\nProvide either:\n- A `uri` (the `otpauth://` URI from a QR code scan), which auto-populates all fields\n- A base32 `secret` with optional `label`, `issuer`, `algorithm`, `digits`, and `period`\n\n\n### Parameters\n\n- `algorithm?: 'SHA1' | 'SHA256' | 'SHA512'`\n  Hash algorithm\n\n- `digits?: 6 | 8`\n  Code length\n\n- `issuer?: string`\n  Service name (e.g. \"GitHub\", \"Google\")\n\n- `label?: string`\n  Human-readable label for this secret (e.g. \"GitHub - agent@example.com\"). Required unless `uri` is provided.\n\n- `period?: number`\n  Rotation period in seconds\n\n- `secret?: string`\n  Base32-encoded TOTP secret. Omit to auto-generate one.\n\n- `uri?: string`\n  Full `otpauth://totp/...` URI from a QR code. Overrides all other fields if provided.\n\n### Returns\n\n- `{ status?: string; totp_secret?: { id?: string; algorithm?: 'SHA1' | 'SHA256' | 'SHA512'; created_at?: string; digits?: number; issuer?: string; label?: string; period?: number; secret?: string; }; }`\n\n  - `status?: string`\n  - `totp_secret?: { id?: string; algorithm?: 'SHA1' | 'SHA256' | 'SHA512'; created_at?: string; digits?: number; issuer?: string; label?: string; period?: number; secret?: string; }`\n\n### Example\n\n```typescript\nimport SendblueAPI from 'sendblue';\n\nconst client = new SendblueAPI();\n\nconst secret = await client.v2.totp.secrets.create();\n\nconsole.log(secret);\n```",
    "perLanguage": {
      "typescript": {
        "method": "client.v2.totp.secrets.create",
        "example": "import SendblueAPI from 'sendblue';\n\nconst client = new SendblueAPI({\n  apiKey: process.env['SENDBLUE_API_API_KEY'], // This is the default and can be omitted\n  apiSecret: process.env['SENDBLUE_API_API_SECRET'], // This is the default and can be omitted\n});\n\nconst secret = await client.v2.totp.secrets.create();\n\nconsole.log(secret.status);"
      },
      "python": {
        "method": "v2.totp.secrets.create",
        "example": "import os\nfrom sendblue_api import SendblueAPI\n\nclient = SendblueAPI(\n    api_key=os.environ.get(\"SENDBLUE_API_API_KEY\"),  # This is the default and can be omitted\n    api_secret=os.environ.get(\"SENDBLUE_API_API_SECRET\"),  # This is the default and can be omitted\n)\nsecret = client.v2.totp.secrets.create()\nprint(secret.status)"
      },
      "http": {
        "example": "curl https://api.sendblue.co/api/v2/totp/secrets \\\n    -H 'Content-Type: application/json' \\\n    -H \"sb-api-key-id: $SENDBLUE_API_API_KEY\" \\\n    -H \"sb-api-secret-key: $SENDBLUE_API_API_SECRET\" \\\n    -d '{\n          \"issuer\": \"GitHub\",\n          \"label\": \"GitHub - agent@example.com\",\n          \"secret\": \"JBSWY3DPEHPK3PXP\",\n          \"uri\": \"otpauth://totp/GitHub:agent%40example.com?secret=JBSWY3DPEHPK3PXP&issuer=GitHub\"\n        }'"
      }
    }
  },
  {
    "name": "list",
    "endpoint": "/api/v2/totp/secrets",
    "httpMethod": "get",
    "summary": "List TOTP secrets",
    "description": "List all stored TOTP secrets for the account. The encrypted secret values are never returned.",
    "stainlessPath": "(resource) v2.totp.secrets > (method) list",
    "qualified": "client.v2.totp.secrets.list",
    "response": "{ status?: string; totp_secrets?: { id?: string; algorithm?: 'SHA1' | 'SHA256' | 'SHA512'; created_at?: string; digits?: number; issuer?: string; label?: string; period?: number; secret?: string; }[]; }",
    "markdown": "## list\n\n`client.v2.totp.secrets.list(): { status?: string; totp_secrets?: object[]; }`\n\n**get** `/api/v2/totp/secrets`\n\nList all stored TOTP secrets for the account. The encrypted secret values are never returned.\n\n### Returns\n\n- `{ status?: string; totp_secrets?: { id?: string; algorithm?: 'SHA1' | 'SHA256' | 'SHA512'; created_at?: string; digits?: number; issuer?: string; label?: string; period?: number; secret?: string; }[]; }`\n\n  - `status?: string`\n  - `totp_secrets?: { id?: string; algorithm?: 'SHA1' | 'SHA256' | 'SHA512'; created_at?: string; digits?: number; issuer?: string; label?: string; period?: number; secret?: string; }[]`\n\n### Example\n\n```typescript\nimport SendblueAPI from 'sendblue';\n\nconst client = new SendblueAPI();\n\nconst secrets = await client.v2.totp.secrets.list();\n\nconsole.log(secrets);\n```",
    "perLanguage": {
      "typescript": {
        "method": "client.v2.totp.secrets.list",
        "example": "import SendblueAPI from 'sendblue';\n\nconst client = new SendblueAPI({\n  apiKey: process.env['SENDBLUE_API_API_KEY'], // This is the default and can be omitted\n  apiSecret: process.env['SENDBLUE_API_API_SECRET'], // This is the default and can be omitted\n});\n\nconst secrets = await client.v2.totp.secrets.list();\n\nconsole.log(secrets.status);"
      },
      "python": {
        "method": "v2.totp.secrets.list",
        "example": "import os\nfrom sendblue_api import SendblueAPI\n\nclient = SendblueAPI(\n    api_key=os.environ.get(\"SENDBLUE_API_API_KEY\"),  # This is the default and can be omitted\n    api_secret=os.environ.get(\"SENDBLUE_API_API_SECRET\"),  # This is the default and can be omitted\n)\nsecrets = client.v2.totp.secrets.list()\nprint(secrets.status)"
      },
      "http": {
        "example": "curl https://api.sendblue.co/api/v2/totp/secrets \\\n    -H \"sb-api-key-id: $SENDBLUE_API_API_KEY\" \\\n    -H \"sb-api-secret-key: $SENDBLUE_API_API_SECRET\""
      }
    }
  },
  {
    "name": "delete",
    "endpoint": "/api/v2/totp/secrets/{secret_id}",
    "httpMethod": "delete",
    "summary": "Delete a TOTP secret",
    "description": "Permanently delete a stored TOTP secret.",
    "stainlessPath": "(resource) v2.totp.secrets > (method) delete",
    "qualified": "client.v2.totp.secrets.delete",
    "params": [
      "secret_id: string;"
    ],
    "response": "{ status?: string; }",
    "markdown": "## delete\n\n`client.v2.totp.secrets.delete(secret_id: string): { status?: string; }`\n\n**delete** `/api/v2/totp/secrets/{secret_id}`\n\nPermanently delete a stored TOTP secret.\n\n### Parameters\n\n- `secret_id: string`\n\n### Returns\n\n- `{ status?: string; }`\n\n  - `status?: string`\n\n### Example\n\n```typescript\nimport SendblueAPI from 'sendblue';\n\nconst client = new SendblueAPI();\n\nconst secret = await client.v2.totp.secrets.delete('550e8400-e29b-41d4-a716-446655440000');\n\nconsole.log(secret);\n```",
    "perLanguage": {
      "typescript": {
        "method": "client.v2.totp.secrets.delete",
        "example": "import SendblueAPI from 'sendblue';\n\nconst client = new SendblueAPI({\n  apiKey: process.env['SENDBLUE_API_API_KEY'], // This is the default and can be omitted\n  apiSecret: process.env['SENDBLUE_API_API_SECRET'], // This is the default and can be omitted\n});\n\nconst secret = await client.v2.totp.secrets.delete('550e8400-e29b-41d4-a716-446655440000');\n\nconsole.log(secret.status);"
      },
      "python": {
        "method": "v2.totp.secrets.delete",
        "example": "import os\nfrom sendblue_api import SendblueAPI\n\nclient = SendblueAPI(\n    api_key=os.environ.get(\"SENDBLUE_API_API_KEY\"),  # This is the default and can be omitted\n    api_secret=os.environ.get(\"SENDBLUE_API_API_SECRET\"),  # This is the default and can be omitted\n)\nsecret = client.v2.totp.secrets.delete(\n    \"550e8400-e29b-41d4-a716-446655440000\",\n)\nprint(secret.status)"
      },
      "http": {
        "example": "curl https://api.sendblue.co/api/v2/totp/secrets/$SECRET_ID \\\n    -X DELETE \\\n    -H \"sb-api-key-id: $SENDBLUE_API_API_KEY\" \\\n    -H \"sb-api-secret-key: $SENDBLUE_API_API_SECRET\""
      }
    }
  },
  {
    "name": "retrieve",
    "endpoint": "/api/lines/{sendblue_number}/call-forwarding",
    "httpMethod": "get",
    "summary": "Get call forwarding for a line",
    "description": "Returns the current call forwarding number for a dedicated phone line.\n\nPer-line forwarding takes priority over the company default forwarding number\nbut is overridden by seat-level forwarding when a seat has a forwarding number set.\n\n**Priority order:** seat forwarding → per-line forwarding → company default forwarding\n",
    "stainlessPath": "(resource) lines.call_forwarding > (method) retrieve",
    "qualified": "client.lines.callForwarding.retrieve",
    "params": [
      "sendblue_number: string;"
    ],
    "response": "{ forwarding_number: string; sendblue_number: string; }",
    "markdown": "## retrieve\n\n`client.lines.callForwarding.retrieve(sendblue_number: string): { forwarding_number: string; sendblue_number: string; }`\n\n**get** `/api/lines/{sendblue_number}/call-forwarding`\n\nReturns the current call forwarding number for a dedicated phone line.\n\nPer-line forwarding takes priority over the company default forwarding number\nbut is overridden by seat-level forwarding when a seat has a forwarding number set.\n\n**Priority order:** seat forwarding → per-line forwarding → company default forwarding\n\n\n### Parameters\n\n- `sendblue_number: string`\n\n### Returns\n\n- `{ forwarding_number: string; sendblue_number: string; }`\n\n  - `forwarding_number: string`\n  - `sendblue_number: string`\n\n### Example\n\n```typescript\nimport SendblueAPI from 'sendblue';\n\nconst client = new SendblueAPI();\n\nconst callForwarding = await client.lines.callForwarding.retrieve('+12125550101');\n\nconsole.log(callForwarding);\n```",
    "perLanguage": {
      "typescript": {
        "method": "client.lines.callForwarding.retrieve",
        "example": "import SendblueAPI from 'sendblue';\n\nconst client = new SendblueAPI({\n  apiKey: process.env['SENDBLUE_API_API_KEY'], // This is the default and can be omitted\n  apiSecret: process.env['SENDBLUE_API_API_SECRET'], // This is the default and can be omitted\n});\n\nconst callForwarding = await client.lines.callForwarding.retrieve('+12125550101');\n\nconsole.log(callForwarding.forwarding_number);"
      },
      "python": {
        "method": "lines.call_forwarding.retrieve",
        "example": "import os\nfrom sendblue_api import SendblueAPI\n\nclient = SendblueAPI(\n    api_key=os.environ.get(\"SENDBLUE_API_API_KEY\"),  # This is the default and can be omitted\n    api_secret=os.environ.get(\"SENDBLUE_API_API_SECRET\"),  # This is the default and can be omitted\n)\ncall_forwarding = client.lines.call_forwarding.retrieve(\n    \"+12125550101\",\n)\nprint(call_forwarding.forwarding_number)"
      },
      "http": {
        "example": "curl https://api.sendblue.co/api/lines/$SENDBLUE_NUMBER/call-forwarding \\\n    -H \"sb-api-key-id: $SENDBLUE_API_API_KEY\" \\\n    -H \"sb-api-secret-key: $SENDBLUE_API_API_SECRET\""
      }
    }
  },
  {
    "name": "update",
    "endpoint": "/api/lines/{sendblue_number}/call-forwarding",
    "httpMethod": "put",
    "summary": "Set call forwarding for a line",
    "description": "Sets a call forwarding number for a specific dedicated phone line.\nInbound calls to this line will be forwarded to the specified number.\n\nThe `forwarding_number` is normalized to E.164 format before storage.\nUS numbers can be supplied in local format (e.g. `2125550199`).\n",
    "stainlessPath": "(resource) lines.call_forwarding > (method) update",
    "qualified": "client.lines.callForwarding.update",
    "params": [
      "sendblue_number: string;",
      "forwarding_number: string;"
    ],
    "response": "{ forwarding_number: string; sendblue_number: string; }",
    "markdown": "## update\n\n`client.lines.callForwarding.update(sendblue_number: string, forwarding_number: string): { forwarding_number: string; sendblue_number: string; }`\n\n**put** `/api/lines/{sendblue_number}/call-forwarding`\n\nSets a call forwarding number for a specific dedicated phone line.\nInbound calls to this line will be forwarded to the specified number.\n\nThe `forwarding_number` is normalized to E.164 format before storage.\nUS numbers can be supplied in local format (e.g. `2125550199`).\n\n\n### Parameters\n\n- `sendblue_number: string`\n\n- `forwarding_number: string`\n  Phone number to forward calls to (E.164 or US local format)\n\n### Returns\n\n- `{ forwarding_number: string; sendblue_number: string; }`\n\n  - `forwarding_number: string`\n  - `sendblue_number: string`\n\n### Example\n\n```typescript\nimport SendblueAPI from 'sendblue';\n\nconst client = new SendblueAPI();\n\nconst callForwarding = await client.lines.callForwarding.update('+12125550101', { forwarding_number: '+16692138010' });\n\nconsole.log(callForwarding);\n```",
    "perLanguage": {
      "typescript": {
        "method": "client.lines.callForwarding.update",
        "example": "import SendblueAPI from 'sendblue';\n\nconst client = new SendblueAPI({\n  apiKey: process.env['SENDBLUE_API_API_KEY'], // This is the default and can be omitted\n  apiSecret: process.env['SENDBLUE_API_API_SECRET'], // This is the default and can be omitted\n});\n\nconst callForwarding = await client.lines.callForwarding.update('+12125550101', {\n  forwarding_number: '+16692138010',\n});\n\nconsole.log(callForwarding.forwarding_number);"
      },
      "python": {
        "method": "lines.call_forwarding.update",
        "example": "import os\nfrom sendblue_api import SendblueAPI\n\nclient = SendblueAPI(\n    api_key=os.environ.get(\"SENDBLUE_API_API_KEY\"),  # This is the default and can be omitted\n    api_secret=os.environ.get(\"SENDBLUE_API_API_SECRET\"),  # This is the default and can be omitted\n)\ncall_forwarding = client.lines.call_forwarding.update(\n    sendblue_number=\"+12125550101\",\n    forwarding_number=\"+16692138010\",\n)\nprint(call_forwarding.forwarding_number)"
      },
      "http": {
        "example": "curl https://api.sendblue.co/api/lines/$SENDBLUE_NUMBER/call-forwarding \\\n    -X PUT \\\n    -H 'Content-Type: application/json' \\\n    -H \"sb-api-key-id: $SENDBLUE_API_API_KEY\" \\\n    -H \"sb-api-secret-key: $SENDBLUE_API_API_SECRET\" \\\n    -d '{\n          \"forwarding_number\": \"+16692138010\"\n        }'"
      }
    }
  },
  {
    "name": "delete",
    "endpoint": "/api/lines/{sendblue_number}/call-forwarding",
    "httpMethod": "delete",
    "summary": "Clear call forwarding for a line",
    "description": "Removes the per-line call forwarding number. After clearing, inbound calls\nwill fall back to the company default forwarding number (if configured).\n\nThis operation is idempotent — calling it on a line with no forwarding set\nreturns 200 with `forwarding_number: null`.\n",
    "stainlessPath": "(resource) lines.call_forwarding > (method) delete",
    "qualified": "client.lines.callForwarding.delete",
    "params": [
      "sendblue_number: string;"
    ],
    "response": "{ forwarding_number: string; sendblue_number: string; }",
    "markdown": "## delete\n\n`client.lines.callForwarding.delete(sendblue_number: string): { forwarding_number: string; sendblue_number: string; }`\n\n**delete** `/api/lines/{sendblue_number}/call-forwarding`\n\nRemoves the per-line call forwarding number. After clearing, inbound calls\nwill fall back to the company default forwarding number (if configured).\n\nThis operation is idempotent — calling it on a line with no forwarding set\nreturns 200 with `forwarding_number: null`.\n\n\n### Parameters\n\n- `sendblue_number: string`\n\n### Returns\n\n- `{ forwarding_number: string; sendblue_number: string; }`\n\n  - `forwarding_number: string`\n  - `sendblue_number: string`\n\n### Example\n\n```typescript\nimport SendblueAPI from 'sendblue';\n\nconst client = new SendblueAPI();\n\nconst callForwarding = await client.lines.callForwarding.delete('+12125550101');\n\nconsole.log(callForwarding);\n```",
    "perLanguage": {
      "typescript": {
        "method": "client.lines.callForwarding.delete",
        "example": "import SendblueAPI from 'sendblue';\n\nconst client = new SendblueAPI({\n  apiKey: process.env['SENDBLUE_API_API_KEY'], // This is the default and can be omitted\n  apiSecret: process.env['SENDBLUE_API_API_SECRET'], // This is the default and can be omitted\n});\n\nconst callForwarding = await client.lines.callForwarding.delete('+12125550101');\n\nconsole.log(callForwarding.forwarding_number);"
      },
      "python": {
        "method": "lines.call_forwarding.delete",
        "example": "import os\nfrom sendblue_api import SendblueAPI\n\nclient = SendblueAPI(\n    api_key=os.environ.get(\"SENDBLUE_API_API_KEY\"),  # This is the default and can be omitted\n    api_secret=os.environ.get(\"SENDBLUE_API_API_SECRET\"),  # This is the default and can be omitted\n)\ncall_forwarding = client.lines.call_forwarding.delete(\n    \"+12125550101\",\n)\nprint(call_forwarding.forwarding_number)"
      },
      "http": {
        "example": "curl https://api.sendblue.co/api/lines/$SENDBLUE_NUMBER/call-forwarding \\\n    -X DELETE \\\n    -H \"sb-api-key-id: $SENDBLUE_API_API_KEY\" \\\n    -H \"sb-api-secret-key: $SENDBLUE_API_API_SECRET\""
      }
    }
  }
];

const EMBEDDED_READMES: { language: string; content: string }[] = [
  {
    "language": "python",
    "content": "# Sendblue API Python API library\n\n<!-- prettier-ignore -->\n[![PyPI version](https://img.shields.io/pypi/v/sendblue.svg?label=pypi%20(stable))](https://pypi.org/project/sendblue/)\n\nThe Sendblue API Python library provides convenient access to the Sendblue API REST API from any Python 3.9+\napplication. The library includes type definitions for all request params and response fields,\nand offers both synchronous and asynchronous clients powered by [httpx](https://github.com/encode/httpx).\n\n\n\nIt is generated with [Stainless](https://www.stainless.com/).\n\n## MCP Server\n\nUse the Sendblue API MCP Server to enable AI assistants to interact with this API, allowing them to explore endpoints, make test requests, and use documentation to help integrate this SDK into your application.\n\n[![Add to Cursor](https://cursor.com/deeplink/mcp-install-dark.svg)](https://cursor.com/en-US/install-mcp?name=sendblue-mcp&config=eyJuYW1lIjoic2VuZGJsdWUtbWNwIiwidHJhbnNwb3J0IjoiaHR0cCIsInVybCI6Imh0dHBzOi8vc2VuZGJsdWUtYXBpLnN0bG1jcC5jb20iLCJoZWFkZXJzIjp7InNiLWFwaS1rZXktaWQiOiJNeSBBUEkgS2V5Iiwic2ItYXBpLXNlY3JldC1rZXkiOiJNeSBBUEkgU2VjcmV0In19)\n[![Install in VS Code](https://img.shields.io/badge/_-Add_to_VS_Code-blue?style=for-the-badge&logo=data:image/svg%2bxml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHZpZXdCb3g9IjAgMCA0MCA0MCI+PHBhdGggZmlsbD0iI0VFRSIgZmlsbC1ydWxlPSJldmVub2RkIiBkPSJNMzAuMjM1IDM5Ljg4NGEyLjQ5MSAyLjQ5MSAwIDAgMS0xLjc4MS0uNzNMMTIuNyAyNC43OGwtMy40NiAyLjYyNC0zLjQwNiAyLjU4MmExLjY2NSAxLjY2NSAwIDAgMS0xLjA4Mi4zMzggMS42NjQgMS42NjQgMCAwIDEtMS4wNDYtLjQzMWwtMi4yLTJhMS42NjYgMS42NjYgMCAwIDEgMC0yLjQ2M0w3LjQ1OCAyMCA0LjY3IDE3LjQ1MyAxLjUwNyAxNC41N2ExLjY2NSAxLjY2NSAwIDAgMSAwLTIuNDYzbDIuMi0yYTEuNjY1IDEuNjY1IDAgMCAxIDIuMTMtLjA5N2w2Ljg2MyA1LjIwOUwyOC40NTIuODQ0YTIuNDg4IDIuNDg4IDAgMCAxIDEuODQxLS43MjljLjM1MS4wMDkuNjk5LjA5MSAxLjAxOS4yNDVsOC4yMzYgMy45NjFhMi41IDIuNSAwIDAgMSAxLjQxNSAyLjI1M3YuMDk5LS4wNDVWMzMuMzd2LS4wNDUuMDk1YTIuNTAxIDIuNTAxIDAgMCAxLTEuNDE2IDIuMjU3bC04LjIzNSAzLjk2MWEyLjQ5MiAyLjQ5MiAwIDAgMS0xLjA3Ny4yNDZabS43MTYtMjguOTQ3LTExLjk0OCA5LjA2MiAxMS45NTIgOS4wNjUtLjAwNC0xOC4xMjdaIi8+PC9zdmc+)](https://vscode.stainless.com/mcp/%7B%22name%22%3A%22sendblue-mcp%22%2C%22type%22%3A%22http%22%2C%22url%22%3A%22https%3A%2F%2Fsendblue-api.stlmcp.com%22%2C%22headers%22%3A%7B%22sb-api-key-id%22%3A%22My%20API%20Key%22%2C%22sb-api-secret-key%22%3A%22My%20API%20Secret%22%7D%7D)\n\n> Note: You may need to set environment variables in your MCP client.\n\n## Documentation\n\nThe REST API documentation can be found on [docs.sendblue.com](https://docs.sendblue.com). The full API of this library can be found in [api.md](api.md).\n\n## Installation\n\n```sh\n# install from PyPI\npip install sendblue\n```\n\n## Usage\n\nThe full API of this library can be found in [api.md](api.md).\n\n```python\nimport os\nfrom sendblue_api import SendblueAPI\n\nclient = SendblueAPI(\n    api_key=os.environ.get(\"SENDBLUE_API_API_KEY\"),  # This is the default and can be omitted\n    api_secret=os.environ.get(\"SENDBLUE_API_API_SECRET\"),  # This is the default and can be omitted\n)\n\nmessage_response = client.messages.send(\n    content=\"REPLACE_ME\",\n    from_number=\"REPLACE_ME\",\n    number=\"REPLACE_ME\",\n)\nprint(message_response.account_email)\n```\n\nWhile you can provide an `api_key` keyword argument,\nwe recommend using [python-dotenv](https://pypi.org/project/python-dotenv/)\nto add `SENDBLUE_API_API_KEY=\"My API Key\"` to your `.env` file\nso that your API Key is not stored in source control.\n\n## Async usage\n\nSimply import `AsyncSendblueAPI` instead of `SendblueAPI` and use `await` with each API call:\n\n```python\nimport os\nimport asyncio\nfrom sendblue_api import AsyncSendblueAPI\n\nclient = AsyncSendblueAPI(\n    api_key=os.environ.get(\"SENDBLUE_API_API_KEY\"),  # This is the default and can be omitted\n    api_secret=os.environ.get(\"SENDBLUE_API_API_SECRET\"),  # This is the default and can be omitted\n)\n\nasync def main() -> None:\n  message_response = await client.messages.send(\n      content=\"REPLACE_ME\",\n      from_number=\"REPLACE_ME\",\n      number=\"REPLACE_ME\",\n  )\n  print(message_response.account_email)\n\nasyncio.run(main())\n```\n\nFunctionality between the synchronous and asynchronous clients is otherwise identical.\n\n### With aiohttp\n\nBy default, the async client uses `httpx` for HTTP requests. However, for improved concurrency performance you may also use `aiohttp` as the HTTP backend.\n\nYou can enable this by installing `aiohttp`:\n\n```sh\n# install from PyPI\npip install sendblue[aiohttp]\n```\n\nThen you can enable it by instantiating the client with `http_client=DefaultAioHttpClient()`:\n\n```python\nimport os\nimport asyncio\nfrom sendblue_api import DefaultAioHttpClient\nfrom sendblue_api import AsyncSendblueAPI\n\nasync def main() -> None:\n  async with AsyncSendblueAPI(\n    api_key=os.environ.get(\"SENDBLUE_API_API_KEY\"),  # This is the default and can be omitted\n    api_secret=os.environ.get(\"SENDBLUE_API_API_SECRET\"),  # This is the default and can be omitted\n    http_client=DefaultAioHttpClient(),\n) as client:\n    message_response = await client.messages.send(\n        content=\"REPLACE_ME\",\n        from_number=\"REPLACE_ME\",\n        number=\"REPLACE_ME\",\n    )\n    print(message_response.account_email)\n\nasyncio.run(main())\n```\n\n\n\n## Using types\n\nNested request parameters are [TypedDicts](https://docs.python.org/3/library/typing.html#typing.TypedDict). Responses are [Pydantic models](https://docs.pydantic.dev) which also provide helper methods for things like:\n\n- Serializing back into JSON, `model.to_json()`\n- Converting to a dictionary, `model.to_dict()`\n\nTyped requests and responses provide autocomplete and documentation within your editor. If you would like to see type errors in VS Code to help catch bugs earlier, set `python.analysis.typeCheckingMode` to `basic`.\n\n\n\n## Nested params\n\nNested parameters are dictionaries, typed using `TypedDict`, for example:\n\n```python\nfrom sendblue_api import SendblueAPI\n\nclient = SendblueAPI()\n\nwebhook = client.webhooks.update(\n    webhooks={},\n)\nprint(webhook.webhooks)\n```\n\n\n\n## Handling errors\n\nWhen the library is unable to connect to the API (for example, due to network connection problems or a timeout), a subclass of `sendblue_api.APIConnectionError` is raised.\n\nWhen the API returns a non-success status code (that is, 4xx or 5xx\nresponse), a subclass of `sendblue_api.APIStatusError` is raised, containing `status_code` and `response` properties.\n\nAll errors inherit from `sendblue_api.APIError`.\n\n```python\nimport sendblue_api\nfrom sendblue_api import SendblueAPI\n\nclient = SendblueAPI()\n\ntry:\n    client.messages.send(\n        content=\"REPLACE_ME\",\n        from_number=\"REPLACE_ME\",\n        number=\"REPLACE_ME\",\n    )\nexcept sendblue_api.APIConnectionError as e:\n    print(\"The server could not be reached\")\n    print(e.__cause__) # an underlying Exception, likely raised within httpx.\nexcept sendblue_api.RateLimitError as e:\n    print(\"A 429 status code was received; we should back off a bit.\")\nexcept sendblue_api.APIStatusError as e:\n    print(\"Another non-200-range status code was received\")\n    print(e.status_code)\n    print(e.response)\n```\n\nError codes are as follows:\n\n| Status Code | Error Type                 |\n| ----------- | -------------------------- |\n| 400         | `BadRequestError`          |\n| 401         | `AuthenticationError`      |\n| 403         | `PermissionDeniedError`    |\n| 404         | `NotFoundError`            |\n| 422         | `UnprocessableEntityError` |\n| 429         | `RateLimitError`           |\n| >=500       | `InternalServerError`      |\n| N/A         | `APIConnectionError`       |\n\n### Retries\n\nCertain errors are automatically retried 2 times by default, with a short exponential backoff.\nConnection errors (for example, due to a network connectivity problem), 408 Request Timeout, 409 Conflict,\n429 Rate Limit, and >=500 Internal errors are all retried by default.\n\nYou can use the `max_retries` option to configure or disable retry settings:\n\n```python\nfrom sendblue_api import SendblueAPI\n\n# Configure the default for all requests:\nclient = SendblueAPI(\n    # default is 2\n    max_retries=0,\n)\n\n# Or, configure per-request:\nclient.with_options(max_retries = 5).messages.send(\n    content=\"REPLACE_ME\",\n    from_number=\"REPLACE_ME\",\n    number=\"REPLACE_ME\",\n)\n```\n\n### Timeouts\n\nBy default requests time out after 1 minute. You can configure this with a `timeout` option,\nwhich accepts a float or an [`httpx.Timeout`](https://www.python-httpx.org/advanced/timeouts/#fine-tuning-the-configuration) object:\n\n```python\nfrom sendblue_api import SendblueAPI\n\n# Configure the default for all requests:\nclient = SendblueAPI(\n    # 20 seconds (default is 1 minute)\n    timeout=20.0,\n)\n\n# More granular control:\nclient = SendblueAPI(\n    timeout=httpx.Timeout(60.0, read=5.0, write=10.0, connect=2.0),\n)\n\n# Override per-request:\nclient.with_options(timeout = 5.0).messages.send(\n    content=\"REPLACE_ME\",\n    from_number=\"REPLACE_ME\",\n    number=\"REPLACE_ME\",\n)\n```\n\nOn timeout, an `APITimeoutError` is thrown.\n\nNote that requests that time out are [retried twice by default](#retries).\n\n\n\n## Advanced\n\n### Logging\n\nWe use the standard library [`logging`](https://docs.python.org/3/library/logging.html) module.\n\nYou can enable logging by setting the environment variable `SENDBLUE_API_LOG` to `info`.\n\n```shell\n$ export SENDBLUE_API_LOG=info\n```\n\nOr to `debug` for more verbose logging.\n\n### How to tell whether `None` means `null` or missing\n\nIn an API response, a field may be explicitly `null`, or missing entirely; in either case, its value is `None` in this library. You can differentiate the two cases with `.model_fields_set`:\n\n```py\nif response.my_field is None:\n  if 'my_field' not in response.model_fields_set:\n    print('Got json like {}, without a \"my_field\" key present at all.')\n  else:\n    print('Got json like {\"my_field\": null}.')\n```\n\n### Accessing raw response data (e.g. headers)\n\nThe \"raw\" Response object can be accessed by prefixing `.with_raw_response.` to any HTTP method call, e.g.,\n\n```py\nfrom sendblue_api import SendblueAPI\n\nclient = SendblueAPI()\nresponse = client.messages.with_raw_response.send(\n    content=\"REPLACE_ME\",\n    from_number=\"REPLACE_ME\",\n    number=\"REPLACE_ME\",\n)\nprint(response.headers.get('X-My-Header'))\n\nmessage = response.parse()  # get the object that `messages.send()` would have returned\nprint(message.account_email)\n```\n\nThese methods return an [`APIResponse`](https://github.com/sendblue-api/sendblue-py/tree/main/src/sendblue_api/_response.py) object.\n\nThe async client returns an [`AsyncAPIResponse`](https://github.com/sendblue-api/sendblue-py/tree/main/src/sendblue_api/_response.py) with the same structure, the only difference being `await`able methods for reading the response content.\n\n#### `.with_streaming_response`\n\nThe above interface eagerly reads the full response body when you make the request, which may not always be what you want.\n\nTo stream the response body, use `.with_streaming_response` instead, which requires a context manager and only reads the response body once you call `.read()`, `.text()`, `.json()`, `.iter_bytes()`, `.iter_text()`, `.iter_lines()` or `.parse()`. In the async client, these are async methods.\n\n```python\nwith client.messages.with_streaming_response.send(\n    content=\"REPLACE_ME\",\n    from_number=\"REPLACE_ME\",\n    number=\"REPLACE_ME\",\n) as response :\n    print(response.headers.get('X-My-Header'))\n\n    for line in response.iter_lines():\n      print(line)\n```\n\nThe context manager is required so that the response will reliably be closed.\n\n### Making custom/undocumented requests\n\nThis library is typed for convenient access to the documented API.\n\nIf you need to access undocumented endpoints, params, or response properties, the library can still be used.\n\n#### Undocumented endpoints\n\nTo make requests to undocumented endpoints, you can make requests using `client.get`, `client.post`, and other\nhttp verbs. Options on the client will be respected (such as retries) when making this request.\n\n```py\nimport httpx\n\nresponse = client.post(\n    \"/foo\",\n    cast_to=httpx.Response,\n    body={\"my_param\": True},\n)\n\nprint(response.headers.get(\"x-foo\"))\n```\n\n#### Undocumented request params\n\nIf you want to explicitly send an extra param, you can do so with the `extra_query`, `extra_body`, and `extra_headers` request\noptions.\n\n#### Undocumented response properties\n\nTo access undocumented response properties, you can access the extra fields like `response.unknown_prop`. You\ncan also get all the extra fields on the Pydantic model as a dict with\n[`response.model_extra`](https://docs.pydantic.dev/latest/api/base_model/#pydantic.BaseModel.model_extra).\n\n### Configuring the HTTP client\n\nYou can directly override the [httpx client](https://www.python-httpx.org/api/#client) to customize it for your use case, including:\n\n- Support for [proxies](https://www.python-httpx.org/advanced/proxies/)\n- Custom [transports](https://www.python-httpx.org/advanced/transports/)\n- Additional [advanced](https://www.python-httpx.org/advanced/clients/) functionality\n\n```python\nimport httpx\nfrom sendblue_api import SendblueAPI, DefaultHttpxClient\n\nclient = SendblueAPI(\n    # Or use the `SENDBLUE_API_BASE_URL` env var\n    base_url=\"http://my.test.server.example.com:8083\",\n    http_client=DefaultHttpxClient(proxy=\"http://my.test.proxy.example.com\", transport=httpx.HTTPTransport(local_address=\"0.0.0.0\")),\n)\n```\n\nYou can also customize the client on a per-request basis by using `with_options()`:\n\n```python\nclient.with_options(http_client=DefaultHttpxClient(...))\n```\n\n### Managing HTTP resources\n\nBy default the library closes underlying HTTP connections whenever the client is [garbage collected](https://docs.python.org/3/reference/datamodel.html#object.__del__). You can manually close the client using the `.close()` method if desired, or with a context manager that closes when exiting.\n\n```py\nfrom sendblue_api import SendblueAPI\n\nwith SendblueAPI() as client:\n  # make requests here\n  ...\n\n# HTTP client is now closed\n```\n\n## Versioning\n\nThis package generally follows [SemVer](https://semver.org/spec/v2.0.0.html) conventions, though certain backwards-incompatible changes may be released as minor versions:\n\n1. Changes that only affect static types, without breaking runtime behavior.\n2. Changes to library internals which are technically public but not intended or documented for external use. _(Please open a GitHub issue to let us know if you are relying on such internals.)_\n3. Changes that we do not expect to impact the vast majority of users in practice.\n\nWe take backwards-compatibility seriously and work hard to ensure you can rely on a smooth upgrade experience.\n\nWe are keen for your feedback; please open an [issue](https://www.github.com/sendblue-api/sendblue-py/issues) with questions, bugs, or suggestions.\n\n### Determining the installed version\n\nIf you've upgraded to the latest version but aren't seeing any new features you were expecting then your python environment is likely still using an older version.\n\nYou can determine the version that is being used at runtime with:\n\n```py\nimport sendblue_api\nprint(sendblue_api.__version__)\n```\n\n## Requirements\n\nPython 3.9 or higher.\n\n## Contributing\n\nSee [the contributing documentation](./CONTRIBUTING.md).\n"
  },
  {
    "language": "typescript",
    "content": "# Sendblue API TypeScript API Library\n\n[![NPM version](https://img.shields.io/npm/v/sendblue.svg?label=npm%20(stable))](https://npmjs.org/package/sendblue) ![npm bundle size](https://img.shields.io/bundlephobia/minzip/sendblue)\n\nThis library provides convenient access to the Sendblue API REST API from server-side TypeScript or JavaScript.\n\n\n\nThe REST API documentation can be found on [docs.sendblue.com](https://docs.sendblue.com). The full API of this library can be found in [api.md](api.md).\n\nIt is generated with [Stainless](https://www.stainless.com/).\n\n## MCP Server\n\nUse the Sendblue API MCP Server to enable AI assistants to interact with this API, allowing them to explore endpoints, make test requests, and use documentation to help integrate this SDK into your application.\n\n[![Add to Cursor](https://cursor.com/deeplink/mcp-install-dark.svg)](https://cursor.com/en-US/install-mcp?name=sendblue-mcp&config=eyJuYW1lIjoic2VuZGJsdWUtbWNwIiwidHJhbnNwb3J0IjoiaHR0cCIsInVybCI6Imh0dHBzOi8vc2VuZGJsdWUtYXBpLnN0bG1jcC5jb20iLCJoZWFkZXJzIjp7InNiLWFwaS1rZXktaWQiOiJNeSBBUEkgS2V5Iiwic2ItYXBpLXNlY3JldC1rZXkiOiJNeSBBUEkgU2VjcmV0In19)\n[![Install in VS Code](https://img.shields.io/badge/_-Add_to_VS_Code-blue?style=for-the-badge&logo=data:image/svg%2bxml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHZpZXdCb3g9IjAgMCA0MCA0MCI+PHBhdGggZmlsbD0iI0VFRSIgZmlsbC1ydWxlPSJldmVub2RkIiBkPSJNMzAuMjM1IDM5Ljg4NGEyLjQ5MSAyLjQ5MSAwIDAgMS0xLjc4MS0uNzNMMTIuNyAyNC43OGwtMy40NiAyLjYyNC0zLjQwNiAyLjU4MmExLjY2NSAxLjY2NSAwIDAgMS0xLjA4Mi4zMzggMS42NjQgMS42NjQgMCAwIDEtMS4wNDYtLjQzMWwtMi4yLTJhMS42NjYgMS42NjYgMCAwIDEgMC0yLjQ2M0w3LjQ1OCAyMCA0LjY3IDE3LjQ1MyAxLjUwNyAxNC41N2ExLjY2NSAxLjY2NSAwIDAgMSAwLTIuNDYzbDIuMi0yYTEuNjY1IDEuNjY1IDAgMCAxIDIuMTMtLjA5N2w2Ljg2MyA1LjIwOUwyOC40NTIuODQ0YTIuNDg4IDIuNDg4IDAgMCAxIDEuODQxLS43MjljLjM1MS4wMDkuNjk5LjA5MSAxLjAxOS4yNDVsOC4yMzYgMy45NjFhMi41IDIuNSAwIDAgMSAxLjQxNSAyLjI1M3YuMDk5LS4wNDVWMzMuMzd2LS4wNDUuMDk1YTIuNTAxIDIuNTAxIDAgMCAxLTEuNDE2IDIuMjU3bC04LjIzNSAzLjk2MWEyLjQ5MiAyLjQ5MiAwIDAgMS0xLjA3Ny4yNDZabS43MTYtMjguOTQ3LTExLjk0OCA5LjA2MiAxMS45NTIgOS4wNjUtLjAwNC0xOC4xMjdaIi8+PC9zdmc+)](https://vscode.stainless.com/mcp/%7B%22name%22%3A%22sendblue-mcp%22%2C%22type%22%3A%22http%22%2C%22url%22%3A%22https%3A%2F%2Fsendblue-api.stlmcp.com%22%2C%22headers%22%3A%7B%22sb-api-key-id%22%3A%22My%20API%20Key%22%2C%22sb-api-secret-key%22%3A%22My%20API%20Secret%22%7D%7D)\n\n> Note: You may need to set environment variables in your MCP client.\n\n## Installation\n\n```sh\nnpm install sendblue\n```\n\n\n\n## Usage\n\nThe full API of this library can be found in [api.md](api.md).\n\n<!-- prettier-ignore -->\n```js\nimport SendblueAPI from 'sendblue';\n\nconst client = new SendblueAPI({\n  apiKey: process.env['SENDBLUE_API_API_KEY'], // This is the default and can be omitted\n  apiSecret: process.env['SENDBLUE_API_API_SECRET'], // This is the default and can be omitted\n});\n\nconst messageResponse = await client.messages.send({\n  content: 'REPLACE_ME',\n  from_number: 'REPLACE_ME',\n  number: 'REPLACE_ME',\n});\n\nconsole.log(messageResponse.account_email);\n```\n\n\n\n### Request & Response types\n\nThis library includes TypeScript definitions for all request params and response fields. You may import and use them like so:\n\n<!-- prettier-ignore -->\n```ts\nimport SendblueAPI from 'sendblue';\n\nconst client = new SendblueAPI({\n  apiKey: process.env['SENDBLUE_API_API_KEY'], // This is the default and can be omitted\n  apiSecret: process.env['SENDBLUE_API_API_SECRET'], // This is the default and can be omitted\n});\n\nconst params: SendblueAPI.MessageSendParams = {\n  content: 'REPLACE_ME',\n  from_number: 'REPLACE_ME',\n  number: 'REPLACE_ME',\n};\nconst messageResponse: SendblueAPI.MessageResponse = await client.messages.send(params);\n```\n\nDocumentation for each method, request param, and response field are available in docstrings and will appear on hover in most modern editors.\n\n\n\n\n\n## Handling errors\n\nWhen the library is unable to connect to the API,\nor if the API returns a non-success status code (i.e., 4xx or 5xx response),\na subclass of `APIError` will be thrown:\n\n<!-- prettier-ignore -->\n```ts\nconst messageResponse = await client.messages\n  .send({\n    content: 'REPLACE_ME',\n    from_number: 'REPLACE_ME',\n    number: 'REPLACE_ME',\n  })\n  .catch(async (err) => {\n    if (err instanceof SendblueAPI.APIError) {\n      console.log(err.status); // 400\n      console.log(err.name); // BadRequestError\n      console.log(err.headers); // {server: 'nginx', ...}\n    } else {\n      throw err;\n    }\n  });\n```\n\nError codes are as follows:\n\n| Status Code | Error Type                 |\n| ----------- | -------------------------- |\n| 400         | `BadRequestError`          |\n| 401         | `AuthenticationError`      |\n| 403         | `PermissionDeniedError`    |\n| 404         | `NotFoundError`            |\n| 422         | `UnprocessableEntityError` |\n| 429         | `RateLimitError`           |\n| >=500       | `InternalServerError`      |\n| N/A         | `APIConnectionError`       |\n\n### Retries\n\nCertain errors will be automatically retried 2 times by default, with a short exponential backoff.\nConnection errors (for example, due to a network connectivity problem), 408 Request Timeout, 409 Conflict,\n429 Rate Limit, and >=500 Internal errors will all be retried by default.\n\nYou can use the `maxRetries` option to configure or disable this:\n\n<!-- prettier-ignore -->\n```js\n// Configure the default for all requests:\nconst client = new SendblueAPI({\n  maxRetries: 0, // default is 2\n});\n\n// Or, configure per-request:\nawait client.messages.send({\n  content: 'REPLACE_ME',\n  from_number: 'REPLACE_ME',\n  number: 'REPLACE_ME',\n}, {\n  maxRetries: 5,\n});\n```\n\n### Timeouts\n\nRequests time out after 1 minute by default. You can configure this with a `timeout` option:\n\n<!-- prettier-ignore -->\n```ts\n// Configure the default for all requests:\nconst client = new SendblueAPI({\n  timeout: 20 * 1000, // 20 seconds (default is 1 minute)\n});\n\n// Override per-request:\nawait client.messages.send({\n  content: 'REPLACE_ME',\n  from_number: 'REPLACE_ME',\n  number: 'REPLACE_ME',\n}, {\n  timeout: 5 * 1000,\n});\n```\n\nOn timeout, an `APIConnectionTimeoutError` is thrown.\n\nNote that requests which time out will be [retried twice by default](#retries).\n\n\n\n\n\n## Advanced Usage\n\n### Accessing raw Response data (e.g., headers)\n\nThe \"raw\" `Response` returned by `fetch()` can be accessed through the `.asResponse()` method on the `APIPromise` type that all methods return.\nThis method returns as soon as the headers for a successful response are received and does not consume the response body, so you are free to write custom parsing or streaming logic.\n\nYou can also use the `.withResponse()` method to get the raw `Response` along with the parsed data.\nUnlike `.asResponse()` this method consumes the body, returning once it is parsed.\n\n<!-- prettier-ignore -->\n```ts\nconst client = new SendblueAPI();\n\nconst response = await client.messages\n  .send({\n    content: 'REPLACE_ME',\n    from_number: 'REPLACE_ME',\n    number: 'REPLACE_ME',\n  })\n  .asResponse();\nconsole.log(response.headers.get('X-My-Header'));\nconsole.log(response.statusText); // access the underlying Response object\n\nconst { data: messageResponse, response: raw } = await client.messages\n  .send({\n    content: 'REPLACE_ME',\n    from_number: 'REPLACE_ME',\n    number: 'REPLACE_ME',\n  })\n  .withResponse();\nconsole.log(raw.headers.get('X-My-Header'));\nconsole.log(messageResponse.account_email);\n```\n\n### Logging\n\n> [!IMPORTANT]\n> All log messages are intended for debugging only. The format and content of log messages\n> may change between releases.\n\n#### Log levels\n\nThe log level can be configured in two ways:\n\n1. Via the `SENDBLUE_API_LOG` environment variable\n2. Using the `logLevel` client option (overrides the environment variable if set)\n\n```ts\nimport SendblueAPI from 'sendblue';\n\nconst client = new SendblueAPI({\n  logLevel: 'debug', // Show all log messages\n});\n```\n\nAvailable log levels, from most to least verbose:\n\n- `'debug'` - Show debug messages, info, warnings, and errors\n- `'info'` - Show info messages, warnings, and errors\n- `'warn'` - Show warnings and errors (default)\n- `'error'` - Show only errors\n- `'off'` - Disable all logging\n\nAt the `'debug'` level, all HTTP requests and responses are logged, including headers and bodies.\nSome authentication-related headers are redacted, but sensitive data in request and response bodies\nmay still be visible.\n\n#### Custom logger\n\nBy default, this library logs to `globalThis.console`. You can also provide a custom logger.\nMost logging libraries are supported, including [pino](https://www.npmjs.com/package/pino), [winston](https://www.npmjs.com/package/winston), [bunyan](https://www.npmjs.com/package/bunyan), [consola](https://www.npmjs.com/package/consola), [signale](https://www.npmjs.com/package/signale), and [@std/log](https://jsr.io/@std/log). If your logger doesn't work, please open an issue.\n\nWhen providing a custom logger, the `logLevel` option still controls which messages are emitted, messages\nbelow the configured level will not be sent to your logger.\n\n```ts\nimport SendblueAPI from 'sendblue';\nimport pino from 'pino';\n\nconst logger = pino();\n\nconst client = new SendblueAPI({\n  logger: logger.child({ name: 'SendblueAPI' }),\n  logLevel: 'debug', // Send all messages to pino, allowing it to filter\n});\n```\n\n### Making custom/undocumented requests\n\nThis library is typed for convenient access to the documented API. If you need to access undocumented\nendpoints, params, or response properties, the library can still be used.\n\n#### Undocumented endpoints\n\nTo make requests to undocumented endpoints, you can use `client.get`, `client.post`, and other HTTP verbs.\nOptions on the client, such as retries, will be respected when making these requests.\n\n```ts\nawait client.post('/some/path', {\n  body: { some_prop: 'foo' },\n  query: { some_query_arg: 'bar' },\n});\n```\n\n#### Undocumented request params\n\nTo make requests using undocumented parameters, you may use `// @ts-expect-error` on the undocumented\nparameter. This library doesn't validate at runtime that the request matches the type, so any extra values you\nsend will be sent as-is.\n\n```ts\nclient.messages.send({\n  // ...\n  // @ts-expect-error baz is not yet public\n  baz: 'undocumented option',\n});\n```\n\nFor requests with the `GET` verb, any extra params will be in the query, all other requests will send the\nextra param in the body.\n\nIf you want to explicitly send an extra argument, you can do so with the `query`, `body`, and `headers` request\noptions.\n\n#### Undocumented response properties\n\nTo access undocumented response properties, you may access the response object with `// @ts-expect-error` on\nthe response object, or cast the response object to the requisite type. Like the request params, we do not\nvalidate or strip extra properties from the response from the API.\n\n### Customizing the fetch client\n\nBy default, this library expects a global `fetch` function is defined.\n\nIf you want to use a different `fetch` function, you can either polyfill the global:\n\n```ts\nimport fetch from 'my-fetch';\n\nglobalThis.fetch = fetch;\n```\n\nOr pass it to the client:\n\n```ts\nimport SendblueAPI from 'sendblue';\nimport fetch from 'my-fetch';\n\nconst client = new SendblueAPI({ fetch });\n```\n\n### Fetch options\n\nIf you want to set custom `fetch` options without overriding the `fetch` function, you can provide a `fetchOptions` object when instantiating the client or making a request. (Request-specific options override client options.)\n\n```ts\nimport SendblueAPI from 'sendblue';\n\nconst client = new SendblueAPI({\n  fetchOptions: {\n    // `RequestInit` options\n  },\n});\n```\n\n#### Configuring proxies\n\nTo modify proxy behavior, you can provide custom `fetchOptions` that add runtime-specific proxy\noptions to requests:\n\n<img src=\"https://raw.githubusercontent.com/stainless-api/sdk-assets/refs/heads/main/node.svg\" align=\"top\" width=\"18\" height=\"21\"> **Node** <sup>[[docs](https://github.com/nodejs/undici/blob/main/docs/docs/api/ProxyAgent.md#example---proxyagent-with-fetch)]</sup>\n\n```ts\nimport SendblueAPI from 'sendblue';\nimport * as undici from 'undici';\n\nconst proxyAgent = new undici.ProxyAgent('http://localhost:8888');\nconst client = new SendblueAPI({\n  fetchOptions: {\n    dispatcher: proxyAgent,\n  },\n});\n```\n\n<img src=\"https://raw.githubusercontent.com/stainless-api/sdk-assets/refs/heads/main/bun.svg\" align=\"top\" width=\"18\" height=\"21\"> **Bun** <sup>[[docs](https://bun.sh/guides/http/proxy)]</sup>\n\n```ts\nimport SendblueAPI from 'sendblue';\n\nconst client = new SendblueAPI({\n  fetchOptions: {\n    proxy: 'http://localhost:8888',\n  },\n});\n```\n\n<img src=\"https://raw.githubusercontent.com/stainless-api/sdk-assets/refs/heads/main/deno.svg\" align=\"top\" width=\"18\" height=\"21\"> **Deno** <sup>[[docs](https://docs.deno.com/api/deno/~/Deno.createHttpClient)]</sup>\n\n```ts\nimport SendblueAPI from 'npm:sendblue';\n\nconst httpClient = Deno.createHttpClient({ proxy: { url: 'http://localhost:8888' } });\nconst client = new SendblueAPI({\n  fetchOptions: {\n    client: httpClient,\n  },\n});\n```\n\n## Frequently Asked Questions\n\n## Semantic versioning\n\nThis package generally follows [SemVer](https://semver.org/spec/v2.0.0.html) conventions, though certain backwards-incompatible changes may be released as minor versions:\n\n1. Changes that only affect static types, without breaking runtime behavior.\n2. Changes to library internals which are technically public but not intended or documented for external use. _(Please open a GitHub issue to let us know if you are relying on such internals.)_\n3. Changes that we do not expect to impact the vast majority of users in practice.\n\nWe take backwards-compatibility seriously and work hard to ensure you can rely on a smooth upgrade experience.\n\nWe are keen for your feedback; please open an [issue](https://www.github.com/sendblue-api/sendblue-ts/issues) with questions, bugs, or suggestions.\n\n## Requirements\n\nTypeScript >= 4.9 is supported.\n\nThe following runtimes are supported:\n\n- Web browsers (Up-to-date Chrome, Firefox, Safari, Edge, and more)\n- Node.js 20 LTS or later ([non-EOL](https://endoflife.date/nodejs)) versions.\n- Deno v1.28.0 or higher.\n- Bun 1.0 or later.\n- Cloudflare Workers.\n- Vercel Edge Runtime.\n- Jest 28 or greater with the `\"node\"` environment (`\"jsdom\"` is not supported at this time).\n- Nitro v2.6 or greater.\n\nNote that React Native is not supported at this time.\n\nIf you are interested in other runtime environments, please open or upvote an issue on GitHub.\n\n## Contributing\n\nSee [the contributing documentation](./CONTRIBUTING.md).\n"
  }
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
    fuzzy: 0.1,
    boost: {
      name: 5,
      stainlessPath: 3,
      endpoint: 3,
      qualified: 3,
      summary: 2,
      content: 1,
      description: 1,
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
    for (const readme of EMBEDDED_READMES) {
      instance.indexProse(readme.content, `readme:${readme.language}`);
    }
    if (opts?.docsDir) {
      await instance.loadDocsDirectory(opts.docsDir);
    }
    return instance;
  }

  search(props: {
    query: string;
    language?: string;
    detail?: string;
    maxResults?: number;
    maxLength?: number;
  }): SearchResult {
    const {
      query,
      language = 'typescript',
      detail = 'default',
      maxResults = 5,
      maxLength = 100_000,
    } = props;

    const useMarkdown = detail === 'verbose' || detail === 'high';

    // Search both indices and merge results by score.
    // Filter prose hits so language-tagged content (READMEs and docs with
    // frontmatter) only matches the requested language.
    const methodHits = this.methodIndex.search(query).map((hit) => ({ ...hit, _kind: 'http_method' as const }));
    const proseHits = this.proseIndex.search(query)
      .filter((hit) => {
        const source = ((hit as Record<string, unknown>)['_original'] as ProseChunk | undefined)?.source;
        if (!source) return true;
        // Check for language-tagged sources: "readme:<lang>" or "lang:<lang>:<filename>"
        let taggedLang: string | undefined;
        if (source.startsWith('readme:')) taggedLang = source.slice('readme:'.length);
        else if (source.startsWith('lang:')) taggedLang = source.split(':')[1];
        if (!taggedLang) return true;
        return taggedLang === language || (language === 'javascript' && taggedLang === 'typescript');
      })
      .map((hit) => ({ ...hit, _kind: 'prose' as const }));
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
          // Use per-language data when available, falling back to the
          // top-level fields (which are TypeScript-specific in the
          // legacy codepath).
          const langData = m.perLanguage?.[language];
          fullResults.push({
            method: langData?.method ?? m.qualified,
            summary: m.summary,
            description: m.description,
            endpoint: `${m.httpMethod.toUpperCase()} ${m.endpoint}`,
            ...(langData?.example ? { example: langData.example } : {}),
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
          // Parse optional YAML frontmatter for language tagging.
          // Files with a "language" field in frontmatter will only
          // surface in searches for that language.
          //
          // Example:
          //   ---
          //   language: python
          //   ---
          //   # Error handling in Python
          //   ...
          const frontmatter = parseFrontmatter(content);
          const source = frontmatter.language ? `lang:${frontmatter.language}:${file.name}` : file.name;
          this.indexProse(content, source);
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

/** Parses YAML frontmatter from a markdown string, extracting the language field if present. */
function parseFrontmatter(markdown: string): { language?: string } {
  const match = markdown.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return {};
  const body = match[1] ?? '';
  const langMatch = body.match(/^language:\s*(.+)$/m);
  return langMatch ? { language: langMatch[1]!.trim() } : {};
}
