import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from "@nestjs/common"
import type { CreateSoftwareDto } from "src/dto/create-software.dto"
import type { UpdateSoftwareDto } from "src/dto/update-software.dto"
import { SoftwareService } from "./software.service";

@Controller("software")
export class SoftwareController {
  constructor(private readonly softwareService: SoftwareService) {}

  @Post()
  create(@Body() createSoftwareDto: CreateSoftwareDto) {
    return this.softwareService.create(createSoftwareDto);
  }

  @Get()
  findAll(
    @Query("category") category?: string,
    @Query("platform") platform?: string,
    @Query("featured") featured?: string,
  ) {
    if (category) {
      return this.softwareService.findByCategory(category)
    }
    if (platform) {
      return this.softwareService.findByPlatform(platform)
    }
    if (featured === "true") {
      return this.softwareService.findFeatured()
    }
    return this.softwareService.findAll()
  }

  @Get("categories")
  findAllCategories() {
    return this.softwareService.findAllCategories()
  }

  @Get("platforms")
  findAllPlatforms() {
    return this.softwareService.findAllPlatforms()
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.softwareService.findOne(id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateSoftwareDto: UpdateSoftwareDto) {
    return this.softwareService.update(id, updateSoftwareDto)
  }

  @Patch(":id/downloads")
  incrementDownloads(@Param("id") id: string) {
    return this.softwareService.incrementDownloads(id);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.softwareService.remove(id);
  }
}
