// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

/**
 * Operations for sending and managing messages
 */
export class Location extends APIResource {
  /**
   * Read the current Find My location for one contact if that contact already shares
   * with the sending Sendblue number.
   */
  retrieve(
    number: string,
    query: LocationRetrieveParams,
    options?: RequestOptions,
  ): APIPromise<LocationRetrieveResponse> {
    return this._client.get(path`/api/location/${number}`, { query, ...options });
  }

  /**
   * Read the current Find My locations already shared with a supported Sendblue
   * number. For shared-worker-backed lines, results are filtered to verified
   * contacts.
   */
  list(query: LocationListParams, options?: RequestOptions): APIPromise<LocationListResponse> {
    return this._client.get('/api/location', { query, ...options });
  }
}

export interface LocationRetrieveResponse {
  from_number?: string;

  location?: LocationRetrieveResponse.Location;

  number?: string;

  state?: 'not_shared' | 'shared_no_fix_yet' | 'shared_with_fix';

  status?: 'OK';
}

export namespace LocationRetrieveResponse {
  export interface Location {
    accuracy?: number;

    address?: string | null;

    altitude?: number;

    expiresAt?: string;

    latitude?: number;

    locationType?: 'shallow' | 'live' | 'legacy' | 'unknown';

    longitude?: number;

    /**
     * Present when cached data is returned after a refresh error
     */
    refreshError?: string;

    timestamp?: string;
  }
}

export interface LocationListResponse {
  from_number?: string;

  locations?: Array<LocationListResponse.Location>;

  status?: 'OK';
}

export namespace LocationListResponse {
  export interface Location {
    location?: Location.Location;

    number?: string;

    state?: 'not_shared' | 'shared_no_fix_yet' | 'shared_with_fix';
  }

  export namespace Location {
    export interface Location {
      accuracy?: number;

      address?: string | null;

      altitude?: number;

      expiresAt?: string;

      latitude?: number;

      locationType?: 'shallow' | 'live' | 'legacy' | 'unknown';

      longitude?: number;

      /**
       * Present when cached data is returned after a refresh error
       */
      refreshError?: string;

      timestamp?: string;
    }
  }
}

export interface LocationRetrieveParams {
  /**
   * Your Sendblue number in E.164 format
   */
  from_number: string;
}

export interface LocationListParams {
  /**
   * Your Sendblue number in E.164 format
   */
  from_number: string;
}

export declare namespace Location {
  export {
    type LocationRetrieveResponse as LocationRetrieveResponse,
    type LocationListResponse as LocationListResponse,
    type LocationRetrieveParams as LocationRetrieveParams,
    type LocationListParams as LocationListParams,
  };
}
