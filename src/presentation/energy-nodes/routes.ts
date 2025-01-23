import { Router } from "express";
import { EnergyNodeController } from "./controller";

export class EnergyNodesRoutes {
  static get routes(): Router {
    const router = Router();

    const energyNodeController = new EnergyNodeController();

    router.get("/", energyNodeController.getAllNodes); //Obtener todos los nodos
    router.post("/", energyNodeController.createNode); // Crear nodo
    router.put("/:id", energyNodeController.updateNode); //Actualizar nodo
    router.delete("/:id", energyNodeController.deleteNode); //Borrar nodo

    return router;
  }
}
