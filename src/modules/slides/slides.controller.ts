import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseInterceptors, UploadedFile } from "@nestjs/common"
// import type { CreateSlideDto } from "src/dto/create-slide.dto"
// import type { UpdateSlideDto } from "src/dto/update-slide.dto"
import { SlidesService } from "./slides.service";
import { FileInterceptor } from "@nestjs/platform-express";
import { storageConfig } from "src/lib/multer-upload";

@Controller("slides")
export class SlidesController {
  constructor(private readonly slidesService: SlidesService) {}

  @Post()
  @UseInterceptors(
      FileInterceptor('coverImage', {
        storage: storageConfig,
      }),
    )
  create(@UploadedFile() file: Express.Multer.File,@Body() createSlideDto: any) {
    if (file) {
        createSlideDto.image = `/public/images/${file.filename}`;
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
   @UseInterceptors(
      FileInterceptor('coverImage', {
        storage: storageConfig,
      }),
    )
  update(@UploadedFile() file: Express.Multer.File,@Param("id") id: string, @Body() updateSlideDto: any) {
    if (file) {
        updateSlideDto.image = `/public/images/${file.filename}`;
      }
    return this.slidesService.update(id, updateSlideDto)
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.slidesService.remove(id);
  }
}
