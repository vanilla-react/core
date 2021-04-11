import { Injectable } from '@nestjs/common';
import { UpdateBulkSnippetsDto } from './dto/update-bulk-snippets';
import { UpdateSnippetDto } from './dto/update-snippet.dto';
import { UserOwnsResourceDto } from './dto/user-owns-resource.dto';
import { SnippetRepository } from './snippet.repository';

@Injectable()
export class SnippetService {
  public constructor(private readonly _snippetRepo: SnippetRepository) {}

  public async userOwnsResourceById(userOwnsResourceDto: UserOwnsResourceDto) {
    return this._snippetRepo.userOwnsResourceById(userOwnsResourceDto);
  }

  public async updateSnippet(
    postId: number,
    updateSnippetDto: UpdateSnippetDto,
  ) {
    return this._snippetRepo.updateOne(postId, updateSnippetDto);
  }

  public async updateSnippetsInBulk(updateSnippetDto: UpdateBulkSnippetsDto[]) {
    return this._snippetRepo.updateInBulk(updateSnippetDto);
  }
}
