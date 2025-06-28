import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseInterceptors, Header, Res, UploadedFiles } from "@nestjs/common"
// import type { CreateImageDto } from "src/dto/create-image.dto"
import type { UpdateImageDto } from "src/dto/update-image.dto"
// import type { CreateCategoryImageDto } from "src/dto/create-category-image.dto"
import { ImagesService } from "./images.service"
import { AnyFilesInterceptor } from "@nestjs/platform-express"
// import { storageConfig } from "src/lib/multer-upload"
import { join } from "node:path"
import { Response } from "express"
import { customStorageConfig } from "src/lib/multer-upload"

@Controller("images")
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @Post()
  @UseInterceptors(
  AnyFilesInterceptor({
    storage: customStorageConfig,
    // limits: { fileSize: 1024 * 1024 * 100 }, // Optional
  }),
)
  create(@UploadedFiles() files: Express.Multer.File[],@Body() createImageDto: any) {
    const thumbnail = files.find(f => f.fieldname === 'coverThumbnail');
    if(thumbnail){
      createImageDto.thumbnail = `/public/images?id=${thumbnail.filename}`;
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
  //  @UseInterceptors(
  //     FileInterceptor('coverThumbnail', {
  //       storage: storageConfig,
  //     }),
  //   )
  @UseInterceptors(
  AnyFilesInterceptor({
    storage: customStorageConfig,
    // limits: { fileSize: 1024 * 1024 * 100 }, // Optional
  }),
)
  update(@UploadedFiles() files: Express.Multer.File[],@Param("id") id: string, @Body() updateImageDto: UpdateImageDto) {
    const thumbnail = files.find(f => f.fieldname === 'coverThumbnail');
    if(thumbnail){
      updateImageDto.thumbnail = `/public/images?id=${thumbnail.filename}`;
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

  @Get('download/:filename')
  @Header('Content-Type', 'image/png')
  downloadImage(@Param('filename') filename: string, @Res() res: Response) {
  const pathToFile = join(__dirname, '..', '../../public/images', filename);
  res.download(pathToFile); // hoặc res.sendFile(pathToFile);
}

}
