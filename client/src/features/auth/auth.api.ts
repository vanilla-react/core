import { BaseApi } from '../../lib';

export class AuthApi extends BaseApi {
  prefix: string = '/auth';

  async me() {
    return this._httpClient.axios.get(this.endpoint('/me'));
  }
}
