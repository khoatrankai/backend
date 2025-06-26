import { IsString, IsNumber, IsOptional, IsEnum } from "class-validator"
import { DocumentType } from "src/database/entities/documents/document.entity"

export class CreateDocumentDto {
  @IsString()
  @IsOptional()
  title?: string

  @IsEnum(DocumentType)
  type?: DocumentType

  @IsString()
  @IsOptional()
  category?: string

  @IsString()
  @IsOptional()
  organ?: string

  @IsString()
  @IsOptional()
  date?: string

  @IsOptional()
  @IsNumber()
  downloads?: number

  @IsOptional()
  @IsString()
  link?: string

  @IsString()
  @IsOptional()
  size?: string
}
