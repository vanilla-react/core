import axios, { AxiosInstance } from 'axios';

export class Configuration {
  public accessTokenKey: string = 'ACCESS_TOKEN';

  get hasAccessToken() {
    return !!localStorage.getItem(this.accessTokenKey);
  }

  constructor() {}
}
