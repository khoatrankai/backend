import { IsOptional, IsString } from "class-validator"

export class CreateCategoryReportDto {
  @IsString()
  @IsOptional()
  name?: string

  @IsString()
  @IsOptional()
  nametag?: string
}
