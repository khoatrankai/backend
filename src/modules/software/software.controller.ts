import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseInterceptors,
  UploadedFiles,
} from "@nestjs/common"
import { SoftwareService } from "./software.service"
import type { UpdateSoftwareDto } from "src/dto/update-software.dto"
import { UpdatePlatformDto } from "src/dto/update-category-platform.dto"
import { CreatePlatformDto } from "src/dto/create-category-platform.dto"
import { UpdateCategorySoftwareDto } from "src/dto/update-category-software.dto"
import { CreateCategorySoftwareDto } from "src/dto/create-category-software.dto"
import { CreateSoftwareDto } from "src/dto/create-software.dto"
import { AnyFilesInterceptor } from "@nestjs/platform-express"
import { customStorageConfig } from "src/lib/multer-upload"
// import { storageSoftwaresConfig } from "src/lib/multer-upload"

@Controller("software")
export class SoftwareController {
  constructor(private readonly softwareService: SoftwareService) {}

  @Post()
  @UseInterceptors(
        AnyFilesInterceptor({
          storage: customStorageConfig,
          // limits: { fileSize: 1024 * 1024 * 100 }, // Optional
        }),
      )
  async create(@UploadedFiles() files: Express.Multer.File[],@Body() data: CreateSoftwareDto) {
    const software = files.find(f => f.fieldname === 'coverSoftware');
    if(software){
      data.link = `/public/softwares?id=${software.filename}`;
    }
    return await this.softwareService.create(data)
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

  @Post("categories")
  async createCategory(@Body() data: CreateCategorySoftwareDto) {
    // console.log(data)
    return this.softwareService.createCategory(data)
  }

  @Patch("categories/:id")
  updateCategory(@Param("id") id: string, @Body() data: UpdateCategorySoftwareDto) {
    return this.softwareService.updateCategory(id, data)
  }

  @Post("platforms")
  createPlatform(@Body() data: CreatePlatformDto) {
    return this.softwareService.createPlatform(data)
  }

  @Patch("platforms/:id")
  updatePlatform(@Param("id") id: string, @Body() data: UpdatePlatformDto) {
    return this.softwareService.updatePlatform(id, data)
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.softwareService.findOne(id)
  }

  @Patch(":id")
  // @UseInterceptors(
  //   FileInterceptor('coverSoftware', {
  //           storage: storageSoftwaresConfig
  //   }),
  //     )
   @UseInterceptors(
        AnyFilesInterceptor({
          storage: customStorageConfig,
          // limits: { fileSize: 1024 * 1024 * 100 }, // Optional
        }),
      )
  update(@UploadedFiles() files: Express.Multer.File[],@Param("id") id: string, @Body() updateSoftwareDto: UpdateSoftwareDto) {
     const software = files.find(f => f.fieldname === 'coverSoftware');
    if(software){
      updateSoftwareDto.link = `/public/softwares?id=${software.filename}`;
    }
    return this.softwareService.update(id, updateSoftwareDto)
  }

  @Patch(":id/downloads")
  incrementDownloads(@Param("id") id: string) {
    return this.softwareService.incrementDownloads(id)
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.softwareService.remove(id)
  }
}
