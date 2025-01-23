import { Router } from "express";
import { EnergyLinkController } from "./controller";

export class EnergyLinksRoutes {
  static get routes(): Router {
    const router = Router();

    const energyLinkController = new EnergyLinkController();

    router.get("/", energyLinkController.getAllLinks); //Obtener todos los nodos
    router.post("/", energyLinkController.createLink); // Crear nodo
    router.put("/:id", energyLinkController.updateLink); //Actualizar nodo
    router.delete("/:id", energyLinkController.deleteLink); //Borrar nodo

    return router;
  }
}
