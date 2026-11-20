// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as ContactsAPI from './contacts';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';

/**
 * Operations for managing contacts
 */
export class Bulk extends APIResource {
  /**
   * Create multiple contacts in bulk. HTTP 200 can contain both successful contacts
   * and per-item failures. An enabled item's explicitly supplied email requires a
   * saved-value acknowledgment. A failed item may already have been created or
   * updated before acknowledgment failed; check its saved state before retrying.
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

  /**
   * Present when one or more items fail. An acknowledgment failure can follow a
   * committed creation or update.
   */
  failures?: Array<BulkCreateResponse.Failure>;

  /**
   * Number of successfully acknowledged items returned in contacts.
   */
  numberOfContactsCreated?: number;

  status?: string;
}

export namespace BulkCreateResponse {
  export interface Failure {
    /**
     * The submitted contact item that failed.
     */
    contact: { [key: string]: unknown };

    /**
     * Per-item failure message.
     */
    error: string;
  }
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
     * Contact's own email address. Enabled accounts may send a valid address or null.
     * Surrounding whitespace is trimmed. Blank strings and unknown.com addresses are
     * invalid. Disabled accounts and unavailable feature checks ignore this field.
     */
    email?: string | null;

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
