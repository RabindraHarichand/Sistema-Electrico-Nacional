import { CreateEnergyLinkDto } from "../../domain/dtos/energy-system/energy-links/create-energy-link.dto";
import { UpdateEnergyLinkDto } from "../../domain/dtos/energy-system/energy-links/update-energy-link.dto";
import { CustomError } from "../../domain/errors/custom.error";
import { EnergyLinkRepository } from "../../domain/repositories/energy-link.repository";
import { EnergyNodeRepository } from "../../domain/repositories/energy-node.repository";
import { ActionLogRepository } from "../../domain/repositories/action-log.repository";
import { CreateActionLogDto } from "../../domain/dtos/action-logs/create-action-log.dto";

export class EnergyLinkService {
  constructor(
    private readonly repository: EnergyLinkRepository,
    private readonly energyNodeRepository: EnergyNodeRepository,
    private readonly actionLogRepository: ActionLogRepository
  ) {}

  public async getAllLinks() {
    try {
      const [total, links] = await Promise.all([
        this.repository.count(),
        this.repository.getAllLinks(),
      ]);

      return {
        total: total,
        data: links,
      };
    } catch (error) {
      throw CustomError.internalServer();
    }
  }

  public async getLinkById(sourceId: number, targetId: number) {
    const link = await this.repository.findLinkById(sourceId, targetId);

    if (!link) {
      throw CustomError.notFound("Link not found");
    }
    return link;
  }

  public async createLink(createEnergyLinkDto: CreateEnergyLinkDto) {
    const existsSourceNode = await this.energyNodeRepository.existsById(
      createEnergyLinkDto.source
    );
    if (!existsSourceNode) {
      throw CustomError.notFound(
        `Node with id:${createEnergyLinkDto.source} not found`
      );
    }

    const existsTargetNode = await this.energyNodeRepository.existsById(
      createEnergyLinkDto.target
    );
    if (!existsTargetNode) {
      throw CustomError.notFound(
        `Node with wi:${createEnergyLinkDto.target} not found`
      );
    }

    const existsLink = await this.repository.existsById(
      createEnergyLinkDto.source,
      createEnergyLinkDto.target
    );

    if (existsLink) {
      throw CustomError.notFound(
        `Link with sourceId:${createEnergyLinkDto.source} & targetId:${createEnergyLinkDto.target} already exists`
      );
    }

    try {
      const link = await this.repository.createLink(createEnergyLinkDto);

      const actionLog = new CreateActionLogDto(
        `Created energy link with sorce: ${createEnergyLinkDto.source} & target: ${createEnergyLinkDto.target}`,
        "ayuwoki",
        "Add Link"
      );
      await this.actionLogRepository.create(actionLog);

      return link;
    } catch (error) {
      console.log(error);

      throw CustomError.internalServer();
    }
  }

  public async updateLink(
    sourceId: number,
    targetId: number,
    updateEnergyLinkDto: UpdateEnergyLinkDto
  ) {
    const exists = await this.repository.existsById(sourceId, targetId);
    if (!exists) {
      throw CustomError.notFound(
        `Link with sourceId:${sourceId} & targetId:${targetId} not found`
      );
    }

    try {
      const link = await this.repository.updateLinkById(
        sourceId,
        targetId,
        updateEnergyLinkDto
      );

      const actionLog = new CreateActionLogDto(
        `Modified energy link with sorce: ${updateEnergyLinkDto.source} & target: ${updateEnergyLinkDto.target}`,
        "ayuwoki",
        "Modify Link"
      );
      await this.actionLogRepository.create(actionLog);

      return link;
    } catch (error) {
      throw CustomError.internalServer();
    }
  }

  public async deleteLink(sourceId: number, targetId: number) {
    const exists = await this.repository.existsById(sourceId, targetId);
    if (!exists) {
      throw CustomError.notFound(
        `Link with sourceId:${sourceId} & targetId:${targetId} not found`
      );
    }

    try {
      const link = await this.repository.deleteLinkById(sourceId, targetId);

      const actionLog = new CreateActionLogDto(
        `Deleted energy link with sorce: ${sourceId} & target: ${targetId}`,
        "ayuwoki",
        "Delete Link"
      );
      await this.actionLogRepository.create(actionLog);

      return link;
    } catch (error) {
      throw CustomError.internalServer();
    }
  }
}
