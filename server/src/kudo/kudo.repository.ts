import { KudoType } from '.prisma/client';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class KudoRepository {
  constructor(private readonly _prismaService: PrismaService) {}

  public async vote(postId: number, userId: number, type: KudoType) {
    return this._prismaService.kudo.upsert({
      where: {
        userId_postId: {
          userId,
          postId,
        },
      },
      update: {
        type,
      },
      create: {
        type,
        userId,
        postId,
      },
    });
  }

  public async deleteVote(postId: number, userId: number) {
    return this._prismaService.kudo.delete({
      where: {
        userId_postId: {
          postId,
          userId,
        },
      },
    });
  }
}
