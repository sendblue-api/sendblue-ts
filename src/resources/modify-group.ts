// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

export class ModifyGroup extends APIResource {
  /**
   * Add or manage participants in a group chat (beta feature)
   *
   * @example
   * ```ts
   * const modifyGroup = await client.modifyGroup.create({
   *   group_id: 'group_123456',
   *   modify_type: 'add_recipient',
   *   number: '+19998887777',
   * });
   * ```
   */
  create(body: ModifyGroupCreateParams, options?: RequestOptions): APIPromise<ModifyGroupCreateResponse> {
    return this._client.post('/api/modify-group', { body, ...options });
  }
}

export interface ModifyGroupCreateResponse {
  message?: string;

  status?: string;
}

export interface ModifyGroupCreateParams {
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

export declare namespace ModifyGroup {
  export {
    type ModifyGroupCreateResponse as ModifyGroupCreateResponse,
    type ModifyGroupCreateParams as ModifyGroupCreateParams,
  };
}
