// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

/**
 * Operations for sending and managing messages
 */
export class Messages extends APIResource {
  /**
   * Retrieve details of a specific message by its ID
   *
   * @example
   * ```ts
   * const message = await client.messages.retrieve(
   *   'msg_abc123def456',
   * );
   * ```
   */
  retrieve(messageID: string, options?: RequestOptions): APIPromise<MessageRetrieveResponse> {
    return this._client.get(path`/api/v2/messages/${messageID}`, options);
  }

  /**
   * Retrieve a list of messages for the authenticated account with comprehensive
   * filtering capabilities. Rate limited to 100 requests per 10 seconds per account.
   *
   * ## Common Use Cases
   *
   * **Polling for inbound messages (no webhooks):**
   *
   * ```
   * GET /api/v2/messages?is_outbound=false&sendblue_number=+16292925296&order_by=createdAt&order_direction=desc&limit=50
   * ```
   *
   * Track processed message IDs to avoid duplicates.
   *
   * **Get conversation with a specific contact:**
   *
   * ```
   * GET /api/v2/messages?number=+15551234567&order_by=createdAt&order_direction=desc
   * ```
   *
   * @example
   * ```ts
   * const messages = await client.messages.list();
   * ```
   */
  list(
    query: MessageListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<MessageListResponse> {
    return this._client.get('/api/v2/messages', { query, ...options });
  }

  /**
   * Retrieve the current status of a message using its message handle. Useful for
   * resolving pending message statuses and avoiding duplicate messages.
   *
   * @example
   * ```ts
   * const messageResponse = await client.messages.getStatus({
   *   handle: 'msg_abc123def456',
   * });
   * ```
   */
  getStatus(query: MessageGetStatusParams, options?: RequestOptions): APIPromise<MessageResponse> {
    return this._client.get('/api/status', { query, ...options });
  }

  /**
   * Send an iMessage, SMS, MMS, or Sendblue App Card to a single recipient
   *
   * @example
   * ```ts
   * const messageResponse = await client.messages.send({
   *   from_number: '+19998887777',
   *   number: '+19998887777',
   * });
   * ```
   */
  send(body: MessageSendParams, options?: RequestOptions): APIPromise<MessageResponse> {
    return this._client.post('/api/send-message', { body, ...options });
  }

  /**
   * Continues an existing App Card by sending a new Apple message in the same
   * iMessage session, from the same sender line and inline-reply context. The
   * continuation receives its own message handle and delivery/read status updates.
   *
   * @example
   * ```ts
   * const messageResponse = await client.messages.updateAppCard(
   *   'message_handle',
   * );
   * ```
   */
  updateAppCard(
    messageHandle: string,
    body: MessageUpdateAppCardParams,
    options?: RequestOptions,
  ): APIPromise<MessageResponse> {
    return this._client.post(path`/api/messages/${messageHandle}/update-app-card`, { body, ...options });
  }
}

export interface MessageContent {
  /**
   * Email of the account
   */
  account_email?: string;

  /**
   * Message content
   */
  content?: string;

  /**
   * When the message was created
   */
  date_created?: string;

  /**
   * When the message was sent
   */
  date_sent?: string;

  /**
   * When the message was last updated
   */
  date_updated?: string;

  /**
   * Sender phone number
   */
  from_number?: string;

  /**
   * Whether this is an outbound message
   */
  is_outbound?: boolean;

  /**
   * URL of attached media
   */
  media_url?: string;

  /**
   * Unique message identifier
   */
  message_handle?: string;

  /**
   * Immediate parent of an iMessage inline reply. The target must belong to the same
   * account, conversation, and sending line.
   */
  reply_to?: MessageContent.ReplyTo;

  /**
   * UUID of the seat that sent the message. Present when `seat_id` was provided on
   * send, or for dashboard-originated group messages.
   */
  seat_id?: string | null;

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
   * Email of the seat (user) that sent the message. Auto-populated when a `seat_id`
   * is provided on send. `null` for messages sent without a `seat_id`.
   */
  sender_email?: string | null;

  status?: 'QUEUED' | 'SENT' | 'DELIVERED' | 'ERROR' | 'RECEIVED';

