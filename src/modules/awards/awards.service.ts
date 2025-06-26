import { Injectable, NotFoundException, HttpStatus } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Award } from "src/database/entities/awards/award.entity"
import { CreateAwardDto } from "src/dto/create-award.dto"
import { UpdateAwardDto } from "src/dto/update-award.dto"
import type { Repository } from "typeorm"

@Injectable()
export class AwardsService {
  private awardsRepository: Repository<Award>

  constructor(
    @InjectRepository(Award)
    awardsRepository: Repository<Award>,
  ) {
    this.awardsRepository = awardsRepository
  }

  async create(createAwardDto: CreateAwardDto) {
    const award = this.awardsRepository.create(createAwardDto)
    const result = await this.awardsRepository.save(award)
    return {
      statusCode: HttpStatus.CREATED,
      message: "Award created successfully",
      data: result,
    }
  }

  async findAll() {
    const result = await this.awardsRepository.find({
      order: { year: "DESC" },
    })
    return {
      statusCode: HttpStatus.OK,
      message: "All awards fetched successfully",
      data: result,
    }
  }

  async findOne(id: string) {
    const award = await this.awardsRepository.findOne({
      where: { id },
    })

    if (!award) {
      throw new NotFoundException(`Award with ID ${id} not found`)
    }

    return {
      statusCode: HttpStatus.OK,
      message: "Award fetched successfully",
      data: award,
    }
  }

  async update(id: string, updateAwardDto: UpdateAwardDto) {
    const award = await this.findOne(id).then(res => res.data)
    Object.assign(award, updateAwardDto)
    const result = await this.awardsRepository.save(award)
    return {
      statusCode: HttpStatus.OK,
      message: "Award updated successfully",
      data: result,
    }
  }

  async remove(id: string) {
    const award = await this.findOne(id).then(res => res.data)
    await this.awardsRepository.remove(award)
    return {
      statusCode: HttpStatus.OK,
      message: "Award deleted successfully",
      data: null,
    }
  }

  async findByYear(year: string) {
    const result = await this.awardsRepository.find({
      where: { year },
      order: { name: "ASC" },
    })
    return {
      statusCode: HttpStatus.OK,
      message: `Awards in year ${year} fetched successfully`,
      data: result,
    }
  }

  async findByLevel(level: string) {
    const result = await this.awardsRepository.find({
      where: { level },
      order: { year: "DESC" },
    })
    return {
      statusCode: HttpStatus.OK,
      message: `Awards with level "${level}" fetched successfully`,
      data: result,
    }
  }
}
