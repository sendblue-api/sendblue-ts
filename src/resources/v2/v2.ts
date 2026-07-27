// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as SeatsAPI from './seats';
import {
  SeatCountParams,
  SeatCountResponse,
  SeatListParams,
  SeatListResponse,
  SeatRetrieveResponse,
  Seats,
} from './seats';
import * as TotpAPI from './totp/totp';
import { Totp, TotpGetCodeResponse } from './totp/totp';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

/**
 * Operations for group messaging (beta)
 */
export class V2 extends APIResource {
  totp: TotpAPI.Totp = new TotpAPI.Totp(this._client);
  seats: SeatsAPI.Seats = new SeatsAPI.Seats(this._client);

  /**
   * Retrieve the current complete membership for a group owned by the authenticated
   * account.
   *
   * @example
   * ```ts
   * const response = await client.v2.retrieveGroupMembership(
   *   'sb_group_608acc54-d0d7-4b41-8092-9ff6e1e70455',
   * );
   * ```
   */
  retrieveGroupMembership(
    groupID: string,
    options?: RequestOptions,
  ): APIPromise<V2RetrieveGroupMembershipResponse> {
    return this._client.get(path`/api/v2/groups/${groupID}`, options);
  }
}

export interface V2RetrieveGroupMembershipResponse {
  data?: V2RetrieveGroupMembershipResponse.Data;

  status?: string;
}

export namespace V2RetrieveGroupMembershipResponse {
  export interface Data {
    created_at?: string;

    group_id?: string;

    group_name?: string;

    latest_comm_at?: string | null;

    latest_message_id?: string | null;

    /**
     * Convenience list of resolved participant phone numbers. Participants with
     * email-only handles remain in participants but are omitted here.
     */
    participant_numbers?: Array<string>;

    participants?: Array<Data.Participant>;

    updated_at?: string;

    /**
     * Worker-local iMessage group identifier when known
     */
    worker_group_id?: string | null;
  }

  export namespace Data {
    export interface Participant {
      /**
       * Contact ID when this participant is linked to a contact
       */
      contact_id?: string | null;

      /**
       * Raw participant handle, usually an E.164 phone number but sometimes an iMessage
       * email handle
       */
      handle?: string | null;

      /**
       * Contact or seat display name when available
       */
      name?: string | null;

      /**
       * Unique participant row identifier
       */
      participant_id?: string;

      /**
       * Resolved participant phone number, preferring the stored group phone handle and
       * falling back to contact phone. Email handles remain available in handle.
       */
      phone?: string | null;

      /**
       * Seat ID when this participant is a team member
       */
      seat_id?: string | null;

      /**
       * Participant kind
       */
      type?: 'contact' | 'seat';
    }
  }
}

V2.Totp = Totp;
V2.Seats = Seats;

export declare namespace V2 {
  export { type V2RetrieveGroupMembershipResponse as V2RetrieveGroupMembershipResponse };

  export { Totp as Totp, type TotpGetCodeResponse as TotpGetCodeResponse };

  export {
    Seats as Seats,
    type SeatRetrieveResponse as SeatRetrieveResponse,
    type SeatListResponse as SeatListResponse,
    type SeatCountResponse as SeatCountResponse,
    type SeatListParams as SeatListParams,
    type SeatCountParams as SeatCountParams,
  };
}
