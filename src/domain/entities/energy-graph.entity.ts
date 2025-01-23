import { EnergyNodeType } from "../../shared/types/energy-node.types";
import { EnergyLink } from "./energy-link.entity";

export class EnergyGraph {
  constructor(
    public readonly id: number,
    public readonly group: string,
    public readonly type: EnergyNodeType,
    public readonly name: string,
    public readonly location: string,
    public readonly links?: EnergyLink[]
  ) {}

  static fromObject(obj: { [key: string]: any }): EnergyGraph {
    const { id, group, type, name, location, links } = obj;

    return new EnergyGraph(
      id,
      group,
      type,
      name,
      location,
      links?.map((link: { [key: string]: any }) => EnergyLink.fromObject(link))
    );
  }
}
