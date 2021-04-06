import { AxiosInstance } from 'axios';

export abstract class BaseApi {
  abstract prefix: string;

  constructor(protected readonly axios: AxiosInstance) {}

  protected endpoint(endpoint: string = '/') {
    return this.prefix + endpoint;
  }
}
