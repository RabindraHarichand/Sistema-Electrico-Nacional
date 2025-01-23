import { Router } from "express";
import { EnergyNodeController } from "./controller";
import { EnergyNodeService } from "./service";
import { EnergyNodeDatasourceImpl } from "../../infraestructure/datasources/energy-node.datasource.impl";
import { EnergyNodeRepositoryImpl } from "../../infraestructure/repositories/energy-node.repository.impl";

export class EnergyNodesRoutes {
  static get routes(): Router {
    const router = Router();

    const energyNodeDatasource = new EnergyNodeDatasourceImpl();

    const energyNodeRepository = new EnergyNodeRepositoryImpl(
      energyNodeDatasource
    );

    const enegyNodeService = new EnergyNodeService(energyNodeRepository);
    const energyNodeController = new EnergyNodeController(enegyNodeService);

    router.get("/", energyNodeController.getAllNodes); //Obtener todos los nodos
    router.post("/", energyNodeController.createNode); // Crear nodo
    router.put("/:id", energyNodeController.updateNode); //Actualizar nodo
    router.delete("/:id", energyNodeController.deleteNode); //Borrar nodo

    return router;
  }
}
