// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as MessagesAPI from './messages';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

export class Groups extends APIResource {
  /**
   * Add or manage participants in a group chat (beta feature)
   *
   * @example
   * ```ts
   * const response = await client.groups.modify({
   *   group_id: 'group_123456',
   *   modify_type: 'add_recipient',
   *   number: '+19998887777',
   * });
   * ```
   */
  modify(body: GroupModifyParams, options?: RequestOptions): APIPromise<GroupModifyResponse> {
    return this._client.post('/api/modify-group', { body, ...options });
  }

  /**
   * Send a message to a group of recipients (beta feature)
   *
   * @example
   * ```ts
   * const messageResponse = await client.groups.sendMessage({
   *   content: 'Hello, everyone!',
   *   from_number: '+19998887777',
   * });
   * ```
   */
  sendMessage(
    body: GroupSendMessageParams,
    options?: RequestOptions,
  ): APIPromise<MessagesAPI.MessageResponse> {
    return this._client.post('/api/send-group-message', { body, ...options });
  }
}

export interface GroupModifyResponse {
  message?: string;

  status?: string;
}

export interface GroupModifyParams {
  /**
   * Group identifier
   */
  group_id: string;

  /**
   * Type of modification to perform
   */
  modify_type: 'add_recipient';

  /**
   * Phone number to add/modify in E.164 format
   */
  number: string;
}

export interface GroupSendMessageParams {
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

export declare namespace Groups {
  export {
    type GroupModifyResponse as GroupModifyResponse,
    type GroupModifyParams as GroupModifyParams,
    type GroupSendMessageParams as GroupSendMessageParams,
  };
}
