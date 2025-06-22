import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { UsersService } from "./users.service"
import { UsersController } from "./users.controller"
import { User } from "src/database/entities/users/user.entity"
import { Group } from "src/database/entities/groups/group.entity"

@Module({
  imports: [TypeOrmModule.forFeature([User,Group])],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
