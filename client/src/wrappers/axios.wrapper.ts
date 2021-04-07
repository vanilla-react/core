import Axios, { AxiosInstance } from 'axios';
import { Configuration } from '../configuration';

export class AxiosWrapper {
  private readonly _axios: AxiosInstance;

  get axios() {
    return this._axios;
  }

  constructor(private readonly _configuration: Configuration) {
    this._axios = Axios.create({
      baseURL: _configuration.BASE_URL,
    });
  }

  public setupInterceptors() {
    this._axios.interceptors.request.use(async (config) => {
      const token = localStorage.getItem(this._configuration.accessTokenKey);

      config.headers = {
        Authorization: 'Bearer ' + token,
      };

      return config;
    });
  }

  public addAuthorizationHeader(accessToken: string) {
    this._axios.defaults.headers = {
      ...this._axios.defaults.headers,
      Authorization: 'Bearer ' + accessToken,
    };
  }
}
