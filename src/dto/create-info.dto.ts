import { IsOptional, IsString } from "class-validator"

export class CreateInfoDto {
  @IsString()
    @IsOptional()
  icon?: string

  @IsString()
  @IsOptional()
  label?: string

  @IsString()
  @IsOptional()
  value?: string

  @IsString()
  @IsOptional()
  color?: string
}
