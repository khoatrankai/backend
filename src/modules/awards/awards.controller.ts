import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from "@nestjs/common"
import { CreateAwardDto } from "src/dto/create-award.dto";
import { UpdateAwardDto } from "src/dto/update-award.dto";
import { AwardsService } from "./awards.service";

@Controller("awards")
export class AwardsController {
  constructor(private readonly awardsService: AwardsService) {}

  @Post()
  create(@Body() createAwardDto: CreateAwardDto) {
    return this.awardsService.create(createAwardDto);
  }

  @Get()
  findAll(@Query("year") year?: string, @Query("level") level?: string) {
    if (year) {
      return this.awardsService.findByYear(year)
    }
    if (level) {
      return this.awardsService.findByLevel(level)
    }
    return this.awardsService.findAll()
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.awardsService.findOne(id)
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateAwardDto: UpdateAwardDto) {
    return this.awardsService.update(id, updateAwardDto)
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.awardsService.remove(id)
  }
}
