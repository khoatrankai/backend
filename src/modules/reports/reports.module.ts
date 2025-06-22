import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { ReportsService } from "./reports.service"
import { ReportsController } from "./reports.controller"
import { CategoryReport } from "src/database/entities/reports/category-report.entity"
import { Report } from "src/database/entities/reports/report.entity"

@Module({
  imports: [TypeOrmModule.forFeature([Report, CategoryReport])],
  controllers: [ReportsController],
  providers: [ReportsService],
})
export class ReportsModule {}
