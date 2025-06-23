import { PartialType } from '@nestjs/mapped-types';
import { CreatePlatformDto } from './create-category-platform.dto';

export class UpdatePlatformDto extends PartialType(CreatePlatformDto) {}
