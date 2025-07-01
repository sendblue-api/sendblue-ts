// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import type { SendblueAPI } from '../client';

export abstract class APIResource {
  protected _client: SendblueAPI;

  constructor(client: SendblueAPI) {
    this._client = client;
  }
}
