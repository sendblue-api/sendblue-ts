// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../../../core/resource';
import * as VerificationsAPI from '../../../../verify/verifications';
import { APIPromise } from '../../../../../core/api-promise';
import { RequestOptions } from '../../../../../internal/request-options';
import { path } from '../../../../../internal/utils/path';

/**
 * Sendblue Verify issuance and recovery state
 */
export class Verifications extends APIResource {
  /**
   * Creates an inverted-OTP verification for the supplied E.164 phone number. The
   * user must send the returned code from that exact phone number to the returned
   * Sendblue destination number.
   *
   * Include `hosted` to create an origin-bound Hosted Verify widget session.
   * Sendblue API credentials must remain on the customer's backend; only the
   * returned `hosted` values may be sent to the browser. Twilio-compatible clients
   * may alternatively send the API Key ID and API Secret Key with HTTP Basic
   * authentication. Temporary bearer authentication is supported for account-scoped
   * tokens; line-scoped temporary tokens cannot create account-wide Verifications.
   *
   * @example
   * ```ts
   * const verification =
   *   await client.v2.groups.verify.services.verifications.create(
   *     'SVE1CB97d8EBbDbaAae6d9B1ca0D1cFaAD',
   *     { to: '+14155551212' },
   *   );
   * ```
   */
  create(
    serviceSid: string,
    body: VerificationCreateParams,
    options?: RequestOptions,
  ): APIPromise<VerificationCreateResponse> {
    return this._client.post(path`/api/v2/verify/services/${serviceSid}/verifications`, { body, ...options });
  }

  /**
   * Returns the authoritative status for one Verification owned by the authenticated
   * account. Twilio-compatible clients may send the API Key ID and API Secret Key
   * with HTTP Basic authentication. Temporary bearer authentication is supported for
   * account-scoped tokens; line-scoped temporary tokens cannot retrieve account-wide
   * Verification state.
   *
   * @example
   * ```ts
   * const verification =
   *   await client.v2.groups.verify.services.verifications.retrieve(
   *     'VRE1CB97d8EBbDbaAae6d9B1ca0D1cFaAD',
   *     { service_sid: 'SVE1CB97d8EBbDbaAae6d9B1ca0D1cFaAD' },
   *   );
   * ```
   */
  retrieve(
    verificationSid: string,
    params: VerificationRetrieveParams,
    options?: RequestOptions,
  ): APIPromise<VerificationRetrieveResponse> {
    const { service_sid } = params;
    return this._client.get(
      path`/api/v2/verify/services/${service_sid}/verifications/${verificationSid}`,
      options,
    );
  }
}

export interface VerificationCreateResponse {
  account_sid: string;

  channel: 'imessage';

  date_created: string;

  date_updated: string;

  /**
   * ISO timestamp when the Verification expires.
   */
  expires_at: string;

  service_sid: string;

  sid: string;

  status: 'pending' | 'approved' | 'expired' | 'canceled';

  /**
   * Expected sender in E.164 format; older durable terminal records may return null.
   */
  to: string | null;

  url: string;

  /**
   * Present while the Verification is pending.
   */
  delivery_target?: VerificationsAPI.DeliveryTarget;

  /**
   * Present only when hosted options were supplied during creation.
   */
  hosted?: VerificationsAPI.HostedVerification;
}

export interface VerificationRetrieveResponse {
  account_sid: string;

  channel: 'imessage';

  date_created: string;

  date_updated: string;

  /**
   * ISO timestamp when the Verification expires.
   */
  expires_at: string;

  service_sid: string;

  sid: string;

  status: 'pending' | 'approved' | 'expired' | 'canceled';

  /**
   * Expected sender in E.164 format; older durable terminal records may return null.
   */
  to: string | null;

  url: string;

  /**
   * Present while the Verification is pending.
   */
  delivery_target?: VerificationsAPI.DeliveryTarget;
}

export interface VerificationCreateParams {
  /**
   * E.164 phone number that must send the verification message.
   */
  to: string;

  /**
   * Options for an origin-bound Hosted Verify widget session. Nested keys are strict
   * snake_case. `parent_origin` must be an exact HTTPS origin with a DNS hostname.
   * `127.0.0.1` is also accepted, and HTTP is allowed only for `localhost` or
   * `127.0.0.1` development origins. Wildcards and other IP literals are rejected
   * because browsers cannot enforce them as exact CSP `frame-ancestors` sources.
   */
  hosted?: VerificationCreateParams.Hosted;
}

export namespace VerificationCreateParams {
  /**
   * Options for an origin-bound Hosted Verify widget session. Nested keys are strict
   * snake_case. `parent_origin` must be an exact HTTPS origin with a DNS hostname.
   * `127.0.0.1` is also accepted, and HTTP is allowed only for `localhost` or
   * `127.0.0.1` development origins. Wildcards and other IP literals are rejected
   * because browsers cannot enforce them as exact CSP `frame-ancestors` sources.
   */
  export interface Hosted {
    /**
     * Exact website origin allowed to embed the widget, with no path, query, or
     * fragment.
     */
    parent_origin: string;

    /**
     * Six-digit hexadecimal accent color.
     */
    accent_color?: string;

    /**
     * Brand name displayed by the widget. Defaults to Sendblue.
     */
    brand_name?: string;

    theme?: 'light' | 'dark' | 'auto';
  }
}

export interface VerificationRetrieveParams {
  /**
   * Verify Service SID.
   */
  service_sid: string;
}

export declare namespace Verifications {
  export {
    type VerificationCreateResponse as VerificationCreateResponse,
    type VerificationRetrieveResponse as VerificationRetrieveResponse,
    type VerificationCreateParams as VerificationCreateParams,
    type VerificationRetrieveParams as VerificationRetrieveParams,
  };
}
