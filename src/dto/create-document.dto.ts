import { IsString, IsNumber, IsOptional } from "class-validator"

export class CreateDocumentDto {
  @IsString()
  @IsOptional()
  title?: string

  @IsString()
  @IsOptional()
  type?: string

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

  @IsString()
  @IsOptional()
  size?: string
}
