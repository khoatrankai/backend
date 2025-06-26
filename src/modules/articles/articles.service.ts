import { HttpStatus, Injectable, NotFoundException } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Article } from "src/database/entities/articles/article.entity"
import { CategoryArticle } from "src/database/entities/articles/category-article.entity"
import { CreateArticleDto } from "src/dto/create-article.dto"
import { CreateCategoryArticleDto } from "src/dto/create-category-article.dto"
import { UpdateArticleDto } from "src/dto/update-article.dto"
import { In, Repository } from "typeorm"

@Injectable()
export class ArticlesService {
  constructor(
    @InjectRepository(Article)
    private articlesRepository: Repository<Article>,
    @InjectRepository(CategoryArticle)
    private categoryArticleRepository: Repository<CategoryArticle>,
  ) {}

  async create(createArticleDto: CreateArticleDto) {
    const category = await this.categoryArticleRepository.findOne({
      where: { id: createArticleDto.category }
    })

    const article = this.articlesRepository.create({ ...createArticleDto, category })
    const result = await this.articlesRepository.save(article)

    return {
      statusCode: HttpStatus.CREATED,
      message: 'Article created successfully',
      data: result,
    }
  }

  async findAll() {
    const result = await this.articlesRepository.find({
      relations: ["category"],
      order: { created_at: "DESC" },
    })

    return {
      statusCode: HttpStatus.OK,
      message: 'Articles fetched successfully',
      data: result,
    }
  }

  async findOne(id: string) {
    const article = await this.articlesRepository.findOne({
      where: { id },
      relations: ["category"],
    })

    if (!article) {
      throw new NotFoundException(`Article with ID ${id} not found`)
    }

    return {
      statusCode: HttpStatus.OK,
      message: 'Article fetched successfully',
      data: article,
    }
  }

  async update(id: string, updateArticleDto: UpdateArticleDto) {
    const existing = await this.articlesRepository.findOne({ where: { id } })
    if (!existing) {
      throw new NotFoundException(`Article with ID ${id} not found`)
    }

    Object.assign(existing, updateArticleDto)
    const result = await this.articlesRepository.save(existing)

    return {
      statusCode: HttpStatus.OK,
      message: 'Article updated successfully',
      data: result,
    }
  }

  async remove(id: string) {
    const article = await this.articlesRepository.findOne({ where: { id } })

    if (!article) {
      throw new NotFoundException(`Article with ID ${id} not found`)
    }

    await this.articlesRepository.remove(article)

    return {
      statusCode: HttpStatus.OK,
      message: 'Article deleted successfully',
      data: null,
    }
  }

  async findByCategory(categoryId: string) {
    const result = await this.articlesRepository.find({
      where: { category: In([categoryId]) },
      relations: ["category"],
      order: { created_at: "DESC" },
    })

    return {
      statusCode: HttpStatus.OK,
      message: 'Articles by category fetched successfully',
      data: result,
    }
  }

  async findByType(type: string) {
    const result = await this.articlesRepository.find({
      where: { type: type as any },
      relations: ["category"],
      order: { created_at: "DESC" },
    })

    return {
      statusCode: HttpStatus.OK,
      message: 'Articles by type fetched successfully',
      data: result,
    }
  }

  async findFeatured() {
    const result = await this.articlesRepository.find({
      where: { featured: true },
      relations: ["category"],
      order: { views: "DESC" },
    })

    return {
      statusCode: HttpStatus.OK,
      message: 'Featured articles fetched successfully',
      data: result,
    }
  }

  async incrementViews(id: string) {
    const article = await this.articlesRepository.findOne({ where: { id } })

    if (!article) {
      throw new NotFoundException(`Article with ID ${id} not found`)
    }

    article.views += 1
    const result = await this.articlesRepository.save(article)

    return {
      statusCode: HttpStatus.OK,
      message: 'Article view count incremented',
      data: result,
    }
  }

  async findAllCategories() {
    const result = await this.categoryArticleRepository.find({
      relations: ["articles"],
    })

    return {
      statusCode: HttpStatus.OK,
      message: 'CategoryNews list fetched successfully',
      data: result,
    }
  }

  async createCategory(createCategoryDto: CreateCategoryArticleDto) {
    const category = this.categoryArticleRepository.create(createCategoryDto)
    const result = await this.categoryArticleRepository.save(category)

    return {
      statusCode: HttpStatus.CREATED,
      message: 'CategoryNews created successfully',
      data: result,
    }
  }

  async findOneCategory(id: string) {
    const category = await this.categoryArticleRepository.findOne({
      where: { id },
      relations: ["articles"],
    })

    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`)
    }

    return {
      statusCode: HttpStatus.OK,
      message: 'CategoryNews fetched successfully',
      data: category,
    }
  }
}
