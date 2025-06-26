import { PartialType } from '@nestjs/mapped-types';
import { CreateCategoryArticleDto } from './create-category-article.dto';

export class UpdateCategoryArticleDto extends PartialType(CreateCategoryArticleDto) {}
