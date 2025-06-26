import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from "@nestjs/common"
import { CreateArticleDto } from "src/dto/create-article.dto"
import { UpdateArticleDto } from "src/dto/update-article.dto"
import { ArticlesService } from "./articles.service"
import { CreateCategoryArticleDto } from "src/dto/create-category-article.dto"

@Controller("articles")
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Post()
  create(@Body() createArticleDto: CreateArticleDto) {
    return this.articlesService.create(createArticleDto)
  }

  @Get()
  findAll(@Query("category") category?: string, @Query("type") type?: string, @Query("featured") featured?: string) {
    if (category) {
      return this.articlesService.findByCategory(category)
    }
    if (type) {
      return this.articlesService.findByType(type)
    }
    if (featured === "true") {
      return this.articlesService.findFeatured()
    }
    return this.articlesService.findAll()
  }

  @Get("categories")
  findAllCategories() {
    return this.articlesService.findAllCategories()
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.articlesService.findOne(id)
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateArticleDto: UpdateArticleDto) {
    return this.articlesService.update(id, updateArticleDto)
  }

  @Patch(":id/views")
  incrementViews(@Param("id") id: string) {
    return this.articlesService.incrementViews(id)
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.articlesService.remove(id)
  }

   @Post("categories")
    async createCategory(@Body() createCategoryDto: CreateCategoryArticleDto) {
      return this.articlesService.createCategory(createCategoryDto)
    }
}
