import { Injectable, NotFoundException } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Article } from "src/database/entities/articles/article.entity"
import { CategoryArticle } from "src/database/entities/articles/category-article.entity"
import { CreateArticleDto } from "src/dto/create-article.dto"
import { UpdateArticleDto } from "src/dto/update-article.dto"
import { In, type Repository } from "typeorm"

@Injectable()
export class ArticlesService {
  constructor(
    @InjectRepository(Article)
    private articlesRepository: Repository<Article>,
    @InjectRepository(CategoryArticle)
    private categoryArticleRepository: Repository<CategoryArticle>,
  ) {}

  async create(createArticleDto: CreateArticleDto): Promise<Article> {
    const category = await this.categoryArticleRepository.findOne({where:{id:createArticleDto.category}})
    const article = this.articlesRepository.create({...createArticleDto,category})
    return this.articlesRepository.save(article)
  }

  findAll(): Promise<Article[]> {
    return this.articlesRepository.find({
      relations: ["category"],
      order: { date: "DESC" },
    })
  }

  async findOne(id: string): Promise<Article> {
    const article = await this.articlesRepository.findOne({
      where: { id },
      relations: ["category"],
    })

    if (!article) {
      throw new NotFoundException(`Article with ID ${id} not found`)
    }

    return article
  }

  async update(id: string, updateArticleDto: UpdateArticleDto): Promise<Article> {
    const article = await this.findOne(id)
    Object.assign(article, updateArticleDto)
    return this.articlesRepository.save(article)
  }

  async remove(id: string): Promise<void> {
    const article = await this.findOne(id)
    await this.articlesRepository.remove(article)
  }

  async findByCategory(categoryId: string): Promise<Article[]> {
    return this.articlesRepository.find({
      where: { category:In([categoryId]) },
      relations: ["category"],
      order: { date: "DESC" },
    })
  }

  async findByType(type: string): Promise<Article[]> {
    return this.articlesRepository.find({
      where: { type: type as any },
      relations: ["category"],
      order: { date: "DESC" },
    })
  }

  async findFeatured(): Promise<Article[]> {
    return this.articlesRepository.find({
      where: { featured: true },
      relations: ["category"],
      order: { views: "DESC" },
    })
  }

  async incrementViews(id: string): Promise<Article> {
    const article = await this.findOne(id)
    article.views += 1
    return this.articlesRepository.save(article)
  }

  findAllCategories(): Promise<CategoryArticle[]> {
    return this.categoryArticleRepository.find({
      relations: ["articles"],
    })
  }
}
