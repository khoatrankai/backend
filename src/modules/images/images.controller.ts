import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseInterceptors, UploadedFile } from "@nestjs/common"
// import type { CreateImageDto } from "src/dto/create-image.dto"
import type { UpdateImageDto } from "src/dto/update-image.dto"
// import type { CreateCategoryImageDto } from "src/dto/create-category-image.dto"
import { ImagesService } from "./images.service"
import { FileInterceptor } from "@nestjs/platform-express"
import { storageConfig } from "src/lib/multer-upload"

@Controller("images")
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @Post()
  @UseInterceptors(
      FileInterceptor('coverThumbnail', {
        storage: storageConfig,
      }),
    )
  create(@UploadedFile() file: Express.Multer.File,@Body() createImageDto: any) {
    if(file){
      createImageDto.thumbnail = `/public/images?id=${file.filename}`;
    }
    return this.imagesService.create(createImageDto)
  }

  @Get()
  findAll(@Query("category") category?: string) {
    if (category) {
      return this.imagesService.findByCategory(category)
    }
    return this.imagesService.findAll()
  }

  @Get("categories")
  findAllCategories() {
    return this.imagesService.findAllCategories()
  }

  @Post("categories")
  createCategory(@Body() createCategoryDto: any) {
    return this.imagesService.createCategory(createCategoryDto)
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.imagesService.findOne(id)
  }

  @Patch(":id")
   @UseInterceptors(
      FileInterceptor('coverThumbnail', {
        storage: storageConfig,
      }),
    )
  update(@UploadedFile() file: Express.Multer.File,@Param("id") id: string, @Body() updateImageDto: UpdateImageDto) {
    if(file){
      updateImageDto.thumbnail = `/public/images?id=${file.filename}`;
    }
    return this.imagesService.update(id, updateImageDto)
  }

  @Patch(":id/views")
  incrementViews(@Param("id") id: string) {
    return this.imagesService.incrementViews(id)
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.imagesService.remove(id)
  }
}
