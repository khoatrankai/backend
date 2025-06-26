import { Injectable, NotFoundException, HttpStatus } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { In, Repository } from "typeorm"
import { CreateNewsDto } from "src/dto/create-news.dto"
import { UpdateNewsDto } from "src/dto/update-news.dto"
import { CreateCategoryNewsDto } from "src/dto/create-category-news.dto"
import { CategoryActivity } from "src/database/entities/news/category-activity.entity"
import { News } from "src/database/entities/news/news.entity"
import { CategoryNews } from "src/database/entities/news/category-news.entity"
import { Region } from "src/database/entities/news/region.entity"
import { CreateCategoryActivityDto } from "src/dto/create-category-activity.dto"
import { UpdateCategoryActivityDto } from "src/dto/update-category-activity.dto"
import { CreateRegionDto } from "src/dto/create-region.dto"
import { UpdateRegionDto } from "src/dto/update-region.dto"

@Injectable()
export class NewsService {
  constructor(
    @InjectRepository(News) private newsRepository: Repository<News>,
    @InjectRepository(CategoryNews) private categoryNewsRepository: Repository<CategoryNews>,
    @InjectRepository(CategoryActivity) private categoryActivityRepository: Repository<CategoryActivity>,
    @InjectRepository(Region) private regionRepository: Repository<Region>,
  ) {}

  async create(createNewsDto: CreateNewsDto) {
    const categoryActivity = createNewsDto.categoryActivity != "undefined" ? await this.categoryActivityRepository.findOne({ where: { id: createNewsDto.categoryActivity } }) : undefined
    const region = createNewsDto.region != "undefined" ?  await this.regionRepository.findOne({ where: { id: createNewsDto.region } }):undefined
    const category = createNewsDto.category != "undefined" ?  await this.categoryNewsRepository.findOne({ where: { id: createNewsDto.category } }):undefined
    const news = this.newsRepository.create({ ...createNewsDto, categoryActivity, region, category })
    const result = await this.newsRepository.save(news)

    return {
      statusCode: HttpStatus.CREATED,
      message: 'News created successfully',
      data: result,
    }
  }

  async createCategoryActivity(createDto: CreateCategoryActivityDto) {
    const category = this.categoryActivityRepository.create(createDto)
    const result = await this.categoryActivityRepository.save(category)
    return {
      statusCode: HttpStatus.CREATED,
      message: 'CategoryActivity created successfully',
      data: result,
    }
  }

  async findAllCategoryActivity() {
    const datas = await this.categoryActivityRepository.find()
    return {
      statusCode: HttpStatus.OK,
      message: 'All CategoryActivity fetched successfully',
      data: datas,
    }
  }

  async updateCategoryActivity(id: string, updateDto: UpdateCategoryActivityDto) {
    const category = await this.categoryActivityRepository.findOne({ where: { id } })
    if (!category) {
      throw new NotFoundException(`CategoryActivity with ID ${id} not found`)
    }

    const updated = this.categoryActivityRepository.merge(category, updateDto)
    const result = await this.categoryActivityRepository.save(updated)

    return {
      statusCode: HttpStatus.OK,
      message: 'CategoryActivity updated successfully',
      data: result,
    }
  }

