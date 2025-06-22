import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { GroupsService } from "./groups.service"
import { GroupsController } from "./groups.controller"
import { Group } from "src/database/entities/groups/group.entity"
import { User } from "src/database/entities/users/user.entity"

@Module({
  imports: [TypeOrmModule.forFeature([Group,User])],
  controllers: [GroupsController],
  providers: [GroupsService],
})
export class GroupsModule {}
