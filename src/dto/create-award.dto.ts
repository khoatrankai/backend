import { IsOptional, IsString } from "class-validator"

export class CreateAwardDto {
  @IsString()
  @IsOptional()
  name?: string

  @IsString()
  @IsOptional()
  year?: string

  @IsString()
  @IsOptional()
  description?: string

  @IsString()
  @IsOptional()
  icon?: string

  @IsString()
  @IsOptional()
  color?: string

  @IsString()
  @IsOptional()
  bgColor?: string

  @IsString()
  @IsOptional()
  level?: string
}
