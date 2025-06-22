import { Controller, Get, Post, Patch, Param, Delete, Query } from "@nestjs/common"
import type { CreateVideoDto } from "src/dto/create-video.dto"
import type { UpdateVideoDto } from "src/dto/update-video.dto"
import { Body } from "@nestjs/common"
import { VideosService } from "./videos.service"

@Controller("videos")
export class VideosController {
  constructor(private readonly videosService: VideosService) {}

  @Post()
  create(@Body() createVideoDto: CreateVideoDto) {
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
