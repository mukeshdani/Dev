import { Injectable } from '@nestjs/common';
import { CreateDaniDto } from './dto/create-dani.dto';
import { UpdateDaniDto } from './dto/update-dani.dto';

@Injectable()
export class DaniService {
  create(createDaniDto: CreateDaniDto) {
    return 'This action adds a new dani';
  }

  findAll() {
    return `This action returns all dani`;
  }

  findOne(id: number) {
    return `This action returns a #${id} dani`;
  }

  update(id: number, updateDaniDto: UpdateDaniDto) {
    return `This action updates a #${id} dani`;
  }

  remove(id: number) {
    return `This action removes a #${id} dani`;
  }
}
