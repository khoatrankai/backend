import { Injectable, NotFoundException, HttpStatus } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { In, Repository } from "typeorm"
import { CreateSlideDto } from "src/dto/create-slide.dto"
import { UpdateSlideDto } from "src/dto/update-slide.dto"
import { Slide } from "src/database/entities/slides/slide.entity"
import { News } from "src/database/entities/news/news.entity"

@Injectable()
export class SlidesService {
  constructor(
    @InjectRepository(Slide)
    private slidesRepository: Repository<Slide>,
    @InjectRepository(News)
    private newsRepository: Repository<News>,
  ) {}

  async create(createSlideDto: CreateSlideDto) {
    const news = await this.newsRepository.findOne({ where: { id: In([createSlideDto.news]) } })
    const slide = this.slidesRepository.create({ ...createSlideDto, news })
    const result = await this.slidesRepository.save(slide)

    return {
      statusCode: HttpStatus.CREATED,
      message: 'Slide created successfully',
      data: result,
    }
  }

  async findAll() {
    const slides = await this.slidesRepository.find({
      relations: ["news"],
      order: { title: "ASC" },
    })
    return {
      statusCode: HttpStatus.OK,
      message: 'All slides fetched successfully',
      data: slides,
    }
  }

  async findOne(id: string) {
    const slide = await this.slidesRepository.findOne({
      where: { id },
      relations: ["news"],
    })

    if (!slide) {
      throw new NotFoundException(`Slide with ID ${id} not found`)
    }

    return {
      statusCode: HttpStatus.OK,
      message: 'Slide fetched successfully',
      data: slide,
    }
  }

  async update(id: string, updateSlideDto: UpdateSlideDto) {
    const slide = await this.slidesRepository.findOne({ where: { id } })
    if (!slide) throw new NotFoundException(`Slide with ID ${id} not found`)

    Object.assign(slide, updateSlideDto)
    const result = await this.slidesRepository.save(slide)

    return {
      statusCode: HttpStatus.OK,
      message: 'Slide updated successfully',
      data: result,
    }
  }

  async remove(id: string) {
    const slide = await this.slidesRepository.findOne({ where: { id } })
    if (!slide) throw new NotFoundException(`Slide with ID ${id} not found`)
    await this.slidesRepository.remove(slide)

    return {
      statusCode: HttpStatus.OK,
      message: 'Slide deleted successfully',
    }
  }

  async findByNews(newsId: string) {
    const slides = await this.slidesRepository.find({
      where: { news: In([newsId]) },
      relations: ["news"],
    })

    return {
      statusCode: HttpStatus.OK,
      message: 'Slides by news fetched successfully',
      data: slides,
    }
  }
}
