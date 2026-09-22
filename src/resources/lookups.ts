// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

/**
 * Operations for looking up service availability for phone numbers
 */
export class Lookups extends APIResource {
  /**
   * Check iMessage support for a phone number or email address. A successful result
   * does not guarantee delivery. For email addresses, SMS means iMessage was not
   * detected; it does not mean the address can receive SMS. The from_number query
   * parameter does not select a sending line for this endpoint. Email results
   * indicating no iMessage support are not cached. An inconclusive lookup returns a
   * retryable error. Limit retries and use backoff after an inconclusive response. A
   * lookup does not guarantee that upstream availability data was freshly refreshed.
   */
  lookupNumber(
    query: LookupLookupNumberParams,
    options?: RequestOptions,
  ): APIPromise<LookupLookupNumberResponse> {
    return this._client.get('/api/evaluate-service', { query, ...options });
  }
}

export interface LookupLookupNumberResponse {
  /**
   * The normalized phone number or email address evaluated
   */
  number?: string;

  /**
   * Whether iMessage support was detected
   */
  service?: 'iMessage' | 'SMS';
}

export interface LookupLookupNumberParams {
  /**
   * The phone number in E.164 format or email address to evaluate
   */
  number: string;
}

export declare namespace Lookups {
  export {
    type LookupLookupNumberResponse as LookupLookupNumberResponse,
    type LookupLookupNumberParams as LookupLookupNumberParams,
  };
}
