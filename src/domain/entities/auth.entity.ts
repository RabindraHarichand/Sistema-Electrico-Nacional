import { UserRole } from "../../shared/types/user.types";

export class AuthUser {
  constructor(
    public readonly id: number,
    public readonly email: string,
    public readonly username: string,
    public readonly role: UserRole
  ) {}
}
