import { action, computed, makeObservable, observable } from 'mobx';
import { AuthApi } from '../apis';
import { IUser } from '@vanilla-react/shared';
import { AxiosInstance } from 'axios';
import { Configuration } from '../configuration';

export class AuthService {
  @observable
  public user: IUser | null = null;

  @computed
  get isAuthenticated() {
    return !!this.user;
  }

  constructor(
    private readonly _authApi: AuthApi,
    private readonly _axios: AxiosInstance,
    private readonly _config: Configuration,
  ) {
    makeObservable(this);
  }

  @action
  public async getMe() {
    const { data } = await this._authApi.me();
    this.setUser(data);
    return data;
  }

  @action
  public logout() {
    this.setUser(null);
    localStorage.removeItem(this._config.accessTokenKey);
  }

  @action
  private setUser(data: IUser | null) {
    this.user = data;
  }

  @action
  public setupInterceptors() {
    this._axios.interceptors.request.use(async (config) => {
      const token = localStorage.getItem(this._config.accessTokenKey);

      config.headers = {
        Authorization: 'Bearer ' + token,
      };

      return config;
    });
  }

  @action
  public addAuthorizationHeader(accessToken: string) {
    this._axios.defaults.headers = {
      ...this._axios.defaults.headers,
      Authorization: 'Bearer ' + accessToken,
    };
  }
}
