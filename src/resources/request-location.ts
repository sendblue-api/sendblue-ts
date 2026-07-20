// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

/**
 * Operations for sending and managing messages
 */
export class RequestLocation extends APIResource {
  /**
   * Send a Find My location request to an iMessage recipient from a dedicated
   * Mac-backed Sendblue line. Shared lines cannot initiate location sharing. The
   * request is queued like a normal outbound iMessage. If the recipient accepts and
   * shares, the location is delivered later as an inbound `message_type: location`
   * webhook. Passive inbound location webhooks remain available on shared lines as
   * part of the iMessage conversation.
   *
   * @example
   * ```ts
   * const requestLocation = await client.requestLocation.create(
   *   { from_number: '+18887776666', number: '+19998887777' },
   * );
   * ```
   */
  create(
    body: RequestLocationCreateParams,
    options?: RequestOptions,
  ): APIPromise<RequestLocationCreateResponse> {
    return this._client.post('/api/request-location', { body, ...options });
  }
}

export interface RequestLocationCreateResponse {
  message?: string;

  /**
   * Unique identifier for tracking the request message
   */
  message_handle?: string;

  /**
   * Recipient phone number
   */
  number?: string;

  status?: 'QUEUED';

  /**
   * Unique identifier for tracking the request message
   */
  uuid?: string;
}

export interface RequestLocationCreateParams {
  /**
   * Your supported Sendblue number in E.164 format
   */
  from_number: string;

  /**
   * Recipient phone number in E.164 format
   */
  number: string;
}

export declare namespace RequestLocation {
  export {
    type RequestLocationCreateResponse as RequestLocationCreateResponse,
    type RequestLocationCreateParams as RequestLocationCreateParams,
  };
}
