export class UpdateEnergyLinkDto {
  constructor(
    public readonly source?: number,
    public readonly target?: number,
    public readonly value?: number,
    public readonly kwUnits?: number
  ) {}

  static create(props: {
    [key: string]: any;
  }): [string?, UpdateEnergyLinkDto?] {
    const { source, target, value, kwUnits } = props;

    //Source
    if (source) {
      if (isNaN(source)) return ["source must be a valid number"];
      if (typeof source !== "number") return ["source must be a valid number"];
      if (!Number.isInteger(source)) return ["source must be a valid number"];
      if (source < 0) return ["source must be a positive number"];
    }
    //

    //Target
    if (target) {
      if (isNaN(target)) return ["target must be a valid number"];
      if (typeof target !== "number") return ["target must be a valid number"];
      if (!Number.isInteger(target)) return ["target must be a valid number"];
      if (target < 0) return ["target must be a positive number"];
    }
    //

    //value
    if (value) {
      if (isNaN(value)) return ["value must be a valid number"];
      if (typeof value !== "number") return ["value must be a valid number"];
      if (!Number.isInteger(value)) return ["value must be a valid number"];
      if (value < 0) return ["value must be a positive number"];
    }
    //

    //kwUnits

    if (kwUnits) {
      if (isNaN(kwUnits)) return ["kwUnits must be a valid number"];
      if (typeof kwUnits !== "number")
        return ["kwUnits must be a valid number"];
      if (kwUnits < 0) return ["kwUnits must be a positive number"];
    }
    //

    return [undefined, new UpdateEnergyLinkDto(source, target, value, kwUnits)];
  }
}
