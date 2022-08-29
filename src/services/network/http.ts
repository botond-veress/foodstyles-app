import axios, { AxiosInstance, AxiosResponse, AxiosRequestConfig, AxiosError } from 'axios';

export enum Header {
  Authorization = 'authorization'
}

export interface HttpPromise<T, C extends HttpRequestConfig = HttpRequestConfig> extends Promise<HttpResponse<T, C>> {}

export interface HttpInstance<C extends HttpRequestConfig = HttpRequestConfig> extends AxiosInstance {
  (config: C): HttpPromise<any, C>;
  (url: string, config?: C): HttpPromise<any, C>;
}

export interface HttpRequestConfig extends AxiosRequestConfig {}

export interface HttpResponse<T, C extends HttpRequestConfig = HttpRequestConfig> extends AxiosResponse<T> {
  config: C;
}

export interface HttpError<T, C extends HttpRequestConfig = HttpRequestConfig> extends AxiosError<T> {
  config: C;
  response?: HttpResponse<T, C>;
}

export class HttpClient<C extends HttpRequestConfig = HttpRequestConfig> {
  protected client: HttpInstance<C>;

  constructor(config?: C) {
    this.client = axios.create(config) as HttpInstance<C>;
  }

  protected unwrap = <T>(response: HttpResponse<T>) => response.data;

  get<T>(url: string, params?: object, config?: C) {
    return this.client.get<T>(url, { params, ...config }).then(this.unwrap);
  }

  post<T>(url: string, data?: object, config?: C) {
    return this.client.post<T>(url, data, config).then(this.unwrap);
  }

  put<T>(url: string, data?: object, config?: C) {
    return this.client.put<T>(url, data, config).then(this.unwrap);
  }

  patch<T>(url: string, data?: object, config?: C) {
    return this.client.patch<T>(url, data, config).then(this.unwrap);
  }

  delete<T>(url: string, config?: C) {
    return this.client.delete<T>(url, config).then(this.unwrap);
  }
}
