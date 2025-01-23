import { Request, Response } from "express";
import { CustomError } from "../../domain/errors/custom.error";
import { CreateEnergyNodeDto } from "../../domain/dtos/energy-system/energy-nodes/create-energy-node.dto";
import { UpdateEnergyNodeDto } from "../../domain/dtos/energy-system/energy-nodes/update-energy-node.dto";
import { EnergyNodeService } from "./service";

export class EnergyNodeController {
  constructor(private readonly energyNodeService: EnergyNodeService) {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError)
      return res.status(error.statusCode).json({ error: error.message });
    console.log(`${error}`);

    return res.status(500).json({ error: "Internal server error" });
  };

  public getAllNodes = async (req: Request, res: Response): Promise<any> => {
    this.energyNodeService
      .getAllNodes()
      .then((nodes) => res.json(nodes))
      .catch((error) => this.handleError(error, res));
  };

  public createNode = async (req: Request, res: Response): Promise<any> => {
    const [error, createNodeDto] = CreateEnergyNodeDto.create(req.body);
    if (error) return res.status(400).json({ error });

    this.energyNodeService
      .createNode(createNodeDto!)
      .then((node) => res.json(node))
      .catch((error) => this.handleError(error, res));
  };

  public updateNode = async (req: Request, res: Response): Promise<any> => {
    const id = +req.params.id;
    if (!id) return res.status(400).json({ error: "Missing id" });

    const [error, updateNodeDto] = UpdateEnergyNodeDto.create(req.body);
    if (error) return res.status(400).json({ error });

    this.energyNodeService
      .updateNode(id, updateNodeDto!)
      .then((node) => res.json(node))
      .catch((error) => this.handleError(error, res));
  };

  public deleteNode = async (req: Request, res: Response): Promise<any> => {
    const id = +req.params.id;
    if (!id) return res.status(400).json({ error: "Missing id" });

    this.energyNodeService
      .deleteNode(id)
      .then((node) => res.json(node))
      .catch((error) => this.handleError(error, res));
  };
}
