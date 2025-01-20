import {
  energyNodeType,
  EnergyNodeType,
} from "../../../shared/types/energy-node.types";

interface Link {
  source: number;
  target: number;
  value: number;
  kwUnits: number;
}

export class UpdateEnergySystemDto {
  constructor(
    public readonly group?: string,
    public readonly type?: EnergyNodeType,
    public readonly name?: string,
    public readonly location?: string,

    public readonly links?: Link[]
  ) {}

  static create(props: {
    [key: string]: any;
  }): [string?, UpdateEnergySystemDto?] {
    const { group, type, name, location, links } = props;

    if (type)
      if (!energyNodeType.includes(type))
        return [`Invalid type. Valid types are ${energyNodeType}`];

    if (links) {
      if (!Array.isArray(links)) return ["links must be an array"];

      links.map((link: Link) => {
        //Source
        if (!link.source) return ["Missing source"];
        if (isNaN(link.source)) return ["source must be a valid number"];
        if (typeof link.source !== "number")
          return ["source must be a valid number"];
        if (!Number.isInteger(link.source))
          return ["source must be a valid number"];
        if (link.source < 0) return ["source must be a positive number"];
        //

        //Target
        if (!link.target) return ["Missing target"];
        if (isNaN(link.target)) return ["target must be a valid number"];
        if (typeof link.target !== "number")
          return ["target must be a valid number"];
        if (!Number.isInteger(link.target))
          return ["target must be a valid number"];
        if (link.target < 0) return ["target must be a positive number"];
        //

        //value
        if (link.value) {
          if (isNaN(link.value)) return ["value must be a valid number"];
          if (typeof link.value !== "number")
            return ["value must be a valid number"];
          if (!Number.isInteger(link.value))
            return ["value must be a valid number"];
          if (link.value < 0) return ["value must be a positive number"];
        }
        //

        //kwUnits

        if (link.kwUnits) {
          if (isNaN(link.kwUnits)) return ["kwUnits must be a valid number"];
          if (typeof link.kwUnits !== "number")
            return ["kwUnits must be a valid number"];
          if (link.kwUnits < 0) return ["kwUnits must be a positive number"];
        }
        //
      });
    }

    return [
      undefined,
      new UpdateEnergySystemDto(group, type, name, location, links),
    ];
  }
}
