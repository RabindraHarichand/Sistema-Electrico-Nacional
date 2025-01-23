import { PaginationDto } from "../../shared/dtos/pagination.dto";
import { CreateEnergyLinkDto } from "../dtos/energy-system/energy-links/create-energy-link.dto";
import { UpdateEnergyLinkDto } from "../dtos/energy-system/energy-links/update-energy-link.dto";
import { EnergyLink } from "../entities";

export abstract class EnergyLinkDatasource {
  abstract createLink(
    createEnergyLinkDto: CreateEnergyLinkDto
  ): Promise<EnergyLink>;

  abstract getAllLinks(): Promise<EnergyLink[]>;

  abstract findLinkById(
    sourceId: number,
    targetId: number
  ): Promise<EnergyLink | null>;

  abstract updateLinkById(
    sourceId: number,
    targetId: number,
    updateEnergyLinkDto: UpdateEnergyLinkDto
  ): Promise<EnergyLink>;

  abstract deleteLinkById(sourceId: number, targetId: number): Promise<string>;

  abstract count(): Promise<number>;

  abstract getRange(paginationDto: PaginationDto): Promise<EnergyLink[]>;

  abstract existsById(sourceId: number, targetId: number): Promise<boolean>;
}
