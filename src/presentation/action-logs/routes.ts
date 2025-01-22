import { Router } from "express";
import { ActionLogController } from "./controller";

export class ActionLogRoutes {
  static get routes(): Router {
    const router = Router();

    const actionLogController = new ActionLogController();
    router.get("/", actionLogController.getAllUsers);

    return router;
  }
}