  /**
   * Message that originated an iMessage inline-reply thread.
   */
  thread_originator?: MessageContent.ThreadOriginator;

  /**
   * Recipient phone number
   */
  to_number?: string;
}

export namespace MessageContent {
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

export interface MessageResponse {
  /**
   * Email of the account that sent the message
   */
  account_email?: string;

  /**
   * App Card data sent or received with this message.
   */
  app_card?: MessageResponse.AppCard | MessageResponse.InboundAppCard;

  /**
   * Message content
   */
  content?: string;

  /**
   * When the message was created
   */
  date_created?: string;

  /**
   * When the message was last updated
   */
  date_updated?: string;

  /**
   * Numeric error code if message failed
   */
  error_code?: number;

  /**
   * Error message if message failed
   */
  error_message?: string;

  /**
   * Sending phone number
   */
  from_number?: string;

  /**
   * Whether this is an outbound message
   */
  is_outbound?: boolean;

  /**
   * Decoded Find My location share coordinates.
   */
  location?: MessageResponse.Location;

  /**
   * URL of attached media
   */
  media_url?: string;

  /**
   * Unique identifier for tracking the message
   */
  message_handle?: string;

  message_type?: 'message' | 'group' | 'location';

  /**
   * Recipient phone number
   */
  number?: string;

  /**
   * Immediate parent of an iMessage inline reply. The target must belong to the same
   * account, conversation, and sending line.
   */
  reply_to?: MessageResponse.ReplyTo;

  /**
   * UUID of the seat that sent the message. Present when `seat_id` was provided on
   * send, or for dashboard-originated group messages.
   */
  seat_id?: string | null;

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
   * Email of the seat (user) that sent the message. Auto-populated when a `seat_id`
   * is provided on send. `null` for messages sent without a `seat_id`.
   */
  sender_email?: string | null;

  status?: 'QUEUED' | 'SENT' | 'DELIVERED' | 'ERROR';

  /**
   * Message that originated an iMessage inline-reply thread.
   */
  thread_originator?: MessageResponse.ThreadOriginator;
}

export namespace MessageResponse {
  /**
   * A Sendblue App Card rendered with Apple's Messages framework. App Cards require
   * a V2 Mac line and an iMessage-capable recipient; they never fall back to SMS.
   * The URL is delivered to the identified Messages extension when the recipient
   * taps the card. An initial App Card may include `reply_to` to create an inline
   * reply. Later state changes use the update endpoint, which sends a new Apple
   * message in the same App Card session. The feature is unavailable on the free
   * plan.
   */
  export interface AppCard {
    appName: string;

    extensionBundleId: string;

    /**
     * Visible card fields mirroring Apple's MSMessageTemplateLayout.
     */
    layout: AppCard.Layout;

    teamId: string;

    /**
     * URL delivered to the iMessage extension on tap. HTTPS URLs are limited to 2048
     * characters; data URLs carrying inline app state are limited to 16384.
     */
    url: string;

    /**
     * Optional numeric App Store ID for recipients without the extension.
     */
    appStoreId?: number;

    /**
     * Fallback text for notifications and surfaces that cannot render the card.
     */
    fallbackText?: string;

    /**
     * Use Apple's live layout when the extension is installed; false always sends the
     * static template layout.
     */
    interactive?: boolean;

    /**
     * Optional caller-supplied App Card session UUID. Generated automatically when
     * omitted.
     */
    sessionIdentifier?: string;

    /**
     * Original message handle for an App Card continuation returned by the update
     * endpoint.
     */
    updateMessageHandle?: string;
  }

  export namespace AppCard {
    /**
     * Visible card fields mirroring Apple's MSMessageTemplateLayout.
     */
    export interface Layout {
      caption?: string;

      /**
       * Secondary text overlaid on the preview image. Requires imageUrl.
       */
      imageSubtitle?: string;

      /**
       * Text overlaid on the preview image. Requires imageUrl.
       */
      imageTitle?: string;

      /**
       * HTTPS preview image fetched by the worker and sent as a hidden card attachment.
       * JPEG, PNG, HEIC, HEIF, and WebP are supported up to 10 MB.
       */
      imageUrl?: string;

