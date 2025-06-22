import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { StatisticalService } from "./statistical.service"
import { StatisticalController } from "./statistical.controller"
import { Statistical } from "src/database/entities/statistical/statistical.entity"

@Module({
  imports: [TypeOrmModule.forFeature([Statistical])],
  controllers: [StatisticalController],
  providers: [StatisticalService],
})
export class StatisticalModule {}
