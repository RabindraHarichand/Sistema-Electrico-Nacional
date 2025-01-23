import { EnergyGraph } from "./energy-graph.entity";

export class EnergyLink {
  constructor(
    public readonly source: EnergyGraph,
    public readonly target: EnergyGraph,
    public readonly value: number,
    public readonly kwUnits: number
  ) {}

  static fromObject(props: { [key: string]: any }): EnergyLink {
    return new EnergyLink(
      props.source,
      props.target,
      props.value,
      props.kwUnits
    );
  }
}
