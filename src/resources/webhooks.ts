// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

export class Webhooks extends APIResource {
  /**
   * Add new webhooks to your account. This endpoint appends webhooks to the existing
   * list.
   *
   * @example
   * ```ts
   * const webhook = await client.webhooks.create({
   *   webhooks: [
   *     'https://example.com/new-webhook',
   *     {
   *       url: 'https://example.com/webhook-with-secret',
   *       secret: 'my-webhook-secret',
   *     },
   *   ],
   *   globalSecret: 'optional-global-secret',
   *   type: 'receive',
   * });
   * ```
   */
  create(body: WebhookCreateParams, options?: RequestOptions): APIPromise<WebhookCreateResponse> {
    return this._client.post('/api/account/webhooks', { body, ...options });
  }

  /**
   * Replace all webhooks for your account. This endpoint completely replaces the
   * existing webhook configuration.
   *
   * @example
   * ```ts
   * const webhook = await client.webhooks.update({
   *   webhooks: {
   *     receive: [
   *       'https://example.com/webhook1',
   *       {
   *         url: 'https://example.com/webhook2',
   *         secret: 'webhook-secret',
   *       },
   *     ],
   *     call_log: ['https://example.com/call-webhook'],
   *     contact_created: [
   *       'https://example.com/contact-webhook',
   *     ],
   *     globalSecret: 'my-global-secret',
   *   },
   * });
   * ```
   */
  update(body: WebhookUpdateParams, options?: RequestOptions): APIPromise<WebhookUpdateResponse> {
    return this._client.put('/api/account/webhooks', { body, ...options });
  }

  /**
   * Get all webhooks configured for your account.
   *
   * @example
   * ```ts
   * const webhooks = await client.webhooks.list();
   * ```
   */
  list(options?: RequestOptions): APIPromise<WebhookListResponse> {
    return this._client.get('/api/account/webhooks', options);
  }

  /**
   * Delete specific webhooks from your account.
   *
   * @example
   * ```ts
   * const webhook = await client.webhooks.delete({
   *   webhooks: ['https://example.com'],
   * });
   * ```
   */
  delete(body: WebhookDeleteParams, options?: RequestOptions): APIPromise<WebhookDeleteResponse> {
    return this._client.delete('/api/account/webhooks', { body, ...options });
  }
}

export interface WebhookConfiguration {
  /**
   * Webhooks for call logs
   */
  call_log?: Array<string | WebhookConfiguration.WebhookObject>;

  /**
   * Webhooks for contact creation (URL strings only)
   */
  contact_created?: Array<string>;

  /**
   * Global secret applied to all webhooks
   */
  globalSecret?: string;

  /**
   * Webhooks for line assignment
   */
  line_assigned?: Array<string | WebhookConfiguration.WebhookObject>;

  /**
   * Webhooks for blocked lines
   */
  line_blocked?: Array<string | WebhookConfiguration.WebhookObject>;

  /**
   * Webhooks for outbound messages
   */
  outbound?: Array<string | WebhookConfiguration.WebhookObject>;

  /**
   * Webhooks for inbound messages
   */
  receive?: Array<string | WebhookConfiguration.WebhookObject>;

  /**
   * Legacy secret field
   */
  secret?: string;
}

export namespace WebhookConfiguration {
  export interface WebhookObject {
    /**
     * Webhook URL (HTTPS only)
     */
    url: string;

    /**
     * Secret for webhook verification
     */
    secret?: string;
  }

  export interface WebhookObject {
    /**
     * Webhook URL (HTTPS only)
     */
    url: string;

    /**
     * Secret for webhook verification
     */
    secret?: string;
  }

  export interface WebhookObject {
    /**
     * Webhook URL (HTTPS only)
     */
    url: string;

    /**
     * Secret for webhook verification
     */
    secret?: string;
  }

  export interface WebhookObject {
    /**
     * Webhook URL (HTTPS only)
     */
    url: string;

    /**
     * Secret for webhook verification
     */
    secret?: string;
  }

  export interface WebhookObject {
    /**
     * Webhook URL (HTTPS only)
     */
    url: string;

    /**
     * Secret for webhook verification
     */
    secret?: string;
  }
}

export interface WebhookCreateResponse {
  status: 'OK' | 'ERROR';

  message?: string;

  /**
   * Updated webhook configration (partial)
   */
  webhooks?: WebhookConfiguration;
}

export interface WebhookUpdateResponse {
  status: 'OK' | 'ERROR';

  message?: string;

  /**
   * Updated webhook configration (partial)
   */
  webhooks?: WebhookConfiguration;
}

export interface WebhookListResponse {
  status: 'OK' | 'ERROR';

  message?: string;

  webhooks?: WebhookConfiguration;
}

export interface WebhookDeleteResponse {
  status: 'OK' | 'ERROR';

  message?: string;
}

export interface WebhookCreateParams {
  /**
   * Array of webhook URLs or webhook objects to add
   */
  webhooks: Array<string | WebhookCreateParams.WebhookObject>;

  /**
   * Optional global secret to apply to all webhooks
   */
  globalSecret?: string;

  /**
   * Webhook type (default to 'receive')
   */
  type?: 'receive' | 'call_log' | 'line_blocked' | 'line_assigned' | 'outbound' | 'contact_created';
}

export namespace WebhookCreateParams {
  export interface WebhookObject {
    /**
     * Webhook URL (HTTPS only)
     */
    url: string;

    /**
     * Secret for webhook verification
     */
    secret?: string;
  }
}

export interface WebhookUpdateParams {
  webhooks: WebhookConfiguration;
}

export interface WebhookDeleteParams {
  /**
   * Array of webhook URLs to delete
   */
  webhooks: Array<string>;

  /**
   * Webhook type (default to 'receive')
   */
  type?: 'receive' | 'call_log' | 'line_blocked' | 'line_assigned' | 'outbound' | 'contact_created';
}

export declare namespace Webhooks {
  export {
    type WebhookConfiguration as WebhookConfiguration,
    type WebhookCreateResponse as WebhookCreateResponse,
    type WebhookUpdateResponse as WebhookUpdateResponse,
    type WebhookListResponse as WebhookListResponse,
    type WebhookDeleteResponse as WebhookDeleteResponse,
    type WebhookCreateParams as WebhookCreateParams,
    type WebhookUpdateParams as WebhookUpdateParams,
    type WebhookDeleteParams as WebhookDeleteParams,
  };
}
