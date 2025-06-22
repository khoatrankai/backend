import { IsString, IsEmail, IsOptional } from "class-validator"

export class CreateReportDto {
  @IsString()
  @IsOptional()
  name?: string

  @IsEmail()
    @IsOptional()
  email?: string

  @IsString()
    @IsOptional()
  phone?: string

  @IsString()
  @IsOptional()
  subject?: string

  @IsString()
  @IsOptional()
  message?: string

  @IsString()
  @IsOptional()
  category?: string
}
