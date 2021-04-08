import { Injectable } from '@nestjs/common';
import slugify from 'slugify';
import { PrismaService } from '../prisma.service';
import { CreatePostDto } from './dto/create-post.dto';
@Injectable()
export class PostRepository {
  public constructor(private readonly _prismaService: PrismaService) {}

  private addWithRelation = (id: number, relation = 'Author'): any => ({
    [relation]: {
      connect: {
        id,
      },
    },
  });

  public async create(userId: number, createPostDto: CreatePostDto) {
    return this._prismaService.post.create({
      data: {
        ...this.addWithRelation(userId),
        slug: this.createSlug(createPostDto.title),
        title: createPostDto.title,
        Snippets: {
          createMany: {
            data: createPostDto.snippets.map((snippet) => ({
              content: snippet.content,
              programmingLanguageId: Number(snippet.programmingLanguageId),
            })),
          },
        },
      },
    });
  }

  public async getOneByAuthorNameAndSlug(name: string, slug: string) {
    return this._prismaService.post.findFirst({
      where: {
        slug,
        Author: {
          name,
        },
      },
    });
  }

  private createSlug(title: string) {
    return slugify(title);
  }
}
