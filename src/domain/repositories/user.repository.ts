import { CreateUserDto } from "../dtos/users/create-user.dto";
import { User } from "../entities";
import { UpdateUserDto } from "../dtos/users/update-user.dto";
import { PaginationDto } from "../../shared/dtos/pagination.dto";

export abstract class UserRepository {
  abstract create(createUserDto: CreateUserDto): Promise<User>;

  abstract getAll(): Promise<User[]>;

  abstract findById(id: number): Promise<User | null>;

  abstract updateById(id: number, UpdateUserDto: any): Promise<User>;

  abstract deleteById(id: number): Promise<string>;

  abstract count(): Promise<number>;

  abstract getRange(paginationDto: PaginationDto): Promise<User[]>;

  abstract getByEmail(email: string): Promise<User | null>;

  abstract getByUsername(email: string): Promise<User | null>;

  abstract existsById(id: number): Promise<boolean>;

  abstract existsByEmail(email: string): Promise<boolean>;

  abstract existsByUsername(email: string): Promise<boolean>;

  abstract existsByEmailExcludingId(
    id: number,
    email: string
  ): Promise<boolean>;
}
