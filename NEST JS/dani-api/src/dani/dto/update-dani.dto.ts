//import { PartialType } from '@nestjs/mapped-types';
import { PartialType } from '@nestjs/swagger'
import { CreateDaniDto } from './create-dani.dto';

export class UpdateDaniDto extends PartialType(CreateDaniDto) {}
