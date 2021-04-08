import Axios, { AxiosInstance } from 'axios';
import { ConfigService } from './shared.module';

export class HttpClientService {
  public readonly axios: AxiosInstance;

  constructor(private readonly _config: ConfigService) {
    this.axios = Axios.create({
      baseURL: this._config?.BASE_URL || 'http://localhost:5000',
    });
  }
}
