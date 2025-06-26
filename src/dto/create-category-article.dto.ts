import { IsOptional, IsString, Length } from 'class-validator';

export class CreateCategoryArticleDto {
  @IsOptional()
  @IsString()
  @Length(0, 255)
  name?: string;

  @IsOptional()
  @IsString()
  @Length(0, 100)
  nametag?: string;
}
