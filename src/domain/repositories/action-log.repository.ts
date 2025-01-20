import { ActionLog } from "../entities";

export abstract class ActionLogRepository {
  abstract create(createActionLogDto: any): Promise<ActionLog>;

  abstract getAll(): Promise<ActionLog[]>;

  abstract findById(id: number): Promise<ActionLog | null>;

  abstract updateById(id: number, updateActionLogDto: any): Promise<ActionLog>;

  abstract deleteById(id: number): Promise<string>;

  abstract count(): Promise<number>;

  abstract getRange(paginationDto: any): Promise<ActionLog[]>;
}
