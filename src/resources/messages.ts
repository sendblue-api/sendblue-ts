// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

export class Messages extends APIResource {
  /**
   * Retrieve a list of messages for the authenticated account with comprehensive
   * filtering capabilities. Rate limited to 100 requests per 10 seconds per account.
   *
   * @example
   * ```ts
   * const messages = await client.messages.list();
   * ```
   */
  list(
    query: MessageListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<MessageListResponse> {
    return this._client.get('/api/v2/messages', { query, ...options });
  }

  /**
   * Send an iMessage, SMS, or MMS to a single recipient
   *
   * @example
   * ```ts
   * const messageResponse = await client.messages.send({
   *   content: 'Hello, World!',
   *   from_number: '+19998887777',
   *   number: '+19998887777',
   * });
   * ```
   */
  send(body: MessageSendParams, options?: RequestOptions): APIPromise<MessageResponse> {
    return this._client.post('/api/send-message', { body, ...options });
  }
}

export interface MessageContent {
  /**
   * Email of the account
   */
  account_email?: string;

  /**
   * Message content
   */
  content?: string;

  /**
   * When the message was created
   */
  date_created?: string;

  /**
   * When the message was sent
   */
  date_sent?: string;

  /**
   * When the message was last updated
   */
  date_updated?: string;

  /**
   * Sender phone number
   */
  from_number?: string;

  /**
   * Whether this is an outbound message
   */
  is_outbound?: boolean;

  /**
   * URL of attached media
   */
  media_url?: string;

  /**
   * Unique message identifier
   */
  message_handle?: string;

  send_style?: 'imessage' | 'sms';

  status?: 'QUEUED' | 'SENT' | 'DELIVERED' | 'READ' | 'ERROR' | 'RECEIVED';

  /**
   * Recipient phone number
   */
  to_number?: string;
}

export interface MessageResponse {
  /**
   * Email of the account that sent the message
   */
  account_email?: string;

  /**
   * Message content
   */
  content?: string;

  /**
   * When the message was created
   */
  date_created?: string;

  /**
   * When the message was last updated
   */
  date_updated?: string;

  /**
   * Numeric error code if message failed
   */
  error_code?: number;

  /**
   * Error message if message failed
   */
  error_message?: string;

  /**
   * Sending phone number
   */
  from_number?: string;

  /**
   * Whether this is an outbound message
   */
  is_outbound?: boolean;

  /**
   * URL of attached media
   */
  media_url?: string;

  /**
   * Unique identifier for tracking the message
   */
  message_handle?: string;

  /**
   * Recipient phone number
   */
  number?: string;

  /**
   * How the message was sent
   */
  send_style?: 'imessage' | 'sms';

  status?: 'QUEUED' | 'SENT' | 'DELIVERED' | 'READ' | 'ERROR';
}

export interface MessageListResponse {
  data?: Array<MessageListResponse.Data>;

  pagination?: MessageListResponse.Pagination;

  status?: string;
}

export namespace MessageListResponse {
  export interface Data {
    /**
     * Email of the account
     */
    accountEmail?: string;

    /**
     * Message content
     */
    content?: string;

    /**
     * When the message was sent
     */
    date_sent?: string;

    /**
     * When the message was last updated
     */
    date_updated?: string;

    /**
     * Numeric error code if message failed
     */
    error_code?: number | null;

    /**
     * Detailed error information
     */
    error_detail?: string | null;

    /**
     * Error message if message failed
     */
    error_message?: string | null;

    /**
     * Error reason if message failed
     */
    error_reason?: string | null;

    /**
     * Sender phone number
     */
    from_number?: string;

    /**
     * Display name for group messages
     */
    group_display_name?: string | null;

    /**
     * Group ID for group messages
     */
    group_id?: string | null;

    /**
     * Whether this is an outbound message
     */
    is_outbound?: boolean;

    /**
     * URL of attached media
     */
    media_url?: string | null;

    /**
     * Unique message identifier
     */
    message_handle?: string;

    message_type?: 'message' | 'group';

    /**
     * Primary phone number (to_number for outbound, from_number for inbound)
     */
    number?: string;

    /**
     * Whether the recipient has opted out
     */
    opted_out?: boolean;