      subcaption?: string;

      /**
       * Fallback text used in notifications and non-rendering surfaces.
       */
      summary?: string;

      trailingCaption?: string;

      trailingSubcaption?: string;
    }
  }

  /**
   * App Card session metadata received from an iMessage contact.
   */
  export interface InboundAppCard {
    balloonBundleId: string;

    extensionBundleId: string;

    /**
     * Retry-stable occurrence revision assigned to this inbound App Card state.
     */
    revision: number;

    sessionIdentifier: string;

    teamId: string;

    url: string;
  }

  /**
   * Decoded Find My location share coordinates.
   */
  export interface Location {
    latitude: number;

    longitude: number;

    /**
     * Horizontal accuracy in meters
     */
    accuracy?: number;

    /**
     * Altitude in meters
     */
    altitude?: number;

    /**
     * Share duration selected by the recipient
     */
    duration?: string;

    timestamp?: string;
  }

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

export interface MessageRetrieveResponse {
  data?: MessageRetrieveResponse.Data;

  status?: string;
}

export namespace MessageRetrieveResponse {
  export interface Data {
    /**
     * Email of the account
     */
    accountEmail?: string;

    /**
     * Message content
     */
    content?: string;

    /**
     * When the message was sent
     */
    date_sent?: string;

    /**
     * When the message was last updated
     */
    date_updated?: string;

    /**
     * Numeric error code if message failed
     */
    error_code?: number | null;

    /**
     * Detailed error information
     */
    error_detail?: string | null;

    /**
     * Error message if message failed
     */
    error_message?: string | null;

    /**
     * Error reason if message failed
     */
    error_reason?: string | null;

    /**
     * Sender phone number
     */
    from_number?: string;

    /**
     * Display name for group messages
     */
    group_display_name?: string | null;

    /**
     * Group ID for group messages
     */
    group_id?: string | null;

    /**
     * Whether this is an outbound message
     */
    is_outbound?: boolean;

    /**
     * Decoded Find My location share coordinates.
     */
    location?: Data.Location;

    /**
     * URL of attached media
     */
    media_url?: string | null;

    /**
     * Unique message identifier
     */
    message_handle?: string;

    message_type?: 'message' | 'group' | 'location';

    /**
     * Primary phone number (to_number for outbound, from_number for inbound)
     */
    number?: string;

    /**
     * Whether the recipient has opted out
     */
    opted_out?: boolean;

    /**
     * List of participants for group messages
     */
    participants?: Array<string>;

    /**
     * Account plan used for this message
     */
    plan?: string;

    /**
     * Immediate parent of an iMessage inline reply. The target must belong to the same
     * account, conversation, and sending line.
     */
    reply_to?: Data.ReplyTo;

    /**
     * UUID of the seat that sent the message. Present when `seat_id` was provided on
     * send, or for dashboard-originated group messages.
     */
    seat_id?: string | null;

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
     * Sendblue phone number used
     */
    sendblue_number?: string | null;

    /**
     * Email of the seat (user) that sent the message. Auto-populated when a `seat_id`
     * is provided on send. `null` for messages sent without a `seat_id`.
     */
    sender_email?: string | null;

    /**
     * The messaging service used
     */
    service?: 'iMessage' | 'SMS' | 'RCS';

    status?:
      | 'REGISTERED'
      | 'PENDING'
      | 'SENT'
      | 'DELIVERED'
      | 'RECEIVED'
      | 'QUEUED'
      | 'ERROR'
      | 'DECLINED'
      | 'ACCEPTED'
      | 'SUCCESS';

    /**
     * Message that originated an iMessage inline-reply thread.
     */
    thread_originator?: Data.ThreadOriginator;

    /**
     * Recipient phone number
     */
    to_number?: string;

    /**
     * Whether the message was downgraded from iMessage to SMS
     */
    was_downgraded?: boolean;
  }

  export namespace Data {
    /**
     * Decoded Find My location share coordinates.
     */
    export interface Location {
      latitude: number;

      longitude: number;

