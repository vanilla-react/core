import { Prisma } from '.prisma/client';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { UpdateSnippetDto } from './dto/update-snippet.dto';

@Injectable()
export class SnippetRepository {
  public constructor(private readonly _prismaService: PrismaService) {}

  /**
   *
   * @description update doesn't know about the userId in the where-clause
   * therefor we use updateMany with a strict where clause.
   *
   */
  public async updateOne(userId: number, updateSnippetDto: UpdateSnippetDto) {
    const affectedRows = await this.updateOneSnippet(userId, updateSnippetDto);
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
    updateSnippetDtos: UpdateSnippetDto[],
  ) {
    const snippets = updateSnippetDtos.map((snippet) =>
      this.updateOneSnippet(userId, snippet),
    );
    const resultsInRowsAffected = await this._prismaService.$transaction(
      snippets,
    );

    return resultsInRowsAffected.every(this.isUpdated);
  }

  private updateOneSnippet(
    userId: number,
    { id, programmingLanguageId, content }: UpdateSnippetDto,
  ) {
    return this._prismaService.snippet.updateMany({
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
  }

  private isUpdated({ count }: Prisma.BatchPayload) {
    return count > 0;
  }
}
