import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { ArticlesService } from "./articles.service"
import { ArticlesController } from "./articles.controller"
import { CategoryArticle } from "src/database/entities/articles/category-article.entity"
import { Article } from "src/database/entities/articles/article.entity"

@Module({
  imports: [TypeOrmModule.forFeature([Article, CategoryArticle])],
  controllers: [ArticlesController],
  providers: [ArticlesService],
})
export class ArticlesModule {}
