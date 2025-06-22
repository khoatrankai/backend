import { IsOptional, IsString } from "class-validator"

export class CreateCategoryTrackDto {
  @IsString()
  @IsOptional()
  name?: string

  @IsString()
  @IsOptional()
  nametag?: string
}
