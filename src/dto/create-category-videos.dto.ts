import { IsOptional, IsString, Length } from 'class-validator';

export class CreateCategoryVideoDto {
  @IsOptional()
  @IsString()
  @Length(0, 255)
  name?: string;

  @IsOptional()
  @IsString()
  @Length(0, 100)
  nametag?: string;
}
