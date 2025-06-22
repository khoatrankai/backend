import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { SlidesService } from "./slides.service"
import { SlidesController } from "./slides.controller"
import { Slide } from "src/database/entities/slides/slide.entity"
import { News } from "src/database/entities/news/news.entity"

@Module({
  imports: [TypeOrmModule.forFeature([Slide,News])],
  controllers: [SlidesController],
  providers: [SlidesService],
})
export class SlidesModule {}
