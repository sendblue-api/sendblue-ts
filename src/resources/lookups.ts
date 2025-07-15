// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

export class Lookups extends APIResource {
  /**
   * Determine if a phone number supports iMessage or SMS. Useful for checking if a
   * number is an iPhone, if it is real, or which provider to use.
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
   * The number you evaluated in E.164 format
   */
  number?: string;

  /**
   * The service the number supports
   */
  service?: 'iMessage' | 'SMS';
}

export interface LookupLookupNumberParams {
  /**
   * The number you want to evaluate in E.164 format
   */
  number: string;
}

export declare namespace Lookups {
  export {
    type LookupLookupNumberResponse as LookupLookupNumberResponse,
    type LookupLookupNumberParams as LookupLookupNumberParams,
  };
}
