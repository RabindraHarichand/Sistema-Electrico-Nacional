import { EnergyNodeType } from "../../shared/types/energy-node.types";
import { EnergyLink } from "./energyLink.entity";

export class EnergyGraph {
  constructor(
    public readonly id: number,
    public readonly group: string,
    public readonly type: EnergyNodeType,
    public readonly name: string,
    public readonly location: string,
    public readonly links: EnergyLink[]
  ) {}
}
