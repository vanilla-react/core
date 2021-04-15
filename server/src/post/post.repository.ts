import { Post, PostStatus, Prisma } from '.prisma/client';
import { Injectable } from '@nestjs/common';
import slugify from 'slugify';
import { PrismaService } from '../prisma.service';
import { CreatePostDto } from './dto/create-post.dto';

@Injectable()
export class PostRepository {
  public constructor(private readonly _prismaService: PrismaService) {}

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

  /**
   * @param {number} [skip] - Starts fetching posts starting at this page
   * @param {number} [take=10] - Returns take many posts
   * @param {PostStatus} [status] - Fetches posts with this status
   * @return {PrismaPromise<Post>}
   */

  public async getAll(skip = 0, take = 10, status?: PostStatus) {
    const posts = await this._prismaService.post.findMany({
      skip,
      take,
      where: {
        ...this.addWithFilter(status),
      },
      orderBy: {
        updatedAt: 'asc',
      },
      select: {
        ...this.selectWantedFields(),
      },
    });

    const totalPostsCount = await this._prismaService.post.count({
      where: {
        ...this.addWithFilter(status),
      },
      skip,
    });

    return {
      posts,
      hasMore: totalPostsCount > take,
    };
  }

  public async getOneByAuthorNameAndSlug(name: string, slug: string) {
    return this._prismaService.post.findFirst({
      where: {
        slug,
        User: {
          name,
        },
      },
      select: {
        ...this.selectWantedFields(),
      },
    });
  }

  public async deleteOneByAuthorNameAndSlug(name: string, slug: string) {
    //Delete all snippets of that post first
    const snippets = this._prismaService.snippet.deleteMany({
      where: {
        Post: {
          User: {
            name: name,
          },
          slug,
        },
      },
    });
    const posts = this._prismaService.post.deleteMany({
      where: {
        User: {
          name,
        },
        slug,
      },
    });

    return this._prismaService.$transaction([snippets, posts]);
  }

  private createSlug(title: string) {
    return slugify(title);
  }

  private selectWantedFields = (): Prisma.PostSelect => ({
    title: true,
    updatedAt: true,
    createdAt: true,
    status: true,
    id: true,
    slug: true,
    User: {
      select: {
        name: true,
        id: true,
      },
    },
    Kudos: {
      select: {
        userId: true,
        type: true,
      },
    },
    Snippets: true,
  });

  private addWithRelation = (id: number, relation = 'User'): any => ({
    [relation]: {
      connect: {
        id,
      },
    },
  });

  private addWithFilter(
    value?: string | number,
    field: keyof Prisma.PostWhereInput = 'status',
  ): Prisma.PostWhereInput {
    return {
      [field]: {
        equals: value,
      },
    };
  }
}
