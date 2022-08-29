import { API } from '@/config';

import { HttpRequestConfig, HttpError, HttpResponse, Header } from './http';
import { ApiClient } from './api';

type PromiseCallback = () => Promise<any>;

interface AuthorizedHttpRequestConfig extends HttpRequestConfig {
  refreshRetries?: number;
}

interface AuthorizedApiCallbackOptions {
  onUnauthorized: PromiseCallback;
  onAccessTokenExpired: PromiseCallback;
}

export class AuthorizedApiClient<
  C extends AuthorizedHttpRequestConfig = AuthorizedHttpRequestConfig
> extends ApiClient<C> {
  private promise?: Promise<any>;
  private options?: AuthorizedApiCallbackOptions;
  public token?: string;

  constructor(options: C) {
    super(options);

    this.client.interceptors.request.use(this.attachToken);
    this.client.interceptors.response.use(this.onResponse, this.onError);
  }

  configure(options: AuthorizedApiCallbackOptions) {
    this.options = options;
  }

  private attachToken = (config: AuthorizedHttpRequestConfig): AuthorizedHttpRequestConfig => {
    if (!this.token) return config;

    return { ...config, headers: { ...config.headers, [Header.Authorization]: `Bearer ${this.token}` } };
  };

  private onResponse = (response: HttpResponse<any, AuthorizedHttpRequestConfig>) => {
    if (!this.doesRequireRefresh(response)) return response;

    return this.retry(response.config);
  };

  private onError = (error: HttpError<any, AuthorizedHttpRequestConfig>) => {
    if (!error.isAxiosError || !error.response || !this.doesRequireRefresh(error.response)) throw error;

    return this.retry(error.config);
  };

  private doesRequireRefresh = ({ config, data }: HttpResponse<any, AuthorizedHttpRequestConfig>) => {
    if (!config.refreshRetries || config.refreshRetries < 2) return false;

    return !!data?.errors?.some((error: any) => error.extensions.code === 'UNAUTHENTICATED');
  };

  private retry = (config: AuthorizedHttpRequestConfig) => {
    return this.refresh()
      .catch((error) => {
        if (this.options) this.options.onUnauthorized();

        throw error;
      })
      .then(() =>
        this.client({ ...config, refreshRetries: (config.refreshRetries ?? 0) - 1 } as AuthorizedHttpRequestConfig)
      );
  };

  private refresh(): Promise<any> {
    if (this.promise) return this.promise;

    if (!this.options) throw new Error(`Token expiration strategy is not set.`);

    this.promise = this.options
      .onAccessTokenExpired()
      .then((data) => {
        this.promise = undefined;
        return data;
      })
      .catch((error) => {
        this.promise = undefined;
        throw error;
      });

    return this.promise;
  }
}

export const authorizedApi = new AuthorizedApiClient<AuthorizedHttpRequestConfig>({
  baseURL: API,
  headers: { 'Content-Type': 'application/json' },
  refreshRetries: 3
});
