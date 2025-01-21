import { UUID } from "crypto";
import { userRole, UserRole } from "../../shared/types/user.types";
import { CustomError } from "../errors/custom.error";
import { regularExps } from "../../shared/regular-expressions/regular-exp";

export class User {
  constructor(
    public id: UUID,
    public firstName: string,
    public lastName: string,
    public username: string,
    public email: string,
    public role: UserRole,
    public passwordHash: string,
    public employeeCode?: string
  ) {}

  public static fromObject(object: { [key: string]: any }): User {
    const {
      id,
      firstName,
      lastName,
      email,
      passwordHash,
      role,
      username,
      employeeCode,
    } = object;

    if (!id) throw CustomError.badRequest("Missing id");

    if (!firstName) throw CustomError.badRequest("Missing first name");

    if (!lastName) throw CustomError.badRequest("Missing last name");

    if (!email) throw CustomError.badRequest("Missing email");

    if (!regularExps.email.test(email))
      throw CustomError.badRequest("Email is not valid");

    if (!passwordHash) throw CustomError.badRequest("Missing password");

    if (!role) throw CustomError.badRequest("Missing role");

    if (!userRole.includes(role as UserRole))
      throw CustomError.badRequest(`Invalid role. Valid roles are ${userRole}`);

    if (!username) throw CustomError.badRequest("Missing username");
    if (username.length > 12)
      throw CustomError.badRequest(
        "User name must be shortet than 12 characters"
      );
    if (username.length < 8)
      throw CustomError.badRequest(
        "User name must be longer than 8 characters"
      );
    if (!regularExps.atLeastOneDigit.test(username))
      throw CustomError.badRequest("User name must have at least 1 digit");
    if (!regularExps.atLeastOneSpecialChar.test(username))
      throw CustomError.badRequest(
        "User name must have at least 1 special character"
      );
    if (!regularExps.atLeastOneLowerCase.test(username))
      throw CustomError.badRequest(
        "User name must have at least 1 lowercase character"
      );
    if (!regularExps.atLeastOneUpperCase.test(username))
      throw CustomError.badRequest(
        "User name must have at least 1 uppercase character"
      );

    const user = new User(
      id,
      firstName,
      lastName,
      username,
      email,
      role as UserRole,
      passwordHash,
      employeeCode
    );

    return user;
  }
}
