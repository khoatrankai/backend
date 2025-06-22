import { Injectable, NotFoundException } from "@nestjs/common"
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

  create(createAwardDto: CreateAwardDto): Promise<Award> {
    const award = this.awardsRepository.create(createAwardDto)
    return this.awardsRepository.save(award)
  }

  findAll(): Promise<Award[]> {
    return this.awardsRepository.find({
      order: { year: "DESC" },
    })
  }

  async findOne(id: string): Promise<Award> {
    const award = await this.awardsRepository.findOne({
      where: { id },
    })

    if (!award) {
      throw new NotFoundException(`Award with ID ${id} not found`)
    }

    return award
  }

  async update(id: string, updateAwardDto: UpdateAwardDto): Promise<Award> {
    const award = await this.findOne(id)
    Object.assign(award, updateAwardDto)
    return this.awardsRepository.save(award)
  }

  async remove(id: string): Promise<void> {
    const award = await this.findOne(id)
    await this.awardsRepository.remove(award)
  }

  async findByYear(year: string): Promise<Award[]> {
    return this.awardsRepository.find({
      where: { year },
      order: { name: "ASC" },
    })
  }

  async findByLevel(level: string): Promise<Award[]> {
    return this.awardsRepository.find({
      where: { level },
      order: { year: "DESC" },
    })
  }
}
