import { HttpStatus, Injectable, NotFoundException } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { In, Repository } from "typeorm"
import { CreateDocumentDto } from "src/dto/create-document.dto"
import { UpdateDocumentDto } from "src/dto/update-document.dto"
import { CategoryDocument } from "src/database/entities/documents/category-document.entity"
import { Document, DocumentType } from "src/database/entities/documents/document.entity"
import { CreateCategoryDocumentDto } from "src/dto/create-category-document.dto"

@Injectable()
export class DocumentsService {
  constructor(
    @InjectRepository(Document)
    private readonly documentsRepository: Repository<Document>,
    @InjectRepository(CategoryDocument)
    private readonly categoryDocumentRepository: Repository<CategoryDocument>,
  ) {}

  async create(createDocumentDto: CreateDocumentDto) {
    const category = await this.categoryDocumentRepository.findOne({
      where: { id: createDocumentDto.category },
    })
    const document = this.documentsRepository.create({ ...createDocumentDto, category })
    const result = await this.documentsRepository.save(document)
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Document created successfully',
      data: result,
    }
  }

  async findAll() {
    const result = await this.documentsRepository.find({
      relations: ["category"],
      order: { created_at: "DESC" },
    })
    return {
      statusCode: HttpStatus.OK,
      message: 'Documents fetched successfully',
      data: result,
    }
  }

  async findOne(id: string) {
    const document = await this.documentsRepository.findOne({
      where: { id },
      relations: ["category"],
    })

    if (!document) {
      throw new NotFoundException(`Document with ID ${id} not found`)
    }

    return {
      statusCode: HttpStatus.OK,
      message: 'Document fetched successfully',
      data: document,
    }
  }

  async update(id: string, updateDocumentDto: UpdateDocumentDto) {
    const document = await this.findOne(id).then(res => res.data)
    Object.assign(document, updateDocumentDto)
    const result = await this.documentsRepository.save(document)
    return {
      statusCode: HttpStatus.OK,
      message: 'Document updated successfully',
      data: result,
    }
  }

  async remove(id: string) {
    const document = await this.findOne(id).then(res => res.data)
    await this.documentsRepository.remove(document)
    return {
      statusCode: HttpStatus.OK,
      message: 'Document deleted successfully',
      data: null,
    }
  }

  async findByCategory(categoryId: string) {
    const result = await this.documentsRepository.find({
      where: { category: In([categoryId]) },
      relations: ["category"],
      order: { created_at: "DESC" },
    })
    return {
      statusCode: HttpStatus.OK,
      message: 'Documents fetched by category successfully',
      data: result,
    }
  }

  async findByType(type: string) {
    const result = await this.documentsRepository.find({
      where: { type: type as DocumentType },
      relations: ["category"],
      order: { created_at: "DESC" },
    })
    return {
      statusCode: HttpStatus.OK,
      message: 'Documents fetched by type successfully',
      data: result,
    }
  }

  async incrementDownloads(id: string) {
    const document = await this.findOne(id).then(res => res.data)
    document.downloads += 1
    const result = await this.documentsRepository.save(document)
    return {
      statusCode: HttpStatus.OK,
      message: 'Document download count incremented',
      data: result,
    }
  }

  async findAllCategories() {
    const result = await this.categoryDocumentRepository.find({
      relations: ["documents"],
    })
    return {
      statusCode: HttpStatus.OK,
      message: 'Categories fetched successfully',
      data: result,
    }
  }

  async createCategory(createCategoryDto: CreateCategoryDocumentDto) {
    const category = this.categoryDocumentRepository.create(createCategoryDto)
    const result = await this.categoryDocumentRepository.save(category)

    return {
      statusCode: HttpStatus.CREATED,
      message: 'CategoryDocument created successfully',
      data: result,
    }
  }
}
