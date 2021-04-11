import { Prisma } from '.prisma/client';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { UpdateBulkSnippetsDto } from './dto/update-bulk-snippets';
import { UpdateSnippetDto } from './dto/update-snippet.dto';

@Injectable()
export class SnippetRepository {
  public constructor(private readonly _prismaService: PrismaService) {}

  public async userOwnsResourceById(id: number, userId: number) {
    return this._prismaService.snippet.findFirst({
      where: {
        id,
        userId,
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
    userId: number,
    { programmingLanguageId, content }: UpdateSnippetDto,
  ) {
    const affectedRows = await this._prismaService.snippet.updateMany({
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
    });

    return this.isUpdated(affectedRows);
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
