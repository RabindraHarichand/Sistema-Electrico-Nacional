import { bcryptAdapter } from "../../config/plugins/bcrypt.adapter";
import { hexGenerator } from "../../config/plugins/hex.adapter";
import { JwtAdapter } from "../../config/plugins/jwt.adapter";
import { LoginUserDto } from "../../domain/dtos/auth/login-user.dto";
import { CreateUserDto } from "../../domain/dtos/users/create-user.dto";
import { User } from "../../domain/entities";

import { CustomError } from "../../domain/errors/custom.error";
import { UserRepository } from "../../domain/repositories/user.repository";
export class AuthService {
  constructor(private readonly repository: UserRepository) {}

  public async login(loginUserDto: LoginUserDto) {
    // Verifiy if user exists
    const user = await this.repository.getByEmail(loginUserDto.email);
    if (!user)
      throw CustomError.badRequest(
        `User with email ${loginUserDto.email} was not found`
      );
    //isMatch...bcrypt...compare(123456,sfaffaio3)
    const isMatching = bcryptAdapter.compare(
      loginUserDto.password,
      user.passwordHash
    );
    if (!isMatching)
      throw CustomError.badRequest("Password is not correct. Please try again");

    const { passwordHash, ...userProps } = User.fromObject(user);

    const token = await JwtAdapter.generateToken({
      id: user.id,
      email: user.email,
    });
    if (!token) throw CustomError.internalServer("Error while creating JWT");
    return {
      user: userProps,
      token: token,
    };
  }

  public async register(createUserDto: CreateUserDto) {
    const existUser = await this.repository.getByEmail(createUserDto.email);
    if (existUser) throw CustomError.badRequest("Email already exists");

    try {
      createUserDto.passwordHash = bcryptAdapter.hash(
        createUserDto.passwordHash
      );

      const user = await this.repository.create(createUserDto);

      //Add employee code to created user
      const employeeCode = await this.generateEmployeeCode(user);

      const userWithEmployeeCode = await this.repository.updateEmployeeCode(
        user.id,
        employeeCode
      );

      const { passwordHash, ...userProps } =
        User.fromObject(userWithEmployeeCode);
      const token = await JwtAdapter.generateToken({
        id: user.id,
      });

      return {
        user: userProps,
        token: token,
      };
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }

  public async generateEmployeeCode(user: User): Promise<string> {
    return `${user.role}-${user.id}-${hexGenerator()}`;
  }
}
