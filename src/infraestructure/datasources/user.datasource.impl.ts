import { prisma } from "../../data/postgres";
import { UserDatasource } from "../../domain/datasources/user.datasource";

import { CreateUserDto } from "../../domain/dtos/users/create-user.dto";
import { UpdateUserDto } from "../../domain/dtos/users/update-user.dto";
import { User } from "../../domain/entities";
import { PaginationDto } from "../../shared/dtos/pagination.dto";

export class UserDatasourceImpl implements UserDatasource {
  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = await prisma.user.create({
      data: createUserDto,
    });

    return User.fromObject(user);
  }

  async getAll(): Promise<User[]> {
    const users = await prisma.user.findMany();

    return users.map((user) => User.fromObject(user));
  }

  async findById(id: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) return null;

    return User.fromObject(user);
  }

  async updateById(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await prisma.user.update({
      where: {
        id,
      },
      data: updateUserDto,
    });

    return User.fromObject(user);
  }

  async updateEmployeeCode(id: string, employeeCode: string): Promise<User> {
    const user = await prisma.user.update({
      where: {
        id,
      },
      data: {
        employeeCode,
      },
    });

    return User.fromObject(user);
  }

  async deleteById(id: string): Promise<string> {
    const user = await prisma.user.delete({
      where: {
        id,
      },
    });

    return `User with id ${user.id} deleted`;
  }

  async count(): Promise<number> {
    return await prisma.user.count();
  }

  async getRange(paginationDto: PaginationDto): Promise<User[]> {
    const currentPage = paginationDto.page;
    const perPage = paginationDto.limit;

    const users = await prisma.user.findMany({
      skip: (currentPage - 1) * perPage,
      take: perPage,
    });

    return users.map((user) => User.fromObject(user));
  }

  async getByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) return null;

    return User.fromObject(user);
  }

  async getByUsername(username: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: {
        username,
      },
    });

    if (!user) return null;

    return User.fromObject(user);
  }

  async existsById(id: string): Promise<boolean> {
    return Boolean(
      await prisma.user.findUnique({
        where: {
          id,
        },
      })
    );
  }

  async existsByEmail(email: string): Promise<boolean> {
    return Boolean(
      await prisma.user.findUnique({
        where: {
          email,
        },
      })
    );
  }

  async existsByUsername(username: string): Promise<boolean> {
    return Boolean(
      await prisma.user.findUnique({
        where: {
          username,
        },
      })
    );
  }

  async existsByEmailExcludingId(id: string, email: string): Promise<boolean> {
    return Boolean(
      await prisma.user.findFirst({
        where: {
          id: {
            not: id,
          },
          email,
        },
      })
    );
  }
}
