import { Injectable, NotFoundException, HttpStatus } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import type { Repository } from "typeorm";
import type { CreateGroupDto } from "src/dto/create-group.dto";
import type { UpdateGroupDto } from "src/dto/update-group.dto";
import { Group } from "src/database/entities/groups/group.entity";
import { User } from "src/database/entities/users/user.entity";

@Injectable()
export class GroupsService {
  constructor(
    @InjectRepository(Group) private groupsRepository: Repository<Group>,
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async create(createGroupDto: CreateGroupDto): Promise<Group> {
    const head = await this.usersRepository.findOne({ where: { id: createGroupDto.head } });
    const group = this.groupsRepository.create({ ...createGroupDto, head });
    return this.groupsRepository.save(group);
  }

  async findAll(): Promise<any> {
    const groups = await this.groupsRepository.find({
      relations: ["head", "users"],
    });

    return {
      statusCode: HttpStatus.OK,
      message: "Groups fetched successfully",
      data: groups,
    };
  }

  async findOne(id: string): Promise<any> {
    const group = await this.groupsRepository.findOne({
      where: { id },
      relations: ["head", "users"],
    });

    if (!group) {
      throw new NotFoundException(`Group with ID ${id} not found`);
    }

    return {
      statusCode: HttpStatus.OK,
      message: "Group fetched successfully",
      data: group,
    };
  }

  async update(id: string, updateGroupDto: UpdateGroupDto): Promise<Group> {
    const group = await this.findOne(id);
    Object.assign(group.data, updateGroupDto); // sửa chỗ này vì findOne giờ trả về object có `data`
    return this.groupsRepository.save(group.data);
  }

  async remove(id: string): Promise<void> {
    const group = await this.findOne(id);
    await this.groupsRepository.remove(group.data); // tương tự, `.data` chứa entity
  }
}
