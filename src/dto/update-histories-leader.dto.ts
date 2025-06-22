import { PartialType } from "@nestjs/mapped-types"
import { CreateHistoriesLeaderDto } from "./create-histories-leader.dto"

export class UpdateHistoriesLeaderDto extends PartialType(CreateHistoriesLeaderDto) {}
