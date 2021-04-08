import { Test, TestingModule } from '@nestjs/testing';
import { SnippetController } from './snippet.controller';
import { SnippetService } from './snippet.service';

describe('SnippetController', () => {
  let controller: SnippetController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SnippetController],
      providers: [SnippetService],
    }).compile();

    controller = module.get<SnippetController>(SnippetController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
