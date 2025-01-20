import { PaginationDto } from "../../shared/dtos/pagination.dto";
import { CreateEnergySystemDto } from "../dtos/energy-system/create-energy-system.dto";
import { UpdateEnergySystemDto } from "../dtos/energy-system/update-energy-system.dto";
import { EnergyGraph } from "../entities";

export abstract class EnergySystemDatasource {
  //Nodes

  abstract createNode(
    createEnergySystemDto: CreateEnergySystemDto
  ): Promise<EnergyGraph>;

  abstract getAllNodes(paginationDto: any): Promise<EnergyGraph[]>;

  abstract findNodeById(id: number): Promise<EnergyGraph | null>;

  abstract updateNodeById(
    id: number,
    updateEnergySystemDto: UpdateEnergySystemDto
  ): Promise<EnergyGraph>;

  abstract deleteNodeById(id: number): Promise<string>;

  abstract count(): Promise<number>;

  abstract getRange(paginationDto: PaginationDto): Promise<EnergyGraph[]>;

  abstract getByName(name: string): Promise<EnergyGraph | null>;

  abstract existsById(id: number): Promise<boolean>;

  abstract existsByName(name: string): Promise<boolean>;

  abstract existsByNameExcludingId(id: number, name: string): Promise<boolean>;
}
