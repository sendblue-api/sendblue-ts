// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { Stream } from '../core/streaming';
import { buildHeaders } from '../internal/headers';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

/**
 * Operations for sending and managing messages
 */
export class Location extends APIResource {
  /**
   * Read the current Find My location for one contact if that contact already shares
   * with a dedicated Mac-backed Sendblue number. Shared lines cannot use this
   * endpoint.
   */
  retrieve(
    number: string,
    query: LocationRetrieveParams,
    options?: RequestOptions,
  ): APIPromise<LocationRetrieveResponse> {
    return this._client.get(path`/api/location/${number}`, { query, ...options });
  }

  /**
   * Read the current Find My locations already shared with a dedicated Mac-backed
   * Sendblue number. Shared lines cannot use this endpoint.
   */
  list(query: LocationListParams, options?: RequestOptions): APIPromise<LocationListResponse> {
    return this._client.get('/api/location', { query, ...options });
  }

  /**
   * Open a Server-Sent Events (SSE) stream for live Find My updates from one contact
   * sharing with a dedicated Mac-backed Sendblue number. Shared lines cannot use
   * this endpoint.
   *
   * The stream has no client-visible duration. It remains open while the client is
   * connected, authorized, and the worker is available. Comment heartbeats are sent
   * every 15 seconds. Clients should reconnect with their normal credentials after a
   * network interruption or a `worker_disconnected` completion. Location events are
   * live-only and may repeat across internal native-watch renewals.
   *
   * Named events and their JSON `data` payloads:
   *
   * - `ready`: the native watch is active.
   * - `location`: a location state or fix.
   * - `complete`: the watch ended normally. Known reasons are `sharing_ended`,
   *   `authorization_revoked`, `worker_disconnected`, and `watch_ended`. Clients
   *   should tolerate additional completion reasons.
   * - `error`: the watch failed after the SSE response started.
   */
  watch(
    number: string,
    query: LocationWatchParams,
    options?: RequestOptions,
  ): APIPromise<Stream<LocationWatchResponse>> {
    return this._client.get(path`/api/location/${number}/watch`, {
      query,
      ...options,
      headers: buildHeaders([{ Accept: 'text/event-stream' }, options?.headers]),
      stream: true,
    }) as APIPromise<Stream<LocationWatchResponse>>;
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

/**
 * JSON data payload from one named event in a live-location SSE stream
 */
export interface LocationWatchResponse {
  /**
   * Sendblue line receiving the shared location
   */
  from_number?: string;

  location?: LocationWatchResponse.Location;

  /**
   * Human-readable watch failure
   */
  message?: string;

  /**
   * Contact whose location is being watched or changed
   */
  number?: string;

  /**
   * Why the stream ended normally. Known values are `sharing_ended`,
   * `authorization_revoked`, `worker_disconnected`, and `watch_ended`. Clients
   * should tolerate additional values.
   */
  reason?: string;

  state?: 'not_shared' | 'shared_no_fix_yet' | 'shared_with_fix';

  status?: 'OK' | 'ERROR';
}

export namespace LocationWatchResponse {
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

export interface LocationWatchParams {
  /**
   * Your supported Sendblue number in E.164 format
   */
  from_number: string;
}

export declare namespace Location {
  export {
    type LocationRetrieveResponse as LocationRetrieveResponse,
    type LocationListResponse as LocationListResponse,
    type LocationWatchResponse as LocationWatchResponse,
    type LocationRetrieveParams as LocationRetrieveParams,
    type LocationListParams as LocationListParams,
    type LocationWatchParams as LocationWatchParams,
  };
}
