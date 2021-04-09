import { Injectable } from '@nestjs/common';
import { UpdateBulkSnippetsDto } from './dto/update-bulk-snippets';
import { UpdateSnippetDto } from './dto/update-snippet.dto';
import { SnippetRepository } from './snippet.repository';

@Injectable()
export class SnippetService {
  public constructor(private readonly _snippetRepo: SnippetRepository) {}

  public async updateSnippet(
    postId: number,
    userId: number,
    updateSnippetDto: UpdateSnippetDto,
  ) {
    return this._snippetRepo.updateOne(postId, userId, updateSnippetDto);
  }

  public async updateSnippetsInBulk(
    userId: number,
    updateSnippetDto: UpdateBulkSnippetsDto[],
  ) {
    return this._snippetRepo.updateInBulk(userId, updateSnippetDto);
  }
}
