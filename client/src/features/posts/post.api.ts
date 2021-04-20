import { BaseApi } from '@/lib';
import { Base64, CreatePostDto, IPost, PostStatus } from '@/types';

export class PostApi extends BaseApi {
  prefix = '/post';

  public async create(createPostDto: CreatePostDto<Base64>) {
    const { data } = await this._axios.post(this.endpoint(), createPostDto);
    return data;
  }

  public async getByUsernameAndSlug(username: string, slug: string) {
    const { data } = await this._axios.get(
      this.endpoint(`/${username}/${slug}`),
    );
    return data as IPost;
  }

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
