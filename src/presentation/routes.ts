import { Router } from "express";
import { UserRoutes } from "./users/routes";
import { AuthRoutes } from "./auth/routes";
import { EnergyNodesRoutes } from "./energy-nodes/routes";
import { ActionLogRoutes } from "./action-logs/routes";
import { EnergyLinksRoutes } from "./energy-links/routes";

export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    router.use("/api/users", UserRoutes.routes);
    router.use("/api/auth", AuthRoutes.routes);
    router.use("/api/energy-nodes", EnergyNodesRoutes.routes);
    router.use("/api/energy-links", EnergyLinksRoutes.routes);
    router.use("/api/action-logs", ActionLogRoutes.routes);

    return router;
  }
}
