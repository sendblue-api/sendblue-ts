// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

export class UploadMediaObject extends APIResource {
  /**
   * Upload a media file to Sendblue's CDN for use in messages
   *
   * @example
   * ```ts
   * const uploadMediaObject =
   *   await client.uploadMediaObject.create({
   *     media_url: 'https://example.com/image.jpg',
   *   });
   * ```
   */
  create(
    body: UploadMediaObjectCreateParams,
    options?: RequestOptions,
  ): APIPromise<UploadMediaObjectCreateResponse> {
    return this._client.post('/api/upload-media-object', { body, ...options });
  }
}

export interface UploadMediaObjectCreateResponse {
  mediaObjectId?: string;

  message?: string;

  status?: string;
}

export interface UploadMediaObjectCreateParams {
  /**
   * URL of the media file to upload
   */
  media_url: string;
}

export declare namespace UploadMediaObject {
  export {
    type UploadMediaObjectCreateResponse as UploadMediaObjectCreateResponse,
    type UploadMediaObjectCreateParams as UploadMediaObjectCreateParams,
  };
}
