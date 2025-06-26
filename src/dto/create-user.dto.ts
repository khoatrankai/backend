import { Transform } from "class-transformer"
import { IsString, IsEmail, IsEnum, IsOptional, IsArray, IsBoolean } from "class-validator"
import { UserType } from "src/database/entities/users/user.entity"

export class CreateUserDto {
  @IsString()
  @IsOptional()
  name?: string

  @IsString()
  @IsOptional()
  username?: string

  @IsString()
  @IsOptional()
  password?: string

  @IsString()
  @IsOptional()
  position?: string

  @IsOptional()
  @IsString()
  avatar?: string

  @IsString()
  @IsOptional()
  experience?: string

  @IsString()
  @IsOptional()
  education?: string

  @IsArray()
  @IsString({ each: true })
  achievements?: string[]

  @IsString()
  @IsOptional()
  phone?: string

  @IsEmail()
  @IsOptional()
  email?: string

  @IsEnum(UserType)
  @IsOptional()
  type: UserType

  @IsBoolean()
    @IsOptional()
    @Transform(({ value }) => value === 'true' || value === true)
    activity: boolean

  @IsOptional()
  @IsString()
  group?: string
}
