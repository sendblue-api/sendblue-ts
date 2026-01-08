// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as WebhooksAPI from './webhooks';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

export class Webhooks extends APIResource {
  /**
   * Add new webhooks to the account. Webhooks are appended to existing ones.
   */
  create(body: WebhookCreateParams, options?: RequestOptions): APIPromise<WebhookCreateResponse> {
    return this._client.post('/api/account/webhooks', { body, ...options });
  }

  /**
   * Replace all webhooks for the account. This overwrites existing webhooks.
   */
  update(body: WebhookUpdateParams, options?: RequestOptions): APIPromise<WebhookUpdateResponse> {
    return this._client.put('/api/account/webhooks', { body, ...options });
  }

  /**
   * Get all webhooks configured for the authenticated account
   */
  list(options?: RequestOptions): APIPromise<WebhookListResponse> {
    return this._client.get('/api/account/webhooks', options);
  }

  /**
   * Delete specific webhooks from the account
   */
  delete(body: WebhookDeleteParams, options?: RequestOptions): APIPromise<WebhookDeleteResponse> {
    return this._client.delete('/api/account/webhooks', { body, ...options });
  }
}

export interface WebhookConfiguration {
  /**
   * Webhook endpoint URL for receiving callbacks
   */
  url: string;

  /**
   * Secret for webhook signature verification
   */
  secret?: string;
}

export interface WebhookCreateResponse {
  message?: string;

  status?: string;

  webhooks?: WebhookCreateResponse.Webhooks;
}

export namespace WebhookCreateResponse {
  export interface Webhooks {
    /**
     * Global secret applied to all webhooks
     */
    globalSecret?: string;

    /**
     * Webhooks for line assigned events
     */
    line_assigned?: Array<string | WebhooksAPI.WebhookConfiguration>;

    /**
     * Webhooks for line blocked events
     */
    line_blocked?: Array<string | WebhooksAPI.WebhookConfiguration>;

    /**
     * Webhooks for outbound message events
     */
    outbound?: Array<string | WebhooksAPI.WebhookConfiguration>;

    /**
     * Webhooks for inbound message events
     */
    receive?: Array<string | WebhooksAPI.WebhookConfiguration>;
  }
}

export interface WebhookUpdateResponse {
  message?: string;

  status?: string;

  webhooks?: WebhookUpdateResponse.Webhooks;
}

export namespace WebhookUpdateResponse {
  export interface Webhooks {
    /**
     * Global secret applied to all webhooks
     */
    globalSecret?: string;

    /**
     * Webhooks for line assigned events
     */
    line_assigned?: Array<string | WebhooksAPI.WebhookConfiguration>;

    /**
     * Webhooks for line blocked events
     */
    line_blocked?: Array<string | WebhooksAPI.WebhookConfiguration>;

    /**
     * Webhooks for outbound message events
     */
    outbound?: Array<string | WebhooksAPI.WebhookConfiguration>;

    /**
     * Webhooks for inbound message events
     */
    receive?: Array<string | WebhooksAPI.WebhookConfiguration>;
  }
}

export interface WebhookListResponse {
  status?: string;

  webhooks?: WebhookListResponse.Webhooks;
}

export namespace WebhookListResponse {
  export interface Webhooks {
    /**
     * Global secret applied to all webhooks
     */
    globalSecret?: string;

    /**
     * Webhooks for line assigned events
     */
    line_assigned?: Array<string | WebhooksAPI.WebhookConfiguration>;

    /**
     * Webhooks for line blocked events
     */
    line_blocked?: Array<string | WebhooksAPI.WebhookConfiguration>;

    /**
     * Webhooks for outbound message events
     */
    outbound?: Array<string | WebhooksAPI.WebhookConfiguration>;

    /**
     * Webhooks for inbound message events
     */
    receive?: Array<string | WebhooksAPI.WebhookConfiguration>;
  }
}

export interface WebhookDeleteResponse {
  message?: string;

  status?: string;
}

export interface WebhookCreateParams {
  /**
   * Array of webhook URLs or webhook objects
   */
  webhooks: Array<string | WebhookConfiguration>;

  /**
   * Global secret for webhook signature verification
   */
  globalSecret?: string;

  /**
   * Type of webhook to add
   */
  type?: 'receive' | 'line_blocked' | 'line_assigned' | 'outbound';
}

export interface WebhookUpdateParams {
  webhooks: WebhookUpdateParams.Webhooks;
}

export namespace WebhookUpdateParams {
  export interface Webhooks {
    /**
     * Global secret applied to all webhooks
     */
    globalSecret?: string;

    /**
     * Webhooks for line assigned events
     */
    line_assigned?: Array<string | WebhooksAPI.WebhookConfiguration>;

    /**
     * Webhooks for line blocked events
     */
    line_blocked?: Array<string | WebhooksAPI.WebhookConfiguration>;

    /**
     * Webhooks for outbound message events
     */
    outbound?: Array<string | WebhooksAPI.WebhookConfiguration>;

    /**
     * Webhooks for inbound message events
     */
    receive?: Array<string | WebhooksAPI.WebhookConfiguration>;
  }
}

export interface WebhookDeleteParams {
  /**
   * Array of webhook URLs to delete
   */
  webhooks: Array<string>;

  /**
   * Type of webhook to delete from
   */
  type?: 'receive' | 'line_blocked' | 'line_assigned' | 'outbound';
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
