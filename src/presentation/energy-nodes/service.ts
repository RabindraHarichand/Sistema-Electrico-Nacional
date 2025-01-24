import { CustomError } from "../../domain/errors/custom.error";
import { EnergyNodeRepository } from "../../domain/repositories/energy-node.repository";
import { CreateEnergyNodeDto } from "../../domain/dtos/energy-system/energy-nodes/create-energy-node.dto";
import { UpdateEnergyNodeDto } from "../../domain/dtos/energy-system/energy-nodes/update-energy-node.dto";
import { ActionLogRepository } from "../../domain/repositories/action-log.repository";
import { ActionLog } from "../../domain/entities";
import { CreateActionLogDto } from "../../domain/dtos/action-logs/create-action-log.dto";

export class EnergyNodeService {
  constructor(
    private readonly repository: EnergyNodeRepository,
    private readonly actionLogRepository: ActionLogRepository
  ) {}

  public async getAllNodes() {
    try {
      const [total, nodes] = await Promise.all([
        this.repository.count(),
        this.repository.getAllNodes(),
      ]);

      return {
        total: total,
        data: nodes,
      };
    } catch (error) {
      throw CustomError.internalServer();
    }
  }

  public async getNodeById(id: number) {
    const node = await this.repository.findNodeById(id);

    if (!node) {
      throw CustomError.notFound("Node not found");
    }
    return node;
  }

  public async createNode(createEnergyNodeDto: CreateEnergyNodeDto) {
    try {
      const node = await this.repository.createNode(createEnergyNodeDto);

      const actionLog = new CreateActionLogDto(
        `Created energy Node ${node.name} of type ${node.type}`,
        "ayuwoki",
        "Add Node"
      );
      await this.actionLogRepository.create(actionLog);

      return node;
    } catch (error) {
      console.log(error);

      throw CustomError.internalServer();
    }
  }

  public async updateNode(
    id: number,
    updateEnergyNodeDto: UpdateEnergyNodeDto
  ) {
    const exists = await this.repository.existsById(id);
    if (!exists) {
      throw CustomError.notFound(`Node with id:${id} not found`);
    }

    try {
      const node = await this.repository.updateNodeById(
        id,
        updateEnergyNodeDto
      );

      const actionLog = new CreateActionLogDto(
        `Modified energy Node ${node.name} of type ${node.type}`,
        "ayuwoki",
        "Modify Node"
      );
      await this.actionLogRepository.create(actionLog);

      return node;
    } catch (error) {
      throw CustomError.internalServer();
    }
  }

  public async deleteNode(id: number) {
    const exists = await this.repository.existsById(id);
    if (!exists) {
      throw CustomError.notFound(`Node with id:${id} not found`);
    }

    try {
      const node = await this.repository.deleteNodeById(id);

      const actionLog = new CreateActionLogDto(
        `Deleted energy Node ${node.name} of type ${node.type}`,
        "ayuwoki",
        "Delete Node"
      );
      await this.actionLogRepository.create(actionLog);

      return node;
    } catch (error) {
      throw CustomError.internalServer();
    }
  }
}
