// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { Stream } from '../core/streaming';
import { buildHeaders } from '../internal/headers';
import { RequestOptions } from '../internal/request-options';

/**
 * Authenticated live account events and recovery contracts
 */
export class Events extends APIResource {
  /**
   * Opens an authenticated Server-Sent Events stream scoped exclusively to the
   * account resolved by the supplied credentials. The stream is live and
   * intentionally not a durable replay log. It sends a heartbeat every 15 seconds
   * and rotates after at most 15 minutes. A temporary-token stream closes no later
   * than that token's `expires_at`; clients should reconnect and repair gaps via:
   *
   * - `GET /api/v2/messages?updated_at_gte=...&order_by=updated_at&order_direction=asc`
   * - `GET /api/v2/contacts?created_at_gte=...&order_by=created_at&order_direction=asc`
   * - `GET /api/v2/lines/state`
   * - `GET /api/v2/verify/verifications?updated_at_gte=...`
   *
   * Each event contains a stable `id`, a `type`, `occurred_at`, and a minimal `data`
   * object. Consumers must deduplicate by ID. Typing indicators are ephemeral and
   * cannot be recovered.
   */
  stream(
    query: EventStreamParams | undefined = {},
    options?: RequestOptions,
  ): APIPromise<Stream<AccountEvent>> {
    return this._client.get('/api/v2/events', {
      query,
      ...options,
      headers: buildHeaders([{ Accept: 'text/event-stream' }, options?.headers]),
      stream: true,
    }) as APIPromise<Stream<AccountEvent>>;
  }
}

export interface AccountEvent {
  id: string;

  data: { [key: string]: unknown };

  occurred_at: string;

  type:
    | 'message.received'
    | 'message.created'
    | 'message.updated'
    | 'typing.changed'
    | 'line.assigned'
    | 'line.unassigned'
    | 'line.status.changed'
    | 'line.blocked'
    | 'contact.created'
    | 'verification.approved'
    | 'verification.expired'
    | 'verification.canceled';

  version: 1;
}

export interface EventStreamParams {
  /**
   * Optional comma-separated allowlist of event types
   */
  types?: string;
}

export declare namespace Events {
  export { type AccountEvent as AccountEvent, type EventStreamParams as EventStreamParams };
}
