import { PaginationDto } from "../../shared/dtos/pagination.dto";
import { ActionLog } from "../entities";
import { EventType } from "../../shared/types/event.types";

export abstract class ActionLogRepository {
  abstract create(actionLog: ActionLog): Promise<void>;

  abstract getLogsByType(
    paginationDto: PaginationDto,
    eventType: EventType
  ): Promise<ActionLog[]>;

  abstract count(): Promise<number>;

  abstract getRange(paginationDto: PaginationDto): Promise<ActionLog[]>;
}
