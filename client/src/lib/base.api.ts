import { AxiosInstance } from 'axios';

export abstract class BaseApi {
  constructor(protected readonly _axios: AxiosInstance) {}

  abstract prefix: string;

  protected endpoint(endpoint: string = '/') {
    return this.prefix + endpoint;
  }
}
