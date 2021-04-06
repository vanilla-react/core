import { action, computed, makeObservable, observable } from 'mobx';
import { AuthApi } from '../apis';
import { IUser } from '@vanilla-react/shared';

export class AuthService {
  @observable
  public user: IUser | null = null;

  @computed
  get isAuthenticated() {
    return !!this.user;
  }

  constructor(private readonly _authApi: AuthApi) {
    makeObservable(this);
  }

  @action
  public async getMe() {
    const { data } = await this._authApi.me();
    this.user = data;
    return data;
  }
}
