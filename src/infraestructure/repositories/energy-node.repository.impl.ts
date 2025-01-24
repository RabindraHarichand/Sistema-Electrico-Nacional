import { EnergyNodeDatasource } from "../../domain/datasources/energy-node.datasource";
import { CreateEnergyNodeDto } from "../../domain/dtos/energy-system/energy-nodes/create-energy-node.dto";
import { UpdateEnergyNodeDto } from "../../domain/dtos/energy-system/energy-nodes/update-energy-node.dto";
import { EnergyGraph } from "../../domain/entities";
import { EnergyNodeRepository } from "../../domain/repositories/energy-node.repository";
import { PaginationDto } from "../../shared/dtos/pagination.dto";

export class EnergyNodeRepositoryImpl implements EnergyNodeRepository {
  constructor(private readonly energyNodeDatasource: EnergyNodeDatasource) {}

  createNode(createEnergyNodeDto: CreateEnergyNodeDto): Promise<EnergyGraph> {
    return this.energyNodeDatasource.createNode(createEnergyNodeDto);
  }
  getAllNodes(): Promise<EnergyGraph[]> {
    return this.energyNodeDatasource.getAllNodes();
  }
  findNodeById(id: number): Promise<EnergyGraph | null> {
    return this.energyNodeDatasource.findNodeById(id);
  }
  updateNodeById(
    id: number,
    updateEnergyNodeDto: UpdateEnergyNodeDto
  ): Promise<EnergyGraph> {
    return this.energyNodeDatasource.updateNodeById(id, updateEnergyNodeDto);
  }

  deleteNodeById(id: number): Promise<EnergyGraph> {
    return this.energyNodeDatasource.deleteNodeById(id);
  }
  count(): Promise<number> {
    return this.energyNodeDatasource.count();
  }
  getRange(paginationDto: PaginationDto): Promise<EnergyGraph[]> {
    return this.energyNodeDatasource.getRange(paginationDto);
  }

  existsById(id: number): Promise<boolean> {
    return this.energyNodeDatasource.existsById(id);
  }
}
