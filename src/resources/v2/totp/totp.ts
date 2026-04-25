// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import * as SecretsAPI from './secrets';
import { SecretCreateParams, SecretCreateResponse, SecretDeleteResponse, SecretListResponse, Secrets } from './secrets';
import { APIPromise } from '../../../core/api-promise';
import { RequestOptions } from '../../../internal/request-options';
import { path } from '../../../internal/utils/path';

/**
 * Store and retrieve TOTP codes for agent 2FA (authenticator app replacement)
 */
export class Totp extends APIResource {
  secrets: SecretsAPI.Secrets = new SecretsAPI.Secrets(this._client);

  /**
   * Generate the current 6- or 8-digit TOTP code for a stored secret, along with how
   * many seconds remain until it rotates.
   *
   * @example
   * ```ts
   * const response = await client.v2.totp.getCode(
   *   '550e8400-e29b-41d4-a716-446655440000',
   * );
   * ```
   */
  getCode(secretID: string, options?: RequestOptions): APIPromise<TotpGetCodeResponse> {
    return this._client.get(path`/api/v2/totp/code/${secretID}`, options);
  }
}

export interface TotpGetCodeResponse {
  /**
   * The current TOTP code
   */
  code?: string;

  /**
   * Seconds until this code rotates
   */
  expires_in?: number;

  status?: string;
}

Totp.Secrets = Secrets;

export declare namespace Totp {
  export {
    type TotpGetCodeResponse as TotpGetCodeResponse
  };

  export {
    Secrets as Secrets,
    type SecretCreateResponse as SecretCreateResponse,
    type SecretListResponse as SecretListResponse,
    type SecretDeleteResponse as SecretDeleteResponse,
    type SecretCreateParams as SecretCreateParams
  };
}
