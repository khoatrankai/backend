import { IsString, IsEnum, IsOptional, IsNumber, IsBoolean } from "class-validator"
import { NewsType } from "src/database/entities/news/news.entity"
import { Transform } from "class-transformer";

export class CreateNewsDto {
  @IsString()
  @IsOptional()
  title?: string

  @IsString()
  @IsOptional()
  excerpt?: string

  @IsOptional()
  @IsString()
  image?: string

  @IsString()
  @IsOptional()
  author?: string

  @IsString()
  @IsOptional()
  date?: string

  @IsString()
  @IsOptional()
  time?: string

  @IsOptional()
  @IsNumber()
  views?: number

  @IsEnum(NewsType)
  @IsOptional()
  type: NewsType

  @IsString()
  @IsOptional()
  category?: string

  @IsString()
  @IsOptional()
  categoryActivity?: string

  @IsString()
  @IsOptional()
  region?: string

  @IsBoolean()
  @IsOptional()
  @Transform(({ value }) => value === 'true' || value === true)
  featured: boolean
}
