import { BaseApi } from '../../lib';

export class AuthApi extends BaseApi {
  prefix: string = '/auth';

  async me() {
    return this._axios.get(this.endpoint('/me'));
  }
}
