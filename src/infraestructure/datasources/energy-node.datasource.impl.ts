import { prisma } from "../../data/postgres";
import { EnergyNodeDatasource } from "../../domain/datasources/energy-node.datasource";
import { CreateEnergyNodeDto } from "../../domain/dtos/energy-system/energy-nodes/create-energy-node.dto";
import { UpdateEnergyNodeDto } from "../../domain/dtos/energy-system/energy-nodes/update-energy-node.dto";
import { EnergyGraph } from "../../domain/entities";
import { PaginationDto } from "../../shared/dtos/pagination.dto";

export class EnergyNodeDatasourceImp implements EnergyNodeDatasource {
  async createNode(
    createEnergyNodeDto: CreateEnergyNodeDto
  ): Promise<EnergyGraph> {
    const node = await prisma.energyNetworkGraphNode.create({
      data: createEnergyNodeDto,
    });

    return EnergyGraph.fromObject(node);
  }

  async getAllNodes(): Promise<EnergyGraph[]> {
    const nodes = await prisma.energyNetworkGraphNode.findMany();

    return nodes.map((node) => EnergyGraph.fromObject(node));
  }

  async findNodeById(id: number): Promise<EnergyGraph | null> {
    const node = await prisma.energyNetworkGraphNode.findUnique({
      where: {
        id,
      },
    });

    if (!node) return null;

    return EnergyGraph.fromObject(node);
  }

  async updateNodeById(
    id: number,
    updateEnergyNodeDto: UpdateEnergyNodeDto
  ): Promise<EnergyGraph> {
    const node = await prisma.energyNetworkGraphNode.update({
      where: {
        id,
      },
      data: updateEnergyNodeDto,
    });

    return EnergyGraph.fromObject(node);
  }

  async deleteNodeById(id: number): Promise<string> {
    const node = await prisma.energyNetworkGraphNode.delete({
      where: {
        id,
      },
    });

    return `Energy Node with id ${node.id} deleted`;
  }

  async count(): Promise<number> {
    return await prisma.energyNetworkGraphNode.count();
  }

  async getRange(paginationDto: PaginationDto): Promise<EnergyGraph[]> {
    const currentPage = paginationDto.page;
    const perPage = paginationDto.limit;

    const nodes = await prisma.energyNetworkGraphNode.findMany({
      skip: (currentPage - 1) * perPage,
      take: perPage,
    });

    return nodes.map((node) => EnergyGraph.fromObject(node));
  }

  async existsById(id: number): Promise<boolean> {
    return Boolean(
      await prisma.energyNetworkGraphNode.findUnique({
        where: {
          id,
        },
      })
    );
  }
}
