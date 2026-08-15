// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as TokensAPI from './tokens';
import { TokenCreateParams, TokenCreateResponse, Tokens } from './tokens';

export class Auth extends APIResource {
  tokens: TokensAPI.Tokens = new TokensAPI.Tokens(this._client);
}

Auth.Tokens = Tokens;

export declare namespace Auth {
  export {
    Tokens as Tokens,
    type TokenCreateResponse as TokenCreateResponse,
    type TokenCreateParams as TokenCreateParams,
  };
}
