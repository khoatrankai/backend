import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Put, UseInterceptors, UploadedFiles } from "@nestjs/common"
// import type { CreateNewsDto } from "src/dto/create-news.dto"
import { NewsService } from "./news.service"
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { CreateRegionDto } from "src/dto/create-region.dto"
import { UpdateRegionDto } from "src/dto/update-region.dto"
import { CreateCategoryActivityDto } from "src/dto/create-category-activity.dto"
import { UpdateCategoryActivityDto } from "src/dto/update-category-activity.dto"
import { CreateNewsDto } from "src/dto/create-news.dto"
// import { storageConfig } from "src/lib/multer-upload";
import { UpdateNewsDto } from "src/dto/update-news.dto";
import { customStorageConfig } from "src/lib/multer-upload";

@Controller("news")
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Post('region')
  async createRegion(@Body() createDto: CreateRegionDto) {
    return await this.newsService.createRegion(createDto);
  }

  @Get('region')
  async findAllRegion() {
    return await this.newsService.findAllRegion();
  }


   @Put('region/:id')
  async updateRegion(@Param('id') id:string,@Body() updateDto: UpdateRegionDto) {
    return await this.newsService.updateRegion(id,updateDto);
  }

  @Post('category-activity')
  async createCategoryActivity(@Body() createDto: CreateCategoryActivityDto){
    return await this.newsService.createCategoryActivity(createDto);
  }

  @Get('category-activity')
  async findAllCategoryActivity(){
    return await this.newsService.findAllCategoryActivity();
  }


   @Put('category-activity/:id')
  async updateCategoryActivity(@Param('id') id:string,@Body() updateDto: UpdateCategoryActivityDto) {
    return await this.newsService.updateCategoryActivity(id,updateDto);
  }


  @Post()
  // @UseInterceptors(
  //   FileInterceptor('coverImage', {
  //     storage: storageConfig,
  //   }),
  // )
  @UseInterceptors(
    AnyFilesInterceptor({
      storage: customStorageConfig,
      // limits: { fileSize: 1024 * 1024 * 100 }, // Optional
    }),
  )
  create(@UploadedFiles() files: Express.Multer.File[],@Body() createNewsDto: CreateNewsDto) {
    const image = files.find(f => f.fieldname === 'coverImage');
    if(image){
      createNewsDto.image = `/public/images?id=${image.filename}`;
    }
    // if (file) {
    //     createNewsDto.image = `/public/images?id=${file.filename}`;
    //   }
    return this.newsService.create(createNewsDto)
  }


  
  @Get()
  findAll(@Query("category") category?: string, @Query("type") type?: string, @Query("page") page?: string, @Query("limit") limit?: string) {
    if (category) {
      return this.newsService.findByCategory(category,page,limit)
    }
    if (type) {
      return this.newsService.findByType(type,page,limit)
    }
    return this.newsService.findAll(page,limit)
  }

  @Get("categories")
  findAllCategories() {
    return this.newsService.findAllCategories()
  }

  @Post("categories")
  async createCategory(@Body() createCategoryDto: CreateCategoryActivityDto) {
    return this.newsService.createCategory(createCategoryDto)
  }

  @Get("categories/:id")
  findOneCategory(@Param("id") id: string) {
    return this.newsService.findOneCategory(id)
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.newsService.findOne(id)
  }

  @Patch(":id")
  // @UseInterceptors(
  //   FileInterceptor('coverImage', {
  //     storage: storageConfig,
  //   }),
  // )
  @UseInterceptors(
    AnyFilesInterceptor({
      storage: customStorageConfig,
      // limits: { fileSize: 1024 * 1024 * 100 }, // Optional
    }),
  )
  update(@UploadedFiles() files: Express.Multer.File[],@Param("id") id: string, @Body() updateNewsDto: UpdateNewsDto) {
     const image = files.find(f => f.fieldname === 'coverImage');
    if(image){
      updateNewsDto.image = `/public/images?id=${image.filename}`;
    }
    return this.newsService.update(id, updateNewsDto)
  }

  @Patch(":id/views")
  incrementViews(@Param("id") id: string) {
    return this.newsService.incrementViews(id)
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.newsService.remove(id)
  }
}
