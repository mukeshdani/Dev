import { Module } from '@nestjs/common';
import { DaniService } from './dani.service';
import { DaniController } from './dani.controller';

@Module({
  controllers: [DaniController],
  providers: [DaniService],
})
export class DaniModule {}
