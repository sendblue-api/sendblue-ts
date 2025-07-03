// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class Message extends APIResource {
  /**
   * Retrieve details of a specific message by its handle
   */
  retrieve(messageHandle: string, options?: RequestOptions): APIPromise<MessageRetrieveResponse> {
    return this._client.get(path`/api/message/${messageHandle}`, options);
  }

  /**
   * Retrieve a list of messages for the authenticated account
   */
  list(
    query: MessageListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<MessageListResponse> {
    return this._client.get('/api/message', { query, ...options });
  }

  /**
   * Delete a specific message by its handle
   */
  delete(messageHandle: string, options?: RequestOptions): APIPromise<MessageDeleteResponse> {
    return this._client.delete(path`/api/message/${messageHandle}`, options);
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

export declare namespace Message {
  export {
    type MessageContent as MessageContent,
    type MessageRetrieveResponse as MessageRetrieveResponse,
    type MessageListResponse as MessageListResponse,
    type MessageDeleteResponse as MessageDeleteResponse,
    type MessageListParams as MessageListParams,
  };
}
