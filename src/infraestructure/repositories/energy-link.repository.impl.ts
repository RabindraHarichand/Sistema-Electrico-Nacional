import { CreateEnergyLinkDto } from "../../domain/dtos/energy-system/energy-links/create-energy-link.dto";
import { UpdateEnergyLinkDto } from "../../domain/dtos/energy-system/energy-links/update-energy-link.dto";
import { EnergyLinkRepository } from "../../domain/repositories/energy-link.repository";
import { PaginationDto } from "../../shared/dtos/pagination.dto";
import { EnergyLinkDatasource } from "../../domain/datasources/energy-link.datasource";
import { EnergyLink } from "../../domain/entities";

export class EnergyLinkRepositoryImpl implements EnergyLinkRepository {
  constructor(private readonly energyLinkDatasource: EnergyLinkDatasource) {}

  createLink(createEnergyLinkDto: CreateEnergyLinkDto): Promise<EnergyLink> {
    return this.energyLinkDatasource.createLink(createEnergyLinkDto);
  }
  getAllLinks(): Promise<EnergyLink[]> {
    return this.energyLinkDatasource.getAllLinks();
  }
  updateLinkById(
    sourceId: number,
    targetId: number,
    updateEnergyLinkDto: UpdateEnergyLinkDto
  ): Promise<EnergyLink> {
    return this.energyLinkDatasource.updateLinkById(
      sourceId,
      targetId,
      updateEnergyLinkDto
    );
  }
  deleteLinkById(sourceId: number, targetId: number): Promise<string> {
    return this.energyLinkDatasource.deleteLinkById(sourceId, targetId);
  }
  count(): Promise<number> {
    return this.energyLinkDatasource.count();
  }
  getRange(paginationDto: PaginationDto): Promise<EnergyLink[]> {
    return this.energyLinkDatasource.getRange(paginationDto);
  }
  existsById(sourceId: number, targetId: number): Promise<boolean> {
    return this.energyLinkDatasource.existsById(sourceId, targetId);
  }
}
