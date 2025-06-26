import { Injectable, NotFoundException, HttpStatus } from "@nestjs/common"
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
  async create(createHistoryDto: CreateHistoryDto) {
    const history = this.historiesRepository.create(createHistoryDto)
    const result = await this.historiesRepository.save(history)
    return {
      statusCode: HttpStatus.CREATED,
      message: 'History created successfully',
      data: result,
    }
  }

  async findAll() {
    const result = await this.historiesRepository.find({
      order: { year: "ASC" },
    })
    return {
      statusCode: HttpStatus.OK,
      message: 'All histories fetched successfully',
      data: result,
    }
  }

  async findOne(id: string) {
    const history = await this.historiesRepository.findOne({ where: { id } })

    if (!history) {
      throw new NotFoundException(`History with ID ${id} not found`)
    }

    return {
      statusCode: HttpStatus.OK,
      message: 'History fetched successfully',
      data: history,
    }
  }

  async update(id: string, updateHistoryDto: UpdateHistoryDto) {
    const history = await this.findOne(id).then(res => res.data)
    Object.assign(history, updateHistoryDto)
    const result = await this.historiesRepository.save(history)
    return {
      statusCode: HttpStatus.OK,
      message: 'History updated successfully',
      data: result,
    }
  }

  async remove(id: string) {
    const history = await this.findOne(id).then(res => res.data)
    await this.historiesRepository.remove(history)
    return {
      statusCode: HttpStatus.OK,
      message: 'History deleted successfully',
      data: null,
    }
  }

  async findHighlighted() {
    const result = await this.historiesRepository.find({
      where: { highlight: true },
      order: { year: "ASC" },
    })
    return {
      statusCode: HttpStatus.OK,
      message: 'Highlighted histories fetched successfully',
      data: result,
    }
  }

  // Histories Leader methods
  async createLeader(createHistoriesLeaderDto: CreateHistoriesLeaderDto) {
    const user = await this.usersRepository.findOne({ where: { id: createHistoriesLeaderDto.user } })
    const leader = this.historiesLeaderRepository.create({ ...createHistoriesLeaderDto, user })
    const result = await this.historiesLeaderRepository.save(leader)
    return {
      statusCode: HttpStatus.CREATED,
      message: 'HistoriesLeader created successfully',
      data: result,
    }
  }

  async findAllLeaders() {
    const result = await this.historiesLeaderRepository.find({
      relations: ["user"],
      order: { period: "ASC" },
    })
    return {
      statusCode: HttpStatus.OK,
      message: 'All leader histories fetched successfully',
      data: result,
    }
  }

  async findOneLeader(id: string) {
    const leader = await this.historiesLeaderRepository.findOne({
      where: { id },
      relations: ["user"],
    })

    if (!leader) {
      throw new NotFoundException(`Leader history with ID ${id} not found`)
    }

    return {
      statusCode: HttpStatus.OK,
      message: 'Leader history fetched successfully',
      data: leader,
    }
  }

  async updateLeader(id: string, updateHistoriesLeaderDto: UpdateHistoriesLeaderDto) {
    const leader = await this.findOneLeader(id).then(res => res.data)
    Object.assign(leader, updateHistoriesLeaderDto)
    const result = await this.historiesLeaderRepository.save(leader)
    return {
      statusCode: HttpStatus.OK,
      message: 'Leader history updated successfully',
      data: result,
    }
  }

  async removeLeader(id: string) {
    const leader = await this.findOneLeader(id).then(res => res.data)
    await this.historiesLeaderRepository.remove(leader)
    return {
      statusCode: HttpStatus.OK,
      message: 'Leader history deleted successfully',
      data: null,
    }
  }
}
