import { Router } from "express";
import { EnergyLinkController } from "./controller";
import { EnergyLinkService } from "./service";
import { EnergyLinkRepositoryImpl } from "../../infraestructure/repositories/energy-link.repository.impl";
import { EnergyLinkDatasourceImpl } from "../../infraestructure/datasources/energy-link.datasource.impl";
import { EnergyNodeDatasourceImpl } from "../../infraestructure/datasources/energy-node.datasource.impl";
import { EnergyNodeRepositoryImpl } from "../../infraestructure/repositories/energy-node.repository.impl";
import { ActionLogDatasourceIml } from "../../infraestructure/datasources/action-log.datasource.impl";
import { ActionLogRepositoryImpl } from "../../infraestructure/repositories/action-log.repository.impl";

export class EnergyLinksRoutes {
  static get routes(): Router {
    const router = Router();

    const energyLinkDatasource = new EnergyLinkDatasourceImpl();
    const energyLinkRepository = new EnergyLinkRepositoryImpl(
      energyLinkDatasource
    );

    const energyNodeDatasource = new EnergyNodeDatasourceImpl();
    const energyNodeRepository = new EnergyNodeRepositoryImpl(
      energyNodeDatasource
    );

    const actionLogDatasource = new ActionLogDatasourceIml();
    const actionLogRepository = new ActionLogRepositoryImpl(
      actionLogDatasource
    );

    const energyLinkService = new EnergyLinkService(
      energyLinkRepository,
      energyNodeRepository,
      actionLogRepository
    );
    const energyLinkController = new EnergyLinkController(energyLinkService);

    router.get("/", energyLinkController.getAllLinks); //Obtener todos los links
    router.post("/", energyLinkController.createLink); // Crear links
    router.put("/", energyLinkController.updateLink); //Actualizar links
    router.delete("/:sourceId/:targetId", energyLinkController.deleteLink); //Borrar links

    return router;
  }
}
