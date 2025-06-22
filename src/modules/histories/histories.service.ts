import { Injectable, NotFoundException } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import type { Repository } from "typeorm"
import type { CreateHistoryDto } from "src/dto/create-history.dto"
import type { UpdateHistoryDto } from "src/dto/update-history.dto"
import type { CreateHistoriesLeaderDto } from "src/dto/create-histories-leader.dto"
import type { UpdateHistoriesLeaderDto } from "src/dto/update-histories-leader.dto"
import { HistoriesLeader } from "src/database/entities/histories/histories-leader.entity"
import { History } from "src/database/entities/histories/history.entity"
import { User } from "src/database/entities/users/user.entity"

@Injectable()
export class HistoriesService {
  constructor(
    @InjectRepository(History) private historiesRepository: Repository<History>,
    @InjectRepository(HistoriesLeader) private historiesLeaderRepository: Repository<HistoriesLeader>,
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  // History methods
  create(createHistoryDto: CreateHistoryDto): Promise<History> {
    const history = this.historiesRepository.create(createHistoryDto)
    return this.historiesRepository.save(history)
  }

  findAll(): Promise<History[]> {
    return this.historiesRepository.find({
      order: { year: "ASC" },
    })
  }

  async findOne(id: string): Promise<History> {
    const history = await this.historiesRepository.findOne({
      where: { id },
    })

    if (!history) {
      throw new NotFoundException(`History with ID ${id} not found`)
    }

    return history
  }

  async update(id: string, updateHistoryDto: UpdateHistoryDto): Promise<History> {
    const history = await this.findOne(id)
    Object.assign(history, updateHistoryDto)
    return this.historiesRepository.save(history)
  }

  async remove(id: string): Promise<void> {
    const history = await this.findOne(id)
    await this.historiesRepository.remove(history)
  }

  async findHighlighted(): Promise<History[]> {
    return this.historiesRepository.find({
      where: { highlight: true },
      order: { year: "ASC" },
    })
  }

  // Histories Leader methods
  async createLeader(createHistoriesLeaderDto: CreateHistoriesLeaderDto): Promise<HistoriesLeader> {
    const user = await this.usersRepository.findOne({where:{id:createHistoriesLeaderDto.user}})
    const leader = this.historiesLeaderRepository.create({...createHistoriesLeaderDto,user})
    return this.historiesLeaderRepository.save(leader)
  }

  findAllLeaders(): Promise<HistoriesLeader[]> {
    return this.historiesLeaderRepository.find({
      relations: ["user"],
      order: { period: "ASC" },
    })
  }

  async findOneLeader(id: string): Promise<HistoriesLeader> {
    const leader = await this.historiesLeaderRepository.findOne({
      where: { id },
      relations: ["user"],
    })

    if (!leader) {
      throw new NotFoundException(`Leader history with ID ${id} not found`)
    }

    return leader
  }

  async updateLeader(id: string, updateHistoriesLeaderDto: UpdateHistoriesLeaderDto): Promise<HistoriesLeader> {
    const leader = await this.findOneLeader(id)
    Object.assign(leader, updateHistoriesLeaderDto)
    return this.historiesLeaderRepository.save(leader)
  }

  async removeLeader(id: string): Promise<void> {
    const leader = await this.findOneLeader(id)
    await this.historiesLeaderRepository.remove(leader)
  }
}
