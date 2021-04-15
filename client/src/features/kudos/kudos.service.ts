import { KudoType } from '@/types';
import { PostService } from '../posts/post.service';
import { KudoApi } from './kudos.api';

export class KudoService {
  public constructor(
    private readonly _kudoApi: KudoApi,
    private readonly _postService: PostService,
  ) {}

  public async vote(postId: number, userId: number, type: KudoType) {
    await this._kudoApi.vote(postId, type);
    this._postService.updatePostKudos(postId, userId, type);
  }

  public async removeVote(postId: number, userId: number) {
    await this._kudoApi.removeVote(postId);
    this._postService.deletePostKudo(postId, userId);
  }
}
