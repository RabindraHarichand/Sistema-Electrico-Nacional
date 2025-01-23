import { PaginationDto } from "../../shared/dtos/pagination.dto";
import { CreateEnergySystemDto } from "../dtos/energy-system/energy-nodes/create-energy-node.dto";
import { UpdateEnergySystemDto } from "../dtos/energy-system/energy-nodes/update-energy-node.dto";
import { EnergyGraph } from "../entities";

export abstract class EnergySystemRepository {
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
