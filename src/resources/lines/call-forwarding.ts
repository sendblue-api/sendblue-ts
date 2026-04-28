// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class CallForwarding extends APIResource {
  /**
   * Returns the current call forwarding number for a dedicated phone line.
   *
   * Per-line forwarding takes priority over the company default forwarding number
   * but is overridden by seat-level forwarding when a seat has a forwarding number
   * set.
   *
   * **Priority order:** seat forwarding → per-line forwarding → company default
   * forwarding
   *
   * @example
   * ```ts
   * const callForwarding =
   *   await client.lines.callForwarding.retrieve(
   *     '+12125550101',
   *   );
   * ```
   */
  retrieve(sendblueNumber: string, options?: RequestOptions): APIPromise<CallForwardingRetrieveResponse> {
    return this._client.get(path`/api/lines/${sendblueNumber}/call-forwarding`, options);
  }

  /**
   * Sets a call forwarding number for a specific dedicated phone line. Inbound calls
   * to this line will be forwarded to the specified number.
   *
   * The `forwarding_number` is normalized to E.164 format before storage. US numbers
   * can be supplied in local format (e.g. `2125550199`).
   *
   * @example
   * ```ts
   * const callForwarding =
   *   await client.lines.callForwarding.update('+12125550101', {
   *     forwarding_number: '+16692138010',
   *   });
   * ```
   */
  update(
    sendblueNumber: string,
    body: CallForwardingUpdateParams,
    options?: RequestOptions,
  ): APIPromise<CallForwardingUpdateResponse> {
    return this._client.put(path`/api/lines/${sendblueNumber}/call-forwarding`, { body, ...options });
  }

  /**
   * Removes the per-line call forwarding number. After clearing, inbound calls will
   * fall back to the company default forwarding number (if configured).
   *
   * This operation is idempotent — calling it on a line with no forwarding set
   * returns 200 with `forwarding_number: null`.
   *
   * @example
   * ```ts
   * const callForwarding =
   *   await client.lines.callForwarding.delete('+12125550101');
   * ```
   */
  delete(sendblueNumber: string, options?: RequestOptions): APIPromise<CallForwardingDeleteResponse> {
    return this._client.delete(path`/api/lines/${sendblueNumber}/call-forwarding`, options);
  }
}

export interface CallForwardingRetrieveResponse {
  /**
   * The number calls are forwarded to, or null if not set
   */
  forwarding_number: string | null;

  /**
   * The Sendblue phone number (E.164)
   */
  sendblue_number: string;
}

export interface CallForwardingUpdateResponse {
  /**
   * The number calls are forwarded to, or null if not set
   */
  forwarding_number: string | null;

  /**
   * The Sendblue phone number (E.164)
   */
  sendblue_number: string;
}

export interface CallForwardingDeleteResponse {
  /**
   * The number calls are forwarded to, or null if not set
   */
  forwarding_number: string | null;

  /**
   * The Sendblue phone number (E.164)
   */
  sendblue_number: string;
}

export interface CallForwardingUpdateParams {
  /**
   * Phone number to forward calls to (E.164 or US local format)
   */
  forwarding_number: string;
}

export declare namespace CallForwarding {
  export {
    type CallForwardingRetrieveResponse as CallForwardingRetrieveResponse,
    type CallForwardingUpdateResponse as CallForwardingUpdateResponse,
    type CallForwardingDeleteResponse as CallForwardingDeleteResponse,
    type CallForwardingUpdateParams as CallForwardingUpdateParams,
  };
}
