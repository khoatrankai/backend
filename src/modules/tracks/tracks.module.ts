import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { TracksService } from "./tracks.service"
import { TracksController } from "./tracks.controller"
import { CategoryTrack } from "src/database/entities/tracks/category-track.entity"
import { Track } from "src/database/entities/tracks/track.entity"

@Module({
  imports: [TypeOrmModule.forFeature([Track, CategoryTrack])],
  controllers: [TracksController],
  providers: [TracksService],
})
export class TracksModule {}
