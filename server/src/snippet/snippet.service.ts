import { Snippet } from '.prisma/client';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateSnippetDto } from './dto/create-snippet.dto';
import { UpdateSnippetDto } from './dto/update-snippet.dto';

@Injectable()
export class SnippetService {
  constructor(private readonly _prismaService: PrismaService) {}

  create(userId: string, createSnippetDto: CreateSnippetDto) {
    return this._prismaService.snippet.create({
      data: {
        Author: {
          connect: {
            id: Number(userId),
          },
        },
        slug: 'hi',
        title: createSnippetDto.title,
        JSContent: createSnippetDto.JSContent,
        ReactContent: createSnippetDto.ReactContent,
      },
    });
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
