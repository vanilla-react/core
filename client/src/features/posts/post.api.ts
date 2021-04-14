import { BaseApi } from '@/lib';
import { PostStatus } from '@/types';

export class PostApi extends BaseApi {
  prefix = '/post';

  public async getAllWithPagination(
    skip: number,
    take: number,
    status: PostStatus,
  ) {
    const params = new URLSearchParams({
      skip: String(skip),
      take: String(take),
      status,
    });
    const { data } = await this._axios.get(this.endpoint('?') + params);
    return data;
  }
}