    /**
     * List of participants for group messages
     */
    participants?: Array<string>;

    /**
     * Account plan used for this message
     */
    plan?: string;

    /**
     * How the message was sent
     */
    send_style?: string;

    /**
     * Sendblue phone number used
     */
    sendblue_number?: string | null;

    service?: 'iMessage' | 'SMS';

    status?:
      | 'REGISTERED'
      | 'PENDING'
      | 'SENT'
      | 'DELIVERED'
      | 'RECEIVED'
      | 'QUEUED'
      | 'ERROR'
      | 'DECLINED'
      | 'ACCEPTED'
      | 'SUCCESS';

    /**
     * Recipient phone number
     */
    to_number?: string;

    /**
     * Whether the message was downgraded from iMessage to SMS
     */
    was_downgraded?: boolean;
  }

  export interface Pagination {
    /**
     * Whether there are more messages available
     */
    hasMore?: boolean;

    /**
     * Number of messages returned in this request
     */
    limit?: number;

    /**
     * Number of messages skipped
     */
    offset?: number;

    /**
     * Total number of messages matching the filters
     */
    total?: number;
  }
}

export interface MessageListParams {
  /**
   * Filter by account email
   */
  account_email?: string;

  /**
   * Filter messages created after this date (ISO 8601 format)
   */
  created_at_gte?: string;

  /**
   * Filter messages created before this date (ISO 8601 format)
   */
  created_at_lte?: string;

  /**
   * Filter by sender phone number
   */
  from_number?: string;

  /**
   * Filter by group ID
   */
  group_id?: string;

  /**
   * Filter by message direction
   */
  is_outbound?: 'true' | 'false';

  /**
   * Maximum number of messages to return
   */
  limit?: number;

  /**
   * Filter by message type
   */
  message_type?: 'message' | 'group';

  /**
   * Filter by any phone number (from or to)
   */
  number?: string;

  /**
   * Number of messages to skip
   */
  offset?: number;

  /**
   * Field to order messages by
   */
  order_by?: 'createdAt' | 'updatedAt' | 'sentAt';

  /**
   * Sort order
   */
  order_direction?: 'asc' | 'desc';

  /**
   * Filter by Sendblue phone number
   */
  sendblue_number?: string;

  /**
   * Filter messages sent after this date (ISO 8601 format)
   */
  sent_at_gte?: string;

  /**
   * Filter messages sent before this date (ISO 8601 format)
   */
  sent_at_lte?: string;

  /**
   * Filter by service type
   */
  service?: 'iMessage' | 'SMS';

  /**
   * Filter by message status
   */
  status?:
    | 'REGISTERED'
    | 'PENDING'
    | 'SENT'
    | 'DELIVERED'
    | 'RECEIVED'
    | 'QUEUED'
    | 'ERROR'
    | 'DECLINED'
    | 'ACCEPTED'
    | 'SUCCESS';

  /**
   * Filter by recipient phone number
   */
  to_number?: string;

  /**
   * Filter messages updated after this date (ISO 8601 format)
   */
  updated_at_gte?: string;

  /**
   * Filter messages updated before this date (ISO 8601 format)
   */
  updated_at_lte?: string;

  /**
   * Filter by worker ID (Admin only)
   */
  worker_id?: string;
}

export interface MessageSendParams {
  /**
   * Message text content
   */
  content: string;

  /**
   * **REQUIRED** - The phone number to send from. Must be one of your registered
   * Sendblue phone numbers in E.164 format. Without this parameter, the message will
   * fail to send.
   */
  from_number: string;

  /**
   * Recipient phone number in E.164 format
   */
  number: string;

  /**
   * URL of media file to send (images, videos, etc.)
   */
  media_url?: string;

  /**
   * Message delivery style
   */
  send_style?: 'imessage' | 'sms';

  /**
   * Webhook URL for message status updates
   */
  status_callback?: string;
}

export declare namespace Messages {
  export {
    type MessageContent as MessageContent,
    type MessageResponse as MessageResponse,
    type MessageListResponse as MessageListResponse,
    type MessageListParams as MessageListParams,
    type MessageSendParams as MessageSendParams,
  };
}
