import { Injectable, NotFoundException } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { In, type Repository } from "typeorm"
import type { CreateSoftwareDto } from "src/dto/create-software.dto"
import type { UpdateSoftwareDto } from "src/dto/update-software.dto"
import { Software } from "src/database/entities/softwares/software.entity"
import { CategoryPlatform } from "src/database/entities/softwares/category-platform.entity"
import { Platform } from "src/database/entities/softwares/platform.entity"

@Injectable()
export class SoftwareService {
  constructor(
    @InjectRepository(Software) private softwareRepository: Repository<Software>,
    @InjectRepository(CategoryPlatform) private categoryPlatformRepository: Repository<CategoryPlatform>,
    @InjectRepository(Platform) private platformRepository: Repository<Platform>,
  ) {}

  async create(createSoftwareDto: CreateSoftwareDto): Promise<Software> {
    const category = await this.categoryPlatformRepository.findOne({where:{id:createSoftwareDto.category}})
    const platform = await this.platformRepository.findOne({where:{id:createSoftwareDto.platform}})
    const software = this.softwareRepository.create({...createSoftwareDto,category,platform})
    return this.softwareRepository.save(software)
  }

  findAll(): Promise<Software[]> {
    return this.softwareRepository.find({
      relations: ["category", "platform"],
      order: { downloads: "DESC" },
    })
  }

  async findOne(id: string): Promise<Software> {
    const software = await this.softwareRepository.findOne({
      where: { id },
      relations: ["category", "platform"],
    })

    if (!software) {
      throw new NotFoundException(`Software with ID ${id} not found`)
    }

    return software
  }

  async update(id: string, updateSoftwareDto: UpdateSoftwareDto): Promise<Software> {
    const software = await this.findOne(id)
    Object.assign(software, updateSoftwareDto)
    return this.softwareRepository.save(software)
  }

  async remove(id: string): Promise<void> {
    const software = await this.findOne(id)
    await this.softwareRepository.remove(software)
  }

  async findByCategory(categoryId: string): Promise<Software[]> {
    return this.softwareRepository.find({
      where: { category:In([categoryId]) },
      relations: ["category", "platform"],
      order: { downloads: "DESC" },
    })
  }

  async findByPlatform(platformId: string): Promise<Software[]> {
    return this.softwareRepository.find({
      where: { platform:In([platformId]) },
      relations: ["category", "platform"],
      order: { downloads: "DESC" },
    })
  }

  async findFeatured(): Promise<Software[]> {
    return this.softwareRepository.find({
      where: { featured: true },
      relations: ["category", "platform"],
      order: { rating: "DESC" },
    })
  }

  async incrementDownloads(id: string): Promise<Software> {
    const software = await this.findOne(id)
    software.downloads += 1
    return this.softwareRepository.save(software)
  }

  findAllCategories(): Promise<CategoryPlatform[]> {
    return this.categoryPlatformRepository.find({
      relations: ["software"],
    })
  }

  findAllPlatforms(): Promise<Platform[]> {
    return this.platformRepository.find({
      relations: ["software"],
    })
  }
}
