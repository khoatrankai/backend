import { IsString, IsNumber, IsOptional } from "class-validator"

export class CreateVideoDto {
  @IsString()
  @IsOptional()
  title?: string

  @IsString()
  @IsOptional()
  thumbnail?: string

  @IsString()
  @IsOptional()
  duration?: string

  @IsString()
  @IsOptional()
  date?: string

  @IsOptional()
  @IsNumber()
  views?: number

  @IsString()
  @IsOptional()
  category?: string

  @IsString()
  @IsOptional()
  description?: string

  @IsOptional()
  @IsString()
  link?: string
}
