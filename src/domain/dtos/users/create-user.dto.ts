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

  static create(props: { [key: string]: any }): [string[]?, CreateUserDto?] {
    let error = [];
    const {
      firstName,
      lastName,
      email,
      password,
      role = "Operador",
      username,
    } = props;

    if (!firstName) error.push("Missing firstName");
    if (firstName?.length > 50) error.push("firstName too long");

    if (!lastName) error.push("Missing lastName");
    if (lastName?.length > 50) error.push("lastName too long");

    if (!password) error.push("Missing password");
    if (password?.length < 8) error.push("Password too short");

    if (!email) error.push("Missing email");
    if (!regularExps.email.test(email)) error.push("Email is not valid");

    if (!role) error.push("Missing role");
    if (!userRole.includes(role))
      error.push(`Invalid role. Valid roles are ${userRole}`);

    if (!username) error.push("Missing username");
    if (username?.length > 12)
      error.push("Username must be shorter than 12 characters");
    if (username?.length < 8)
      error.push("Username must be longer than 8 characters");
    if (!regularExps.atLeastOneDigit.test(username))
      error.push("Username must have at least 1 digit");
    if (!regularExps.atLeastOneSpecialChar.test(username))
      error.push("Username must have at least 1 special character");
    if (!regularExps.atLeastOneLowerCase.test(username))
      error.push("Username must have at least 1 lowercase character");
    if (!regularExps.atLeastOneUpperCase.test(username))
      error.push("Username must have at least 1 uppercase character");

    if (error.length >= 1) return [error];

    return [
      undefined,
      new CreateUserDto(firstName, lastName, email, password, role, username),
    ];
  }
}
