import { PostStatus } from '.prisma/client';
import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { PostQueryDto } from './dto/post-query-dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostRepository } from './post.repository';

@Injectable()
export class PostService {
  public constructor(private readonly _postRepo: PostRepository) {}
  create(userId: number, createPostDto: CreatePostDto) {
    return this._postRepo.create(userId, createPostDto);
  }

  /**
   * @param {number} [skip] - Starts fetching posts starting at this page:
   * @param {number} [take=10] - Returns take many posts
   * @param {PostStatus} [status] - Fetches posts with this status, defaults to PostStatus.PENDING
   * @return {PrismaPromise<Post>}
   */
  public async getAll(skip: number, take: number, status: string) {
    const query: PostQueryDto = {
      skip,
      take,
      status: status === 'APPROVED' || 'PENDING' ? status : undefined,
    };
    return this._postRepo.getAll(skip, take, status);
  }

  public async getOneByAuthorNameAndSlug(name: string, slug: string) {
    return this._postRepo.getOneByAuthorNameAndSlug(name, slug);
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  removeByAuthorNameAndSlug(name: string, slug: string) {
    return this._postRepo.deleteOneByAuthorNameAndSlug(name, slug);
  }
}
