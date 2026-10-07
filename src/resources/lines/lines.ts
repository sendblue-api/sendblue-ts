// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as CallForwardingAPI from './call-forwarding';
import {
  CallForwarding,
  CallForwardingDeleteResponse,
  CallForwardingRetrieveResponse,
  CallForwardingUpdateParams,
  CallForwardingUpdateResponse,
} from './call-forwarding';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';

/**
 * Sendblue line configuration and health state
 */
export class Lines extends APIResource {
  callForwarding: CallForwardingAPI.CallForwarding = new CallForwardingAPI.CallForwarding(this._client);

  /**
   * Check whether a contact is known or new on one of your Sendblue lines. The
   * result uses the same message history and inactivity window as new-contact
   * limits. Incoming messages and outgoing messages accepted for sending count as
   * activity; rejected requests do not. A saved contact is not required, and
   * activity on another line or account does not count.
   *
   * The lookup does not reserve capacity. Other sending rules still apply.
   * Line-scoped temporary tokens can query only the lines they allow. Only number
   * and sendblue_number query parameters are accepted.
   *
   * @example
   * ```ts
   * const lineContactStatusResponse =
   *   await client.lines.getContactStatus({
   *     number: 'number',
   *     sendblue_number: 'sendblue_number',
   *   });
   * ```
   */
  getContactStatus(
    query: LineGetContactStatusParams,
    options?: RequestOptions,
  ): APIPromise<LineContactStatusResponse> {
    return this._client.get('/api/v2/lines/contact-status', { query, ...options });
  }

  /**
   * Get each line's hourly and daily new-contact usage, limits, remaining capacity,
   * and when capacity becomes available again. Includes your account's phone lines
   * and old lines still available during a replacement grace period. The hourly
   * window is a rolling 60 minutes; daily usage resets at 3 AM ET
   * (America/New_York). Counts apply to new contacts you message, rather than
   * contacts you add to your account. Dashboard messages and automations use the
   * same limits.
   *
   * Requests do not reserve capacity. Recovery times assume no further sends. This
   * endpoint accepts no query parameters. Use API credentials or an account-scoped
   * temporary token.
   *
   * @example
   * ```ts
   * const lineUsageResponse = await client.lines.getUsage();
   * ```
   */
  getUsage(options?: RequestOptions): APIPromise<LineUsageResponse> {
    return this._client.get('/api/v2/lines/usage', options);
  }

  /**
   * Returns the authenticated account's current line membership and latest persisted
   * health transition.
   *
   * @example
   * ```ts
   * const response = await client.lines.getState();
   * ```
   */
  getState(options?: RequestOptions): APIPromise<LineGetStateResponse> {
    return this._client.get('/api/v2/lines/state', options);
  }
}

export interface LineContactStatusResponse {
  /**
   * Known or new contact status. Returns not_applicable if these limits do not
   * apply, or unavailable if Sendblue could not check the status.
   */
  classification: 'known' | 'new' | 'not_applicable' | 'unavailable';

  /**
   * True for known, false for new, and null for not_applicable or unavailable. Other
   * sending rules still apply.
   */
  known_contact: boolean | null;

  /**
   * Days without activity before a contact counts as new again. Null if this limit
   * does not apply or the setting is unavailable.
   */
  new_contact_lookback_days: number | null;

  /**
   * Contact phone number in E.164 format.
   */
  number: string;

  /**
   * When the contact status was checked in ISO 8601 UTC.
   */
  sampled_at: string;

  /**
   * Sendblue phone number in E.164 format.
   */
  sendblue_number: string;

  status: 'OK';
}

export interface LineUsageDailyWindow extends LineUsageWindow {
  /**
   * Next daily reset at 3 AM ET (America/New_York), accounting for daylight saving
   * time.
   */
  resetsAt: string | null;
}

export interface LineUsageResponse {
  /**
   * Whether usage reporting is enabled for your account. When false, lines is empty.
   */
  enabled: boolean;

  lines: Array<LineUsageSnapshot>;

  status: 'OK';
}

export interface LineUsageSnapshot {
  /**
   * When a limited line is expected to have capacity in both windows, assuming no
   * further sends. Null if the line is not limited or the time is unknown.
   */
  availableAt: string | null;

  daily: LineUsageDailyWindow;

  hourly: LineUsageWindow;

  /**
   * The account's Sendblue phone line in E.164 format.
   */
  phone: string;

  sampledAt: string;

  /**
   * Current capacity status. Paused means the daily limit is zero; not_applicable
   * means these limits do not apply; unavailable means usage or settings could not
   * be checked.
   */
  state: 'available' | 'limited' | 'paused' | 'not_applicable' | 'unavailable';

  /**
   * Days without activity before a contact counts as new again. This field may be
   * omitted.
   */
  newContactLookbackDays?: number;
}

