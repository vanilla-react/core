import {
  CreatePostDto,
  IPost,
  KudoType,
  PostStatus,
  Base64 as B64,
} from '@/types';
import { Base64 } from 'js-base64';
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
  public async create(createPostDto: CreatePostDto<string>) {
    const [first, second] = createPostDto.snippets.map((e) => ({
      ...e,
      content: Base64.encode(e.content),
    }));
    const post: CreatePostDto<B64> = {
      title: createPostDto.title,
      snippets: [first, second],
    };

    return this._postApi.create(post);
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
  setInitialPosts(newValue: IPost[]) {
    this.posts = newValue;
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

  public async getByUsernameAndSlug(username: string, slug: string) {
    return this._postApi.getByUsernameAndSlug(username, slug);
  }

  private updatePagination() {
    if (this.hasMore) {
      this.skip += this.take;
    }
  }
}
