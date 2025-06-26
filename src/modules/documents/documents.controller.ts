import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseInterceptors, UploadedFile } from "@nestjs/common"
import { CreateDocumentDto } from "src/dto/create-document.dto";
import { UpdateDocumentDto } from "src/dto/update-document.dto";
import { DocumentsService } from "./documents.service";
import { CreateCategoryDocumentDto } from "src/dto/create-category-document.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { storageDocumentsConfig } from "src/lib/multer-upload";

@Controller("documents")
export class DocumentsController {
  constructor(private readonly documentsService: DocumentsService) {}

  @Post()
  @UseInterceptors(
      FileInterceptor('coverDocument', {
        storage: storageDocumentsConfig,
      }),
    )
  create(@UploadedFile() file: Express.Multer.File,@Body() createDocumentDto: CreateDocumentDto) {
    if (file) {
        createDocumentDto.link = `/public/documents?id=${file.filename}`;
      }
    return this.documentsService.create(createDocumentDto);
  }

  @Get()
  findAll(@Query("category") category?: string, @Query("type") type?: string) {
    if (category) {
      return this.documentsService.findByCategory(category)
    }
    if (type) {
      return this.documentsService.findByType(type)
    }
    return this.documentsService.findAll()
  }

  @Get("categories")
  findAllCategories() {
    return this.documentsService.findAllCategories()
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.documentsService.findOne(id);
  }

  @Patch(":id")
  @UseInterceptors(
      FileInterceptor('coverDocument', {
        storage: storageDocumentsConfig,
      }),
    )
  update(@UploadedFile() file: Express.Multer.File,@Param("id") id: string, @Body() updateDocumentDto: UpdateDocumentDto) {
    if (file) {
        updateDocumentDto.link = `/public/documents?id=${file.filename}`;
      }
    return this.documentsService.update(id, updateDocumentDto)
  }

  @Patch(":id/downloads")
  incrementDownloads(@Param("id") id: string) {
    return this.documentsService.incrementDownloads(id);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.documentsService.remove(id);
  }

  @Post("categories")
      async createCategory(@Body() createCategoryDto: CreateCategoryDocumentDto) {
        return this.documentsService.createCategory(createCategoryDto)
      }
}
