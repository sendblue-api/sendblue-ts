// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as GroupsAPI from './groups';
import { GroupRenameParams, GroupRenameResponse, GroupRetrieveResponse, Groups } from './groups';
import * as SeatsAPI from './seats';
import {
  SeatCountParams,
  SeatCountResponse,
  SeatListParams,
  SeatListResponse,
  SeatRetrieveResponse,
  Seats,
} from './seats';
import * as TotpAPI from './totp/totp';
import { Totp, TotpGetCodeResponse } from './totp/totp';

export class V2 extends APIResource {
  totp: TotpAPI.Totp = new TotpAPI.Totp(this._client);
  seats: SeatsAPI.Seats = new SeatsAPI.Seats(this._client);
  groups: GroupsAPI.Groups = new GroupsAPI.Groups(this._client);
}

V2.Totp = Totp;
V2.Seats = Seats;
V2.Groups = Groups;

export declare namespace V2 {
  export { Totp as Totp, type TotpGetCodeResponse as TotpGetCodeResponse };

  export {
    Seats as Seats,
    type SeatRetrieveResponse as SeatRetrieveResponse,
    type SeatListResponse as SeatListResponse,
    type SeatCountResponse as SeatCountResponse,
    type SeatListParams as SeatListParams,
    type SeatCountParams as SeatCountParams,
  };

  export {
    Groups as Groups,
    type GroupRetrieveResponse as GroupRetrieveResponse,
    type GroupRenameResponse as GroupRenameResponse,
    type GroupRenameParams as GroupRenameParams,
  };
}
