import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NinjasModule } from './ninjas/ninjas.module';
import { NinjaController } from './ninja/ninja.controller';
import { DaniModule } from './dani/dani.module';
import { NinjaController } from './ninja/ninja.controller';

@Module({
  imports: [NinjasModule, DaniModule],
  controllers: [AppController, NinjaController],
  providers: [AppService],
})
export class AppModule {}
