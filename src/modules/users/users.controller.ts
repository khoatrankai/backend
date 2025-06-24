import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile } from "@nestjs/common"
import type { CreateUserDto } from "src/dto/create-user.dto"
import type { UpdateUserDto } from "src/dto/update-user.dto"
import { UsersService } from "./users.service";
import { FileInterceptor } from "@nestjs/platform-express";
import { storageConfig } from "src/lib/multer-upload";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @UseInterceptors(
  FileInterceptor('coverImage', {
        storage: storageConfig,
      }),
    )
  create(@UploadedFile() file: Express.Multer.File,@Body() createUserDto: CreateUserDto) {
    if (file) {
        createUserDto.avatar = `/public/images?id=${file.filename}`;
      }
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(":id")
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
