// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

export class TypingIndicator extends APIResource {
  /**
   * Send an indication that you are typing to a user. This shows up as the animated
   * three dots on the recipient's device. Only available for existing chats and not
   * supported in group chats.
   *
   * @example
   * ```ts
   * const response = await client.typingIndicator.send({
   *   number: '+19998887777',
   * });
   * ```
   */
  send(body: TypingIndicatorSendParams, options?: RequestOptions): APIPromise<TypingIndicatorSendResponse> {
    return this._client.post('/api/send-typing-indicator', { body, ...options });
  }
}

export interface TypingIndicatorSendResponse {
  /**
   * The error message if the status is ERROR
   */
  error_message?: string | null;

  /**
   * The number you evaluated in E.164 format
   */
  number?: string;

  /**
   * The status of the typing indicator you tried to send
   */
  status?: 'SENT' | 'ERROR';
}

export interface TypingIndicatorSendParams {
  /**
   * The number you want to send a typing indicator to (E.164 format)
   */
  number: string;
}

export declare namespace TypingIndicator {
  export {
    type TypingIndicatorSendResponse as TypingIndicatorSendResponse,
    type TypingIndicatorSendParams as TypingIndicatorSendParams,
  };
}
