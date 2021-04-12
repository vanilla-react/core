import { Post, PostStatus } from '@/types';
import { action, makeObservable, observable } from 'mobx';
import { PostApi } from './post.api';

export class PostService {
  @observable
  posts: Post[];

  public constructor(private readonly _postApi: PostApi) {
    makeObservable(this);
  }

  @action
  public async getAllPostsWithPagination(
    skip: number,
    take: number,
    status: PostStatus,
  ) {
    const posts = await this._postApi.getAllWithPagination(
      String(skip),
      String(take),
      status,
    );
    this.setPosts(posts);
  }

  @action
  setPosts(newValue: Post[]) {
    this.posts = newValue;
  }
}
