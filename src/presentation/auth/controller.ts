import { Request, Response } from "express";
import { CustomError } from "../../domain/errors/custom.error";
import { CreateUserDto } from "../../domain/dtos/users/create-user.dto";
import { LoginUserDto } from "../../domain/dtos/auth/login-user.dto";
import { AuthService } from "./service";

export class AuthController {
  constructor(private readonly authService: AuthService) {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError)
      return res.status(error.statusCode).json({ error: error.message });

    console.log(`${error}`);

    return res.status(500).json({ error: "Internal server error" });
  };

  public login = async (req: Request, res: Response): Promise<any> => {
    const [error, loginDto] = LoginUserDto.create(req.body);
    if (error) return res.status(400).json({ error });

    this.authService
      .login(loginDto!)
      .then((user) => res.json(user))
      .catch((error) => this.handleError(error, res));
  };

  public register = async (req: Request, res: Response): Promise<any> => {
    const [error, registerDto] = CreateUserDto.create(req.body);
    if (error) return res.status(400).json({ error });

    this.authService
      .register(registerDto!)
      .then((user) => res.json(user))
      .catch((error) => this.handleError(error, res));
  };
}
