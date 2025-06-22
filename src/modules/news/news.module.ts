import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { NewsService } from "./news.service"
import { NewsController } from "./news.controller"
import { News } from "src/database/entities/news/news.entity"
import { CategoryNews } from "src/database/entities/news/category-news.entity"
import { CategoryActivity } from "src/database/entities/news/category-activity.entity"
import { Region } from "src/database/entities/news/region.entity"

@Module({
  imports: [TypeOrmModule.forFeature([News, CategoryNews, CategoryActivity, Region])],
  controllers: [NewsController],
  providers: [NewsService],
})
export class NewsModule {}
