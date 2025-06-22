import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { HistoriesService } from "./histories.service"
import { HistoriesController } from "./histories.controller"
import { HistoriesLeader } from "src/database/entities/histories/histories-leader.entity"
import { History } from "src/database/entities/histories/history.entity"
import { User } from "src/database/entities/users/user.entity"

@Module({
  imports: [TypeOrmModule.forFeature([History, HistoriesLeader,User])],
  controllers: [HistoriesController],
  providers: [HistoriesService],
})
export class HistoriesModule {}
