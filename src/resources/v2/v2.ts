// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as TotpAPI from './totp/totp';
import { Totp, TotpGetCodeResponse } from './totp/totp';

export class V2 extends APIResource {
  totp: TotpAPI.Totp = new TotpAPI.Totp(this._client);
}

V2.Totp = Totp;

export declare namespace V2 {
  export { Totp as Totp, type TotpGetCodeResponse as TotpGetCodeResponse };
}
