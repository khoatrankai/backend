import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { SoftwareService } from "./software.service"
import { SoftwareController } from "./software.controller"
import { Software } from "src/database/entities/softwares/software.entity"
import { CategoryPlatform } from "src/database/entities/softwares/category-platform.entity"
import { Platform } from "src/database/entities/softwares/platform.entity"

@Module({
  imports: [TypeOrmModule.forFeature([Software, CategoryPlatform, Platform])],
  controllers: [SoftwareController],
  providers: [SoftwareService],
  exports: [SoftwareService],
})
export class SoftwareModule {}
