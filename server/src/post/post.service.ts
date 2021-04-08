import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostRepository } from './post.repository';

@Injectable()
export class PostService {
  public constructor(private readonly _postRepo: PostRepository) {}
  create(userId: number, createPostDto: CreatePostDto) {
    return this._postRepo.create(userId, createPostDto);
  }

  findAll() {
    return `This action returns all post`;
  }

  public async getOneByAuthorNameAndSlug(name: string, slug: string) {
    return this._postRepo.getOneByAuthorNameAndSlug(name, slug);
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
