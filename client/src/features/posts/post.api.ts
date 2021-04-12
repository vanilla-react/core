import { BaseApi } from '@/lib';
import { PostStatus } from '@/types';

export class PostApi extends BaseApi {
  prefix = '/post';

  public async getAllWithPagination(
    skip: string,
    take: string,
    status: PostStatus,
  ) {
    const params = new URLSearchParams({
      skip,
      take,
      status,
    });
    const { data } = await this._axios.get(this.endpoint('?') + params);
    return data;
  }
}
