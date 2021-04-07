import { Injectable } from '@nestjs/common';
import slugify from 'slugify';
import { PrismaService } from 'src/prisma.service';
import { CreateSnippetDto } from './dto/create-snippet.dto';

@Injectable()
export class SnippetRepository {
  public constructor(private readonly _prismaService: PrismaService) {}

  private addWithRelation = (id: number, relation = 'Author'): any => ({
    [relation]: {
      connect: {
        id,
      },
    },
  });

  public getAll() {}

  public getOneBySlug(slug: string) {
    return this._prismaService.snippet.findFirst({
      where: {
        slug,
      },
    });
  }

  public async create(userId: number, createSnippetDto: CreateSnippetDto) {
    return this._prismaService.snippet.create({
      data: {
        ...this.addWithRelation(userId),
        slug: await this.createSlug(createSnippetDto.title),
        title: createSnippetDto.title,
        JSContent: createSnippetDto.JSContent,
        ReactContent: createSnippetDto.ReactContent,
      },
      include: {
        Author: true,
      },
    });
  }

  private async createSlug(title: string) {
    const count = (await this._prismaService.snippet.count()) + 1;
    return slugify(title + count);
  }
}
