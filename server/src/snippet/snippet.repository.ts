import { Prisma } from '.prisma/client';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { UpdateBulkSnippetsDto } from './dto/update-bulk-snippets';
import { UpdateSnippetDto } from './dto/update-snippet.dto';
import { UserOwnsResourceDto } from './dto/user-owns-resource.dto';

@Injectable()
export class SnippetRepository {
  public constructor(private readonly _prismaService: PrismaService) {}

  public async userOwnsResourceById({
    postId,
    userId,
    programmingLanguageId,
  }: UserOwnsResourceDto) {
    return this._prismaService.snippet.findFirst({
      where: {
        id: postId,
        userId,
        programmingLanguageId,
      },
    });
  }

  /**
   *
   * @description update doesn't know about the userId in the where-clause
   * therefor we use updateMany with a strict where clause.
   *
   */
  public async updateOne(
    id: number,
    { programmingLanguageId, content }: UpdateSnippetDto,
  ) {
    const post = await this._prismaService.post.findFirst({
      where: {
        status: 'PENDING',
        Snippets: {
          some: {
            id,
          },
        },
      },
      select: {
        id: true,
      },
    });

    if (!post) {
      return false;
    }

    const result = await this._prismaService.snippet.update({
      where: {
        programmingLanguageId_postId: {
          programmingLanguageId,
          postId: post.id,
        },
      },
      data: {
        content,
      },
    });

    return !!result;
  }

  /**
   *
   * @description uses transactions to tupdate many snippets for many posts,
   * it only works when the post status is pending and the user owns the snippet.
   *
   */
  public async updateInBulk(
    userId: number,
    updateSnippetDtos: UpdateBulkSnippetsDto[],
  ) {
    const snippets = updateSnippetDtos.map(
      ({ id, content, programmingLanguageId }) =>
        this._prismaService.snippet.updateMany({
          where: {
            id,
            userId,
            programmingLanguageId,
            Post: {
              status: 'PENDING',
            },
          },
          data: {
            content,
          },
        }),
    );

    const resultsInRowsAffected = await this._prismaService.$transaction(
      snippets,
    );

    return resultsInRowsAffected.every(this.isUpdated);
  }

  private isUpdated({ count }: Prisma.BatchPayload) {
    return count > 0;
  }
}
