import { UUID } from "crypto";
import { UserRole } from "../../shared/types/user.types";

export class User {
  constructor(
    public id: UUID,
    public firstName: string,
    public lastName: string,
    public username: string,
    public email: string,
    public employeeCode: string,
    public role: UserRole,
    public passwordHash: string
  ) {}
}
