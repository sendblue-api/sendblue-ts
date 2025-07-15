// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

export interface SendTypingIndicatorResponse {
  /**
   * The error message if the status is ERROR
   */
  error_message?: string | null;

  /**
   * The number you evaluated in E.164 format
   */
  number?: string;

  /**
   * The status of the typing indicator you tried to send
   */
  status?: 'SENT' | 'ERROR';
}
