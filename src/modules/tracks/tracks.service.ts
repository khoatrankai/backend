import {
  Injectable,
  NotFoundException,
  HttpStatus,
} from "@nestjs/common";
import { In, Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Track } from "src/database/entities/tracks/track.entity";
import { CategoryTrack } from "src/database/entities/tracks/category-track.entity";
import type { CreateTrackDto } from "src/dto/create-track.dto";
import type { UpdateTrackDto } from "src/dto/update-track.dto";
import type { CreateCategoryTrackDto } from "src/dto/create-category-track.dto";

@Injectable()
export class TracksService {
  constructor(
    @InjectRepository(Track)
    private tracksRepository: Repository<Track>,
    @InjectRepository(CategoryTrack)
    private categoryTrackRepository: Repository<CategoryTrack>
  ) {}

  async create(createTrackDto: CreateTrackDto) {
    const category = await this.categoryTrackRepository.findOne({
      where: { id: createTrackDto.category },
    });
    const track = this.tracksRepository.create({ ...createTrackDto, category });
    const result = await this.tracksRepository.save(track);
    return {
      statusCode: HttpStatus.OK,
      message: "Track created successfully",
      data: result,
    };
  }

  async findAll() {
  const result = await this.tracksRepository.find({
    relations: ["category"],
    order: {
      featured: "DESC",     // true (nổi bật) trước
      created_at: "DESC",   // mới nhất trước
    },
  });

  return {
    statusCode: HttpStatus.OK,
    message: "Fetched all tracks",
    data: result,
  };
}

  async findOne(id: string) {
    const track = await this.tracksRepository.findOne({
      where: { id },
      relations: ["category"],
    });
    if (!track) {
      throw new NotFoundException(`Track with ID ${id} not found`);
    }
    return {
      statusCode: HttpStatus.OK,
      message: "Fetched track",
      data: track,
    };
  }

  async update(id: string, updateTrackDto: UpdateTrackDto) {
    const track = await this.tracksRepository.findOne({ where: { id } });
    if (!track) {
      throw new NotFoundException(`Track with ID ${id} not found`);
    }
    Object.assign(track, updateTrackDto);
    const result = await this.tracksRepository.save(track);
    return {
      statusCode: HttpStatus.OK,
      message: "Track updated successfully",
      data: result,
    };
  }

  async remove(id: string): Promise<void> {
    const track = await this.tracksRepository.findOne({ where: { id } });
    if (!track) {
      throw new NotFoundException(`Track with ID ${id} not found`);
    }
    await this.tracksRepository.remove(track);
  }

  async findByCategory(categoryId: string) {
    const result = await this.tracksRepository.find({
      where: { category: In([categoryId]) },
      relations: ["category"],
      order: { plays: "DESC" },
    });
    return {
      statusCode: HttpStatus.OK,
      message: "Fetched tracks by category",
      data: result,
    };
  }

  async findFeatured() {
    const result = await this.tracksRepository.find({
      where: { featured: true },
      relations: ["category"],
      order: { plays: "DESC" },
    });
    return {
      statusCode: HttpStatus.OK,
      message: "Fetched featured tracks",
      data: result,
    };
  }

  async incrementPlays(id: string) {
    const track = await this.tracksRepository.findOne({ where: { id } });
    if (!track) {
      throw new NotFoundException(`Track with ID ${id} not found`);
    }
    track.plays += 1;
    const result = await this.tracksRepository.save(track);
    return {
      statusCode: HttpStatus.OK,
      message: "Play count incremented",
      data: result,
    };
  }

  async createCategory(createCategoryDto: CreateCategoryTrackDto) {
    const category = this.categoryTrackRepository.create(createCategoryDto);
    const result = await this.categoryTrackRepository.save(category);
    return {
      statusCode: HttpStatus.OK,
      message: "Category created successfully",
      data: result,
    };
  }

  async findAllCategories() {
    const result = await this.categoryTrackRepository.find({
      relations: ["tracks"],
    });
    return {
      statusCode: HttpStatus.OK,
      message: "Fetched all track categories",
      data: result,
    };
  }
}
