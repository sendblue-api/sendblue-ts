// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

export class SendMessage extends APIResource {
  /**
   * Send an iMessage, SMS, or MMS to a single recipient
   *
   * @example
   * ```ts
   * const messageResponse = await client.sendMessage.send({
   *   content: 'Hello, World!',
   *   from_number: '+19998887777',
   *   number: '+19998887777',
   * });
   * ```
   */
  send(body: SendMessageSendParams, options?: RequestOptions): APIPromise<MessageResponse> {
    return this._client.post('/api/send-message', { body, ...options });
  }
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

export interface SendMessageSendParams {
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

export declare namespace SendMessage {
  export { type MessageResponse as MessageResponse, type SendMessageSendParams as SendMessageSendParams };
}
