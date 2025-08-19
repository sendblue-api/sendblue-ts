// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { type ClientOptions } from 'sendblue/client';

import { IncomingMessage } from 'node:http';

export const parseAuthHeaders = (req: IncomingMessage): Partial<ClientOptions> => {
  const apiKey =
    Array.isArray(req.headers['sb-api-key-id']) ?
      req.headers['sb-api-key-id'][0]
    : req.headers['sb-api-key-id'];
  const apiSecret =
    Array.isArray(req.headers['sb-api-secret-key']) ?
      req.headers['sb-api-secret-key'][0]
    : req.headers['sb-api-secret-key'];
  return { apiKey, apiSecret };
};
