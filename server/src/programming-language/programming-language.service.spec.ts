import { Test, TestingModule } from '@nestjs/testing';
import { ProgrammingLanguageService } from './programming-language.service';

describe('ProgrammingLanguageService', () => {
  let service: ProgrammingLanguageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProgrammingLanguageService],
    }).compile();

    service = module.get<ProgrammingLanguageService>(ProgrammingLanguageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
