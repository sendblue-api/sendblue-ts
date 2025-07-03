// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as SendMessageAPI from './send-message';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

export class SendGroupMessage extends APIResource {
  /**
   * Send a message to a group of recipients (beta feature)
   *
   * @example
   * ```ts
   * const messageResponse = await client.sendGroupMessage.send({
   *   content: 'Hello, everyone!',
   *   from_number: '+19998887777',
   * });
   * ```
   */
  send(
    body: SendGroupMessageSendParams,
    options?: RequestOptions,
  ): APIPromise<SendMessageAPI.MessageResponse> {
    return this._client.post('/api/send-group-message', { body, ...options });
  }
}

export interface SendGroupMessageSendParams {
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
   * Unique identifier for an existing group
   */
  group_id?: string;

  /**
   * URL of media file to send
   */
  media_url?: string;

  /**
   * Array of recipient phone numbers in E.164 format
   */
  numbers?: Array<string>;
}

export declare namespace SendGroupMessage {
  export { type SendGroupMessageSendParams as SendGroupMessageSendParams };
}
