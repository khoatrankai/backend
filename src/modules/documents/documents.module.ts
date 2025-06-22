import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { DocumentsService } from "./documents.service"
import { DocumentsController } from "./documents.controller"
import { CategoryDocument } from "src/database/entities/documents/category-document.entity"
import { Document } from "src/database/entities/documents/document.entity"

@Module({
  imports: [TypeOrmModule.forFeature([Document, CategoryDocument])],
  controllers: [DocumentsController],
  providers: [DocumentsService],
})
export class DocumentsModule {}
