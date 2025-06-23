import {
  Injectable,
  NotFoundException,
  HttpStatus,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { In, Repository } from "typeorm";
import { CreateSoftwareDto } from "src/dto/create-software.dto";
import { UpdateSoftwareDto } from "src/dto/update-software.dto";
import { Software } from "src/database/entities/softwares/software.entity";
import { CategoryPlatform } from "src/database/entities/softwares/category-platform.entity";
import { Platform } from "src/database/entities/softwares/platform.entity";

@Injectable()
export class SoftwareService {
  constructor(
    @InjectRepository(Software)
    private softwareRepository: Repository<Software>,
    @InjectRepository(CategoryPlatform)
    private categoryPlatformRepository: Repository<CategoryPlatform>,
    @InjectRepository(Platform)
    private platformRepository: Repository<Platform>
  ) {}

  async create(createSoftwareDto: CreateSoftwareDto) {
    const category = await this.categoryPlatformRepository.findOne({
      where: { id: createSoftwareDto.category },
    });
    const platform = await this.platformRepository.findOne({
      where: { id: createSoftwareDto.platform },
    });

    const software = this.softwareRepository.create({
      ...createSoftwareDto,
      category,
      platform,
    });

    const result = await this.softwareRepository.save(software);
    return {
      statusCode: HttpStatus.OK,
      message: "Software created successfully",
      data: result,
    };
  }

  async findAll() {
    const result = await this.softwareRepository.find({
      relations: ["category", "platform"],
      order: { downloads: "DESC" },
    });

    return {
      statusCode: HttpStatus.OK,
      message: "Fetched all softwares",
      data: result,
    };
  }

  async findOne(id: string) {
    const software = await this.softwareRepository.findOne({
      where: { id },
      relations: ["category", "platform"],
    });
    if (!software) {
      throw new NotFoundException(`Software with ID ${id} not found`);
    }
    return {
      statusCode: HttpStatus.OK,
      message: "Fetched software",
      data: software,
    };
  }

  async update(id: string, updateSoftwareDto: UpdateSoftwareDto) {
    const software = await this.softwareRepository.findOne({ where: { id } });
    if (!software) {
      throw new NotFoundException(`Software with ID ${id} not found`);
    }
    Object.assign(software, updateSoftwareDto);
    const result = await this.softwareRepository.save(software);
    return {
      statusCode: HttpStatus.OK,
      message: "Software updated successfully",
      data: result,
    };
  }

  async remove(id: string): Promise<void> {
    const software = await this.softwareRepository.findOne({ where: { id } });
    if (!software) {
      throw new NotFoundException(`Software with ID ${id} not found`);
    }
    await this.softwareRepository.remove(software);
  }

  async findByCategory(categoryId: string) {
    const result = await this.softwareRepository.find({
      where: { category: In([categoryId]) },
      relations: ["category", "platform"],
      order: { downloads: "DESC" },
    });
    return {
      statusCode: HttpStatus.OK,
      message: "Fetched software by category",
      data: result,
    };
  }

  async findByPlatform(platformId: string) {
    const result = await this.softwareRepository.find({
      where: { platform: In([platformId]) },
      relations: ["category", "platform"],
      order: { downloads: "DESC" },
    });
    return {
      statusCode: HttpStatus.OK,
      message: "Fetched software by platform",
      data: result,
    };
  }

  async findFeatured() {
    const result = await this.softwareRepository.find({
      where: { featured: true },
      relations: ["category", "platform"],
      order: { rating: "DESC" },
    });
    return {
      statusCode: HttpStatus.OK,
      message: "Fetched featured software",
      data: result,
    };
  }

  async incrementDownloads(id: string) {
    const software = await this.softwareRepository.findOne({ where: { id } });
    if (!software) {
      throw new NotFoundException(`Software with ID ${id} not found`);
    }
    software.downloads += 1;
    const result = await this.softwareRepository.save(software);
    return {
      statusCode: HttpStatus.OK,
      message: "Download count incremented",
      data: result,
    };
  }

  async findAllCategories() {
    const result = await this.categoryPlatformRepository.find({
      relations: ["software"],
    });
    return {
      statusCode: HttpStatus.OK,
      message: "Fetched all categories",
      data: result,
    };
  }

  async findAllPlatforms() {
    const result = await this.platformRepository.find({
      relations: ["software"],
    });
    return {
      statusCode: HttpStatus.OK,
      message: "Fetched all platforms",
      data: result,
    };
  }

  async createPlatform(data: any) {
    const platform = this.platformRepository.create(data);
    const result = await this.platformRepository.save(platform);
    return {
      statusCode: HttpStatus.OK,
      message: "Platform created successfully",
      data: result,
    };
  }

  async updatePlatform(id: string, data: any) {
    const platform = await this.platformRepository.findOne({ where: { id } });
    if (!platform) {
      throw new NotFoundException(`Platform with ID ${id} not found`);
    }
    await this.platformRepository.update(id, data);
    const updated = await this.platformRepository.findOne({ where: { id } });
    return {
      statusCode: HttpStatus.OK,
      message: "Platform updated successfully",
      data: updated,
    };
  }

  async createCategory(data: any) {
    const category = this.categoryPlatformRepository.create(data);
    const result = await this.categoryPlatformRepository.save(category);
    return {
      statusCode: HttpStatus.OK,
      message: "Category created successfully",
      data: result,
    };
  }

  async updateCategory(id: string, data: any) {
    const category = await this.categoryPlatformRepository.findOne({
      where: { id },
    });
    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }
    await this.categoryPlatformRepository.update(id, data);
    const updated = await this.categoryPlatformRepository.findOne({
      where: { id },
    });
    return {
      statusCode: HttpStatus.OK,
      message: "Category updated successfully",
      data: updated,
    };
  }
}
