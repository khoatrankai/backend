import { Controller, Get, Post, Body, Patch, Param, Delete } from "@nestjs/common"
import type { CreateStatisticalDto } from "src/dto/create-statistical.dto"
import type { UpdateStatisticalDto } from "src/dto/update-statistical.dto"
import { StatisticalService } from "./statistical.service";

@Controller("statistical")
export class StatisticalController {
  constructor(private readonly statisticalService: StatisticalService) {}

  @Post()
  create(@Body() createStatisticalDto: CreateStatisticalDto) {
    return this.statisticalService.create(createStatisticalDto);
  }

  @Get()
  findAll() {
    return this.statisticalService.findAll()
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.statisticalService.findOne(id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateStatisticalDto: UpdateStatisticalDto) {
    return this.statisticalService.update(id, updateStatisticalDto)
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.statisticalService.remove(id);
  }
}
