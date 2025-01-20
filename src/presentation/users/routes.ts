import { Router } from "express";

export class UserRoutes {
  static get routes(): Router {
    const router = Router();

    router.get("/", () => {});
    router.get("/:id", () => {});
    router.post("/", () => {});
    router.put("/:id", () => {});
    router.delete("/:id", () => {});

    return router;
  }
}
