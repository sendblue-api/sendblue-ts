// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as ContactsAPI from './contacts';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';

export class Bulk extends APIResource {
  /**
   * Create multiple contacts in bulk
   *
   * @example
   * ```ts
   * const bulk = await client.contacts.bulk.create({
   *   contacts: [{ phone: 'phone' }],
   * });
   * ```
   */
  create(body: BulkCreateParams, options?: RequestOptions): APIPromise<BulkCreateResponse> {
    return this._client.post('/api/v2/contacts/bulk', { body, ...options });
  }

  /**
   * Delete multiple contacts by their IDs
   *
   * @example
   * ```ts
   * const bulk = await client.contacts.bulk.delete({
   *   contact_ids: ['+1234567890', '+0987654321'],
   * });
   * ```
   */
  delete(body: BulkDeleteParams, options?: RequestOptions): APIPromise<BulkDeleteResponse> {
    return this._client.delete('/api/v2/contacts', { body, ...options });
  }
}

export interface BulkCreateResponse {
  contacts?: Array<ContactsAPI.Contact>;

  status?: string;
}

export interface BulkDeleteResponse {
  /**
   * Number of contacts deleted
   */
  amount?: number;

  status?: string;
}

export interface BulkCreateParams {
  contacts: Array<BulkCreateParams.Contact>;
}

export namespace BulkCreateParams {
  export interface Contact {
    /**
     * Phone number in E.164 format
     */
    phone: string;

    /**
     * Company name
     */
    company_name?: string;

    /**
     * Custom key-value pairs. Keys are human-readable labels; new labels are
     * auto-created.
     */
    custom_variables?: { [key: string]: string };

    /**
     * Contact's first name
     */
    first_name?: string;

    /**
     * Contact's last name
     */
    last_name?: string;

    tags?: Array<string>;
  }
}

export interface BulkDeleteParams {
  /**
   * Array of phone numbers in E.164 format to delete
   */
  contact_ids: Array<string>;
}

export declare namespace Bulk {
  export {
    type BulkCreateResponse as BulkCreateResponse,
    type BulkDeleteResponse as BulkDeleteResponse,
    type BulkCreateParams as BulkCreateParams,
    type BulkDeleteParams as BulkDeleteParams,
  };
}
