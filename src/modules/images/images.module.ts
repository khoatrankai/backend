import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { ImagesService } from "./images.service"
import { ImagesController } from "./images.controller"
import { CategoryImage } from "src/database/entities/images/category-image.entity"
import { Image } from "src/database/entities/images/image.entity"

@Module({
  imports: [TypeOrmModule.forFeature([Image, CategoryImage])],
  controllers: [ImagesController],
  providers: [ImagesService],
})
export class ImagesModule {}
