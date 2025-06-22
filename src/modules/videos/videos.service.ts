import { Injectable, NotFoundException } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { In, type Repository } from "typeorm"
import type { CreateVideoDto } from "src/dto/create-video.dto"
import type { UpdateVideoDto } from "src/dto/update-video.dto"
import { CategoryVideo } from "src/database/entities/videos/category-video.entity"
import { Video } from "src/database/entities/videos/video.entity"

@Injectable()
export class VideosService {
  private videosRepository: Repository<Video>
  private categoryVideoRepository: Repository<CategoryVideo>
  constructor(
    @InjectRepository(Video)
    videosRepository: Repository<Video>,
    @InjectRepository(CategoryVideo)
    categoryVideoRepository: Repository<CategoryVideo>,
  ) {
    this.videosRepository = videosRepository
    this.categoryVideoRepository = categoryVideoRepository
  }

  async create(createVideoDto: CreateVideoDto): Promise<Video> {
    const category = await this.categoryVideoRepository.findOne({where:{id:createVideoDto.category}})
    const video = this.videosRepository.create({...createVideoDto,category})
    return this.videosRepository.save(video)
  }

  findAll(): Promise<Video[]> {
    return this.videosRepository.find({
      relations: ["category"],
      order: { date: "DESC" },
    })
  }

  async findOne(id: string): Promise<Video> {
    const video = await this.videosRepository.findOne({
      where: { id },
      relations: ["category"],
    })

    if (!video) {
      throw new NotFoundException(`Video with ID ${id} not found`)
    }

    return video
  }

  async update(id: string, updateVideoDto: UpdateVideoDto): Promise<Video> {
    const video = await this.findOne(id)
    Object.assign(video, updateVideoDto)
    return this.videosRepository.save(video)
  }

  async remove(id: string): Promise<void> {
    const video = await this.findOne(id)
    await this.videosRepository.remove(video)
  }

  async findByCategory(categoryId: string): Promise<Video[]> {
    return this.videosRepository.find({
      where: { category:In([categoryId]) },
      relations: ["category"],
      order: { date: "DESC" },
    })
  }

  async incrementViews(id: string): Promise<Video> {
    const video = await this.findOne(id)
    video.views += 1
    return this.videosRepository.save(video)
  }

  findAllCategories(): Promise<CategoryVideo[]> {
    return this.categoryVideoRepository.find({
      relations: ["videos"],
    })
  }
}
