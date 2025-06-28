import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFiles } from "@nestjs/common"
import { UsersService } from "./users.service";
import { AnyFilesInterceptor } from "@nestjs/platform-express";
// import { storageConfig } from "src/lib/multer-upload";
import { CreateUserDto } from "src/dto/create-user.dto";
import { UpdateUserDto } from "src/dto/update-user.dto";
import { customStorageConfig } from "src/lib/multer-upload";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  // @UseInterceptors(
  // FileInterceptor('coverAvatar', {
  //       storage: storageConfig,
  //     }),
  //   )
   @UseInterceptors(
            AnyFilesInterceptor({
              storage: customStorageConfig,
              // limits: { fileSize: 1024 * 1024 * 100 }, // Optional
            }),
          )
  create(@UploadedFiles() files: Express.Multer.File[],@Body() createUserDto: CreateUserDto) {
    const avatar = files.find(f => f.fieldname === 'coverAvatar');
    if(avatar){
      createUserDto.avatar = `/public/images?id=${avatar.filename}`;
    }
    // if (file) {
    //     createUserDto.avatar = `/public/images?id=${file.filename}`;
    //   }
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
            AnyFilesInterceptor({
              storage: customStorageConfig,
              // limits: { fileSize: 1024 * 1024 * 100 }, // Optional
            }),
          )
  update(@UploadedFiles() files: Express.Multer.File[],@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
     const avatar = files.find(f => f.fieldname === 'coverAvatar');
    if(avatar){
      updateUserDto.avatar = `/public/images?id=${avatar.filename}`;
    }
    return this.usersService.update(id, updateUserDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
