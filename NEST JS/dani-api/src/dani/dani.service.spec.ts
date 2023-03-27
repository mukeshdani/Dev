import { Test, TestingModule } from '@nestjs/testing';
import { DaniService } from './dani.service';

describe('DaniService', () => {
  let service: DaniService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DaniService],
    }).compile();

    service = module.get<DaniService>(DaniService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
