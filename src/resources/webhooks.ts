// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as WebhooksAPI from './webhooks';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

/**
 * Operations for managing webhook subscriptions
 */
export class Webhooks extends APIResource {
  /**
   * Add new webhooks to the account. Webhooks are appended to existing ones.
   *
   * With a line-scoped temporary bearer token, only receive webhooks can be added.
   * String webhook URLs are automatically scoped to the token's phone numbers;
   * webhook objects must use `sendblue_numbers` within the token's allowed phone
   * numbers.
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
   * Get webhooks configured for the authenticated account.
   *
   * With a line-scoped temporary bearer token, this returns receive webhooks for the
   * token's phone numbers.
   */
  list(options?: RequestOptions): APIPromise<WebhookListResponse> {
    return this._client.get('/api/account/webhooks', options);
  }

  /**
   * Delete specific webhooks from the account.
   *
   * With a line-scoped temporary bearer token, this can only remove receive webhooks
   * for the token's phone numbers.
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

  /**
   * Receive webhooks only. When present, only inbound messages received by these
   * Sendblue line numbers are delivered to this webhook.
   */
  sendblue_numbers?: Array<string>;
}

export interface WebhookCreateResponse {
  message?: string;

  status?: string;

  webhooks?: WebhookCreateResponse.Webhooks;
}

export namespace WebhookCreateResponse {
  export interface Webhooks {
    /**
     * Webhooks for call log events
     */
    call_log?: Array<string | WebhooksAPI.WebhookConfiguration>;

    /**
     * Webhooks for contact created events
     */
    contact_created?: Array<string | WebhooksAPI.WebhookConfiguration>;

    /**
     * Webhooks for durable contact-profile publication completion and failure events
     */
    contact_profile?: Array<string | WebhooksAPI.WebhookConfiguration>;

    /**
     * Global secret applied to all webhooks
     */
    globalSecret?: string;

    /**
     * Webhooks for inbound call events
     */
    inbound_call?: Array<string | WebhooksAPI.WebhookConfiguration>;

    /**
     * Webhooks for line assigned events
     */
    line_assigned?: Array<string | WebhooksAPI.WebhookConfiguration>;

    /**
     * Webhooks for line blocked events
     */
    line_blocked?: Array<string | WebhooksAPI.WebhookConfiguration>;

    /**
     * Webhooks for outbound message status updates
     */
    outbound?: Array<string | WebhooksAPI.WebhookConfiguration>;

    /**
     * Webhooks for inbound message events
     */
    receive?: Array<string | WebhooksAPI.WebhookConfiguration>;

    /**
     * Webhooks for typing indicator events
     */
    typing_indicator?: Array<string | WebhooksAPI.WebhookConfiguration>;
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
     * Webhooks for call log events
     */
    call_log?: Array<string | WebhooksAPI.WebhookConfiguration>;

    /**
     * Webhooks for contact created events
     */
    contact_created?: Array<string | WebhooksAPI.WebhookConfiguration>;

    /**
     * Webhooks for durable contact-profile publication completion and failure events
     */
    contact_profile?: Array<string | WebhooksAPI.WebhookConfiguration>;

    /**
     * Global secret applied to all webhooks
     */
    globalSecret?: string;

    /**
     * Webhooks for inbound call events
     */
    inbound_call?: Array<string | WebhooksAPI.WebhookConfiguration>;

    /**
     * Webhooks for line assigned events
     */
    line_assigned?: Array<string | WebhooksAPI.WebhookConfiguration>;

    /**
     * Webhooks for line blocked events
     */
    line_blocked?: Array<string | WebhooksAPI.WebhookConfiguration>;

    /**
     * Webhooks for outbound message status updates
     */
    outbound?: Array<string | WebhooksAPI.WebhookConfiguration>;

    /**
     * Webhooks for inbound message events
     */
    receive?: Array<string | WebhooksAPI.WebhookConfiguration>;

    /**
     * Webhooks for typing indicator events
     */
    typing_indicator?: Array<string | WebhooksAPI.WebhookConfiguration>;
  }
}

export interface WebhookListResponse {
  status?: string;

  webhooks?: WebhookListResponse.Webhooks;
}

export namespace WebhookListResponse {
  export interface Webhooks {
    /**
     * Webhooks for call log events
     */
    call_log?: Array<string | WebhooksAPI.WebhookConfiguration>;

    /**
     * Webhooks for contact created events
     */
    contact_created?: Array<string | WebhooksAPI.WebhookConfiguration>;

    /**
     * Webhooks for durable contact-profile publication completion and failure events
     */
    contact_profile?: Array<string | WebhooksAPI.WebhookConfiguration>;

    /**
     * Global secret applied to all webhooks
     */
    globalSecret?: string;

    /**
     * Webhooks for inbound call events
     */
    inbound_call?: Array<string | WebhooksAPI.WebhookConfiguration>;

    /**
     * Webhooks for line assigned events
     */
    line_assigned?: Array<string | WebhooksAPI.WebhookConfiguration>;

    /**
     * Webhooks for line blocked events
     */
    line_blocked?: Array<string | WebhooksAPI.WebhookConfiguration>;

    /**
     * Webhooks for outbound message status updates
     */
    outbound?: Array<string | WebhooksAPI.WebhookConfiguration>;

    /**
     * Webhooks for inbound message events
     */
    receive?: Array<string | WebhooksAPI.WebhookConfiguration>;

    /**
     * Webhooks for typing indicator events
     */
    typing_indicator?: Array<string | WebhooksAPI.WebhookConfiguration>;
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
  type?:
    | 'receive'
    | 'line_blocked'
    | 'line_assigned'
    | 'outbound'
    | 'typing_indicator'
    | 'call_log'
    | 'inbound_call'
    | 'contact_profile'
    | 'contact_created';
}

export interface WebhookUpdateParams {
  webhooks: WebhookUpdateParams.Webhooks;
}

export namespace WebhookUpdateParams {
  export interface Webhooks {
    /**
     * Webhooks for call log events
     */
    call_log?: Array<string | WebhooksAPI.WebhookConfiguration>;

    /**
     * Webhooks for contact created events
     */
    contact_created?: Array<string | WebhooksAPI.WebhookConfiguration>;

    /**
     * Webhooks for durable contact-profile publication completion and failure events
     */
    contact_profile?: Array<string | WebhooksAPI.WebhookConfiguration>;

    /**
     * Global secret applied to all webhooks
     */
    globalSecret?: string;

    /**
     * Webhooks for inbound call events
     */
    inbound_call?: Array<string | WebhooksAPI.WebhookConfiguration>;

    /**
     * Webhooks for line assigned events
     */
    line_assigned?: Array<string | WebhooksAPI.WebhookConfiguration>;

    /**
     * Webhooks for line blocked events
     */
    line_blocked?: Array<string | WebhooksAPI.WebhookConfiguration>;

    /**
     * Webhooks for outbound message status updates
     */
    outbound?: Array<string | WebhooksAPI.WebhookConfiguration>;

    /**
     * Webhooks for inbound message events
     */
    receive?: Array<string | WebhooksAPI.WebhookConfiguration>;

    /**
     * Webhooks for typing indicator events
     */
    typing_indicator?: Array<string | WebhooksAPI.WebhookConfiguration>;
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
  type?:
    | 'receive'
    | 'line_blocked'
    | 'line_assigned'
    | 'outbound'
    | 'typing_indicator'
    | 'call_log'
    | 'inbound_call'
    | 'contact_profile'
    | 'contact_created';
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