export interface LineUsageWindow {
  /**
   * Current limit with any account or line overrides.
   */
  limit: number | null;

  /**
   * When the oldest counted contact leaves this window. If the limit was lowered
   * below usage, use availableAt to decide when to retry.
   */
  nextSlotAt: string | null;

  /**
   * New contacts you can still message in this window. Zero if current usage exceeds
   * a lowered limit.
   */
  remaining: number | null;

  /**
   * Number of new contacts counted in this window.
   */
  used: number | null;
}

export interface LineContactStatusResponse {
  /**
   * Known or new contact status. Returns not_applicable if these limits do not
   * apply, or unavailable if Sendblue could not check the status.
   */
  classification: 'known' | 'new' | 'not_applicable' | 'unavailable';

  /**
   * True for known, false for new, and null for not_applicable or unavailable. Other
   * sending rules still apply.
   */
  known_contact: boolean | null;

  /**
   * Days without activity before a contact counts as new again. Null if this limit
   * does not apply or the setting is unavailable.
   */
  new_contact_lookback_days: number | null;

  /**
   * Contact phone number in E.164 format.
   */
  number: string;

  /**
   * When the contact status was checked in ISO 8601 UTC.
   */
  sampled_at: string;

  /**
   * Sendblue phone number in E.164 format.
   */
  sendblue_number: string;

  status: 'OK';
}

export interface LineUsageResponse {
  /**
   * Whether usage reporting is enabled for your account. When false, lines is empty.
   */
  enabled: boolean;

  lines: Array<LineUsageSnapshot>;

  status: 'OK';
}

export interface LineUsageSnapshot {
  /**
   * When a limited line is expected to have capacity in both windows, assuming no
   * further sends. Null if the line is not limited or the time is unknown.
   */
  availableAt: string | null;

  daily: LineUsageDailyWindow;

  hourly: LineUsageWindow;

  /**
   * The account's Sendblue phone line in E.164 format.
   */
  phone: string;

  sampledAt: string;

  /**
   * Current capacity status. Paused means the daily limit is zero; not_applicable
   * means these limits do not apply; unavailable means usage or settings could not
   * be checked.
   */
  state: 'available' | 'limited' | 'paused' | 'not_applicable' | 'unavailable';

  /**
   * Days without activity before a contact counts as new again. This field may be
   * omitted.
   */
  newContactLookbackDays?: number;
}

export interface LineUsageWindow {
  /**
   * Current limit with any account or line overrides.
   */
  limit: number | null;

  /**
   * When the oldest counted contact leaves this window. If the limit was lowered
   * below usage, use availableAt to decide when to retry.
   */
  nextSlotAt: string | null;

  /**
   * New contacts you can still message in this window. Zero if current usage exceeds
   * a lowered limit.
   */
  remaining: number | null;

  /**
   * Number of new contacts counted in this window.
   */
  used: number | null;
}

export interface LineUsageDailyWindow extends LineUsageWindow {
  /**
   * Next daily reset at 3 AM ET (America/New_York), accounting for daylight saving
   * time.
   */
  resetsAt: string | null;
}

export interface LineState {
  assignment: 'assigned' | 'shared' | 'grace_period';

  sendblue_number: string | null;

  status: 'ONLINE' | 'OFFLINE' | 'DEGRADED' | 'UNKNOWN';

  worker_id: string;

  degraded_since?: string | null;

  effective_until?: string | null;

  status_changed_at?: string | null;
}

export interface LineGetStateResponse {
  data: Array<LineState>;

  snapshot_at: string;

  status: 'OK';
}

export interface LineGetContactStatusParams {
  /**
   * Contact phone number (E.164 format). Formatted phone numbers are converted to
   * E.164; email addresses are not supported.
   */
  number: string;

  /**
   * Your Sendblue phone number (E.164 format). Old lines still available during a
   * replacement grace period are also supported.
   */
  sendblue_number: string;
}

Lines.CallForwarding = CallForwarding;

export declare namespace Lines {
  export {
    type LineContactStatusResponse as LineContactStatusResponse,
    type LineUsageDailyWindow as LineUsageDailyWindow,
    type LineUsageResponse as LineUsageResponse,
    type LineUsageSnapshot as LineUsageSnapshot,
    type LineUsageWindow as LineUsageWindow,
    type LineState as LineState,
    type LineGetStateResponse as LineGetStateResponse,
    type LineGetContactStatusParams as LineGetContactStatusParams,
  };

  export {
    CallForwarding as CallForwarding,
    type CallForwardingRetrieveResponse as CallForwardingRetrieveResponse,
    type CallForwardingUpdateResponse as CallForwardingUpdateResponse,
    type CallForwardingDeleteResponse as CallForwardingDeleteResponse,
    type CallForwardingUpdateParams as CallForwardingUpdateParams,
  };
}
