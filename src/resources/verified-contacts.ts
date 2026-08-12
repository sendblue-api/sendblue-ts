// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

/**
 * Operations for managing verified contacts on shared iMessage lines
 */
export class VerifiedContacts extends APIResource {
  /**
   * Creates or returns a pending verified-contact route for the authenticated
   * account's shared iMessage line. The recipient must send any iMessage or SMS to
   * the returned line phone number to complete verification.
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
   * Lists the contacts attached to the authenticated account's shared iMessage line.
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

    line: Data.Line;

    verification_instructions: string | null;
  }

  export namespace Data {
    export interface Contact {
      /**
       * Internal WorkerRoute identifier.
       */
      id: number;

      created_at: string;

      /**
       * Contact phone number in E.164 format.
       */
      phone_number: string;

      updated_at: string;

      verification_status: 'pending' | 'verified';

      verified: boolean;
    }

    export interface Line {
      /**
       * Assigned Sendblue line in E.164 format.
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
    contact: Data.Contact;

    line: Data.Line | null;
  }

  export namespace Data {
    export interface Contact {
      /**
       * Internal WorkerRoute identifier.
       */
      id: number;

      created_at: string;

      /**
       * Contact phone number in E.164 format.
       */
      phone_number: string;

      updated_at: string;

      verification_status: 'pending' | 'verified';

      verified: boolean;
    }

    export interface Line {
      /**
       * Assigned Sendblue line in E.164 format.
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
      /**
       * Internal WorkerRoute identifier.
       */
      id: number;

      created_at: string;

      /**
       * Contact phone number in E.164 format.
       */
      phone_number: string;

      updated_at: string;

      verification_status: 'pending' | 'verified';

      verified: boolean;
    }

    export interface Line {
      /**
       * Assigned Sendblue line in E.164 format.
       */
      phone_number: string | null;

      type: 'shared';
    }
  }
}

export interface VerifiedContactCreateParams {
  /**
   * Contact phone number in E.164 format
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
