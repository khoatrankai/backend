import { IsString, IsOptional } from "class-validator"

export class CreateHistoriesLeaderDto {
  @IsString()
  @IsOptional()
  period?: string

  @IsString()
  @IsOptional()
  name?: string

  @IsString()
  @IsOptional()
  position?: string

  @IsOptional()
  @IsString()
  user?: string
}
