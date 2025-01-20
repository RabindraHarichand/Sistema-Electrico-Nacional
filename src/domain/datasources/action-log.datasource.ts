import { ActionLog } from "../entities";

export abstract class ActionLogDatasource {
  abstract create(createActionLogDto: any): Promise<ActionLog>;

  abstract getAll(): Promise<ActionLog[]>;

  abstract findById(id: number): Promise<ActionLog | null>;

  abstract count(): Promise<number>;

  abstract getRange(paginationDto: any): Promise<ActionLog[]>;
}
