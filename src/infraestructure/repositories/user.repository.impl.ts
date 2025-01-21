import { UserDatasource } from "../../domain/datasources/user.datasource";
import { CreateUserDto } from "../../domain/dtos/users/create-user.dto";
import { UpdateUserDto } from "../../domain/dtos/users/update-user.dto";
import { User } from "../../domain/entities";
import { UserRepository } from "../../domain/repositories/user.repository";
import { PaginationDto } from "../../shared/dtos/pagination.dto";

export class UserRepositoryImpl implements UserRepository {
  constructor(private readonly datasource: UserDatasource) {}
  getByUsername(username: string): Promise<User | null> {
    return this.datasource.getByUsername(username);
  }
  existsByUsername(username: string): Promise<boolean> {
    return this.datasource.existsByUsername(username);
  }
  create(createUserDto: CreateUserDto): Promise<User> {
    return this.datasource.create(createUserDto);
  }
  getAll(): Promise<User[]> {
    return this.datasource.getAll();
  }
  findById(id: number): Promise<User | null> {
    return this.datasource.findById(id);
  }
  updateById(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    return this.datasource.updateById(id, updateUserDto);
  }
  deleteById(id: number): Promise<string> {
    return this.datasource.deleteById(id);
  }

  count(): Promise<number> {
    return this.datasource.count();
  }

  getRange(paginationDto: PaginationDto): Promise<User[]> {
    return this.datasource.getRange(paginationDto);
  }

  getByEmail(email: string): Promise<User | null> {
    return this.datasource.getByEmail(email);
  }

  existsById(id: number): Promise<boolean> {
    return this.datasource.existsById(id);
  }

  existsByEmail(email: string): Promise<boolean> {
    return this.datasource.existsByEmail(email);
  }

  existsByEmailExcludingId(id: number, email: string): Promise<boolean> {
    return this.datasource.existsByEmailExcludingId(id, email);
  }
}
