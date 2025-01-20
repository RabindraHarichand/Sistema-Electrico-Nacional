import { Router } from "express";
import { UserRoutes } from "./users/routes";
import { AuthRoutes } from "./auth/routes";
import { EnergySystemRoutes } from "./energy-system/routes";
import { ActionLogRoutes } from "./action-logs/routes";

export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    router.use("/api/users", UserRoutes.routes);
    router.use("/api/auth", AuthRoutes.routes);
    router.use("/api/energy-system", EnergySystemRoutes.routes);
    router.use("/api/action-logs", ActionLogRoutes.routes);

    return router;
  }
}
