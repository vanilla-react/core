import { Test, TestingModule } from '@nestjs/testing';
import { UpdateBulkSnippetsDto } from './dto/update-bulk-snippets';
import { UpdateSnippetDto } from './dto/update-snippet.dto';
import { UserOwnsResourceDto } from './dto/user-owns-resource.dto';
import { SnippetRepository } from './snippet.repository';
import { SnippetService } from './snippet.service';

describe('SnippetService', () => {
  let service: SnippetService;

  const mockSnippetRepository = {
    updateOne: jest.fn((id: number, dto: UpdateSnippetDto) => true),
    updateInBulk: jest.fn((dto: UpdateBulkSnippetsDto[]) => true),
    userOwnsResourceById: jest.fn((dto: UserOwnsResourceDto) => true),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SnippetService, SnippetRepository],
    })
      .overrideProvider(SnippetRepository)
      .useValue(mockSnippetRepository)
      .compile();

    service = module.get<SnippetService>(SnippetService);

    mockSnippetRepository.updateOne.mockClear();
    mockSnippetRepository.updateInBulk.mockClear();
    mockSnippetRepository.userOwnsResourceById.mockClear();
  });

  it('should be defined', async () => {
    expect(service).toBeDefined();
  });

  describe('update a single snippet', () => {
    it('should return the updated dto', async () => {
      const result = await service.updateSnippet(
        1,
        UpdateSnippetDto.create('updated', 1),
      );

      expect(result).toBeTruthy();
    });

    it('should use the repository and invoke updateOne', async () => {
      await service.updateSnippet(1, UpdateSnippetDto.create('updated', 1));
      expect(mockSnippetRepository.updateOne).toHaveBeenCalled();
    });
  });

  describe('update snippets in bulk', () => {
    it('should return the updated dtos', async () => {
      const result = await service.updateSnippetsInBulk([]);
      expect(result).toBeTruthy();
    });

    it('should use the repository and invoke updateInBulk', async () => {
      await service.updateSnippetsInBulk([]);
      expect(mockSnippetRepository.updateInBulk).toHaveBeenCalled();
    });
  });

  describe('user owns resource by id', () => {
    const data: UserOwnsResourceDto = {
      postId: 1,
      programmingLanguageId: 1,
      userId: 1,
    };

    it('should return the updated dtos', async () => {
      const result = await service.userOwnsResourceById(data);
      expect(result).toBeTruthy();
    });

    it('should use the repository and invoke userOwnsResourceById', async () => {
      await service.userOwnsResourceById(data);
      expect(mockSnippetRepository.userOwnsResourceById).toHaveBeenCalled();
    });
  });
});
