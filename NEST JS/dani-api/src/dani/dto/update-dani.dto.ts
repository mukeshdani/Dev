import { PartialType } from '@nestjs/mapped-types';
import { CreateDaniDto } from './create-dani.dto';

export class UpdateDaniDto extends PartialType(CreateDaniDto) {}
