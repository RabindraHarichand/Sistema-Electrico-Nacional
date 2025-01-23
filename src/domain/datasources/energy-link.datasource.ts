import { PaginationDto } from "../../shared/dtos/pagination.dto";
import { CreateEnergyLinkDto } from "../dtos/energy-system/energy-links/create-energy-link.dto";
import { UpdateEnergyLinkDto } from "../dtos/energy-system/energy-links/update-energy-link.dto";
import { EnergyGraph } from "../entities";

export abstract class EnergyLinkDatasource {
  abstract createLink(
    createEnergyLinkDto: CreateEnergyLinkDto
  ): Promise<EnergyGraph>;

  abstract getAllLinks(): Promise<EnergyGraph[]>;

  abstract updateLinkById(
    sourceId: number,
    targetId: number,
    updateEnergyLinkDto: UpdateEnergyLinkDto
  ): Promise<EnergyGraph>;

  abstract deleteLinkById(sourceId: number, targetId: number): Promise<string>;

  abstract count(): Promise<number>;

  abstract getRange(paginationDto: PaginationDto): Promise<EnergyGraph[]>;

  abstract existsById(sourceId: number, targetId: number): Promise<boolean>;
}
