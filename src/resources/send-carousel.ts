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

  status?: string;
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
   * The iMessage expressive message style
   */
  send_style?: 'celebration' | 'shooting_star' | 'fireworks' | 'lasers' | 'love' | 'confetti' | 'balloons' | 'spotlight' | 'echo' | 'invisible' | 'gentle' | 'loud' | 'slam';

  /**
   * Webhook URL for message status updates
   */
  status_callback?: string;
}

export declare namespace SendCarousel {
  export {
    type SendCarouselSendResponse as SendCarouselSendResponse,
    type SendCarouselSendParams as SendCarouselSendParams
  };
}
