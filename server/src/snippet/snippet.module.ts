import { Module } from '@nestjs/common';
import { SnippetService } from './snippet.service';
import { SnippetController } from './snippet.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [SnippetController],
  providers: [SnippetService, PrismaService],
})
export class SnippetModule {}
