import { IPost, PostStatus } from '@/types';
import { action, makeObservable, observable } from 'mobx';
import { PostApi } from './post.api';

export class PostService {
  @observable
  posts: IPost[] = [];

  @observable
  hasMore: boolean = false;

  public constructor(private readonly _postApi: PostApi) {
    makeObservable(this);
  }

  @action
  public async getAllPostsWithPagination(
    skip: number,
    take: number,
    status: PostStatus,
  ) {
    const posts = await this._postApi.getAllWithPagination(skip, take, status);
    this.setPosts(posts);
  }

  @action
  setHasMore(newValue: boolean) {
    this.hasMore = newValue;
  }

  @action
  setPosts(newValue: IPost[]) {
    this.posts = newValue;
  }
}
