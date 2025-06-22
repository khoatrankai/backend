import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from "@nestjs/common"
import type { CreateTrackDto } from "src/dto/create-track.dto"
import type { UpdateTrackDto } from "src/dto/update-track.dto"
import type { CreateCategoryTrackDto } from "src/dto/create-category-track.dto"
import { TracksService } from "./tracks.service"

@Controller("tracks")
export class TracksController {
  constructor(private readonly tracksService: TracksService) {}

  @Post()
  create(@Body() createTrackDto: CreateTrackDto) {
    return this.tracksService.create(createTrackDto)
  }

  @Get()
  findAll(@Query("category") category?: string, @Query("featured") featured?: string) {
    if (category) {
      return this.tracksService.findByCategory(category)
    }
    if (featured === "true") {
      return this.tracksService.findFeatured()
    }
    return this.tracksService.findAll()
  }

  @Get("categories")
  findAllCategories() {
    return this.tracksService.findAllCategories()
  }

  @Post("categories")
  createCategory(@Body() createCategoryDto: CreateCategoryTrackDto) {
    return this.tracksService.createCategory(createCategoryDto)
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.tracksService.findOne(id)
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateTrackDto: UpdateTrackDto) {
    return this.tracksService.update(id, updateTrackDto)
  }

  @Patch(":id/plays")
  incrementPlays(@Param("id") id: string) {
    return this.tracksService.incrementPlays(id)
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.tracksService.remove(id)
  }
}
