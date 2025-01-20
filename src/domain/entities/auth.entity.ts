import { regularExps } from "../../shared/regular-expressions/regular-exp";
import { userRole, UserRole } from "../../shared/types/user.types";
import { CustomError } from "../errors/custom.error";

export class AuthUser {
  constructor(
    public readonly id: number,
    public readonly email: string,
    public readonly username: string,
    public readonly role: UserRole
  ) {}

  public static fromObject(object: { [key: string]: any }): AuthUser {
    const { id, email, role, username } = object;

    if (!id) throw CustomError.badRequest("Missing id");

    if (!email) throw CustomError.badRequest("Missing email");
    if (!regularExps.email.test(email))
      throw CustomError.badRequest("Email is not valid");

    if (!role) throw CustomError.badRequest("Missing role");

    if (!username) throw CustomError.badRequest("Missing username");

    if (!userRole.includes(role as UserRole))
      throw CustomError.badRequest(`Invalid role. Valid roles are ${userRole}`);

    const user = new AuthUser(id, email, username, role as UserRole);

    return user;
  }
}
