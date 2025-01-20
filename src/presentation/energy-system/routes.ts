import { Router } from "express";

export class EnergySystemRoutes {
  static get routes(): Router {
    const router = Router();

    router.get("/", () => {}); //Obtener todos los nodos y links
    // router.get("/:id", () => {}); Maybe
    router.post("/", () => {}); // Crear nodo con o sin links
    router.put("/:id", () => {}); //Actualizar nodo / links
    router.delete("/:id", () => {}); //Borrar nodo y sus links

    return router;
  }
}
