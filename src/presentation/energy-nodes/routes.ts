import { Router } from "express";
import { EnergyNodeController } from "./controller";
import { EnergyNodeService } from "./service";
import { EnergyNodeDatasourceImpl } from "../../infraestructure/datasources/energy-node.datasource.impl";
import { EnergyNodeRepositoryImpl } from "../../infraestructure/repositories/energy-node.repository.impl";
import { ActionLogDatasourceIml } from "../../infraestructure/datasources/action-log.datasource.impl";
import { ActionLogRepositoryImpl } from "../../infraestructure/repositories/action-log.repository.impl";

export class EnergyNodesRoutes {
  static get routes(): Router {
    const router = Router();

    const energyNodeDatasource = new EnergyNodeDatasourceImpl();
    const energyNodeRepository = new EnergyNodeRepositoryImpl(
      energyNodeDatasource
    );

    const actionLogDatasource = new ActionLogDatasourceIml();
    const actionLogRepository = new ActionLogRepositoryImpl(
      actionLogDatasource
    );

    const enegyNodeService = new EnergyNodeService(
      energyNodeRepository,
      actionLogRepository
    );
    const energyNodeController = new EnergyNodeController(enegyNodeService);

    router.get("/", energyNodeController.getAllNodes); //Obtener todos los nodos
    router.post("/", energyNodeController.createNode); // Crear nodo
    router.put("/:id", energyNodeController.updateNode); //Actualizar nodo
    router.delete("/:id", energyNodeController.deleteNode); //Borrar nodo

    return router;
  }
}
