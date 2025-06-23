import { PartialType } from '@nestjs/mapped-types';
import { CreateCategorySoftwareDto } from './create-category-software.dto';

export class UpdateCategorySoftwareDto extends PartialType(CreateCategorySoftwareDto) {}
