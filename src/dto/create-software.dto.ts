import { Transform } from "class-transformer"
import { IsString, IsNumber, IsBoolean, IsOptional } from "class-validator"

export class CreateSoftwareDto {
  @IsString()
  @IsOptional()
  name: string

  @IsString()
  @IsOptional()
  description: string

  @IsString()
  @IsOptional()
  version: string

  @IsString()
  @IsOptional()
  size: string

  @IsString()
  @IsOptional()
  date: string

  @IsOptional()
  @IsNumber()
  downloads: number

  @IsOptional()
  @IsNumber()
  rating: number

  @IsString()
  @IsOptional()
  category: string

  @IsString()
  @IsOptional()
  platform: string

  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true' || value === true)
  featured: boolean

  @IsString()
  @IsOptional()
  requirements: string

  @IsString()
  @IsOptional()
  developer: string

  @IsString()
  @IsOptional()
  link: string

  @IsString()
  @IsOptional()
  license: string
}
