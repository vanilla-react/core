import { makeObservable, observable } from 'mobx';
import { AuthApi } from '../apis';

export class AuthService {
  @observable
  public data: any = [];

  constructor(private readonly _authApi: AuthApi) {
    makeObservable(this);
  }

  public async getMe() {
    return this._authApi.me();
  }
}
