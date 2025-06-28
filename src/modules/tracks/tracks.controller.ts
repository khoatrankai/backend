import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseInterceptors, UploadedFiles } from "@nestjs/common"
import { TracksService } from "./tracks.service"
import { CreateTrackDto } from "src/dto/create-track.dto"
import { CreateCategoryTrackDto } from "src/dto/create-category-track.dto"
import { UpdateTrackDto } from "src/dto/update-track.dto"
import { AnyFilesInterceptor } from "@nestjs/platform-express"
import { customStorageConfig } from "src/lib/multer-upload"
// import { storageTracksConfig } from "src/lib/multer-upload"

@Controller("tracks")
export class TracksController {
  constructor(private readonly tracksService: TracksService) {}

  @Post()
  @UseInterceptors(
          AnyFilesInterceptor({
            storage: customStorageConfig,
            // limits: { fileSize: 1024 * 1024 * 100 }, // Optional
          }),
        )
  create(@UploadedFiles() files: Express.Multer.File[],@Body() createTrackDto: CreateTrackDto) {
     const track = files.find(f => f.fieldname === 'coverTrack');
    if(track){
      createTrackDto.link = `/public/tracks?id=${track.filename}`;
    }
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
  @UseInterceptors(
          AnyFilesInterceptor({
            storage: customStorageConfig,
            // limits: { fileSize: 1024 * 1024 * 100 }, // Optional
          }),
        )
  update(@UploadedFiles() files: Express.Multer.File[],@Param("id") id: string, @Body() updateTrackDto: UpdateTrackDto) {
    const track = files.find(f => f.fieldname === 'coverTrack');
    if(track){
      updateTrackDto.link = `/public/tracks?id=${track.filename}`;
    }
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
