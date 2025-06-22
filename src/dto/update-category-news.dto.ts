import { PartialType } from '@nestjs/mapped-types';
import { CreateCategoryNewsDto } from './create-category-news.dto';

export class UpdateCategoryNewDto extends PartialType(CreateCategoryNewsDto) {}
