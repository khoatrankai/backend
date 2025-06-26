import { Transform } from "class-transformer"
import { IsString, IsNumber, IsBoolean, IsOptional } from "class-validator"

export class CreateTrackDto {
  @IsString()
  @IsOptional()
  title?: string

  @IsString()
  @IsOptional()
  artist?: string

  @IsString()
  @IsOptional()
  duration?: string

  @IsString()
  @IsOptional()
  category?: string

  @IsOptional()
  @IsNumber()
  plays?: number

  @IsString()
  @IsOptional()
  description?: string

  @IsString()
  @IsOptional()
  releaseDate?: string

  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true' || value === true)
  featured?: boolean

  @IsOptional()
  @IsString()
  link?: string
}
