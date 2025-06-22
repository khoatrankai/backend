import { Injectable, NotFoundException } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import type { Repository } from "typeorm"
import type { CreateInfoDto } from "src/dto/create-info.dto"
import type { UpdateInfoDto } from "src/dto/update-info.dto"
import { Info } from "src/database/entities/infos/info.entity"

@Injectable()
export class InfosService {
  constructor(
    @InjectRepository(Info) private readonly infosRepository: Repository<Info>,
) {}

  async create(createInfoDto: CreateInfoDto): Promise<Info> {
    const info = this.infosRepository.create(createInfoDto)
    return this.infosRepository.save(info)
  }

  async findAll(): Promise<Info[]> {
    return this.infosRepository.find({
      order: { label: "ASC" },
    })
  }

  async findOne(id: string): Promise<Info> {
    const info = await this.infosRepository.findOne({
      where: { id },
    })

    if (!info) {
      throw new NotFoundException(`Info with ID ${id} not found`)
    }

    return info
  }

  async update(id: string, updateInfoDto: UpdateInfoDto): Promise<Info> {
    const info = await this.findOne(id)
    Object.assign(info, updateInfoDto)
    return this.infosRepository.save(info)
  }

  async remove(id: string): Promise<void> {
    const info = await this.findOne(id)
    await this.infosRepository.remove(info)
  }
}
