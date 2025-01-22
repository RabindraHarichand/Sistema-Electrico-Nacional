import { Router } from "express";
import { ActionLogController } from "./controller";
import { ActionLogService } from "./service";
import { ActionLogRepositoryImpl } from "../../infraestructure/repositories/action-log.repository.impl";
import { ActionLogDatasourceIml } from "../../infraestructure/datasources/action-log.datasource.impl";

export class ActionLogRoutes {
  static get routes(): Router {
    const router = Router();

    const actionLogDatasource = new ActionLogDatasourceIml();
    const actionLogRepository = new ActionLogRepositoryImpl(
      actionLogDatasource
    );

    const actionLogService = new ActionLogService(actionLogRepository);
    const actionLogController = new ActionLogController(actionLogService);

    router.get("/", actionLogController.getAllLogs);

    return router;
  }
}
