import { CreateUserDto } from "../dtos/users/create-user.dto";
import { User } from "../entities";
import { UpdateUserDto } from "../dtos/users/update-user.dto";
import { PaginationDto } from "../../shared/dtos/pagination.dto";

export abstract class UserRepository {
  abstract create(createUserDto: CreateUserDto): Promise<User>;

  abstract getAll(): Promise<User[]>;

  abstract findById(id: string): Promise<User | null>;

  abstract updateById(id: string, updateUserDto: UpdateUserDto): Promise<User>;

  abstract updateEmployeeCode(id: string, employeeCode: string): Promise<User>;

  abstract deleteById(id: string): Promise<string>;

  abstract count(): Promise<number>;

  abstract getRange(paginationDto: PaginationDto): Promise<User[]>;

  abstract getByEmail(email: string): Promise<User | null>;

  abstract getByUsername(username: string): Promise<User | null>;

  abstract existsById(id: string): Promise<boolean>;

  abstract existsByEmail(email: string): Promise<boolean>;

  abstract existsByUsername(username: string): Promise<boolean>;

  abstract existsByEmailExcludingId(
    id: string,
    email: string
  ): Promise<boolean>;
}
