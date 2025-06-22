import { Controller, Get, Post, Patch, Param, Delete, Body } from "@nestjs/common"
import type { CreateGroupDto } from "src/dto/create-group.dto"
import type { UpdateGroupDto } from "src/dto/update-group.dto"
import { GroupsService } from "./groups.service"

@Controller("groups")
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) {}

  @Post()
  create(@Body() createGroupDto: CreateGroupDto) {
    return this.groupsService.create(createGroupDto)
  }

  @Get()
  findAll() {
    return this.groupsService.findAll()
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.groupsService.findOne(id)
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateGroupDto: UpdateGroupDto) {
    return this.groupsService.update(id, updateGroupDto)
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.groupsService.remove(id)
  }
}
