import { HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { In, type Repository } from "typeorm";
import type { CreateVideoDto } from "src/dto/create-video.dto";
import type { UpdateVideoDto } from "src/dto/update-video.dto";
import { CategoryVideo } from "src/database/entities/videos/category-video.entity";
import { Video } from "src/database/entities/videos/video.entity";
import { CreateCategoryVideoDto } from "src/dto/create-category-videos.dto";

@Injectable()
export class VideosService {
  private videosRepository: Repository<Video>;
  private categoryVideoRepository: Repository<CategoryVideo>;

  constructor(
    @InjectRepository(Video)
    videosRepository: Repository<Video>,
    @InjectRepository(CategoryVideo)
    categoryVideoRepository: Repository<CategoryVideo>,
  ) {
    this.videosRepository = videosRepository;
    this.categoryVideoRepository = categoryVideoRepository;
  }

  // Tạo video
  async create(createVideoDto: CreateVideoDto): Promise<any> {
    const category = await this.categoryVideoRepository.findOne({ where: { id: createVideoDto.category } });
    if (!category) {
      throw new NotFoundException(`Category with ID ${createVideoDto.category} not found`);
    }

    const video = this.videosRepository.create({ ...createVideoDto, category });
    const result = await this.videosRepository.save(video);

    return {
      statusCode: HttpStatus.CREATED,
      message: "Video created successfully",
      data: result,
    };
  }

  // Lấy tất cả video
  async findAll(): Promise<any> {
    const videos = await this.videosRepository.find({
      relations: ["category"],
      order: { created_at: "DESC" },
    });

    return {
      statusCode: HttpStatus.OK,
      message: "Videos fetched successfully",
      data: videos,
    };
  }

  // Tạo category cho video
  async createCategory(createCategoryDto: CreateCategoryVideoDto): Promise<any> {
    const category = this.categoryVideoRepository.create(createCategoryDto);
    const result = await this.categoryVideoRepository.save(category);

    return {
      statusCode: HttpStatus.CREATED,
      message: "Category created successfully",
      data: result,
    };
  }

  // Lấy một video theo ID
  async findOne(id: string): Promise<any> {
    const video = await this.videosRepository.findOne({
      where: { id },
      relations: ["category"],
    });

    if (!video) {
      throw new NotFoundException(`Video with ID ${id} not found`);
    }

    return {
      statusCode: HttpStatus.OK,
      message: "Video fetched successfully",
      data: video,
    };
  }

  // Cập nhật video
  async update(id: string, updateVideoDto: UpdateVideoDto): Promise<any> {
    const video = await this.findOne(id);
    Object.assign(video, updateVideoDto);
    const result = await this.videosRepository.save(video);

    return {
      statusCode: HttpStatus.OK,
      message: "Video updated successfully",
      data: result,
    };
  }

  // Xóa video
  async remove(id: string): Promise<any> {
    const video = await this.findOne(id);
    await this.videosRepository.remove(video);

    return {
      statusCode: HttpStatus.OK,
      message: "Video removed successfully",
      data: null,  // Không có dữ liệu trả về sau khi xóa
    };
  }

  // Lấy video theo category ID
  async findByCategory(categoryId: string): Promise<any> {
    const videos = await this.videosRepository.find({
      where: { category: In([categoryId]) },
      relations: ["category"],
      order: { created_at: "DESC" },
    });

    return {
      statusCode: HttpStatus.OK,
      message: "Videos by category fetched successfully",
      data: videos,
    };
  }

  // Tăng lượt xem
  async incrementViews(id: string): Promise<any> {
    const video = await this.findOne(id);
    video.views += 1;
    const result = await this.videosRepository.save(video);

    return {
      statusCode: HttpStatus.OK,
      message: "Video views incremented successfully",
      data: result,
    };
  }

  // Lấy tất cả categories
  async findAllCategories(): Promise<any> {
    const categories = await this.categoryVideoRepository.find({
      relations: ["videos"],
    });

    return {
      statusCode: HttpStatus.OK,
      message: "Categories fetched successfully",
      data: categories,
    };
  }
}
