import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { DaniService } from './dani.service';
import { CreateDaniDto } from './dto/create-dani.dto';
import { UpdateDaniDto } from './dto/update-dani.dto';

@Controller('dani')
export class DaniController {
  constructor(private readonly daniService: DaniService) {}

  @Post()
  create(@Body() createDaniDto: CreateDaniDto) {
    return this.daniService.create(createDaniDto);
  }

  @Get()
  findAll() {
    return this.daniService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.daniService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDaniDto: UpdateDaniDto) {
    return this.daniService.update(+id, updateDaniDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.daniService.remove(+id);
  }
}
