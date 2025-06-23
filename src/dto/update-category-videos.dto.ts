import { PartialType } from '@nestjs/mapped-types';
import { CreateCategoryVideoDto } from './create-category-videos.dto';

export class UpdateCategoryVideoDto extends PartialType(CreateCategoryVideoDto) {}
