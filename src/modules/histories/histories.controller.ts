import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from "@nestjs/common"
import { HistoriesService } from "./histories.service"
import { CreateHistoriesLeaderDto } from "src/dto/create-histories-leader.dto"
import { CreateHistoryDto } from "src/dto/create-history.dto"
import { UpdateHistoriesLeaderDto } from "src/dto/update-histories-leader.dto"
import { UpdateHistoryDto } from "src/dto/update-history.dto"

@Controller("histories")
export class HistoriesController {
  constructor(private readonly historiesService: HistoriesService) {}

  @Post()
  create(@Body() createHistoryDto: CreateHistoryDto) {
    return this.historiesService.create(createHistoryDto)
  }

  @Get()
  findAll(@Query("highlight") highlight?: string) {
    if (highlight === "true") {
      return this.historiesService.findHighlighted()
    }
    return this.historiesService.findAll()
  }

  @Get("leaders")
  findAllLeaders() {
    return this.historiesService.findAllLeaders()
  }

  @Post("leaders")
  createLeader(@Body() createHistoriesLeaderDto: CreateHistoriesLeaderDto) {
    return this.historiesService.createLeader(createHistoriesLeaderDto)
  }

  @Get("leaders/:id")
  findOneLeader(@Param("id") id: string) {
    return this.historiesService.findOneLeader(id)
  }

  @Patch("leaders/:id")
  updateLeader(@Param("id") id: string, @Body() updateHistoriesLeaderDto: UpdateHistoriesLeaderDto) {
    return this.historiesService.updateLeader(id, updateHistoriesLeaderDto)
  }

  @Delete("leaders/:id")
  removeLeader(@Param("id") id: string) {
    return this.historiesService.removeLeader(id)
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.historiesService.findOne(id)
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateHistoryDto: UpdateHistoryDto) {
    return this.historiesService.update(id, updateHistoryDto)
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.historiesService.remove(id)
  }
}
