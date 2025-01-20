import { EnergyGraph } from "../entities";

export abstract class EnergyGraphDatasource {
  //Nodes

  abstract createNode(createEnergyGraphDto: any): Promise<EnergyGraph>;

  abstract getAllNodes(paginationDto: any): Promise<EnergyGraph[]>;

  abstract findNodeById(id: number): Promise<EnergyGraph | null>;

  abstract updateNodeById(
    id: number,
    updateEnergyGraphDto: any
  ): Promise<EnergyGraph>;

  abstract deleteNodeById(id: number): Promise<string>;

  abstract count(): Promise<number>;

  abstract getRange(paginationDto: any): Promise<EnergyGraph[]>;

  abstract getByName(name: string): Promise<EnergyGraph | null>;

  abstract existsById(id: number): Promise<boolean>;

  abstract existsByName(name: string): Promise<boolean>;

  abstract existsByNameExcludingId(id: number, name: string): Promise<boolean>;
}
