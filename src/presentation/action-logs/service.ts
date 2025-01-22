import { CustomError } from "../../domain/errors/custom.error";
import { ActionLogRepository } from "../../domain/repositories/action-log.repository";
import { PaginationDto } from "../../shared/dtos/pagination.dto";

export class ActionLogService {
  constructor(private readonly repository: ActionLogRepository) {}

  public async getAllLogs(paginationDto: PaginationDto) {
    const { page, limit } = paginationDto;

    try {
      const [total, logs] = await Promise.all([
        this.repository.count(),
        this.repository.getRange(paginationDto),
      ]);

      return {
        page: page,
        limit: limit,
        total: total,
        next: `/api/action-logs?page=${page + 1}&limit=${limit}`,
        prev:
          page - 1 > 0
            ? `/api/action-logs?page=${page - 1}&limit=${limit}`
            : null,
        data: logs,
      };
    } catch (error) {
      throw CustomError.internalServer();
    }
  }
}
