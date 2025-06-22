import { PartialType } from '@nestjs/mapped-types';
import { CreateCategoryActivityDto } from './create-category-activity.dto';

export class UpdateCategoryActivityDto extends PartialType(CreateCategoryActivityDto) {}
