import { API } from '@/config';

import { HttpClient, HttpRequestConfig } from './http';

export class ApiClient<C extends HttpRequestConfig = HttpRequestConfig> extends HttpClient<C> {}

export const api = new ApiClient<HttpRequestConfig>({
  baseURL: API,
  headers: { 'Content-Type': 'application/json' }
});
