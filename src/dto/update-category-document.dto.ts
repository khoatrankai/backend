import { PartialType } from '@nestjs/mapped-types'
import { CreateCategoryDocumentDto } from './create-category-document.dto';

export class UpdateCategoryDocumentDto extends PartialType(CreateCategoryDocumentDto) {}
