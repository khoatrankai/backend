import { IsOptional, IsString } from "class-validator"

export class CreateStatisticalDto {
  @IsString()
    @IsOptional()
  label?: string

  @IsString()
    @IsOptional()
  value?: string

  @IsString()
  @IsOptional()
  icon?: string
}
