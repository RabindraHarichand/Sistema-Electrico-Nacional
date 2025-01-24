import { Router } from "express";
import { EnergyLinkController } from "./controller";
import { EnergyLinkService } from "./service";
import { EnergyLinkRepositoryImpl } from "../../infraestructure/repositories/energy-link.repository.impl";
import { EnergyLinkDatasourceImpl } from "../../infraestructure/datasources/energy-link.datasource.impl";
import { EnergyNodeDatasourceImpl } from "../../infraestructure/datasources/energy-node.datasource.impl";
import { EnergyNodeRepositoryImpl } from "../../infraestructure/repositories/energy-node.repository.impl";

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

    const energyLinkService = new EnergyLinkService(
      energyLinkRepository,
      energyNodeRepository
    );
    const energyLinkController = new EnergyLinkController(energyLinkService);

    router.get("/", energyLinkController.getAllLinks); //Obtener todos los links
    router.post("/", energyLinkController.createLink); // Crear links
    router.put("/", energyLinkController.updateLink); //Actualizar links
    router.delete("/:sourceId/:targetId", energyLinkController.deleteLink); //Borrar links

    return router;
  }
}
