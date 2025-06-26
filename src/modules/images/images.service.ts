import { Injectable, NotFoundException, HttpStatus } from "@nestjs/common"
import { In, Repository } from "typeorm"
import { InjectRepository } from "@nestjs/typeorm"

import type { CreateImageDto } from "src/dto/create-image.dto"
import type { UpdateImageDto } from "src/dto/update-image.dto"
import type { CreateCategoryImageDto } from "src/dto/create-category-image.dto"
import { CategoryImage } from "src/database/entities/images/category-image.entity"
import { Image } from "src/database/entities/images/image.entity"

@Injectable()
export class ImagesService {
  constructor(
    @InjectRepository(Image)
    private imagesRepository: Repository<Image>,

    @InjectRepository(CategoryImage)
    private categoryImageRepository: Repository<CategoryImage>,
  ) {}

  async create(createImageDto: CreateImageDto) {
    const category = await this.categoryImageRepository.findOne({ where: { id: createImageDto.category } })
    const image = this.imagesRepository.create({ ...createImageDto, category })
    const result = await this.imagesRepository.save(image)

    return {
      statusCode: HttpStatus.CREATED,
      message: "Image created successfully",
      data: result,
    }
  }

  async findAll() {
    const data = await this.imagesRepository.find({
      relations: ["category"],
      order: { created_at: "DESC" },
    })

    return {
      statusCode: HttpStatus.OK,
      message: "All images retrieved successfully",
      data,
    }
  }

  async findOne(id: string) {
    const image = await this.imagesRepository.findOne({
      where: { id },
      relations: ["category"],
    })

    if (!image) {
      throw new NotFoundException(`Image with ID ${id} not found`)
    }

    return {
      statusCode: HttpStatus.OK,
      message: "Image retrieved successfully",
      data: image,
    }
  }

  async update(id: string, updateImageDto: UpdateImageDto) {
    const image = await this.findOne(id)
    Object.assign(image.data, updateImageDto) // `image` is already a wrapped response here
    const result = await this.imagesRepository.save(image.data)

    return {
      statusCode: HttpStatus.OK,
      message: "Image updated successfully",
      data: result,
    }
  }

  async remove(id: string) {
    const image = await this.findOne(id)
    await this.imagesRepository.remove(image.data)

    return {
      statusCode: HttpStatus.OK,
      message: "Image deleted successfully",
    }
  }

  async findByCategory(categoryId: string) {
    const data = await this.imagesRepository.find({
      where: { category: In([categoryId]) },
      relations: ["category"],
      order: { created_at: "DESC" },
    })

    return {
      statusCode: HttpStatus.OK,
      message: "Images by category retrieved successfully",
      data,
    }
  }

  async incrementViews(id: string) {
    const image = await this.findOne(id)
    image.data.views += 1
    const result = await this.imagesRepository.save(image.data)

    return {
      statusCode: HttpStatus.OK,
      message: "Image view incremented",
      data: result,
    }
  }

  // ---------- Category Methods ----------
  async createCategory(createCategoryDto: CreateCategoryImageDto) {
    const category = this.categoryImageRepository.create(createCategoryDto)
    const result = await this.categoryImageRepository.save(category)

    return {
      statusCode: HttpStatus.CREATED,
      message: "Category created successfully",
      data: result,
    }
  }

  async findAllCategories() {
    const data = await this.categoryImageRepository.find({
      relations: ["images"],
    })

    return {
      statusCode: HttpStatus.OK,
      message: "All categories retrieved successfully",
      data,
    }
  }
}
