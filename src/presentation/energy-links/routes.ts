import { Router } from "express";

export class EnergyLinksRoutes {
  static get routes(): Router {
    const router = Router();

    router.get("/", () => {}); //Obtener todos los nodos
    router.post("/", () => {}); // Crear nodo
    router.put("/:id", () => {}); //Actualizar nodo
    router.delete("/:id", () => {}); //Borrar nodo

    return router;
  }
}