      /**
       * Horizontal accuracy in meters
       */
      accuracy?: number;

      /**
       * Altitude in meters
       */
      altitude?: number;

      /**
       * Share duration selected by the recipient
       */
      duration?: string;

      timestamp?: string;
    }

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
}

export interface MessageListResponse {
  data?: Array<MessageListResponse.Data>;

  pagination?: MessageListResponse.Pagination;

  status?: string;
}

export namespace MessageListResponse {
  export interface Data {
    /**
     * Email of the account
     */
    accountEmail?: string;

    /**
     * Message content
     */
    content?: string;

    /**
     * When the message was sent
     */
    date_sent?: string;

    /**
     * When the message was last updated
     */
    date_updated?: string;

    /**
     * Numeric error code if message failed
     */
    error_code?: number | null;

    /**
     * Detailed error information
     */
    error_detail?: string | null;

    /**
     * Error message if message failed
     */
    error_message?: string | null;

    /**
     * Error reason if message failed
     */
    error_reason?: string | null;

    /**
     * Sender phone number
     */
    from_number?: string;

    /**
     * Display name for group messages
     */
    group_display_name?: string | null;

    /**
     * Group ID for group messages
     */
    group_id?: string | null;

    /**
     * Whether this is an outbound message
     */
    is_outbound?: boolean;

    /**
     * Decoded Find My location share coordinates.
     */
    location?: Data.Location;

    /**
     * URL of attached media
     */
    media_url?: string | null;

    /**
     * Unique message identifier
     */
    message_handle?: string;

    message_type?: 'message' | 'group' | 'location';

    /**
     * Primary phone number (to_number for outbound, from_number for inbound)
     */
    number?: string;

    /**
     * Whether the recipient has opted out
     */
    opted_out?: boolean;

    /**
     * List of participants for group messages
     */
    participants?: Array<string>;

    /**
     * Account plan used for this message
     */
    plan?: string;

    /**
     * Immediate parent of an iMessage inline reply. The target must belong to the same
     * account, conversation, and sending line.
     */
    reply_to?: Data.ReplyTo;

    /**
     * UUID of the seat that sent the message. Present when `seat_id` was provided on
     * send, or for dashboard-originated group messages.
     */
    seat_id?: string | null;

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
     * Sendblue phone number used
     */
    sendblue_number?: string | null;

    /**
     * Email of the seat (user) that sent the message. Auto-populated when a `seat_id`
     * is provided on send. `null` for messages sent without a `seat_id`.
     */
    sender_email?: string | null;

    /**
     * The messaging service used
     */
    service?: 'iMessage' | 'SMS' | 'RCS';

    status?:
      | 'REGISTERED'
      | 'PENDING'
      | 'SENT'
      | 'DELIVERED'
      | 'RECEIVED'
      | 'QUEUED'
      | 'ERROR'
      | 'DECLINED'
      | 'ACCEPTED'
      | 'SUCCESS';

    /**
     * Message that originated an iMessage inline-reply thread.
     */
    thread_originator?: Data.ThreadOriginator;

    /**
     * Recipient phone number
     */
    to_number?: string;

    /**
     * Whether the message was downgraded from iMessage to SMS
     */
    was_downgraded?: boolean;
  }

  export namespace Data {
    /**
     * Decoded Find My location share coordinates.
     */
    export interface Location {
      latitude: number;

      longitude: number;

      /**
       * Horizontal accuracy in meters
       */
      accuracy?: number;

      /**
       * Altitude in meters
       */
      altitude?: number;

      /**
       * Share duration selected by the recipient
       */
      duration?: string;

      timestamp?: string;
    }

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

  export interface Pagination {
    /**
     * Whether there are more messages available
     */
    hasMore?: boolean;

    /**
     * Number of messages returned in this request
     */
    limit?: number;

    /**
     * Number of messages skipped
     */
    offset?: number;

    /**
     * Total number of messages matching the filters
     */
    total?: number;
  }
}

export interface MessageListParams {
  /**
   * Filter by account email
   */
  account_email?: string;

  /**
   * Filter messages created after this date (ISO 8601 format)
   */
  created_at_gte?: string;

