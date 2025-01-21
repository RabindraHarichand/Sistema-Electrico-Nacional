import { UUID } from "crypto";
import { CreateUserDto } from "../../domain/dtos/users/create-user.dto";
import { UpdateUserDto } from "../../domain/dtos/users/update-user.dto";
import { CustomError } from "../../domain/errors/custom.error";
import { UserRepository } from "../../domain/repositories/user.repository";
import { PaginationDto } from "../../shared/dtos/pagination.dto";
import { bcryptAdapter } from "../../config/plugins/bcrypt.adapter";
import { hexGenerator } from "../../config/plugins/hex.adapter";
import { User } from "../../domain/entities";

export class UserService {
  constructor(private readonly repository: UserRepository) {}

  public async getAllUsers(paginationDto: PaginationDto) {
    const { page, limit } = paginationDto;

    try {
      const [total, users] = await Promise.all([
        this.repository.count(),
        this.repository.getRange(paginationDto),
      ]);

      return {
        page: page,
        limit: limit,
        total: total,
        next: `/api/users?page=${page + 1}&limit=${limit}`,
        prev:
          page - 1 > 0 ? `/api/users?page=${page - 1}&limit=${limit}` : null,
        data: users,
      };
    } catch (error) {
      throw CustomError.internalServer();
    }
  }

  public async getUserById(id: UUID) {
    const user = await this.repository.findById(id);

    if (!user) {
      throw CustomError.notFound("User not found");
    }
    return user;
  }

  public async createUser(createUserDto: CreateUserDto) {
    const existUser = await this.repository.existsByEmail(createUserDto.email);
    if (existUser) throw CustomError.badRequest("Email already exists");

    const existUsername = await this.repository.existsByUsername(
      createUserDto.username
    );

    if (existUsername) throw CustomError.badRequest("Username already exists");

    try {
      createUserDto.passwordHash = bcryptAdapter.hash(
        createUserDto.passwordHash
      );

      const user = await this.repository.create(createUserDto);

      //Add employee code to created user
      const employeeCode = await this.generateEmployeeCode(user);

      const userWithEmployeeCode = await this.repository.updateEmployeeCode(
        user.id,
        employeeCode
      );

      return userWithEmployeeCode;
    } catch (error) {
      console.log(error);

      throw CustomError.internalServer();
    }
  }

  public async updateUser(id: UUID, updateUserDto: UpdateUserDto) {
    const exists = await this.repository.existsById(id);
    if (!exists) {
      throw CustomError.notFound("User not found");
    }

    const userByEmailExists = await this.repository.existsByEmail(
      updateUserDto.email
    );
    if (userByEmailExists) {
      throw CustomError.badRequest(
        `Email ${updateUserDto.email} already exists`
      );
    }

    try {
      const product = await this.repository.updateById(id, updateUserDto);
      return product;
    } catch (error) {
      throw CustomError.internalServer();
    }
  }

  public async deleteUser(id: UUID) {
    const exists = await this.repository.existsById(id);
    if (!exists) {
      throw CustomError.notFound(`User with id:${id} not found`);
    }

    try {
      const product = await this.repository.deleteById(id);
      return product;
    } catch (error) {
      throw CustomError.internalServer();
    }
  }

  public async generateEmployeeCode(user: User): Promise<string> {
    return `${user.role}-${user.id}-${hexGenerator()}`;
  }
}
