import { IsString, IsNumber, IsOptional } from "class-validator"

export class CreateImageDto {
  @IsString()
  @IsOptional()
  title?: string

  @IsString()
  @IsOptional()
  thumbnail?: string

  @IsString()
  @IsOptional()
  date?: string

  @IsOptional()
  @IsNumber()
  views?: number

  @IsString()
  @IsOptional()
  category?: string
}
