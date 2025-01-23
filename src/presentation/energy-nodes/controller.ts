import { Request, Response } from "express";
import { CustomError } from "../../domain/errors/custom.error";
import { CreateEnergyNodeDto } from "../../domain/dtos/energy-system/energy-nodes/create-energy-node.dto";
import { UpdateEnergyNodeDto } from "../../domain/dtos/energy-system/energy-nodes/update-energy-node.dto";

export class EnergyNodeController {
  constructor() {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError)
      return res.status(error.statusCode).json({ error: error.message });
    console.log(`${error}`);

    return res.status(500).json({ error: "Internal server error" });
  };

  public getAllNodes = async (req: Request, res: Response): Promise<any> => {};

  public createNode = async (req: Request, res: Response): Promise<any> => {
    const [error, createNodeDto] = CreateEnergyNodeDto.create(req.body);
    if (error) return res.status(400).json({ error });
  };

  public updateNode = async (req: Request, res: Response): Promise<any> => {
    const id = req.params.id;
    if (!id) return res.status(400).json({ error: "Missing id" });

    const [error, updateNodeDto] = UpdateEnergyNodeDto.create(req.body);
    if (error) return res.status(400).json({ error });
  };

  public deleteNode = async (req: Request, res: Response): Promise<any> => {
    const id = req.params.id;
    if (!id) return res.status(400).json({ error: "Missing id" });
  };
}
