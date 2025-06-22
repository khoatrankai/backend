import { IsString, IsBoolean, IsOptional } from "class-validator"

export class CreateHistoryDto {
  @IsString()
  @IsOptional()
  year?: string

  @IsString()
  @IsOptional()
  title?: string

  @IsString()
  @IsOptional()
  description?: string

  @IsOptional()
  @IsBoolean()
  highlight?: boolean
}
