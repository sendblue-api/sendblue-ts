// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as VerificationsAPI from './verifications';
import {
  VerificationListParams,
  VerificationListResponse,
  VerificationState,
  Verifications,
} from './verifications';

export class Verify extends APIResource {
  verifications: VerificationsAPI.Verifications = new VerificationsAPI.Verifications(this._client);
}

Verify.Verifications = Verifications;

export declare namespace Verify {
  export {
    Verifications as Verifications,
    type VerificationState as VerificationState,
    type VerificationListResponse as VerificationListResponse,
    type VerificationListParams as VerificationListParams,
  };
}
