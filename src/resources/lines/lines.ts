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

export class Lines extends APIResource {
  callForwarding: CallForwardingAPI.CallForwarding = new CallForwardingAPI.CallForwarding(this._client);
}

Lines.CallForwarding = CallForwarding;

export declare namespace Lines {
  export {
    CallForwarding as CallForwarding,
    type CallForwardingRetrieveResponse as CallForwardingRetrieveResponse,
    type CallForwardingUpdateResponse as CallForwardingUpdateResponse,
    type CallForwardingDeleteResponse as CallForwardingDeleteResponse,
    type CallForwardingUpdateParams as CallForwardingUpdateParams,
  };
}
