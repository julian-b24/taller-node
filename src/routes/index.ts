import { Express } from "express";
import userController from "../controllers/user.controller";
import groupController from "../controllers/group.controller";

const routes = (app: Express) => {
  app.post("/users", userController.create);
  app.get("/users", userController.findAll);
  app.get("/users/:id", userController.findById);
  app.put("/users/:id", userController.update);
  app.post("/login", userController.login);
  
  app.get("/groups", groupController.findAll);

};

export default routes;