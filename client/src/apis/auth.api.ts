import { Configuration } from '../configuration';
import { BaseApi } from './base.api';

export class AuthApi extends BaseApi {
  prefix: string = '/auth';

  async me() {
    return this.axios.get(this.endpoint('/me'));
  }
}
