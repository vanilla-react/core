import { BaseApi } from '@/lib';
import { KudoType } from '@/types';

export class KudoApi extends BaseApi {
  // It's nested within the Post resource e.g. /post/:id/kudo
  prefix: string = '/post';

  public async vote(postId: number, type: KudoType) {
    return this._axios.put(this.endpoint(`/${postId}/kudo/vote?type=${type}`));
  }

  public async removeVote(postId: number) {
    return this._axios.delete(this.endpoint(`/${postId}/kudo/vote`));
  }
}
