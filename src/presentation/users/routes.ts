import { Router } from "express";
import { UsersController } from "./controller";
import { UserService } from "./service";
import { UserDatasourceImpl } from "../../infraestructure/datasources/user.datasource.impl";
import { UserRepositoryImpl } from "../../infraestructure/repositories/user.repository.impl";

export class UserRoutes {
  static get routes(): Router {
    const router = Router();

    const datasource = new UserDatasourceImpl();
    const userRepository = new UserRepositoryImpl(datasource);

    const userService = new UserService(userRepository);

    const userController = new UsersController(userService);

    router.get("/", userController.getAllUsers);
    router.get("/:id", userController.getUserById);
    router.post("/", userController.createUser);
    router.put("/:id", userController.updateUser);
    router.delete("/:id", userController.deleteUser);

    return router;
  }
}
