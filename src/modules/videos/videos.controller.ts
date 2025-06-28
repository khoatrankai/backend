import { Controller, Get, Post, Patch, Param, Delete, Query,  UseInterceptors, UploadedFiles } from "@nestjs/common"
import type { UpdateVideoDto } from "src/dto/update-video.dto"
import { Body } from "@nestjs/common"
import { VideosService } from "./videos.service"
import { CreateCategoryVideoDto } from "src/dto/create-category-videos.dto"
import { CreateVideoDto } from "src/dto/create-video.dto"
import { AnyFilesInterceptor } from "@nestjs/platform-express"
import { customStorageConfig } from "src/lib/multer-upload"

@Controller("videos")
export class VideosController {
  constructor(private readonly videosService: VideosService) {}

  @Post()
  // @UseInterceptors(
  //     FileInterceptor('coverVideo', {
  //       storage: storageVideosConfig,
  //     }),
  //   )
  // @UseInterceptors(
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
  create(@UploadedFiles() files: Express.Multer.File[],@Body() createVideoDto: CreateVideoDto) {
    const video = files.find(f => f.fieldname === 'coverVideo');
    const thumbnail = files.find(f => f.fieldname === 'coverThumbnail');
    if(video){
      createVideoDto.link = `/public/videos?id=${video.filename}`;
    }
    if(thumbnail){
      createVideoDto.thumbnail = `/public/images?id=${thumbnail.filename}`;
    }
    // if(file){
    //   createVideoDto.link = `/public/videos?id=${file.filename}`;
    // }
    // console.log(files)
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
  @UseInterceptors(
              AnyFilesInterceptor({
                storage: customStorageConfig,
                // limits: { fileSize: 1024 * 1024 * 100 }, // Optional
              }),
            )
  update(@UploadedFiles() files: Express.Multer.File[],@Param("id") id: string, @Body() updateVideoDto: UpdateVideoDto) {
     const video = files.find(f => f.fieldname === 'coverVideo');
    const thumbnail = files.find(f => f.fieldname === 'coverThumbnail');
    if(video){
      updateVideoDto.link = `/public/videos?id=${video.filename}`;
    }
    if(thumbnail){
      updateVideoDto.thumbnail = `/public/images?id=${thumbnail.filename}`;
    }
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
