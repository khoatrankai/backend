import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile } from "@nestjs/common"
import { UsersService } from "./users.service";
import { FileInterceptor } from "@nestjs/platform-express";
import { storageConfig } from "src/lib/multer-upload";
import { CreateUserDto } from "src/dto/create-user.dto";
import { UpdateUserDto } from "src/dto/update-user.dto";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @UseInterceptors(
  FileInterceptor('coverAvatar', {
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
  @UseInterceptors(
  FileInterceptor('coverAvatar', {
        storage: storageConfig,
      }),
    )
  update(@UploadedFile() file: Express.Multer.File,@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
     if (file) {
        updateUserDto.avatar = `/public/images?id=${file.filename}`;
      }
    return this.usersService.update(id, updateUserDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
