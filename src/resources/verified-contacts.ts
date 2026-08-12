// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

/**
 * Operations for managing verified-contact access to shared iMessage lines
 */
export class VerifiedContacts extends APIResource {
  /**
   * Creates or returns a verified-contact route for the authenticated account's
   * shared iMessage line. Pending contacts become verified after the recipient sends
   * an inbound iMessage or SMS to the returned line phone number.
   *
   * @example
   * ```ts
   * const verifiedContact =
   *   await client.verifiedContacts.create({
   *     phone_number: '+12125550199',
   *   });
   * ```
   */
  create(
    body: VerifiedContactCreateParams,
    options?: RequestOptions,
  ): APIPromise<VerifiedContactCreateResponse> {
    return this._client.post('/v3/verified-contacts', { body, ...options });
  }

  /**
   * Retrieve one verified-contact route by phone number for the authenticated
   * account.
   *
   * @example
   * ```ts
   * const verifiedContact =
   *   await client.verifiedContacts.retrieve('+12125550199');
   * ```
   */
  retrieve(phoneNumber: string, options?: RequestOptions): APIPromise<VerifiedContactRetrieveResponse> {
    return this._client.get(path`/v3/verified-contacts/${phoneNumber}`, options);
  }

  /**
   * Lists contacts attached to the authenticated account's shared iMessage line.
   * Contacts start as `pending`; they become `verified` after the recipient sends an
   * inbound iMessage or SMS to the shared line.
   *
   * @example
   * ```ts
   * const verifiedContacts =
   *   await client.verifiedContacts.list();
   * ```
   */
  list(options?: RequestOptions): APIPromise<VerifiedContactListResponse> {
    return this._client.get('/v3/verified-contacts', options);
  }
}

export interface VerifiedContactCreateResponse {
  data?: VerifiedContactCreateResponse.Data;
}

export namespace VerifiedContactCreateResponse {
  export interface Data {
    contact: Data.Contact;

    line: Data.Line | null;

    /**
     * Null when the contact is already verified
     */
    verification_instructions: string | null;
  }

  export namespace Data {
    export interface Contact {
      created_at: string;

      /**
       * Contact phone number in E.164 format
       */
      phone_number: string;

      updated_at: string;

      verification_status: 'pending' | 'verified';

      /**
       * Whether this contact has completed verification by messaging the shared line
       */
      verified: boolean;
    }

    export interface Line {
      /**
       * Shared Sendblue line the contact must message to complete verification
       */
      phone_number: string | null;

      type: 'shared';
    }
  }
}

export interface VerifiedContactRetrieveResponse {
  data?: VerifiedContactRetrieveResponse.Data;
}

export namespace VerifiedContactRetrieveResponse {
  export interface Data {
    contact: Data.Contact | null;

    line: Data.Line | null;
  }

  export namespace Data {
    export interface Contact {
      created_at: string;

      /**
       * Contact phone number in E.164 format
       */
      phone_number: string;

      updated_at: string;

      verification_status: 'pending' | 'verified';

      /**
       * Whether this contact has completed verification by messaging the shared line
       */
      verified: boolean;
    }

    export interface Line {
      /**
       * Shared Sendblue line the contact must message to complete verification
       */
      phone_number: string | null;

      type: 'shared';
    }
  }
}

export interface VerifiedContactListResponse {
  data?: VerifiedContactListResponse.Data;
}

export namespace VerifiedContactListResponse {
  export interface Data {
    contacts: Array<Data.Contact>;

    line: Data.Line | null;
  }

  export namespace Data {
    export interface Contact {
      created_at: string;

      /**
       * Contact phone number in E.164 format
       */
      phone_number: string;

      updated_at: string;

      verification_status: 'pending' | 'verified';

      /**
       * Whether this contact has completed verification by messaging the shared line
       */
      verified: boolean;
    }

    export interface Line {
      /**
       * Shared Sendblue line the contact must message to complete verification
       */
      phone_number: string | null;

      type: 'shared';
    }
  }
}

export interface VerifiedContactCreateParams {
  /**
   * Contact phone number. E.164 is recommended; US local numbers are accepted.
   */
  phone_number: string;
}

export declare namespace VerifiedContacts {
  export {
    type VerifiedContactCreateResponse as VerifiedContactCreateResponse,
    type VerifiedContactRetrieveResponse as VerifiedContactRetrieveResponse,
    type VerifiedContactListResponse as VerifiedContactListResponse,
    type VerifiedContactCreateParams as VerifiedContactCreateParams,
  };
}
