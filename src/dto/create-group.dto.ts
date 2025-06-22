import { IsString, IsEmail, IsOptional } from "class-validator"

export class CreateGroupDto {
  @IsString()
  name?: string

  @IsOptional()
  @IsString()
  head?: string

  @IsString()
  @IsOptional()
  description?: string

  @IsString()
  @IsOptional()
  phone?: string

  @IsEmail()
  @IsOptional()
  email?: string

  @IsString()
  @IsOptional()
  descriptionContact?: string
}
