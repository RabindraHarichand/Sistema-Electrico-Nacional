import { Router } from "express";
import { AuthController } from "./controller";
import { AuthService } from "./service";
import { UserDatasourceImpl } from "../../infraestructure/datasources/user.datasource.impl";
import { UserRepositoryImpl } from "../../infraestructure/repositories/user.repository.impl";

export class AuthRoutes {
  static get routes(): Router {
    const router = Router();

    const userDatasource = new UserDatasourceImpl();
    const userRepository = new UserRepositoryImpl(userDatasource);

    const authService = new AuthService(userRepository);
    const authController = new AuthController(authService);

    router.post("/login", authController.login);
    router.post("/register", authController.register);
    return router;
  }
}
