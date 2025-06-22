import { Injectable, NotFoundException } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import type { Repository } from "typeorm"
import type { CreateStatisticalDto } from "src/dto/create-statistical.dto"
import type { UpdateStatisticalDto } from "src/dto/update-statistical.dto"
import { Statistical } from "src/database/entities/statistical/statistical.entity"

@Injectable()
export class StatisticalService {
  private statisticalRepository: Repository<Statistical>
  constructor(
    @InjectRepository(Statistical)
    statisticalRepository: Repository<Statistical>,
  ) {
    this.statisticalRepository = statisticalRepository
  }

  create(createStatisticalDto: CreateStatisticalDto): Promise<Statistical> {
    const statistical = this.statisticalRepository.create(createStatisticalDto)
    return this.statisticalRepository.save(statistical)
  }

  findAll(): Promise<Statistical[]> {
    return this.statisticalRepository.find({
      order: { label: "ASC" },
    })
  }

  async findOne(id: string): Promise<Statistical> {
    const statistical = await this.statisticalRepository.findOne({
      where: { id },
    })

    if (!statistical) {
      throw new NotFoundException(`Statistical with ID ${id} not found`)
    }

    return statistical
  }

  async update(id: string, updateStatisticalDto: UpdateStatisticalDto): Promise<Statistical> {
    const statistical = await this.findOne(id)
    Object.assign(statistical, updateStatisticalDto)
    return this.statisticalRepository.save(statistical)
  }

  async remove(id: string): Promise<void> {
    const statistical = await this.findOne(id)
    await this.statisticalRepository.remove(statistical)
  }
}
