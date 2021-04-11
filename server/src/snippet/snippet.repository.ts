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

  public async updateInBulk(updateSnippetDtos: UpdateBulkSnippetsDto[]) {
    for (let snippet of updateSnippetDtos) {
      const res = await this.updateOne(snippet.id, {
        programmingLanguageId: snippet.programmingLanguageId,
        content: snippet.content,
      });

      if (!res) {
        return false;
      }
    }

    return true;
  }
}
