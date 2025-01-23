import {
  energyNodeType,
  EnergyNodeType,
} from "../../../../shared/types/energy-node.types";

export class CreateEnergyNodeDto {
  constructor(
    public readonly group: string,
    public readonly type: EnergyNodeType,
    public readonly name: string,
    public readonly location: string
  ) {}

  static create(props: {
    [key: string]: any;
  }): [string?, CreateEnergyNodeDto?] {
    const { group, type, name, location } = props;

    if (!group) return ["Missing group"];

    if (!type) return ["Missing type"];
    if (!energyNodeType.includes(type))
      return [`Invalid type. Valid types are ${energyNodeType}`];

    if (!name) return ["Missing name"];

    if (!location) return ["Missing location"];

    return [undefined, new CreateEnergyNodeDto(group, type, name, location)];
  }
}
