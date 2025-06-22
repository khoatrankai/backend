import { IsString, IsNumber, IsBoolean, IsEnum, IsArray, IsOptional } from "class-validator"
import { ArticleType } from "src/database/entities/articles/article.entity"

export class CreateArticleDto {
  @IsString()
  @IsOptional()
  title?: string

  @IsString()
  @IsOptional()
  excerpt?: string

  @IsString()
  @IsOptional()
  author?: string

  @IsOptional()
  @IsString()
  date?: string

  @IsOptional()
  @IsNumber()
  views?: number

  @IsOptional()
  @IsString()
  readTime?: string

  @IsString()
  category?: string

  @IsOptional()
  @IsBoolean()
  featured?: boolean

  @IsEnum(ArticleType)
  type: ArticleType

  @IsArray()
  @IsString({ each: true })
  tags?: string[]
}
