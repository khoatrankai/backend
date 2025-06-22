import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from "@nestjs/common"
import { CreateDocumentDto } from "src/dto/create-document.dto";
import { UpdateDocumentDto } from "src/dto/update-document.dto";
import { DocumentsService } from "./documents.service";

@Controller("documents")
export class DocumentsController {
  constructor(private readonly documentsService: DocumentsService) {}

  @Post()
  create(@Body() createDocumentDto: CreateDocumentDto) {
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
  update(@Param("id") id: string, @Body() updateDocumentDto: UpdateDocumentDto) {
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
}
