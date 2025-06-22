import { Injectable, NotFoundException } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import type { Repository } from "typeorm"
import type { CreateGroupDto } from "src/dto/create-group.dto"
import type { UpdateGroupDto } from "src/dto/update-group.dto"
import { Group } from "src/database/entities/groups/group.entity"
import { User } from "src/database/entities/users/user.entity"

@Injectable()
export class GroupsService {
  constructor(
    @InjectRepository(Group) private groupsRepository: Repository<Group>,
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async create(createGroupDto: CreateGroupDto): Promise<Group> {
    const head = await this.usersRepository.findOne({where:{id:createGroupDto.head}})
    const group = this.groupsRepository.create({...createGroupDto,head})
    return this.groupsRepository.save(group)
  }

  findAll(): Promise<Group[]> {
    return this.groupsRepository.find({
      relations: ["head", "users"],
    })
  }

  async findOne(id: string): Promise<Group> {
    const group = await this.groupsRepository.findOne({
      where: { id },
      relations: ["head", "users"],
    })

    if (!group) {
      throw new NotFoundException(`Group with ID ${id} not found`)
    }

    return group
  }

  async update(id: string, updateGroupDto: UpdateGroupDto): Promise<Group> {
    const group = await this.findOne(id)
    Object.assign(group, updateGroupDto)
    return this.groupsRepository.save(group)
  }

  async remove(id: string): Promise<void> {
    const group = await this.findOne(id)
    await this.groupsRepository.remove(group)
  }
}
