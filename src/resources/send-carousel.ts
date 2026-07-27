// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

/**
 * Operations for sending and managing messages
 */
export class SendCarousel extends APIResource {
  /**
   * Send a carousel of images to a single recipient. Requires a V2 (Mac Mini) line.
   * The carousel must contain between 2 and 20 HTTPS image URLs. For sending a
   * single image, use `/api/send-message` with `media_url` instead.
   *
   * @example
   * ```ts
   * const response = await client.sendCarousel.send({
   *   from_number: '+19998887777',
   *   media_urls: [
   *     'https://example.com/image1.jpg',
   *     'https://example.com/image2.jpg',
   *     'https://example.com/image3.jpg',
   *   ],
   *   number: '+19998887777',
   * });
   * ```
   */
  send(body: SendCarouselSendParams, options?: RequestOptions): APIPromise<SendCarouselSendResponse> {
    return this._client.post('/api/send-carousel', { body, ...options });
  }
}

export interface SendCarouselSendResponse {
  /**
   * Email of the account that sent the message
   */
  accountEmail?: string;

  /**
   * Sending phone number
   */
  from_number?: string;

  is_outbound?: boolean;

  /**
   * First media URL from the carousel
   */
  media_url?: string;

  /**
   * Unique identifier for tracking the message
   */
  message_handle?: string;

  message_type?: string;

  /**
   * Recipient phone number
   */
  number?: string;

  /**
   * Immediate parent of an iMessage inline reply. The target must belong to the same
   * account, conversation, and sending line.
   */
  reply_to?: SendCarouselSendResponse.ReplyTo;

  status?: string;

  /**
   * Message that originated an iMessage inline-reply thread.
   */
  thread_originator?: SendCarouselSendResponse.ThreadOriginator;
}

export namespace SendCarouselSendResponse {
  /**
   * Immediate parent of an iMessage inline reply. The target must belong to the same
   * account, conversation, and sending line.
   */
  export interface ReplyTo {
    /**
     * Public handle of the immediate parent message
     */
    message_handle: string;

    /**
     * Advanced override for a known part of a multipart target. Omit this in normal
     * reply requests and never guess it; requests default to 0. When replying to an
     * attachment represented by its own webhook, use that webhook's `message_handle`
     * and omit `part_index` so Sendblue can use the stored authoritative part.
     * Responses omit it when no authoritative immediate-parent part is available.
     */
    part_index?: number;
  }

  /**
   * Message that originated an iMessage inline-reply thread.
   */
  export interface ThreadOriginator {
    /**
     * Public handle of the thread's root message
     */
    message_handle: string;

    /**
     * Opaque Apple thread-originator part descriptor
     */
    part?: string;
  }
}

export interface SendCarouselSendParams {
  /**
   * Your Sendblue phone number in E.164 format (must be a V2/Mac Mini line)
   */
  from_number: string;

  /**
   * Array of HTTPS image URLs to send as a carousel (2-20 items)
   */
  media_urls: Array<string>;

  /**
   * Recipient phone number in E.164 format
   */
  number: string;

  /**
   * Additional metadata to attach to the message
   */
  metadata?: unknown;

  /**
   * Immediate parent of an iMessage inline reply. The target must belong to the same
   * account, conversation, and sending line.
   */
  reply_to?: SendCarouselSendParams.ReplyTo;

  /**
   * Optional. Identifies the seat (user) sending the carousel so it is attributed to
   * a specific rep. Accepts either the seat UUID or the Firebase Auth subject. When
   * provided, `sender_email` is auto-populated on the message record and webhook
   * payloads. Returns 400 if the seat is not found.
   */
  seat_id?: string;

  /**
   * The iMessage expressive message style
   */
  send_style?:
    | 'celebration'
    | 'shooting_star'
    | 'fireworks'
    | 'lasers'
    | 'love'
    | 'confetti'
    | 'balloons'
    | 'spotlight'
    | 'echo'
    | 'invisible'
    | 'gentle'
    | 'loud'
    | 'slam';

  /**
   * Webhook URL for message status updates
   */
  status_callback?: string;
}

export namespace SendCarouselSendParams {
  /**
   * Immediate parent of an iMessage inline reply. The target must belong to the same
   * account, conversation, and sending line.
   */
  export interface ReplyTo {
    /**
     * Public handle of the immediate parent message
     */
    message_handle: string;

    /**
     * Advanced override for a known part of a multipart target. Omit this in normal
     * reply requests and never guess it; requests default to 0. When replying to an
     * attachment represented by its own webhook, use that webhook's `message_handle`
     * and omit `part_index` so Sendblue can use the stored authoritative part.
     * Responses omit it when no authoritative immediate-parent part is available.
     */
    part_index?: number;
  }
}

export declare namespace SendCarousel {
  export {
    type SendCarouselSendResponse as SendCarouselSendResponse,
    type SendCarouselSendParams as SendCarouselSendParams,
  };
}
