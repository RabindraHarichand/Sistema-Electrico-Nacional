import { prisma } from "../../data/postgres";
import { EnergyLinkDatasource } from "../../domain/datasources/energy-link.datasource";
import { CreateEnergyLinkDto } from "../../domain/dtos/energy-system/energy-links/create-energy-link.dto";
import { UpdateEnergyLinkDto } from "../../domain/dtos/energy-system/energy-links/update-energy-link.dto";
import { EnergyLink } from "../../domain/entities";
import { PaginationDto } from "../../shared/dtos/pagination.dto";

export class EnergyLinkDatasourceImpl implements EnergyLinkDatasource {
  async createLink(
    createEnergyLinkDto: CreateEnergyLinkDto
  ): Promise<EnergyLink> {
    const link = await prisma.energyNetworkGraphLink.create({
      data: createEnergyLinkDto,
    });

    return EnergyLink.fromObject(link);
  }

  async getAllLinks(): Promise<EnergyLink[]> {
    const links = await prisma.energyNetworkGraphLink.findMany();

    return links.map((link) => EnergyLink.fromObject(link));
  }

  async findLinkById(
    sourceId: number,
    targetId: number
  ): Promise<EnergyLink | null> {
    const link = await prisma.energyNetworkGraphLink.findUnique({
      where: {
        linkId: {
          source: sourceId,
          target: targetId,
        },
      },
    });

    if (!link) return null;

    return EnergyLink.fromObject(link);
  }

  async updateLinkById(
    sourceId: number,
    targetId: number,
    updateEnergyLinkDto: UpdateEnergyLinkDto
  ): Promise<EnergyLink> {
    const link = await prisma.energyNetworkGraphLink.update({
      where: {
        linkId: {
          source: sourceId,
          target: targetId,
        },
      },
      data: updateEnergyLinkDto,
    });

    return EnergyLink.fromObject(link);
  }

  async deleteLinkById(sourceId: number, targetId: number): Promise<string> {
    const link = await prisma.energyNetworkGraphLink.delete({
      where: {
        linkId: {
          source: sourceId,
          target: targetId,
        },
      },
    });

    return `Energy link with source id:${sourceId} and target id:${targetId} deleted`;
  }

  async count(): Promise<number> {
    return await prisma.energyNetworkGraphLink.count();
  }

  async getRange(paginationDto: PaginationDto): Promise<EnergyLink[]> {
    const currentPage = paginationDto.page;
    const perPage = paginationDto.limit;

    const links = await prisma.energyNetworkGraphLink.findMany({
      skip: (currentPage - 1) * perPage,
      take: perPage,
    });

    return links.map((link) => EnergyLink.fromObject(link));
  }

  async existsById(sourceId: number, targetId: number): Promise<boolean> {
    return Boolean(
      await prisma.energyNetworkGraphLink.findUnique({
        where: {
          linkId: {
            source: sourceId,
            target: targetId,
          },
        },
      })
    );
  }
}
