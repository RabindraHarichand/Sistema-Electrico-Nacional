import { CreateUserDto } from "../dtos/users/create-user.dto";
import { User } from "../entities";
import { UpdateUserDto } from "../dtos/users/update-user.dto";
import { PaginationDto } from "../../shared/dtos/pagination.dto";
import { UUID } from "crypto";

export abstract class UserDatasource {
  abstract create(createUserDto: CreateUserDto): Promise<User>;

  abstract getAll(): Promise<User[]>;

  abstract findById(id: UUID): Promise<User | null>;

  abstract updateById(id: UUID, updateUserDto: UpdateUserDto): Promise<User>;

  abstract updateEmployeeCode(id: UUID, employeeCode: string): Promise<User>;

  abstract deleteById(id: UUID): Promise<string>;

  abstract count(): Promise<number>;

  abstract getRange(paginationDto: PaginationDto): Promise<User[]>;

  abstract getByEmail(email: string): Promise<User | null>;

  abstract getByUsername(username: string): Promise<User | null>;

  abstract existsById(id: UUID): Promise<boolean>;

  abstract existsByEmail(email: string): Promise<boolean>;

  abstract existsByUsername(username: string): Promise<boolean>;

  abstract existsByEmailExcludingId(id: UUID, email: string): Promise<boolean>;
}
