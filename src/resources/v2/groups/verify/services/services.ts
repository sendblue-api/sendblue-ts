// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../../../core/resource';
import * as VerificationsAPI from './verifications';
import {
  VerificationCreateParams,
  VerificationCreateResponse,
  VerificationRetrieveParams,
  VerificationRetrieveResponse,
  Verifications,
} from './verifications';

export class Services extends APIResource {
  verifications: VerificationsAPI.Verifications = new VerificationsAPI.Verifications(this._client);
}

Services.Verifications = Verifications;

export declare namespace Services {
  export {
    Verifications as Verifications,
    type VerificationCreateResponse as VerificationCreateResponse,
    type VerificationRetrieveResponse as VerificationRetrieveResponse,
    type VerificationCreateParams as VerificationCreateParams,
    type VerificationRetrieveParams as VerificationRetrieveParams,
  };
}
