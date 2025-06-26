import { Injectable, NotFoundException, HttpStatus } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { In, Repository } from "typeorm"
import { CreateUserDto } from "src/dto/create-user.dto"
import { UpdateUserDto } from "src/dto/update-user.dto"
import { User } from "src/database/entities/users/user.entity"
import { Group } from "src/database/entities/groups/group.entity"

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Group)
    private groupsRepository: Repository<Group>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const group = await this.groupsRepository.findOne({ where: { id: createUserDto.group } })
    const user = this.usersRepository.create({ ...createUserDto, group })
    const result = await this.usersRepository.save(user)
    return {
      statusCode: HttpStatus.CREATED,
      message: "User created successfully",
      data: result,
    }
  }

  async findAll() {
    const users = await this.usersRepository.find({
      relations: ["group", "historiesLeader"],
    })
    return {
      statusCode: HttpStatus.OK,
      message: "All users fetched successfully",
      data: users,
    }
  }

  async findOne(id: string) {
    const user = await this.usersRepository.findOne({
      where: { id },
      relations: ["group", "historiesLeader"],
    })

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`)
    }

    return {
      statusCode: HttpStatus.OK,
      message: "User fetched successfully",
      data: user,
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id).then(res => res.data)
    Object.assign(user, updateUserDto)
    const result = await this.usersRepository.save(user)
    return {
      statusCode: HttpStatus.OK,
      message: "User updated successfully",
      data: result,
    }
  }

  async remove(id: string) {
    const user = await this.findOne(id).then(res => res.data)
    await this.usersRepository.remove(user)
    return {
      statusCode: HttpStatus.OK,
      message: "User deleted successfully",
      data: null,
    }
  }

  async findByGroup(groupId: string) {
    const users = await this.usersRepository.find({
      where: { group: In([groupId]) },
      relations: ["group"],
    })
    return {
      statusCode: HttpStatus.OK,
      message: `Users in group ${groupId} fetched successfully`,
      data: users,
    }
  }

  async findByType(type: string) {
    const users = await this.usersRepository.find({
      where: { type: type as any },
      relations: ["group"],
    })
    return {
      statusCode: HttpStatus.OK,
      message: `Users with type "${type}" fetched successfully`,
      data: users,
    }
  }
}
