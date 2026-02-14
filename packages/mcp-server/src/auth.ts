// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { IncomingMessage } from 'node:http';
import { ClientOptions } from 'sendblue';

export const parseAuthHeaders = (req: IncomingMessage, required?: boolean): Partial<ClientOptions> => {
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
