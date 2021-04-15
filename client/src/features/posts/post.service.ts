import { IPost, KudoType, PostStatus } from '@/types';
import { action, makeObservable, observable } from 'mobx';
import { PostApi } from './post.api';

export class PostService {
  @observable
  posts: IPost[] = [];

  @observable
  hasMore: boolean = false;

  skip: number = 10;
  take: number = 10;

  fetching: boolean = false;

  public constructor(private readonly _postApi: PostApi) {
    makeObservable(this);
  }

  @action
  public async getAllPostsWithPagination(status: PostStatus) {
    if (this.fetching) return;

    this.setFetching(true);
    const { posts, hasMore } = await this._postApi.getAllWithPagination(
      this.skip,
      this.take,
      status,
    );

    this.setPosts(posts);
    this.setHasMore(hasMore);
    this.updatePagination();
    this.setFetching(false);
  }

  @action
  setHasMore(newValue: boolean) {
    this.hasMore = newValue;
  }

  @action
  setPosts(newValue: IPost[]) {
    this.posts = [...this.posts, ...newValue];
  }

  @action
  resetPagination() {
    this.skip = 0;
    this.take = 10;
  }

  @action
  setFetching(newValue: boolean) {
    this.fetching = newValue;
  }

  @action
  updatePostKudos(postId: number, userId: number, type: KudoType) {
    const post = this.posts.find((post) => post.id === postId);
    if (!post) return;

    const hasVotedOnType = this.hasAlreadyVotedOnType(post, userId, type);
    if (hasVotedOnType) return;

    const hasVoted = post.Kudos.find((k) => k.userId === userId);

    if (hasVoted) {
      hasVoted.type = type;
      return;
    }

    post.Kudos = [...post.Kudos, { type, userId }];
  }

  @action
  deletePostKudo(postId: number, userId: number) {
    const post = this.posts.find((post) => post.id === postId);
    if (!post) return;

    post.Kudos = post.Kudos.filter((k) => k.userId !== userId);
  }

  public hasAlreadyVotedOnType(post: IPost, userId: number, type: KudoType) {
    return post.Kudos.find(
      (kudo) => kudo.userId === userId && kudo.type === type,
    );
  }

  private updatePagination() {
    if (this.hasMore) {
      this.skip += this.take;
    }
  }
}
