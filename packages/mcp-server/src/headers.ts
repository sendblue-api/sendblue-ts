// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { type ClientOptions } from 'sendblue-api/client';

import { IncomingMessage } from 'node:http';

export const parseAuthHeaders = (req: IncomingMessage): Partial<ClientOptions> => {
  const apiKey =
    req.headers['sb-api-key-id'] instanceof Array ?
      req.headers['sb-api-key-id'][0]
    : req.headers['sb-api-key-id'];
  const apiSecret =
    req.headers['sb-api-secret-key'] instanceof Array ?
      req.headers['sb-api-secret-key'][0]
    : req.headers['sb-api-secret-key'];
  return { apiKey, apiSecret };
};
