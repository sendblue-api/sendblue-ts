// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import { APIPromise } from '../../../core/api-promise';
import { RequestOptions } from '../../../internal/request-options';
import { path } from '../../../internal/utils/path';

/**
 * Store and retrieve TOTP codes for agent 2FA (authenticator app replacement)
 */
export class Secrets extends APIResource {
  /**
   * Store an encrypted TOTP secret for your account. Agents can use this instead of
   * a phone-based authenticator app.
   *
   * Provide either:
   *
   * - A `uri` (the `otpauth://` URI from a QR code scan), which auto-populates all
   *   fields
   * - A base32 `secret` with optional `label`, `issuer`, `algorithm`, `digits`, and
   *   `period`
   *
   * @example
   * ```ts
   * const secret = await client.v2.totp.secrets.create();
   * ```
   */
  create(body: SecretCreateParams, options?: RequestOptions): APIPromise<SecretCreateResponse> {
    return this._client.post('/api/v2/totp/secrets', { body, ...options });
  }

  /**
   * List all stored TOTP secrets for the account. The encrypted secret values are
   * never returned.
   *
   * @example
   * ```ts
   * const secrets = await client.v2.totp.secrets.list();
   * ```
   */
  list(options?: RequestOptions): APIPromise<SecretListResponse> {
    return this._client.get('/api/v2/totp/secrets', options);
  }

  /**
   * Permanently delete a stored TOTP secret.
   *
   * @example
   * ```ts
   * const secret = await client.v2.totp.secrets.delete(
   *   '550e8400-e29b-41d4-a716-446655440000',
   * );
   * ```
   */
  delete(secretID: string, options?: RequestOptions): APIPromise<SecretDeleteResponse> {
    return this._client.delete(path`/api/v2/totp/secrets/${secretID}`, options);
  }
}

export interface SecretCreateResponse {
  status?: string;

  totp_secret?: SecretCreateResponse.TotpSecret;
}

export namespace SecretCreateResponse {
  export interface TotpSecret {
    /**
     * Unique identifier for this TOTP secret
     */
    id?: string;

    /**
     * Hash algorithm used
     */
    algorithm?: 'SHA1' | 'SHA256' | 'SHA512';

    created_at?: string;

    /**
     * Code length (6 or 8)
     */
    digits?: number;

    /**
     * Service name
     */
    issuer?: string | null;

    /**
     * Human-readable label
     */
    label?: string;

    /**
     * Rotation period in seconds
     */
    period?: number;

    /**
     * Base32 secret — only returned on creation, never on list/get
     */
    secret?: string;
  }
}

export interface SecretListResponse {
  status?: string;

  totp_secrets?: Array<SecretListResponse.TotpSecret>;
}

export namespace SecretListResponse {
  export interface TotpSecret {
    /**
     * Unique identifier for this TOTP secret
     */
    id?: string;

    /**
     * Hash algorithm used
     */
    algorithm?: 'SHA1' | 'SHA256' | 'SHA512';

    created_at?: string;

    /**
     * Code length (6 or 8)
     */
    digits?: number;

    /**
     * Service name
     */
    issuer?: string | null;

    /**
     * Human-readable label
     */
    label?: string;

    /**
     * Rotation period in seconds
     */
    period?: number;

    /**
     * Base32 secret — only returned on creation, never on list/get
     */
    secret?: string;
  }
}

export interface SecretDeleteResponse {
  status?: string;
}

export interface SecretCreateParams {
  /**
   * Hash algorithm
   */
  algorithm?: 'SHA1' | 'SHA256' | 'SHA512';

  /**
   * Code length
   */
  digits?: 6 | 8;

  /**
   * Service name (e.g. "GitHub", "Google")
   */
  issuer?: string;

  /**
   * Human-readable label for this secret (e.g. "GitHub - agent@example.com").
   * Required unless `uri` is provided.
   */
  label?: string;

  /**
   * Rotation period in seconds
   */
  period?: number;

  /**
   * Base32-encoded TOTP secret. Omit to auto-generate one.
   */
  secret?: string;

  /**
   * Full `otpauth://totp/...` URI from a QR code. Overrides all other fields if
   * provided.
   */
  uri?: string;
}

export declare namespace Secrets {
  export {
    type SecretCreateResponse as SecretCreateResponse,
    type SecretListResponse as SecretListResponse,
    type SecretDeleteResponse as SecretDeleteResponse,
    type SecretCreateParams as SecretCreateParams
  };
}
