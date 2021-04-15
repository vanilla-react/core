import { KudoType } from '.prisma/client';
import { Injectable } from '@nestjs/common';
import { KudoRepository } from './kudo.repository';

@Injectable()
export class KudoService {
  public constructor(private readonly _kudoRepo: KudoRepository) {}

  public async vote(postId: number, userId: number, type: KudoType) {
    return this._kudoRepo.vote(postId, userId, type);
  }

  public async deleteVote(postId: number, userId: number) {
    console.log(postId, userId);
    return this._kudoRepo.deleteVote(postId, userId);
  }
}
