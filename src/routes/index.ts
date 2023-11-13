import { Express } from "express";
import userController from "../controllers/user.controller";
import groupController from "../controllers/group.controller";

const routes = (app: Express) => {

  //Login route
  app.post("/login", userController.login);

  //CRUD users
  app.post("/auth/users", userController.create);
  app.get("/auth/users", userController.findAll);
  app.get("/auth/users/:id", userController.findById);
  app.put("/auth/users/:id", userController.update);
  app.delete("/auth/users/:id", userController.delete);
  
  //CRUD groups
  app.post("/auth/groups", groupController.create);
  app.get("/auth/groups", groupController.findAll);
  app.get("/auth/groups/:id", groupController.findById);
  app.put("/auth/groups/:id", groupController.update);
  app.delete("/auth/groups/:id", groupController.delete);

  //Add and remove user from groups
  app.post("/auth/groups/:id/users", groupController.addUserToGroup);
  app.delete("/auth/groups/:id/users/:userId", groupController.deleteUserFromGroup);
  
  //Find users in groups, and  fird user's groups
  app.get("/auth/groups/:id/users/", groupController.findUsersInGroup); 
  app.get("/auth/users/:id/groups/", userController.findUserGroups);

};

export default routes;