import { IsOptional, IsString } from "class-validator"

export class CreateCategoryImageDto {
  @IsString()
  @IsOptional()
  name?: string

  @IsString()
  @IsOptional()
  nametag?: string
}
