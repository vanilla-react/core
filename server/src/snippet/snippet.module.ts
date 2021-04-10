import { Module } from '@nestjs/common';
import { SnippetService } from './snippet.service';
import { SnippetController } from './snippet.controller';
import { PrismaService } from '../prisma.service';
import { SnippetRepository } from './snippet.repository';

@Module({
  controllers: [SnippetController],
  providers: [SnippetService, PrismaService, SnippetRepository],
})
export class SnippetModule {}
