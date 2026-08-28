// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';
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
    group_id: string;

    /**
     * Device-verified name; empty when cleared
     */
    group_name: string;
  }
}

export interface GroupRenameParams {
  /**
   * New group name; whitespace-only values are rejected, while null or an empty
   * string clears it
   */
  group_name: string | null;
}

export declare namespace Groups {
  export {
    type GroupRetrieveResponse as GroupRetrieveResponse,
    type GroupRenameResponse as GroupRenameResponse,
    type GroupRenameParams as GroupRenameParams,
  };
}
