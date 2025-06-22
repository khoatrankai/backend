import { Injectable, NotFoundException } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { In, type Repository } from "typeorm"
import type { CreateDocumentDto } from "src/dto/create-document.dto"
import type { UpdateDocumentDto } from "src/dto/update-document.dto"
import { CategoryDocument } from "src/database/entities/documents/category-document.entity"
import { Document } from "src/database/entities/documents/document.entity"

@Injectable()
export class DocumentsService {
  constructor(
    @InjectRepository(Document)
    private readonly documentsRepository: Repository<Document>,
    @InjectRepository(CategoryDocument)
    private readonly categoryDocumentRepository: Repository<CategoryDocument>,
  ) {}

  async create(createDocumentDto: CreateDocumentDto): Promise<Document> {
    const category = await this.categoryDocumentRepository.findOne({where:{id:createDocumentDto.category}})
    const document = this.documentsRepository.create({...createDocumentDto,category})
    return this.documentsRepository.save(document)
  }

  findAll(): Promise<Document[]> {
    return this.documentsRepository.find({
      relations: ["category"],
      order: { date: "DESC" },
    })
  }

  async findOne(id: string): Promise<Document> {
    const document = await this.documentsRepository.findOne({
      where: { id },
      relations: ["category"],
    })

    if (!document) {
      throw new NotFoundException(`Document with ID ${id} not found`)
    }

    return document
  }

  async update(id: string, updateDocumentDto: UpdateDocumentDto): Promise<Document> {
    const document = await this.findOne(id)
    Object.assign(document, updateDocumentDto)
    return this.documentsRepository.save(document)
  }

  async remove(id: string): Promise<void> {
    const document = await this.findOne(id)
    await this.documentsRepository.remove(document)
  }

  async findByCategory(categoryId: string): Promise<Document[]> {
    return this.documentsRepository.find({
      where: { category:In([categoryId]) },
      relations: ["category"],
      order: { date: "DESC" },
    })
  }

  async findByType(type: string): Promise<Document[]> {
    return this.documentsRepository.find({
      where: { type },
      relations: ["category"],
      order: { date: "DESC" },
    })
  }

  async incrementDownloads(id: string): Promise<Document> {
    const document = await this.findOne(id)
    document.downloads += 1
    return this.documentsRepository.save(document)
  }

  findAllCategories(): Promise<CategoryDocument[]> {
    return this.categoryDocumentRepository.find({
      relations: ["documents"],
    })
  }
}
