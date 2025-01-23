import { Request, Response } from "express";
import { CustomError } from "../../domain/errors/custom.error";
import { CreateEnergyLinkDto } from "../../domain/dtos/energy-system/energy-links/create-energy-link.dto";
import { UpdateEnergyLinkDto } from "../../domain/dtos/energy-system/energy-links/update-energy-link.dto";

export class EnergyLinkController {
  constructor() {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError)
      return res.status(error.statusCode).json({ error: error.message });
    console.log(`${error}`);

    return res.status(500).json({ error: "Internal server error" });
  };

  public getAllLinks = async (req: Request, res: Response): Promise<any> => {};

  public createLink = async (req: Request, res: Response): Promise<any> => {
    const [error, createLinkDto] = CreateEnergyLinkDto.create(req.body);
    if (error) return res.status(400).json({ error });
  };

  public updateLink = async (req: Request, res: Response): Promise<any> => {
    const id = req.params.id;
    if (!id) return res.status(400).json({ error: "Missing id" });

    const [error, updateLinkDto] = UpdateEnergyLinkDto.create(req.body);
    if (error) return res.status(400).json({ error });
  };

  public deleteLink = async (req: Request, res: Response): Promise<any> => {
    const id = req.params.id;
    if (!id) return res.status(400).json({ error: "Missing id" });
  };
}
