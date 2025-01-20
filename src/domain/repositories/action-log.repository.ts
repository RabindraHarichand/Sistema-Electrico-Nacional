import { CreateActionLogDto } from "../dtos/action-logs/create-action-log.dto";
import { ActionLog } from "../entities";

export abstract class ActionLogRepository {
  abstract create(createActionLogDto: CreateActionLogDto): Promise<ActionLog>;

  abstract getAll(): Promise<ActionLog[]>;

  abstract findById(id: number): Promise<ActionLog | null>;

  abstract count(): Promise<number>;

  abstract getRange(paginationDto: any): Promise<ActionLog[]>;
}
