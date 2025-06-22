import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { VideosService } from "./videos.service"
import { VideosController } from "./videos.controller"
import { Video } from "src/database/entities/videos/video.entity"
import { CategoryVideo } from "src/database/entities/videos/category-video.entity"

@Module({
  imports: [TypeOrmModule.forFeature([Video, CategoryVideo])],
  controllers: [VideosController],
  providers: [VideosService],
})
export class VideosModule {}
