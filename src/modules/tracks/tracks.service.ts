import { Injectable, NotFoundException } from "@nestjs/common"
import { In, type Repository } from "typeorm"
import type { CreateTrackDto } from "src/dto/create-track.dto"
import type { UpdateTrackDto } from "src/dto/update-track.dto"
import type { CreateCategoryTrackDto } from "src/dto/create-category-track.dto"
import { Track } from "src/database/entities/tracks/track.entity"
import { CategoryTrack } from "src/database/entities/tracks/category-track.entity"
import { InjectRepository } from "@nestjs/typeorm"

@Injectable()
export class TracksService {
  constructor(
    @InjectRepository(Track) private tracksRepository: Repository<Track>,
    @InjectRepository(CategoryTrack) private categoryTrackRepository: Repository<CategoryTrack>,
  ) {}

  async create(createTrackDto: CreateTrackDto): Promise<Track> {
    const category = await this.categoryTrackRepository.findOne({where:{id:createTrackDto.category}})
    const track = this.tracksRepository.create({...createTrackDto,category})
    return this.tracksRepository.save(track)
  }

  findAll(): Promise<Track[]> {
    return this.tracksRepository.find({
      relations: ["category"],
      order: { plays: "DESC" },
    })
  }

  async findOne(id: string): Promise<Track> {
    const track = await this.tracksRepository.findOne({
      where: { id },
      relations: ["category"],
    })

    if (!track) {
      throw new NotFoundException(`Track with ID ${id} not found`)
    }

    return track
  }

  async update(id: string, updateTrackDto: UpdateTrackDto): Promise<Track> {
    const track = await this.findOne(id)
    Object.assign(track, updateTrackDto)
    return this.tracksRepository.save(track)
  }

  async remove(id: string): Promise<void> {
    const track = await this.findOne(id)
    await this.tracksRepository.remove(track)
  }

  async findByCategory(categoryId: string): Promise<Track[]> {
    return this.tracksRepository.find({
      where: { category:In([categoryId]) },
      relations: ["category"],
      order: { plays: "DESC" },
    })
  }

  async findFeatured(): Promise<Track[]> {
    return this.tracksRepository.find({
      where: { featured: true },
      relations: ["category"],
      order: { plays: "DESC" },
    })
  }

  async incrementPlays(id: string): Promise<Track> {
    const track = await this.findOne(id)
    track.plays += 1
    return this.tracksRepository.save(track)
  }

  // Category methods
  createCategory(createCategoryDto: CreateCategoryTrackDto): Promise<CategoryTrack> {
    const category = this.categoryTrackRepository.create(createCategoryDto)
    return this.categoryTrackRepository.save(category)
  }

  findAllCategories(): Promise<CategoryTrack[]> {
    return this.categoryTrackRepository.find({
      relations: ["tracks"],
    })
  }
}
