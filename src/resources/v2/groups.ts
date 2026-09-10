// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as GroupsAPI from '../groups';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';
import { maybeMultipartFormRequestOptions } from '../../internal/uploads';
import { path } from '../../internal/utils/path';

/**
 * Operations for group messaging (beta)
 */
export class Groups extends APIResource {
  /**
   * Retrieve the current complete membership for a group owned by the authenticated
   * account.
   *
   * @example
   * ```ts
   * const group = await client.v2.groups.retrieve(
   *   'sb_group_608acc54-d0d7-4b41-8092-9ff6e1e70455',
   * );
   * ```
   */
  retrieve(groupID: string, options?: RequestOptions): APIPromise<GroupRetrieveResponse> {
    return this._client.get(path`/api/v2/groups/${groupID}`, options);
  }

  /**
   * Changes the Apple-visible name of an existing iMessage group and waits for the
   * Sendblue line to verify the resulting state. Pass `null` or an empty string to
   * clear the name. The verified value is persisted as the group's `group_name`.
   *
   * The group must already have an iMessage chat, and the Sendblue line serving it
   * must be online and support group name changes. Failed requests are not replayed
   * automatically; retrying the same desired state is safe.
   *
   * By default an eligible Sendblue line in the group is selected automatically.
   * Pass `from_number` to require a specific Sendblue line: it must have an iMessage
   * mapping for this group, and if that line cannot act the request fails without
   * falling back to another line. The success response reports the line that
   * performed the change as `from_number`.
   *
   * @example
   * ```ts
   * const response = await client.v2.groups.rename(
   *   'sb_group_608acc54-d0d7-4b41-8092-9ff6e1e70455',
   *   { group_name: 'Project Falcon' },
   * );
   * ```
   */
  rename(
    groupID: string,
    body: GroupRenameParams,
    options?: RequestOptions,
  ): APIPromise<GroupRenameResponse> {
    return this._client.post(path`/api/v2/groups/${groupID}/name`, { body, ...options });
  }

  /**
   * Sets the Apple-visible photo of an existing iMessage group and waits for the
   * Sendblue line to verify the resulting device state. Pass `null` to clear the
   * photo. A set is verified only when the device-created photo transfer becomes the
   * chat's current photo; the verified photo is then persisted with the group and
   * returned on group retrieval with an image URL.
   *
   * Set the photo with either a JSON `photo_url` or raw image bytes in the `file`
   * field of a multipart form. Images must be JPEG, PNG, or GIF, at most 5 MB, and
   * no more than 25 million aggregate decoded pixels. URL images must use a direct,
   * publicly resolvable https URL; redirects are not followed. Replacing or clearing
   * the photo replaces the current stored reference and attempts to delete the
   * superseded object; no history is exposed through the API. Supported line types
   * are checked automatically; ineligible lines return `unsupported_line`. Failed
   * requests are not replayed automatically; retrying the same desired state is
   * safe.
   *
   * By default an eligible Sendblue line in the group is selected automatically.
   * Pass `from_number` to require a specific Sendblue line: it must have an iMessage
   * mapping for this group, and if that line cannot act the request fails without
   * falling back to another line. The success response reports the line that
   * performed the change as `from_number`.
   *
   * @example
   * ```ts
   * const response = await client.v2.groups.setPhoto(
   *   'sb_group_608acc54-d0d7-4b41-8092-9ff6e1e70455',
   *   { photo_url: 'https://example.com/team-photo.png' },
   * );
   * ```
   */
  setPhoto(
    groupID: string,
    body: GroupSetPhotoParams,
    options?: RequestOptions,
  ): APIPromise<GroupSetPhotoResponse> {
    return this._client.post(
      path`/api/v2/groups/${groupID}/photo`,
      maybeMultipartFormRequestOptions({ body, ...options }, this._client),
    );
  }
}

export interface GroupRetrieveResponse {
  data?: GroupRetrieveResponse.Data;

  status?: string;
}

export namespace GroupRetrieveResponse {
  export interface Data {
    created_at?: string;

    group_id?: string;

    group_name?: string;

    /**
     * Device-verified current group photo metadata; null when the group has no
     * verified photo
     */
    group_photo?: GroupsAPI.GroupPhoto | null;

    latest_comm_at?: string | null;

    latest_message_id?: string | null;

    /**
     * Convenience list of resolved participant phone numbers. Participants with
     * email-only handles remain in participants but are omitted here.
     */
    participant_numbers?: Array<string>;

    participants?: Array<Data.Participant>;

    updated_at?: string;

    /**
     * Worker-local iMessage group identifier when known
     */
    worker_group_id?: string | null;
  }

  export namespace Data {
    export interface Participant {
      /**
       * Contact ID when this participant is linked to a contact
       */
      contact_id?: string | null;

      /**
       * Raw participant handle, usually an E.164 phone number but sometimes an iMessage
       * email handle
       */
      handle?: string | null;

      /**
       * Contact or seat display name when available
       */
      name?: string | null;

      /**
       * Unique participant row identifier
       */
      participant_id?: string;

      /**
       * Resolved participant phone number, preferring the stored group phone handle and
       * falling back to contact phone. Email handles remain available in handle.
       */
      phone?: string | null;

      /**
       * Seat ID when this participant is a team member
       */
      seat_id?: string | null;

      /**
       * Participant kind
       */
      type?: 'contact' | 'seat';
    }
  }
}

export interface GroupRenameResponse {
  data: GroupRenameResponse.Data;

  status: 'OK';
}

export namespace GroupRenameResponse {
  export interface Data {
    /**
     * Sendblue line that performed the change
     */
    from_number: string | null;

    group_id: string;

    /**
     * Device-verified name; empty when cleared
     */
    group_name: string;
  }
}

export interface GroupSetPhotoResponse {
  data: GroupSetPhotoResponse.Data;

  status: 'OK';
}

export namespace GroupSetPhotoResponse {
  export interface Data {
    /**
     * Sendblue line that performed the change
     */
    from_number: string | null;

    group_id: string;

    /**
     * Device-verified current photo; null after a verified clear
     */
    group_photo: GroupsAPI.GroupPhoto | null;
  }
}

export interface GroupRenameParams {
  /**
   * New group name; whitespace-only values are rejected, while null or an empty
   * string clears it
   */
  group_name: string | null;

  /**
   * Sendblue line that must perform the change; it must have an iMessage mapping for
   * this group, and no other line is used if it cannot act. Omit or pass null for
   * automatic selection
   */
  from_number?: string | null;
}

export interface GroupSetPhotoParams {
  /**
   * Direct, publicly resolvable https URL of the image to set (JPEG, PNG, or GIF, at
   * most 5 MB and 25 million aggregate decoded pixels; redirects are not followed);
   * null clears the group photo
   */
  photo_url: string | null;

  /**
   * Sendblue line that must perform the change; it must have an iMessage mapping for
   * this group, and no other line is used if it cannot act. Omit or pass null for
   * automatic selection
   */
  from_number?: string | null;
}

export declare namespace Groups {
  export {
    type GroupRetrieveResponse as GroupRetrieveResponse,
    type GroupRenameResponse as GroupRenameResponse,
    type GroupSetPhotoResponse as GroupSetPhotoResponse,
    type GroupRenameParams as GroupRenameParams,
    type GroupSetPhotoParams as GroupSetPhotoParams,
  };
}
