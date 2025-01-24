import { ActionLogDatasource } from "../../domain/datasources/action-log.datasource";
import { CreateActionLogDto } from "../../domain/dtos/action-logs/create-action-log.dto";
import { ActionLog } from "../../domain/entities";
import { ActionLogRepository } from "../../domain/repositories/action-log.repository";
import { PaginationDto } from "../../shared/dtos/pagination.dto";
import { EventType } from "../../shared/types/event.types";

export class ActionLogRepositoryImpl implements ActionLogRepository {
  constructor(private readonly actionLogDatasource: ActionLogDatasource) {}
  create(actionLog: CreateActionLogDto): Promise<void> {
    return this.actionLogDatasource.create(actionLog);
  }
  getLogsByType(
    paginationDto: PaginationDto,
    eventType: EventType
  ): Promise<ActionLog[]> {
    return this.actionLogDatasource.getLogsByType(paginationDto, eventType);
  }
  count(): Promise<number> {
    return this.actionLogDatasource.count();
  }
  getRange(paginationDto: PaginationDto): Promise<ActionLog[]> {
    return this.actionLogDatasource.getRange(paginationDto);
  }
}
