import { Request, Response } from "express";
import { CustomError } from "../../domain/errors/custom.error";
import { PaginationDto } from "../../shared/dtos/pagination.dto";
import { ActionLogService } from "./service";

export class ActionLogController {
  constructor(private readonly actionLogService: ActionLogService) {}
  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError)
      return res.status(error.statusCode).json({ error: error.message });

    console.log(`${error}`);

    return res.status(500).json({ error: "Internal server error" });
  };

  public getAllLogs = async (req: Request, res: Response): Promise<any> => {
    const { page = 1, limit = 10 } = req.query;
    const [error, paginationDto] = PaginationDto.create(+page, +limit);
    if (error) return res.status(400).json({ error });

    this.actionLogService
      .getAllLogs(paginationDto!)
      .then((logs) => res.json(logs))
      .catch((error) => this.handleError(error, res));
  };
}