  /**
   * Filter messages created before this date (ISO 8601 format)
   */
  created_at_lte?: string;

  /**
   * Filter by sender phone number
   */
  from_number?: string;

  /**
   * Filter by group ID
   */
  group_id?: string;

  /**
   * Filter by message direction. Use `false` to get inbound messages (messages sent
   * TO your Sendblue number).
   *
   * **To get inbound messages for polling:** Use `is_outbound=false` combined with
   * `sendblue_number` or `to_number` set to your Sendblue phone number.
   *
   * Note: Do NOT use `message_type=inbound` - that parameter only accepts `message`
   * or `group` values.
   */
  is_outbound?: 'true' | 'false';

  /**
   * Maximum number of messages to return
   */
  limit?: number;

  /**
   * Filter by message type (1:1 vs group chat). Only accepts `message` or `group`.
   *
   * **Common mistake:** This is NOT for filtering inbound vs outbound messages. Use
   * `is_outbound` parameter instead.
   */
  message_type?: 'message' | 'group';

  /**
   * Filter by any phone number (from or to)
   */
  number?: string;

  /**
   * Number of messages to skip
   */
  offset?: number;

  /**
   * Field to order messages by
   */
  order_by?: 'createdAt' | 'updatedAt' | 'sentAt';

  /**
   * Sort order
   */
  order_direction?: 'asc' | 'desc';

  /**
   * Filter by Sendblue phone number
   */
  sendblue_number?: string;

  /**
   * Filter messages sent after this date (ISO 8601 format)
   */
  sent_at_gte?: string;

  /**
   * Filter messages sent before this date (ISO 8601 format)
   */
  sent_at_lte?: string;

  /**
   * Filter by service type
   */
  service?: 'iMessage' | 'SMS' | 'RCS';

  /**
   * Filter by message status
   */
  status?:
    | 'REGISTERED'
    | 'PENDING'
    | 'SENT'
    | 'DELIVERED'
    | 'RECEIVED'
    | 'QUEUED'
    | 'ERROR'
    | 'DECLINED'
    | 'ACCEPTED'
    | 'SUCCESS';

  /**
   * Filter by recipient phone number
   */
  to_number?: string;

  /**
   * Filter messages updated after this date (ISO 8601 format)
   */
  updated_at_gte?: string;

  /**
   * Filter messages updated before this date (ISO 8601 format)
   */
  updated_at_lte?: string;

  /**
   * Filter by worker ID (Admin only)
   */
  worker_id?: string;
}

export interface MessageGetStatusParams {
  /**
   * The message handle of the message you want to check status for
   */
  handle: string;
}

export interface MessageSendParams {
  /**
   * **REQUIRED** - The phone number to send from. Must be one of your registered
   * Sendblue phone numbers in E.164 format. Without this parameter, the message will
   * fail to send.
   */
  from_number: string;

  /**
   * Recipient phone number in E.164 format
   */
  number: string;

  /**
   * A Sendblue App Card rendered with Apple's Messages framework. App Cards require
   * a V2 Mac line and an iMessage-capable recipient; they never fall back to SMS.
   * The URL is delivered to the identified Messages extension when the recipient
   * taps the card. An initial App Card may include `reply_to` to create an inline
   * reply. Later state changes use the update endpoint, which sends a new Apple
   * message in the same App Card session. The feature is unavailable on the free
   * plan.
   */
  app_card?: MessageSendParams.AppCard;

  /**
   * Message text content. Optional when `media_url` or `app_card` is provided.
   */
  content?: string;

  /**
   * URL of media file to send (images, videos, etc.)
   */
  media_url?: string;

  /**
   * Optional inline-reply target. This may be combined with `app_card`; the
   * resulting App Card is sent as an inline reply to the target.
   */
  reply_to?: MessageSendParams.ReplyTo;