  async createRegion(createDto: CreateRegionDto) {
    const region = this.regionRepository.create(createDto)
    const result = await this.regionRepository.save(region)
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Region created successfully',
      data: result,
    }
  }

  async findAllRegion() {
    const datas = await this.regionRepository.find()
    return {
      statusCode: HttpStatus.OK,
      message: 'All Region fetched successfully',
      data: datas,
    }
  }

  async updateRegion(id: string, updateDto: UpdateRegionDto) {
    const region = await this.regionRepository.findOne({ where: { id } })
    if (!region) {
      throw new NotFoundException(`Region with ID ${id} not found`)
    }

    const updated = this.regionRepository.merge(region, updateDto)
    const result = await this.regionRepository.save(updated)

    return {
      statusCode: HttpStatus.OK,
      message: 'Region updated successfully',
      data: result,
    }
  }

 async findAll(page: string, limit: string) {
  const pageNumber = Math.max(1, Number(page) || 1)
  const limitNumber = Math.max(1, Number(limit) || 10)

  const news = await this.newsRepository.find({
    relations: ["category", "categoryActivity", "region", "slides"],
    order: { created_at: "DESC",featured:'DESC' },
    skip: (pageNumber - 1) * limitNumber,
    take: limitNumber,
  })

  return {
    statusCode: HttpStatus.OK,
    message: 'All news fetched successfully',
    data: news,
  }
}


  async findOne(id: string) {
    const news = await this.newsRepository.findOne({
      where: { id },
      relations: ["category", "categoryActivity", "region", "slides"],
    })

    if (!news) {
      throw new NotFoundException(`News with ID ${id} not found`)
    }

    return {
      statusCode: HttpStatus.OK,
      message: 'News fetched successfully',
      data: news,
    }
  }

  async update(id: string, updateNewsDto: UpdateNewsDto) {
    // const news = await this.newsRepository.findOne({ where: { id } })
    // if (!news) throw new NotFoundException(`News with ID ${id} not found`)
    // Object.assign(news, updateNewsDto)
    // const result = await this.newsRepository.save(news)
    const categoryActivity = updateNewsDto.categoryActivity != "undefined" ? await this.categoryActivityRepository.findOne({ where: { id: updateNewsDto.categoryActivity } }) : undefined
    const region = updateNewsDto.region != "undefined" ?  await this.regionRepository.findOne({ where: { id: updateNewsDto.region } }):undefined
    const category = updateNewsDto.category != "undefined" ?  await this.categoryNewsRepository.findOne({ where: { id: updateNewsDto.category } }):undefined
    const result = await this.newsRepository.update(id, {...updateNewsDto,categoryActivity,region,category})
    return {
      statusCode: HttpStatus.OK,
      message: 'News updated successfully',
      data: result,
    }
  }

  async remove(id: string) {
    const news = await this.newsRepository.findOne({ where: { id } })
    if (!news) throw new NotFoundException(`News with ID ${id} not found`)
    await this.newsRepository.remove(news)
    return {
      statusCode: HttpStatus.OK,
      message: 'News deleted successfully',
    }
  }

  async findByCategory(categoryId: string,page:string,limit:string) {
    const pageNumber = Math.max(1, Number(page) || 1)
    const limitNumber = Math.max(1, Number(limit) || 10)

    const news = await this.newsRepository.find({
      where: { category: In([categoryId]) },
      relations: ["category", "categoryActivity", "region"],
      order: { created_at: "DESC" },
      skip:(pageNumber - 1) * Number(limitNumber),
      take:limitNumber
    })

    return {
      statusCode: HttpStatus.OK,
      message: 'News by category fetched successfully',
      data: news,
    }
  }

  async findByType(type: string,page:string,limit:string) {
    if(type === 'all'){
      return await this.findAll(page,limit)
    }
    const pageNumber = Math.max(1, Number(page) || 1)
    const limitNumber = Math.max(1, Number(limit) || 10)

    const news = await this.newsRepository.find({
      where: { type: type as any },
      relations: ["category", "categoryActivity", "region"],
      order: { created_at: "DESC" },
      skip:(pageNumber - 1) * Number(limitNumber),
      take:limitNumber
    })

    return {
      statusCode: HttpStatus.OK,
      message: 'News by type fetched successfully',
      data: news,
    }
  }

  async incrementViews(id: string) {
    const news = await this.newsRepository.findOne({ where: { id } })
    if (!news) throw new NotFoundException(`News with ID ${id} not found`)
    news.views += 1
    const result = await this.newsRepository.save(news)
    return {
      statusCode: HttpStatus.OK,
      message: 'News view count incremented',
      data: result,
    }
  }

  async createCategory(createCategoryDto: CreateCategoryNewsDto) {
    const category = this.categoryNewsRepository.create(createCategoryDto)
    const result = await this.categoryNewsRepository.save(category)
    return {
      statusCode: HttpStatus.CREATED,
      message: 'CategoryNews created successfully',
      data: result,
    }
  }

  async findAllCategories() {
    const categories = await this.categoryNewsRepository.find({
      relations: ["news"],order: { created_at: "ASC" },
    })

    return {
      statusCode: HttpStatus.OK,
      message: 'All CategoryNews fetched successfully',
      data: categories,
    }
  }

  async findOneCategory(id: string) {
    const category = await this.categoryNewsRepository.findOne({
      where: { id },
      relations: ["news"],
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
