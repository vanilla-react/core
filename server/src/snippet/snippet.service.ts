import { Injectable } from '@nestjs/common';
import { UpdateSnippetDto } from './dto/update-snippet.dto';
import { SnippetRepository } from './snippet.repository';

@Injectable()
export class SnippetService {
  public constructor(private readonly _snippetRepo: SnippetRepository) {}

  public async updateSnippet(
    userId: number,
    updateSnippetDto: UpdateSnippetDto,
  ) {
    return this._snippetRepo.updateOne(userId, updateSnippetDto);
  }
}
