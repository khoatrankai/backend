import { IsString, IsOptional } from "class-validator"

export class CreateSlideDto {
  @IsString()
  @IsOptional()
  image?: string

  @IsString()
  @IsOptional()
  title?: string

  @IsString()
  @IsOptional()
  description?: string

  @IsOptional()
  @IsString()
  news?: string
}
