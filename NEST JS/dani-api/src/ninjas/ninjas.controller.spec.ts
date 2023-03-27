import { Test, TestingModule } from '@nestjs/testing';
import { NinjasController } from './ninjas.controller';

describe('NinjasController', () => {
  let controller: NinjasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NinjasController],
    }).compile();

    controller = module.get<NinjasController>(NinjasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
