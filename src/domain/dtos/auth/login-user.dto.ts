import { regularExps } from "../../../shared/regular-expressions/regular-exp";

export class LoginUserDto {
  private constructor(
    public readonly email: string,
    public readonly password: string
  ) {}

  static create(object: { [key: string]: any }): [string?, LoginUserDto?] {
    const { email, password } = object;

    if (!email) return ["Missing email"];
    if (!regularExps.email.test(email)) return ["Email is not valid"];
    if (!password) return ["Missing password"];
    if (password < 8) return ["Password too short"];

    return [undefined, new LoginUserDto(email, password)];
  }
}
