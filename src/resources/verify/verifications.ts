// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';

/**
 * Sendblue Verify issuance and recovery state
 */
export class Verifications extends APIResource {
  /**
   * Account-scoped verification state used to recover terminal Verify events after
   * an SSE gap.
   */
  list(
    query: VerificationListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<VerificationListResponse> {
    return this._client.get('/api/v2/verify/verifications', { query, ...options });
  }
}

export interface VerificationState {
  channel: string;

  date_created: string;

  date_updated: string;

  service_sid: string;

  sid: string;

  status: string;

  date_completed?: string | null;

  to?: string | null;
}

export interface VerificationListResponse {
  data: Array<VerificationState>;

  pagination: VerificationListResponse.Pagination;

  status: 'OK';
}

export namespace VerificationListResponse {
  export interface Pagination {
    count?: number;

    has_more?: boolean;

    limit?: number;

    offset?: number;
  }
}

export interface VerificationListParams {
  limit?: number;

  offset?: number;

  updated_at_gte?: string;
}

export declare namespace Verifications {
  export {
    type VerificationState as VerificationState,
    type VerificationListResponse as VerificationListResponse,
    type VerificationListParams as VerificationListParams,
  };
}