  /**
   * Optional. Identifies the seat (user) sending the message so the message is
   * attributed to a specific rep. Accepts either the seat UUID or the Firebase Auth
   * subject. When provided, `sender_email` is auto-populated on the message record
   * and webhook payloads. Returns 400 if the seat is not found.
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

export namespace MessageSendParams {
  /**
   * A Sendblue App Card rendered with Apple's Messages framework. App Cards require
   * a V2 Mac line and an iMessage-capable recipient; they never fall back to SMS.
   * The URL is delivered to the identified Messages extension when the recipient
   * taps the card. An initial App Card may include `reply_to` to create an inline
   * reply. Later state changes use the update endpoint, which sends a new Apple
   * message in the same App Card session. The feature is unavailable on the free
   * plan.
   */
  export interface AppCard {
    appName: string;

    extensionBundleId: string;

    /**
     * Visible card fields mirroring Apple's MSMessageTemplateLayout.
     */
    layout: AppCard.Layout;

    teamId: string;

    /**
     * URL delivered to the iMessage extension on tap. HTTPS URLs are limited to 2048
     * characters; data URLs carrying inline app state are limited to 16384.
     */
    url: string;

    /**
     * Optional numeric App Store ID for recipients without the extension.
     */
    appStoreId?: number;

    /**
     * Fallback text for notifications and surfaces that cannot render the card.
     */
    fallbackText?: string;

    /**
     * Use Apple's live layout when the extension is installed; false always sends the
     * static template layout.
     */
    interactive?: boolean;

    /**
     * Optional caller-supplied App Card session UUID. Generated automatically when
     * omitted.
     */
    sessionIdentifier?: string;
  }

  export namespace AppCard {
    /**
     * Visible card fields mirroring Apple's MSMessageTemplateLayout.
     */
    export interface Layout {
      caption?: string;

      /**
       * Secondary text overlaid on the preview image. Requires imageUrl.
       */
      imageSubtitle?: string;

      /**
       * Text overlaid on the preview image. Requires imageUrl.
       */
      imageTitle?: string;

      /**
       * HTTPS preview image fetched by the worker and sent as a hidden card attachment.
       * JPEG, PNG, HEIC, HEIF, and WebP are supported up to 10 MB.
       */
      imageUrl?: string;

      subcaption?: string;

      /**
       * Fallback text used in notifications and non-rendering surfaces.
       */
      summary?: string;

      trailingCaption?: string;

      trailingSubcaption?: string;
    }
  }

  /**
   * Optional inline-reply target. This may be combined with `app_card`; the
   * resulting App Card is sent as an inline reply to the target.
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

export interface MessageUpdateAppCardParams {
  /**
   * Replacement fallback text for notifications and non-rendering surfaces.
   */
  fallback_text?: string;

  /**
   * Reusing this key for the same App Card target returns the original update
   * instead of sending again.
   */
  idempotency_key?: string;

  interactive?: boolean;

  /**
   * Visible card fields mirroring Apple's MSMessageTemplateLayout.
   */
  layout?: MessageUpdateAppCardParams.Layout;

  /**
   * The iMessage expressive message style for this update.
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

  url?: string;
}

export namespace MessageUpdateAppCardParams {
  /**
   * Visible card fields mirroring Apple's MSMessageTemplateLayout.
   */
  export interface Layout {
    caption?: string;

    /**
     * Secondary text overlaid on the preview image. Requires imageUrl.
     */
    imageSubtitle?: string;

    /**
     * Text overlaid on the preview image. Requires imageUrl.
     */
    imageTitle?: string;

    /**
     * HTTPS preview image fetched by the worker and sent as a hidden card attachment.
     * JPEG, PNG, HEIC, HEIF, and WebP are supported up to 10 MB.
     */
    imageUrl?: string;

    subcaption?: string;

    /**
     * Fallback text used in notifications and non-rendering surfaces.
     */
    summary?: string;

    trailingCaption?: string;

    trailingSubcaption?: string;
  }
}

export declare namespace Messages {
  export {
    type MessageContent as MessageContent,
    type MessageResponse as MessageResponse,
    type MessageRetrieveResponse as MessageRetrieveResponse,
    type MessageListResponse as MessageListResponse,
    type MessageListParams as MessageListParams,
    type MessageGetStatusParams as MessageGetStatusParams,
    type MessageSendParams as MessageSendParams,
    type MessageUpdateAppCardParams as MessageUpdateAppCardParams,
  };
}
