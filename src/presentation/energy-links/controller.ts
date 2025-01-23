import { Request, Response } from "express";
import { CustomError } from "../../domain/errors/custom.error";
import { CreateEnergyLinkDto } from "../../domain/dtos/energy-system/energy-links/create-energy-link.dto";
import { UpdateEnergyLinkDto } from "../../domain/dtos/energy-system/energy-links/update-energy-link.dto";
import { EnergyLinkService } from "./service";

export class EnergyLinkController {
  constructor(private readonly energyLinkService: EnergyLinkService) {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError)
      return res.status(error.statusCode).json({ error: error.message });
    console.log(`${error}`);

    return res.status(500).json({ error: "Internal server error" });
  };

  public getAllLinks = async (req: Request, res: Response): Promise<any> => {
    this.energyLinkService
      .getAllLinks()
      .then((links) => res.json(links))
      .catch((error) => this.handleError(error, res));
  };

  public createLink = async (req: Request, res: Response): Promise<any> => {
    const [error, createLinkDto] = CreateEnergyLinkDto.create(req.body);
    if (error) return res.status(400).json({ error });

    this.energyLinkService
      .createLink(createLinkDto!)
      .then((link) => res.json(link))
      .catch((error) => this.handleError(error, res));
  };

  public updateLink = async (req: Request, res: Response): Promise<any> => {
    const [error, updateLinkDto] = UpdateEnergyLinkDto.create(req.body);
    if (error) return res.status(400).json({ error });

    this.energyLinkService
      .updateLink(updateLinkDto!.source, updateLinkDto!.target, updateLinkDto!)
      .then((link) => res.json(link))
      .catch((error) => this.handleError(error, res));
  };

  public deleteLink = async (req: Request, res: Response): Promise<any> => {
    const sourceId = +req.params.sourceId;
    if (!sourceId) return res.status(400).json({ error: "Missing id" });

    const targetId = +req.params.targetId;
    if (!targetId) return res.status(400).json({ error: "Missing id" });

    this.energyLinkService
      .deleteLink(sourceId!, targetId!)
      .then((link) => res.json(link))
      .catch((error) => this.handleError(error, res));
  };
}
