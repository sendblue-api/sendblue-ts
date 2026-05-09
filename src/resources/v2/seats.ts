// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

/**
 * Operations for retrieving seats (users) on the account, used for attribution via `seat_id`
 */
export class Seats extends APIResource {
  /**
   * Retrieve a single seat by either its UUID or its Firebase Auth subject. Both
   * identifiers resolve to the same seat.
   *
   * @example
   * ```ts
   * const seat = await client.v2.seats.retrieve('seat_id');
   * ```
   */
  retrieve(seatID: string, options?: RequestOptions): APIPromise<SeatRetrieveResponse> {
    return this._client.get(path`/api/v2/seats/${seatID}`, options);
  }

  /**
   * Retrieve a list of seats (users) for the authenticated company. Use the returned
   * `seat_id` values when sending messages with the `seat_id` parameter to attribute
   * activity to a specific rep.
   *
   * @example
   * ```ts
   * const seats = await client.v2.seats.list();
   * ```
   */
  list(
    query: SeatListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<SeatListResponse> {
    return this._client.get('/api/v2/seats', { query, ...options });
  }

  /**
   * Returns the number of seats for the authenticated company.
   *
   * @example
   * ```ts
   * const response = await client.v2.seats.count();
   * ```
   */
  count(
    query: SeatCountParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<SeatCountResponse> {
    return this._client.get('/api/v2/seats/count', { query, ...options });
  }
}

export interface SeatRetrieveResponse {
  seat?: SeatRetrieveResponse.Seat;

  status?: string;
}

export namespace SeatRetrieveResponse {
  export interface Seat {
    /**
     * Account name the seat belongs to
     */
    account?: string;

    /**
     * When the seat was created
     */
    created_at?: string;

    /**
     * Email address of the seat user
     */
    email?: string;

    /**
     * First name
     */
    first_name?: string | null;

    /**
     * Optional phone number used to forward calls
     */
    forwarding_number?: string | null;

    /**
     * Last name
     */
    last_name?: string | null;

    /**
     * Primary identifier for the seat. Pass this on the send endpoints' `seat_id`
     * parameter.
     */
    seat_id?: string;
  }
}

export type SeatListResponse = Array<SeatListResponse.SeatListResponseItem>;

export namespace SeatListResponse {
  export interface SeatListResponseItem {
    /**
     * Account name the seat belongs to
     */
    account?: string;

    /**
     * When the seat was created
     */
    created_at?: string;

    /**
     * Email address of the seat user
     */
    email?: string;

    /**
     * First name
     */
    first_name?: string | null;

    /**
     * Optional phone number used to forward calls
     */
    forwarding_number?: string | null;

    /**
     * Last name
     */
    last_name?: string | null;

    /**
     * Primary identifier for the seat. Pass this on the send endpoints' `seat_id`
     * parameter.
     */
    seat_id?: string;
  }
}

export interface SeatCountResponse {
  count?: number;
}

export interface SeatListParams {
  /**
   * Optional exact-match filter on seat email
   */
  email?: string;

  /**
   * Maximum number of seats to return
   */
  limit?: number;

  /**
   * Number of seats to skip
   */
  offset?: number;
}

export interface SeatCountParams {
  /**
   * Optional exact-match filter on seat email
   */
  email?: string;
}

export declare namespace Seats {
  export {
    type SeatRetrieveResponse as SeatRetrieveResponse,
    type SeatListResponse as SeatListResponse,
    type SeatCountResponse as SeatCountResponse,
    type SeatListParams as SeatListParams,
    type SeatCountParams as SeatCountParams,
  };
}
