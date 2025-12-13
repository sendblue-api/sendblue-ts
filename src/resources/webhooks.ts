// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';

export class Webhooks extends APIResource {}

export interface WebhookConfiguration {
  /**
   * Whether the webhook is active
   */
  enabled?: boolean;

  /**
   * List of events to subscribe to
   */
  events?: Array<
    'message.received' | 'message.sent' | 'message.delivered' | 'message.read' | 'message.failed'
  >;

  /**
   * Webhook endpoint URL for receiving callbacks
   */
  url?: string;
}

export declare namespace Webhooks {
  export { type WebhookConfiguration as WebhookConfiguration };
}
