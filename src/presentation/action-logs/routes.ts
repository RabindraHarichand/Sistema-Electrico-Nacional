import { Router } from "express";

export class ActionLogRoutes {
  static get routes(): Router {
    const router = Router();

    router.get("/", () => {});

    return router;
  }
}
