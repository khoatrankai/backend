import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { InfosService } from "./infos.service"
import { InfosController } from "./infos.controller"
import { Info } from "src/database/entities/infos/info.entity"

@Module({
  imports: [TypeOrmModule.forFeature([Info])],
  controllers: [InfosController],
  providers: [InfosService],
})
export class InfosModule {}
