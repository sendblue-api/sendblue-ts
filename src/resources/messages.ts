// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class Messages extends APIResource {
  /**
   * Retrieve details of a specific message by its handle
   *
   * @example
   * ```ts
   * const message = await client.messages.retrieve(
   *   'msg_abc123def456',
   * );
   * ```
   */
  retrieve(messageHandle: string, options?: RequestOptions): APIPromise<MessageRetrieveResponse> {
    return this._client.get(path`/api/message/${messageHandle}`, options);
  }

  /**
   * Retrieve a list of messages for the authenticated account
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
    return this._client.get('/api/message', { query, ...options });
  }

  /**
   * Delete a specific message by its handle
   *
   * @example
   * ```ts
   * const message = await client.messages.delete(
   *   'msg_abc123def456',
   * );
   * ```
   */
  delete(messageHandle: string, options?: RequestOptions): APIPromise<MessageDeleteResponse> {
    return this._client.delete(path`/api/message/${messageHandle}`, options);
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

export interface MessageRetrieveResponse {
  message?: MessageContent;

  status?: string;
}

export interface MessageListResponse {
  messages?: Array<MessageContent>;

  status?: string;
}

export interface MessageDeleteResponse {
  status?: string;
}

export interface MessageListParams {
  /**
   * Query messages for another account (admin only)
   */
  for_account?: string;

  /**
   * Maximum number of messages to return
   */
  limit?: number;

  /**
   * Filter messages by phone number
   */
  number?: string;

  /**
   * Number of messages to skip
   */
  offset?: number;

  /**
   * Field to order messages by
   */
  orderBy?: 'createdAt' | 'updatedAt';

  /**
   * Sort order
   */
  orderDirection?: 'asc' | 'desc';

  /**
   * Filter by message type
   */
  type?: 'message' | 'group';
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
    type MessageRetrieveResponse as MessageRetrieveResponse,
    type MessageListResponse as MessageListResponse,
    type MessageDeleteResponse as MessageDeleteResponse,
    type MessageListParams as MessageListParams,
    type MessageSendParams as MessageSendParams,
  };
}
