import { Module } from '@nestjs/common';
import { NinjasController } from './ninjas.controller';
import { NinjasService } from './ninjas.service';

@Module({
  controllers: [NinjasController],
  providers: [NinjasService],
})
export class NinjasModule {}
