import { prisma } from "../../data/postgres";
import { ActionLogDatasource } from "../../domain/datasources/action-log.datasource";
import { ActionLog } from "../../domain/entities";
import { PaginationDto } from "../../shared/dtos/pagination.dto";
import { EventType } from "../../shared/types/event.types";

export class ActionLogDatasourceIml implements ActionLogDatasource {
  async create(log: Omit<ActionLog, "id">): Promise<void> {
    const newLog = await prisma.actionLog.create({
      data: {
        ...log,
      },
    });
    console.log("Postgres saved");
  }
  async getLogsByType(
    paginationDto: PaginationDto,
    eventType: EventType
  ): Promise<ActionLog[]> {
    const { limit, page } = paginationDto;
    const logs = await prisma.actionLog.findMany({
      skip: (page - 1) * limit,
      take: limit,
      where: { eventType },
    });

    return logs.map((log) => ActionLog.fromObject(log));
  }
  async count(): Promise<number> {
    const logCount = await prisma.actionLog.count();

    return logCount;
  }
  async getRange(paginationDto: PaginationDto): Promise<ActionLog[]> {
    const { limit, page } = paginationDto;
    const logs = await prisma.actionLog.findMany({
      skip: (page - 1) * limit,
      take: limit,
    });

    return logs.map((log) => ActionLog.fromObject(log));
  }
}
