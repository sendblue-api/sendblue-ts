// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

export class TypingIndicators extends APIResource {
  /**
   * Send an indication that you are typing to a user. This shows up as the animated
   * three dots on the recipient's device. Not supported in group chats.
   *
   * @example
   * ```ts
   * const response = await client.typingIndicators.send({
   *   from_number: '+16292925296',
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
   * The Sendblue phone number you want to send the typing indicator from (E.164
   * format). This should be the number you use to send messages.
   */
  from_number: string;

  /**
   * The number you want to send a typing indicator to (E.164 format)
   */
  number: string;
}

export declare namespace TypingIndicators {
  export {
    type TypingIndicatorSendResponse as TypingIndicatorSendResponse,
    type TypingIndicatorSendParams as TypingIndicatorSendParams,
  };
}
