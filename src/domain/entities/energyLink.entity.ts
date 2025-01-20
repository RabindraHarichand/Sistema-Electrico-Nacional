import { EnergyGraph } from "./energyGraph.entity";

export class EnergyLink {
  constructor(
    public readonly source: EnergyGraph,
    public readonly target: EnergyGraph,
    public readonly value: number,
    public readonly kwUnits: number
  ) {}
}
