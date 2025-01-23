import {
  energyNodeType,
  EnergyNodeType,
} from "../../../../shared/types/energy-node.types";

export class UpdateEnergyNodeDto {
  constructor(
    public readonly group?: string,
    public readonly type?: EnergyNodeType,
    public readonly name?: string,
    public readonly location?: string
  ) {}

  static create(props: {
    [key: string]: any;
  }): [string?, UpdateEnergyNodeDto?] {
    const { group, type, name, location } = props;

    if (type)
      if (!energyNodeType.includes(type))
        return [`Invalid type. Valid types are ${energyNodeType}`];

    return [undefined, new UpdateEnergyNodeDto(group, type, name, location)];
  }
}
