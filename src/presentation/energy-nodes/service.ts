import { CustomError } from "../../domain/errors/custom.error";
import { EnergyNodeRepository } from "../../domain/repositories/energy-node.repository";
import { CreateEnergyNodeDto } from "../../domain/dtos/energy-system/energy-nodes/create-energy-node.dto";
import { UpdateEnergyNodeDto } from "../../domain/dtos/energy-system/energy-nodes/update-energy-node.dto";

export class EnergyNodeService {
  constructor(private readonly repository: EnergyNodeRepository) {}

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
      return node;
    } catch (error) {
      throw CustomError.internalServer();
    }
  }
}
