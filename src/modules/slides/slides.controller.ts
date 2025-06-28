import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseInterceptors, UploadedFiles } from "@nestjs/common"
// import type { CreateSlideDto } from "src/dto/create-slide.dto"
// import type { UpdateSlideDto } from "src/dto/update-slide.dto"
import { SlidesService } from "./slides.service";
import { AnyFilesInterceptor } from "@nestjs/platform-express";
import { customStorageConfig } from "src/lib/multer-upload";
// import { storageConfig } from "src/lib/multer-upload";

@Controller("slides")
export class SlidesController {
  constructor(private readonly slidesService: SlidesService) {}

  @Post()
  // @UseInterceptors(
  //     FileInterceptor('coverImage', {
  //       storage: storageConfig,
  //     }),
  //   )
  @UseInterceptors(
      AnyFilesInterceptor({
        storage: customStorageConfig,
        // limits: { fileSize: 1024 * 1024 * 100 }, // Optional
      }),
    )
  create(@UploadedFiles() files: Express.Multer.File[],@Body() createSlideDto: any) {
   const image = files.find(f => f.fieldname === 'coverImage');
    if(image){
      createSlideDto.image = `/public/images?id=${image.filename}`;
    }
    return this.slidesService.create(createSlideDto);
  }

  @Get()
  findAll(@Query("news") news?: string) {
    if (news) {
      console.log("lay ra 1")
      return this.slidesService.findByNews(news);
    }
    console.log("lay ra")
    return this.slidesService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.slidesService.findOne(id);
  }

  @Patch(":id")
  //  @UseInterceptors(
  //     FileInterceptor('coverImage', {
  //       storage: storageConfig,
  //     }),
  //   )
   @UseInterceptors(
      AnyFilesInterceptor({
        storage: customStorageConfig,
        // limits: { fileSize: 1024 * 1024 * 100 }, // Optional
      }),
    )
  update(@UploadedFiles() files: Express.Multer.File[],@Param("id") id: string, @Body() updateSlideDto: any) {
     const image = files.find(f => f.fieldname === 'coverImage');
    if(image){
      updateSlideDto.image = `/public/images?id=${image.filename}`;
    }
    return this.slidesService.update(id, updateSlideDto)
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.slidesService.remove(id);
  }
}
