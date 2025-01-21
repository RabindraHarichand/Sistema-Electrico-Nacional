import { regularExps } from "../../../shared/regular-expressions/regular-exp";
import { userRole, UserRole } from "../../../shared/types/user.types";

export class CreateUserDto {
  private constructor(
    public readonly firstName: string,
    public readonly lastName: string,
    public readonly email: string,
    public passwordHash: string,
    public readonly role: UserRole,
    public readonly username: string
  ) {}

  static create(props: { [key: string]: any }): [string?, CreateUserDto?] {
    const {
      firstName,
      lastName,
      email,
      password,
      role = "User",
      username,
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
    if (username.length < 12)
      return ["Username must be shorter than 12 characters"];
    if (username.length < 8)
      return ["Username must be longer than 8 characters"];
    if (!regularExps.atLeastOneDigit.test(username))
      return ["Username must have at least 1 digit"];
    if (!regularExps.atLeastOneSpecialChar.test(username))
      return ["Username must have at least 1 special character"];
    if (!regularExps.atLeastOneLowerCase.test(username))
      return ["Username must have at least 1 lowercase character"];
    if (!regularExps.atLeastOneUpperCase.test(username))
      return ["Username must have at least 1 uppercase character"];

    return [
      undefined,
      new CreateUserDto(firstName, lastName, email, password, role, username),
    ];
  }
}
