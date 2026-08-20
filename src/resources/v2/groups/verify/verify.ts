// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../../core/resource';
import * as ServicesAPI from './services/services';
import { Services } from './services/services';

export class Verify extends APIResource {
  services: ServicesAPI.Services = new ServicesAPI.Services(this._client);
}

Verify.Services = Services;

export declare namespace Verify {
  export { Services as Services };
}
