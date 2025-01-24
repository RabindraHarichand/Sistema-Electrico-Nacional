import { PaginationDto } from "../../shared/dtos/pagination.dto";
import { CreateEnergyNodeDto } from "../dtos/energy-system/energy-nodes/create-energy-node.dto";
import { UpdateEnergyNodeDto } from "../dtos/energy-system/energy-nodes/update-energy-node.dto";
import { EnergyGraph } from "../entities";

export abstract class EnergyNodeRepository {
  //Nodes

  abstract createNode(
    createEnergyNodeDto: CreateEnergyNodeDto
  ): Promise<EnergyGraph>;

  abstract getAllNodes(): Promise<EnergyGraph[]>;

  abstract findNodeById(id: number): Promise<EnergyGraph | null>;

  abstract updateNodeById(
    id: number,
    updateEnergyNodeDto: UpdateEnergyNodeDto
  ): Promise<EnergyGraph>;

  abstract deleteNodeById(id: number): Promise<EnergyGraph>;

  abstract count(): Promise<number>;

  abstract getRange(paginationDto: PaginationDto): Promise<EnergyGraph[]>;

  abstract existsById(id: number): Promise<boolean>;
}
