import { regularExps } from "../../../shared/regular-expressions/regular-exp";
import { UserRole, userRole } from "../../../shared/types/user.types";

export class AuthUserDto {
  constructor(
    public readonly id: number,
    public readonly email: string,
    public readonly role: UserRole
  ) {}

  static create(props: { [key: string]: any }): [string?, AuthUserDto?] {
    const { id, email, role } = props;

    if (!id) return ["Missing id"];
    if (isNaN(id)) return ["id must be a valid number"];
    if (typeof id !== "number") return ["id must be a valid number"];
    if (id < 0) return ["id must be a positive number"];

    if (!email) return ["Missing email"];
    if (!regularExps.email.test(email)) return ["Email is not valid"];

    if (!role) return ["Missing role"];
    if (!userRole.includes(role))
      return [`Invalid role. Valid roles are ${userRole}`];

    return [undefined, new AuthUserDto(id, email, role as UserRole)];
  }
}
