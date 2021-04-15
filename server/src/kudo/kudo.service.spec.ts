import { Test, TestingModule } from '@nestjs/testing';
import { KudoService } from './kudo.service';

describe('KudoService', () => {
  let service: KudoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [KudoService],
    }).compile();

    service = module.get<KudoService>(KudoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
