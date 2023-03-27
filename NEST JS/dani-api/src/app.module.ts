import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NinjasModule } from './ninjas/ninjas.module';
import { DaniModule } from './dani/dani.module';

@Module({
  imports: [NinjasModule, DaniModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
