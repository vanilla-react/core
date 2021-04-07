import { Injectable } from '@nestjs/common';
import { CreateSnippetDto } from './dto/create-snippet.dto';
import { UpdateSnippetDto } from './dto/update-snippet.dto';
import { SnippetRepository } from './snippet.repository';

@Injectable()
export class SnippetService {
  constructor(private readonly _snippetRepo: SnippetRepository) {}

  create(userId: number, createSnippetDto: CreateSnippetDto) {
    return this._snippetRepo.create(userId, createSnippetDto);
  }

  findAll() {
    return 'This will return all snippets';
  }

  findOne(id: number) {
    return `This action returns a #${id} snippet`;
  }

  update(id: number, updateSnippetDto: UpdateSnippetDto) {
    return `This action updates a #${id} snippet`;
  }

  remove(id: number) {
    return `This action removes a #${id} snippet`;
  }
}
