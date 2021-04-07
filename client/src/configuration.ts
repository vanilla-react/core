import axios, { AxiosInstance } from 'axios';

export class Configuration {
  public BASE_URL: string = 'http://localhost:5000/';
  public accessTokenKey: string = 'vr-auth-token';

  get accessToken() {
    return localStorage.getItem(this.accessTokenKey);
  }

  constructor() {}
}
