// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

export class MediaObjects extends APIResource {
  /**
   * Upload a media file to Sendblue's CDN for use in messages
   *
   * @example
   * ```ts
   * const response = await client.mediaObjects.upload({
   *   media_url: 'https://example.com/image.jpg',
   * });
   * ```
   */
  upload(body: MediaObjectUploadParams, options?: RequestOptions): APIPromise<MediaObjectUploadResponse> {
    return this._client.post('/api/upload-media-object', { body, ...options });
  }
}

export interface MediaObjectUploadResponse {
  mediaObjectId?: string;

  message?: string;

  status?: string;
}

export interface MediaObjectUploadParams {
  /**
   * URL of the media file to upload
   */
  media_url: string;
}

export declare namespace MediaObjects {
  export {
    type MediaObjectUploadResponse as MediaObjectUploadResponse,
    type MediaObjectUploadParams as MediaObjectUploadParams,
  };
}
