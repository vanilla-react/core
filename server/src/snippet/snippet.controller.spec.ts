import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma.service';
import { SnippetController } from './snippet.controller';
import { SnippetRepository } from './snippet.repository';
import { SnippetService } from './snippet.service';

describe('SnippetController', () => {
  let controller: SnippetController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SnippetController],
      providers: [SnippetService, SnippetRepository, PrismaService],
    }).compile();

    controller = module.get<SnippetController>(SnippetController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
