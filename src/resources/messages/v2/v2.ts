// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import * as VerifyAPI from './verify/verify';
import { Verify } from './verify/verify';

export class V2 extends APIResource {
  verify: VerifyAPI.Verify = new VerifyAPI.Verify(this._client);
}

V2.Verify = Verify;

export declare namespace V2 {
  export { Verify as Verify };
}
