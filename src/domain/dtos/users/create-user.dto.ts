import { regularExps } from "../../../shared/regular-expressions/regular-exp";
import { userRole, UserRole } from "../../../shared/types/user.types";

export class CreateUserDto {
  private constructor(
    public readonly firstName: string,
    public readonly lastName: string,
    public readonly email: string,
    public passwordHash: string,
    public readonly role: UserRole,
    public readonly username: string,
    public readonly employeeCode: string
  ) {}

  static create(props: { [key: string]: any }): [string?, CreateUserDto?] {
    const {
      firstName,
      lastName,
      email,
      password,
      role = "User",
      username,
      employeeCode,
    } = props;

    if (!firstName) return ["Missing firstName"];
    if (firstName.length > 50) return ["firstName too long"];

    if (!lastName) return ["Missing lastName"];
    if (lastName.length > 50) return ["lastName too long"];

    if (!password) return ["Missing password"];
    if (password.length < 8) return ["Password too short"];

    if (!email) return ["Missing email"];
    if (!regularExps.email.test(email)) return ["Email is not valid"];

    if (!role) return ["Missing role"];
    if (!userRole.includes(role))
      return [`Invalid role. Valid roles are ${userRole}`];

    if (!username) return ["Missing username"];
    if (username.length < 12) ["Username too short"];

    if (!employeeCode) return ["Missing employee code"];

    return [
      undefined,
      new CreateUserDto(
        firstName,
        lastName,
        email,
        password,
        role,
        username,
        employeeCode
      ),
    ];
  }
}
