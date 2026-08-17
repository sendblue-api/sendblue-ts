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

Lines.CallForwarding = CallForwarding;

export declare namespace Lines {
  export { type LineState as LineState, type LineGetStateResponse as LineGetStateResponse };

  export {
    CallForwarding as CallForwarding,
    type CallForwardingRetrieveResponse as CallForwardingRetrieveResponse,
    type CallForwardingUpdateResponse as CallForwardingUpdateResponse,
    type CallForwardingDeleteResponse as CallForwardingDeleteResponse,
    type CallForwardingUpdateParams as CallForwardingUpdateParams,
  };
}
