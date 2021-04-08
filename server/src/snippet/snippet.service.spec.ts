import { Test, TestingModule } from '@nestjs/testing';
import { SnippetService } from './snippet.service';

describe('SnippetService', () => {
  let service: SnippetService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SnippetService],
    }).compile();

    service = module.get<SnippetService>(SnippetService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
