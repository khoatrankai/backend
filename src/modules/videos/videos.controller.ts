import { Controller, Get, Post, Patch, Param, Delete, Query, UploadedFile, UseInterceptors } from "@nestjs/common"
import type { UpdateVideoDto } from "src/dto/update-video.dto"
import { Body } from "@nestjs/common"
import { VideosService } from "./videos.service"
import { CreateCategoryVideoDto } from "src/dto/create-category-videos.dto"
import { CreateVideoDto } from "src/dto/create-video.dto"
import { FileInterceptor } from "@nestjs/platform-express"
import { storageVideosConfig } from "src/lib/multer-upload"

@Controller("videos")
export class VideosController {
  constructor(private readonly videosService: VideosService) {}

  @Post()
  @UseInterceptors(
      FileInterceptor('coverVideo', {
        storage: storageVideosConfig,
      }),
    )
  create(@UploadedFile() file: Express.Multer.File,@Body() createVideoDto: CreateVideoDto) {
    if(file){
      createVideoDto.link = `/public/videos?id=${file.filename}`;
    }
    return this.videosService.create(createVideoDto)
  }

  @Get()
  findAll(@Query("category") category?: string) {
    if (category) {
      return this.videosService.findByCategory(category)
    }
    return this.videosService.findAll()
  }

  @Get("categories")
  findAllCategories() {
    return this.videosService.findAllCategories()
  }

   @Post("categories")
    createCategory(@Body() createCategoryDto: CreateCategoryVideoDto) {
      return this.videosService.createCategory(createCategoryDto)
    }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.videosService.findOne(id)
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateVideoDto: UpdateVideoDto) {
    return this.videosService.update(id, updateVideoDto)
  }

  @Patch(":id/views")
  incrementViews(@Param("id") id: string) {
    return this.videosService.incrementViews(id)
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.videosService.remove(id)
  }
}
