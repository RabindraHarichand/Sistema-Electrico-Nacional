import { PaginationDto } from "../../shared/dtos/pagination.dto";
import { ActionLog } from "../entities";
import { EventType } from "../../shared/types/event.types";
import { CreateActionLogDto } from "../dtos/action-logs/create-action-log.dto";

export abstract class ActionLogDatasource {
  abstract create(actionLog: CreateActionLogDto): Promise<void>;

  abstract getLogsByType(
    paginationDto: PaginationDto,
    eventType: EventType
  ): Promise<ActionLog[]>;

  abstract count(): Promise<number>;

  abstract getRange(paginationDto: PaginationDto): Promise<ActionLog[]>;
}
