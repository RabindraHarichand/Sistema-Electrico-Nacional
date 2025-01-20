import { User } from "../entities";

export abstract class UserDatasource {
  abstract create(createUserDto: any): Promise<User>;

  abstract getAll(): Promise<User[]>;

  abstract findById(id: number): Promise<User | null>;

  abstract updateById(id: number, updateUserDto: any): Promise<User>;

  abstract deleteById(id: number): Promise<string>;

  abstract count(): Promise<number>;

  abstract getRange(paginationDto: any): Promise<User[]>;

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
