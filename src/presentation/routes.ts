import { Router } from "express";

export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    router.use("/api/users", () => {});
    router.use("/api/auth", () => {});
    router.use("/api/energy-system", () => {});

    return router;
  }
}
