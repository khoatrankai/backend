import { Injectable, NotFoundException } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { In, type Repository } from "typeorm"
import type { CreateUserDto } from "src/dto/create-user.dto"
import type { UpdateUserDto } from "src/dto/update-user.dto"
import { User } from "src/database/entities/users/user.entity"
import { Group } from "src/database/entities/groups/group.entity"

@Injectable()
export class UsersService {
 

  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
     @InjectRepository(Group)
    private groupsRepository: Repository<Group>,
  ) {
  
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const group = await this.groupsRepository.findOne({where:{id:createUserDto.group}})
    const user = this.usersRepository.create({...createUserDto,group})
    return this.usersRepository.save(user)
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find({
      relations: ["group", "historiesLeader"],
    })
  }

  async findOne(id: string): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: { id },
      relations: ["group", "historiesLeader"],
    })

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`)
    }

    return user
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id)
    Object.assign(user, updateUserDto)
    return this.usersRepository.save(user)
  }

  async remove(id: string): Promise<void> {
    const user = await this.findOne(id)
    await this.usersRepository.remove(user)
  }

  async findByGroup(groupId: string): Promise<User[]> {
    return this.usersRepository.find({
      where: { group:In([groupId]) },
      relations: ["group"],
    })
  }

  async findByType(type: string): Promise<User[]> {
    return this.usersRepository.find({
      where: { type: type as any },
      relations: ["group"],
    })
  }
}
