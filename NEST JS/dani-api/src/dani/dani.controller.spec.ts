import { Test, TestingModule } from '@nestjs/testing';
import { DaniController } from './dani.controller';
import { DaniService } from './dani.service';

describe('DaniController', () => {
  let controller: DaniController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DaniController],
      providers: [DaniService],
    }).compile();

    controller = module.get<DaniController>(DaniController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
