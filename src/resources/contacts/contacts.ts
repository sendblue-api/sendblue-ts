// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as BulkAPI from './bulk';
import { Bulk, BulkCreateParams, BulkCreateResponse, BulkDeleteParams, BulkDeleteResponse } from './bulk';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Contacts extends APIResource {
  bulk: BulkAPI.Bulk = new BulkAPI.Bulk(this._client);

  /**
   * Create a new contact or update existing if update_if_exists is true
   *
   * @example
   * ```ts
   * const contact = await client.contacts.create({
   *   number: 'number',
   * });
   * ```
   */
  create(body: ContactCreateParams, options?: RequestOptions): APIPromise<ContactCreateResponse> {
    return this._client.post('/api/v2/contacts', { body, ...options });
  }

  /**
   * Retrieve a specific contact by phone number
   *
   * @example
   * ```ts
   * const contact = await client.contacts.retrieve(
   *   '+1234567890',
   * );
   * ```
   */
  retrieve(phoneNumber: string, options?: RequestOptions): APIPromise<ContactRetrieveResponse> {
    return this._client.get(path`/api/v2/contacts/${phoneNumber}`, options);
  }

  /**
   * Update an existing contact
   *
   * @example
   * ```ts
   * const contact = await client.contacts.update('+1234567890');
   * ```
   */
  update(
    phoneNumber: string,
    body: ContactUpdateParams,
    options?: RequestOptions,
  ): APIPromise<ContactUpdateResponse> {
    return this._client.put(path`/api/v2/contacts/${phoneNumber}`, { body, ...options });
  }

  /**
   * Retrieve a list of contacts for the authenticated account
   *
   * @example
   * ```ts
   * const contacts = await client.contacts.list();
   * ```
   */
  list(
    query: ContactListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<ContactListResponse> {
    return this._client.get('/api/v2/contacts', { query, ...options });
  }

  /**
   * Delete a specific contact
   *
   * @example
   * ```ts
   * const contact = await client.contacts.delete('+1234567890');
   * ```
   */
  delete(phoneNumber: string, options?: RequestOptions): APIPromise<ContactDeleteResponse> {
    return this._client.delete(path`/api/v2/contacts/${phoneNumber}`, options);
  }

  /**
   * Get the total number of contacts
   *
   * @example
   * ```ts
   * const response = await client.contacts.count();
   * ```
   */
  count(options?: RequestOptions): APIPromise<ContactCountResponse> {
    return this._client.get('/api/v2/contacts/count', options);
  }

  /**
   * Send a verification message to a contact
   *
   * @example
   * ```ts
   * const response = await client.contacts.verify({
   *   number: 'number',
   * });
   * ```
   */
  verify(body: ContactVerifyParams, options?: RequestOptions): APIPromise<ContactVerifyResponse> {
    return this._client.post('/api/v2/contacts/verify', { body, ...options });
  }
}

export interface Contact {
  /**
   * Email of assigned user
   */
  assignedToEmail?: string;

  /**
   * Company name
   */
  companyName?: string;

  /**
   * When the contact was created
   */
  created_at?: string;

  /**
   * First name
   */
  firstName?: string;

  /**
   * Last name
   */
  lastName?: string;

  /**
   * Phone number in E.164 format
   */
  phone?: string;

  /**
   * Associated Sendblue phone number
   */
  sendblueNumber?: string;

  /**
   * Tags associated with the contact
   */
  tags?: Array<string>;

  /**
   * Whether the contact is verified
   */
  verified?: boolean;
}

export interface ContactCreateResponse {
  contact?: Contact;

  status?: string;
}

export interface ContactRetrieveResponse {
  contact?: Contact;

  status?: string;
}

export interface ContactUpdateResponse {
  contact?: Contact;

  status?: string;
}

export type ContactListResponse = Array<Contact>;

export interface ContactDeleteResponse {
  status?: string;
}

export interface ContactCountResponse {
  /**
   * Total number of contacts
   */
  count?: number;
}

export interface ContactVerifyResponse {
  status?: string;
}

export interface ContactCreateParams {
  /**
   * Contact's phone number in E.164 format
   */
  number: string;

  /**
   * Email of assigned user
   */
  assigned_to_email?: string;

  /**
   * Email of assigned user (alternative)
   */
  assignedToEmail?: string;

  /**
   * Contact's first name
   */
  first_name?: string;

  /**
   * Contact's first name (alternative)
   */
  firstName?: string;

  /**
   * Contact's last name
   */
  last_name?: string;

  /**
   * Contact's last name (alternative)
   */
  lastName?: string;

  /**
   * Contact's phone number (alternative)
   */
  phone_number?: string;

  /**
   * Contact's phone number (alternative)
   */
  phoneNumber?: string;

  /**
   * Associated Sendblue phone number
   */
  sendblue_number?: string;

  /**
   * Associated Sendblue phone number (alternative)
   */
  sendblueNumber?: string;

  /**
   * Tags for the contact
   */
  tags?: Array<string>;

  /**
   * If true, updates the contact if it already exists
   */
  update_if_exists?: boolean;
}

export interface ContactUpdateParams {
  assignedToEmail?: string;

  companyName?: string;

  firstName?: string;

  lastName?: string;

  sendblueNumber?: string;

  tags?: Array<string>;
}

export interface ContactListParams {
  /**
   * Filter by contact ID
   */
  cid?: string;

  /**
   * Maximum number of contacts to return
   */
  limit?: number;

  /**
   * Number of contacts to skip
   */
  offset?: number;

  /**
   * Field to sort by
   */
  order_by?: string;

  /**
   * Sort direction
   */
  order_direction?: 'asc' | 'desc';

  /**
   * Filter by phone number
   */
  phone_number?: string;
}

export interface ContactVerifyParams {
  /**
   * Phone number to verify
   */
  number: string;
}

Contacts.Bulk = Bulk;

export declare namespace Contacts {
  export {
    type Contact as Contact,
    type ContactCreateResponse as ContactCreateResponse,
    type ContactRetrieveResponse as ContactRetrieveResponse,
    type ContactUpdateResponse as ContactUpdateResponse,
    type ContactListResponse as ContactListResponse,
    type ContactDeleteResponse as ContactDeleteResponse,
    type ContactCountResponse as ContactCountResponse,
    type ContactVerifyResponse as ContactVerifyResponse,
    type ContactCreateParams as ContactCreateParams,
    type ContactUpdateParams as ContactUpdateParams,
    type ContactListParams as ContactListParams,
    type ContactVerifyParams as ContactVerifyParams,
  };

  export {
    Bulk as Bulk,
    type BulkCreateResponse as BulkCreateResponse,
    type BulkDeleteResponse as BulkDeleteResponse,
    type BulkCreateParams as BulkCreateParams,
    type BulkDeleteParams as BulkDeleteParams,
  };
}
