import { Injectable, NotFoundException } from "@nestjs/common"
import { In, type Repository } from "typeorm"
import type { CreateReportDto } from "src/dto/create-report.dto"
import type { UpdateReportDto } from "src/dto/update-report.dto"
import type { CreateCategoryReportDto } from "src/dto/create-category-report.dto"
import { CategoryReport } from "src/database/entities/reports/category-report.entity"
import { Report } from "src/database/entities/reports/report.entity"
import { InjectRepository } from "@nestjs/typeorm"

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(Report) private reportsRepository: Repository<Report>,
    @InjectRepository(CategoryReport) private categoryReportRepository: Repository<CategoryReport>,
  ) {}

  async create(createReportDto: CreateReportDto): Promise<Report> {
    const category = await this.categoryReportRepository.findOne({where:{id:createReportDto.category}})
    const report = this.reportsRepository.create({...createReportDto,category})
    return this.reportsRepository.save(report)
  }

  findAll(): Promise<Report[]> {
    return this.reportsRepository.find({
      relations: ["category"],
      order: { name: "ASC" },
    })
  }

  async findOne(id: string): Promise<Report> {
    const report = await this.reportsRepository.findOne({
      where: { id },
      relations: ["category"],
    })

    if (!report) {
      throw new NotFoundException(`Report with ID ${id} not found`)
    }

    return report
  }

  async update(id: string, updateReportDto: UpdateReportDto): Promise<Report> {
    const report = await this.findOne(id)
    Object.assign(report, updateReportDto)
    return this.reportsRepository.save(report)
  }

  async remove(id: string): Promise<void> {
    const report = await this.findOne(id)
    await this.reportsRepository.remove(report)
  }

  async findByCategory(categoryId: string): Promise<Report[]> {
    return this.reportsRepository.find({
      where: { category:In([categoryId]) },
      relations: ["category"],
    })
  }

  // Category methods
  createCategory(createCategoryDto: CreateCategoryReportDto): Promise<CategoryReport> {
    const category = this.categoryReportRepository.create(createCategoryDto)
    return this.categoryReportRepository.save(category)
  }

  findAllCategories(): Promise<CategoryReport[]> {
    return this.categoryReportRepository.find({
      relations: ["reports"],
    })
  }
}
