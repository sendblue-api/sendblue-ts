// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

/**
 * Operations for minting and revoking temporary account API tokens
 */
export class Tokens extends APIResource {
  /**
   * Creates a short-lived bearer token for the authenticated account. This endpoint
   * must be called with live account API keys; temporary bearer tokens and test API
   * keys cannot mint additional tokens.
   *
   * When `phone_number` or `phone_numbers` is supplied, the token is scoped to those
   * Sendblue phone numbers. When no phone selector is supplied, the token is an
   * account-scoped temporary token.
   *
   * The plaintext token is returned only once.
   *
   * @example
   * ```ts
   * const token = await client.auth.tokens.create();
   * ```
   */
  create(
    body: TokenCreateParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<TokenCreateResponse> {
    return this._client.post('/v3/auth/tokens', { body, ...options });
  }

  /**
   * Revokes a temporary bearer token owned by the authenticated account. This
   * endpoint must be called with live account API keys; temporary bearer tokens and
   * test API keys cannot revoke tokens.
   *
   * @example
   * ```ts
   * await client.auth.tokens.revoke(
   *   '11111111-1111-4111-8111-111111111111',
   * );
   * ```
   */
  revoke(tokenID: string, options?: RequestOptions): APIPromise<void> {
    return this._client.delete(path`/v3/auth/tokens/${tokenID}`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }
}

export interface TokenCreateResponse {
  /**
   * Plaintext temporary bearer token. Store it securely; it is returned only once.
   */
  token: string;

  /**
   * ISO timestamp when the token expires.
   */
  expires_at: string;

  /**
   * Phone-number scope for this token. Empty means the token is account-scoped.
   */
  phone_numbers: Array<string>;

  /**
   * Token identifier used for revocation.
   */
  token_id: string;

  token_type: 'Bearer';
}

export interface TokenCreateParams {
  /**
   * Token lifetime in seconds. Defaults to 900 seconds when omitted.
   */
  expires_in_seconds?: number;

  /**
   * Single Sendblue phone number to scope the token to. Cannot be combined with
   * `phone_numbers`.
   */
  phone_number?: string;

  /**
   * Sendblue phone numbers to scope the token to. Cannot be combined with
   * `phone_number`.
   */
  phone_numbers?: Array<string>;
}

export declare namespace Tokens {
  export { type TokenCreateResponse as TokenCreateResponse, type TokenCreateParams as TokenCreateParams };
}
