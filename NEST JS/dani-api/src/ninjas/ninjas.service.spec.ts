import { Test, TestingModule } from '@nestjs/testing';
import { NinjasService } from './ninjas.service';

describe('NinjasService', () => {
  let service: NinjasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NinjasService],
    }).compile();

    service = module.get<NinjasService>(NinjasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
