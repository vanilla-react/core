import { HttpClientService } from '../features/shared/http-client.service';

export abstract class BaseApi {
  constructor(protected readonly _httpClient: HttpClientService) {}

  abstract prefix: string;

  protected endpoint(endpoint: string = '/') {
    return this.prefix + endpoint;
  }
}
