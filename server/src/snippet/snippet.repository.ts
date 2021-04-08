import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
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
  public async updateOne(
    userId: number,
    { id, programmingLanguageId, content }: UpdateSnippetDto,
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

    return affectedRows.count > 0;
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
      this.updateSnippet(userId, snippet),
    );
    return this._prismaService.$transaction(snippets);
  }

  private updateSnippet(
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
}
